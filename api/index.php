<?php
/* ==========================================================================
   小课桌 · 学习码云同步接口
   环境：PHP 7.0+ / pdo_mysql；把整个 api/ 目录放到站点根目录即可
   动作：status / register / login / pull / push / clear / logout
   请求：GET  ?act=pull          POST ?act=login   JSON body
        登录态放在请求头 X-XK-Token
   安全：PDO 预处理、学习码不明文落库、token 只存哈希、按 IP 限错、
        进度按客户端时间戳做 last-write-wins，旧设备不会覆盖新成绩
   ========================================================================== */
error_reporting(E_ALL);
ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$CFG_FILE = __DIR__ . '/config.php';
if (!is_file($CFG_FILE)) {
    http_response_code(500);
    echo json_encode(array('ok' => false, 'error' => 'config_missing',
        'msg' => '缺少 api/config.php，请从 config.example.php 复制一份并填好数据库信息。'), JSON_UNESCAPED_UNICODE);
    exit;
}
$CFG = require $CFG_FILE;
if (!is_array($CFG)) {
    http_response_code(500);
    echo json_encode(array('ok' => false, 'error' => 'bad_config', 'msg' => 'api/config.php 必须 return 一个数组。'), JSON_UNESCAPED_UNICODE);
    exit;
}

/* ---------- 跨域（默认关闭；同域部署不需要） ---------- */
$origin  = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
$allowed = isset($CFG['allow_origins']) && is_array($CFG['allow_origins']) ? $CFG['allow_origins'] : array();
if ($origin !== '' && in_array($origin, $allowed, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Headers: Content-Type, X-XK-Token');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Vary: Origin');
}
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/* ---------- 通用工具 ---------- */
function out($data, $code) {
    http_response_code($code);
    $json = json_encode($data, JSON_UNESCAPED_UNICODE);
    if ($json === false) $json = '{"ok":false,"error":"encode"}';
    echo $json;
    exit;
}
function fail($msg, $code, $err) {
    out(array('ok' => false, 'error' => $err, 'msg' => $msg), $code);
}
function db() {
    global $CFG;
    static $pdo = null;
    if ($pdo !== null) return $pdo;
    $dsn = 'mysql:host=' . $CFG['db_host']
         . ';port=' . (isset($CFG['db_port']) ? $CFG['db_port'] : '3306')
         . ';dbname=' . $CFG['db_name'] . ';charset=utf8mb4';
    try {
        $pdo = new PDO($dsn, $CFG['db_user'], $CFG['db_pass'], array(
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ));
    } catch (PDOException $e) {
        error_log('[xiaokedz] db: ' . $e->getMessage());
        fail('数据库连接失败，请检查 api/config.php', 500, 'db_error');
    }
    return $pdo;
}
function body() {
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') return array();
    $d = json_decode($raw, true);
    return is_array($d) ? $d : array();
}
function client_ip() {
    $ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown';
    return substr($ip, 0, 64);
}
function request_token() {
    if (isset($_SERVER['HTTP_X_XK_TOKEN'])) return $_SERVER['HTTP_X_XK_TOKEN'];
    if (function_exists('getallheaders')) {
        $hs = getallheaders();
        foreach ($hs as $k => $v) {
            if (strtolower($k) === 'x-xk-token') return $v;
        }
    }
    return '';
}
function norm_nick($s) {
    $s = trim((string)$s);
    $s = preg_replace('/[\x00-\x1F\x7F]/', '', $s);
    if (!preg_match('//u', $s)) return '同学';
    if (preg_match_all('/./us', $s, $m) && count($m[0]) > 16) {
        $s = implode('', array_slice($m[0], 0, 16));
    }
    return $s;
}
function norm_code($c) {
    $c = preg_replace('/\D/', '', (string)$c);
    return strlen($c) === 6 ? $c : '';
}
function secret_ok() {
    global $CFG;
    return isset($CFG['secret']) && is_string($CFG['secret']) && strlen($CFG['secret']) >= 16
        && strpos($CFG['secret'], '在这里填') === false;
}
function code_id($c) {
    global $CFG;
    return hash_hmac('sha256', 'xiaokedz:code:' . $c, $CFG['secret']);
}
function code_taken($c) {
    $st = db()->prepare('SELECT id FROM xk_user WHERE provider = ? AND external_id = ? LIMIT 1');
    $st->execute(array('code', code_id($c)));
    return (bool)$st->fetch();
}
function generate_code() {
    for ($i = 0; $i < 40; $i++) {
        $c = str_pad((string)random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        if (!code_taken($c)) return $c;
    }
    fail('暂时发不出学习码，请稍后再试', 503, 'code_exhausted');
}
function attempt_blocked($ip) {
    global $CFG;
    $max = isset($CFG['max_fail_per_day']) ? (int)$CFG['max_fail_per_day'] : 30;
    if ($max <= 0) $max = 30;
    $st = db()->prepare('SELECT fails FROM xk_attempt WHERE ip = ? AND day = CURDATE()');
    $st->execute(array($ip));
    $row = $st->fetch();
    return $row && (int)$row['fails'] >= $max;
}
function attempt_fail($ip) {
    $st = db()->prepare('INSERT INTO xk_attempt (ip, day, fails) VALUES (?, CURDATE(), 1) '
        . 'ON DUPLICATE KEY UPDATE fails = fails + 1');
    $st->execute(array($ip));
}
function attempt_clear($ip) {
    $st = db()->prepare('DELETE FROM xk_attempt WHERE ip = ?');
    $st->execute(array($ip));
}
function issue_token($uid) {
    global $CFG;
    $token = bin2hex(random_bytes(32));
    $days = isset($CFG['token_days']) ? (int)$CFG['token_days'] : 180;
    if ($days <= 0) $days = 180;
    $exp = date('Y-m-d H:i:s', time() + $days * 86400);
    $st = db()->prepare('INSERT INTO xk_token (token_hash, user_id, expires_at) VALUES (?, ?, ?)');
    $st->execute(array(hash('sha256', $token), $uid, $exp));
    return $token;
}
function current_user() {
    $tok = request_token();
    if (!preg_match('/^[a-f0-9]{64}$/', $tok)) {
        fail('登录已过期，请重新输入学习码', 401, 'unauthorized');
    }
    $st = db()->prepare('SELECT u.* FROM xk_token t JOIN xk_user u ON u.id = t.user_id '
        . 'WHERE t.token_hash = ? AND t.expires_at > NOW() LIMIT 1');
    $st->execute(array(hash('sha256', $tok)));
    $u = $st->fetch();
    if (!$u) fail('登录已过期，请重新输入学习码', 401, 'unauthorized');
    return $u;
}
function fetch_progress($uid) {
    $st = db()->prepare('SELECT point_id, score, total, done_at FROM xk_progress WHERE user_id = ?');
    $st->execute(array($uid));
    $out = new stdClass();
    while ($r = $st->fetch()) {
        $out->{$r['point_id']} = array(
            'score' => (int)$r['score'],
            'total' => (int)$r['total'],
            'at'    => (int)$r['done_at'],
        );
    }
    return $out;
}

/* ---------- 路由 ---------- */
$act = isset($_GET['act']) ? (string)$_GET['act'] : 'status';

if ($act === 'status') {
    out(array('ok' => true, 'version' => 1, 'provider' => 'code', 'configured' => secret_ok()), 200);
}

if (!secret_ok()) {
    fail('请先在 api/config.php 里把 secret 换成一段随机字符串', 500, 'bad_secret');
}

try {
    if ($act === 'register') {
        $ip = client_ip();
        if (attempt_blocked($ip)) fail('今天尝试次数太多，明天再试', 429, 'rate_limited');
        $d = body();
        $nick = norm_nick(isset($d['nick']) ? $d['nick'] : '');
        if ($nick === '') fail('请填一个昵称（用小名就行）', 400, 'nick_required');

        $asked = isset($d['code']) ? trim((string)$d['code']) : '';
        $code = '';
        if ($asked !== '') {
            $code = norm_code($asked);
            if ($code === '') fail('学习码必须是 6 位数字', 400, 'bad_code');
        }
        if ($code === '') $code = generate_code();
        if (code_taken($code)) {
            attempt_fail($ip);
            fail('这个学习码已经有人用了，换一个试试', 409, 'code_taken');
        }
        $st = db()->prepare('INSERT INTO xk_user (nick, provider, external_id, login_code) VALUES (?, ?, ?, ?)');
        $st->execute(array($nick, 'code', code_id($code), password_hash($code, PASSWORD_DEFAULT)));
        $uid = (int)db()->lastInsertId();
        $token = issue_token($uid);
        attempt_clear($ip);
        out(array('ok' => true, 'token' => $token, 'nick' => $nick, 'code' => $code,
            'userId' => $uid, 'progress' => new stdClass()), 200);
    }

    if ($act === 'login') {
        $ip = client_ip();
        if (attempt_blocked($ip)) fail('今天尝试次数太多，明天再试', 429, 'rate_limited');
        $d = body();
        $code = norm_code(isset($d['code']) ? $d['code'] : '');
        if ($code === '') {
            attempt_fail($ip);
            fail('学习码是 6 位数字，再检查一下', 400, 'bad_code');
        }
        $st = db()->prepare('SELECT * FROM xk_user WHERE provider = ? AND external_id = ? LIMIT 1');
        $st->execute(array('code', code_id($code)));
        $u = $st->fetch();
        if (!$u || !password_verify($code, (string)$u['login_code'])) {
            attempt_fail($ip);
            fail('学习码不对，再检查一下', 401, 'bad_credentials');
        }
        $uid = (int)$u['id'];
        $token = issue_token($uid);
        attempt_clear($ip);
        out(array('ok' => true, 'token' => $token, 'nick' => $u['nick'], 'code' => $code,
            'userId' => $uid, 'progress' => fetch_progress($uid)), 200);
    }

    if ($act === 'pull') {
        $u = current_user();
        $uid = (int)$u['id'];
        out(array('ok' => true, 'nick' => $u['nick'], 'userId' => $uid,
            'progress' => fetch_progress($uid), 'serverTime' => time() * 1000), 200);
    }

    if ($act === 'push') {
        $u = current_user();
        $uid = (int)$u['id'];
        $d = body();
        $pr = (isset($d['progress']) && is_array($d['progress'])) ? $d['progress'] : array();
        if (count($pr) > 500) fail('一次最多上报 500 条记录', 413, 'too_many');
        $st = db()->prepare(
            'INSERT INTO xk_progress (user_id, point_id, score, total, done_at) VALUES (?, ?, ?, ?, ?) '
          . 'ON DUPLICATE KEY UPDATE '
          . 'score = IF(VALUES(done_at) >= done_at, VALUES(score), score), '
          . 'total = IF(VALUES(done_at) >= done_at, VALUES(total), total), '
          . 'done_at = IF(VALUES(done_at) >= done_at, VALUES(done_at), done_at)'
        );
        $saved = 0;
        $nowMs = time() * 1000;
        foreach ($pr as $pid => $rec) {
            $pid = (string)$pid;
            if (!preg_match('/^[A-Za-z0-9_-]{1,32}$/', $pid) || !is_array($rec)) continue;
            $score = isset($rec['score']) ? (int)$rec['score'] : 0;
            $total = isset($rec['total']) ? (int)$rec['total'] : 3;
            $at    = isset($rec['at'])    ? (int)$rec['at']    : 0;
            if ($score < 0 || $score > 999 || $total < 1 || $total > 999 || $at < 0) continue;
            // 设备时钟跑偏到未来会让这条记录永远盖不掉，钳到当前时间
            if ($at > $nowMs + 86400000) $at = $nowMs;
            $st->execute(array($uid, $pid, $score, $total, $at));
            $saved++;
        }
        out(array('ok' => true, 'saved' => $saved, 'progress' => fetch_progress($uid)), 200);
    }

    if ($act === 'clear') {
        $u = current_user();
        $st = db()->prepare('DELETE FROM xk_progress WHERE user_id = ?');
        $st->execute(array((int)$u['id']));
        out(array('ok' => true), 200);
    }

    if ($act === 'logout') {
        $tok = request_token();
        if ($tok !== '') {
            $st = db()->prepare('DELETE FROM xk_token WHERE token_hash = ?');
            $st->execute(array(hash('sha256', $tok)));
        }
        out(array('ok' => true), 200);
    }

    fail('没有这个动作：' . $act, 404, 'unknown_action');
} catch (Throwable $e) {
    error_log('[xiaokedz] ' . $e->getMessage());
    fail('服务端出了点问题，请稍后再试', 500, 'server_error');
}
