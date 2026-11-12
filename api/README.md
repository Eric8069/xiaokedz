# 云同步后端 · 宝塔部署说明

这是**可选功能**。不装 `api/`，站点就是完整可用的纯静态站：进度存本机，用「导出 / 导入」换设备。
装了以后，孩子可以在手机、平板、电脑上用同一个 6 位学习码接着学。

技术上是 **PHP 7.0+（pdo_mysql）+ MySQL 5.7+**，宝塔 LNMP 现成环境，不需要 Node、不需要改服务器。
身份字段已预留 `provider + external_id`，以后想接微信 / Passkey 只加登录入口，不用改进度表。

---

## 一、五步上线

### 1. 建数据库并导入表

宝塔面板 → 数据库 → 添加数据库，记下库名 / 用户名 / 密码（例如 `xiaokedz`）。
然后进 phpMyAdmin，选中这个库 → 导入 → 选择 `api/install.sql` → 执行。

或者用 SSH：

```bash
mysql -u xiaokedz -p xiaokedz < /www/wwwroot/你的域名/api/install.sql
```

会建 4 张表：`xk_user`（昵称 + 身份）、`xk_progress`（进度）、`xk_token`（登录态哈希）、`xk_attempt`（按 IP 限错）。
脚本带 `IF NOT EXISTS`，重复导入不会丢数据。

### 2. 站点必须启用 PHP（最容易踩的坑）

宝塔 → 网站 → 你的站点 → 设置 → **PHP 版本**，选一个 PHP 7.4 / 8.0 / 8.1，**不要留「纯静态」**。

> 如果站点是「纯静态」，nginx 不会把 `.php` 交给 PHP-FPM，浏览器访问 `/api/config.php` 会**直接下载源码**，数据库密码就泄露了。
> 开启 PHP 后请顺手把 `deploy/nginx-site.conf` 第 6 段的三条 `return 404` 规则加进站点配置，双保险。

### 3. 上传并写配置

`api/` 目录要上传到站点根目录，和 `index.html` 同级：

```
/www/wwwroot/你的域名/
├── index.html
├── assets/
├── data/
└── api/
    ├── index.php
    ├── install.sql
    ├── config.example.php
    └── config.php        ← 这一步在服务器上创建，不在本地
```

在服务器上执行：

```bash
cd /www/wwwroot/你的域名/api
cp config.example.php config.php
php -r "echo bin2hex(random_bytes(32)), PHP_EOL;"   # 生成 secret，复制输出
vi config.php                                       # 填 db_name / db_user / db_pass / secret
chown www:www config.php && chmod 600 config.php
```

`config.php` 已加入 `.gitignore`，`deploy.sh` 和 `pack.sh` 也都主动排除它，
**重复部署不会覆盖、更不会删掉线上配置**。

### 4. 打开前端开关

编辑 `assets/js/sync-config.js`：

```js
window.XK_SYNC_CONFIG = {
  enabled: true,                 // 改成 true
  endpoint: 'api/index.php',     // 相对路径，站点在子目录也不用改
  timeout: 8000
};
```

改完重新上传这个文件（或重新跑一次 `./deploy/deploy.sh`）。

### 5. 自检

浏览器打开：

```
https://你的域名/api/index.php?act=status
```

应看到：

```json
{"ok":true,"version":1,"provider":"code","configured":true}
```

`configured` 为 `false` 说明 `secret` 还没改；返回 404 说明 `api/` 放错目录；下载了 php 源码说明第 2 步没做。
然后打开站点的「我的学习」页，云同步卡片应显示「未登录」，填个小名点「领取学习码」，拿到 6 位数字；
换一台设备打开同一个网址，输入这 6 位数字点「登录并同步」，进度就会出现在新设备上。

---

## 二、接口一览

全部同域，登录态放在请求头 `X-XK-Token`。响应统一 `{ "ok": true, ... }`，失败时带 `error` 和中文 `msg`。

| 动作 | 方法 | 入参 | 返回 |
|---|---|---|---|
| `status` | GET | — | 服务状态、`configured` |
| `register` | POST | `{nick, code?}` | 生成 6 位学习码，返回 `token / nick / code`，`code` 不填则服务端随机 |
| `login` | POST | `{code}` | 校验学习码，返回 `token / nick / code / progress` |
| `pull` | GET | — | 返回该用户全部进度 `{ "m4-01": {score,total,at} }` |
| `push` | POST | `{progress: {...}}` | 按时间戳 upsert，返回合并后的进度 |
| `clear` | POST | — | 清空该用户云端进度 |
| `logout` | POST | — | 作废当前 token |

`register` / `login` 不需要 token；其余都要。

### 冲突合并规则

`progress` 里每条记录带客户端毫秒时间戳 `at`。
服务端 `push` 只在 `新 at >= 旧 at` 时覆盖，前端 `pull` 也按 `at` 取新的。
所以：离线做的题不会被旧设备覆盖；两台设备各自做完不同的知识点，联网后合并成并集。

---

## 三、安全与合规

- **学习码等于密码**，谁拿到都能看到并改写这份进度。请家长抄在本子上，不要发群里、不要贴朋友圈。
- 数据库里 **不存学习码明文**：`external_id` 是 HMAC-SHA256，`login_code` 是 `password_hash`；`token` 只存 SHA-256 哈希。
- 6 位数字只有 100 万种组合，因此按 IP 做了每日失败次数限制（默认 30 次，可在 `config.php` 调）。真要对外开放，建议把码改成 8 位并在 nginx 层加限流。
- **只存昵称和做题记录**，不存真实姓名、手机号、生日、位置。面向未成年人时按最小必要原则处理，账号由家长代为领取。
- 全站建议开 HTTPS：宝塔 → 网站 → SSL → Let's Encrypt → 强制 HTTPS。
- 备份只要导数据库：`mysqldump -u xiaokedz -p xiaokedz > xk-backup.sql`（静态文件本身在 Git 里）。

---

## 四、排错

| 现象 | 原因 / 处理 |
|---|---|
| `status` 返回 404 | `api/` 没和 `index.html` 放同一层；或 nginx 配了 `try_files` 把请求吃掉了 |
| 访问 php 变成下载文件 | 站点 PHP 版本还是「纯静态」，见第 2 步 |
| `configured: false` | `config.php` 的 `secret` 没换，或长度不足 16 位 |
| `db_error` | 数据库名 / 用户 / 密码不对；或没导入 `install.sql`；或 PHP 没装 `pdo_mysql` |
| 页面一直提示「连不上服务器」 | `sync-config.js` 的 `enabled` 没改成 `true`；或 `endpoint` 路径不对；F12 看 Network |
| 登录提示「学习码不对」 | 码输错；或换过 `secret` 导致所有旧码失效（需重新领取） |
| 「今天尝试次数太多」 | 触发了 IP 限错，次日自动恢复；也可 `DELETE FROM xk_attempt;` 立即清 |
| 新设备登录后进度没出现 | 点一次「立即同步」；确认两台设备用的是**同一个**学习码，且当前档案是那个「云端档案」 |
| 双击 `start.bat` / `file://` 打开时云同步不工作 | 浏览器禁止 `file://` 页面发 XHR，属预期行为。通过 `https://域名` 访问即可；本地内容照常可用 |
