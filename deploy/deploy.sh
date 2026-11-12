#!/usr/bin/env bash
# =============================================================================
#  小课桌 · 一键部署到宝塔 / Linux 服务器
#
#  用法：
#    1) 复制配置模板并填写：
#         cp deploy/deploy.conf.example deploy/deploy.conf
#         vi deploy/deploy.conf
#       然后执行：
#         ./deploy/deploy.sh
#
#    2) 或者临时用环境变量：
#         HOST=1.2.3.4 USER=root DIR=/www/wwwroot/xiaokedz ./deploy/deploy.sh
#
#    3) 只看会传哪些文件、不真传：
#         DRY=1 ./deploy/deploy.sh
#
#  依赖：ssh（必需）、rsync（可选，没有就自动用 tar 管道）
# =============================================================================
set -euo pipefail

cd "$(dirname "$0")/.."
ROOT="$(pwd)"

# ---------- 读取配置 ----------
CONF="deploy/deploy.conf"
if [ -f "$CONF" ]; then
  # shellcheck disable=SC1090
  . "$CONF"
fi

HOST="${HOST:-}"
USER="${USER:-root}"
PORT="${PORT:-22}"
DIR="${DIR:-/www/wwwroot/xiaokedz}"
OWNER="${OWNER:-www:www}"
RELOAD_NGINX="${RELOAD_NGINX:-1}"
KEEP_BACKUP="${KEEP_BACKUP:-5}"
DRY="${DRY:-0}"

if [ -z "$HOST" ]; then
  echo "✗ 没有配置服务器地址。"
  echo "  先执行： cp deploy/deploy.conf.example deploy/deploy.conf  然后填写 HOST。"
  exit 1
fi

SSH="ssh -p $PORT -o ConnectTimeout=12 $USER@$HOST"
STAMP="$(date +%Y%m%d-%H%M%S)"

echo "→ 目标：$USER@$HOST:$DIR（端口 $PORT）"
echo "→ 本地：$ROOT"

# ---------- 预检 ----------
if ! $SSH "test -d '$DIR'" 2>/dev/null; then
  echo "✗ 远程目录不存在：$DIR"
  echo "  先在宝塔里建好站点，或手动 mkdir -p $DIR"
  exit 1
fi

# ---------- 备份 ----------
echo "→ 备份线上版本…"
if $SSH "test -f '$DIR/index.html'" 2>/dev/null; then
  $SSH "cd '$DIR' && tar czf /tmp/xk-backup-$STAMP.tgz --exclude=.git . 2>/dev/null && ls -lh /tmp/xk-backup-$STAMP.tgz | awk '{print \"   已备份 \"\$5}'"
  # 只保留最近 N 份
  $SSH "ls -1t /tmp/xk-backup-*.tgz 2>/dev/null | tail -n +$((KEEP_BACKUP + 1)) | xargs -r rm -f"
else
  echo "   线上还没有文件，跳过备份。"
fi

# ---------- 同步 ----------
# api/config.php 只在服务器上维护：既不上传，也不被 rsync --delete 删掉
EXCLUDES=(--exclude=.git --exclude=node_modules --exclude=_test --exclude=deploy \
          --exclude=dist --exclude=api/config.php --exclude=.DS_Store --exclude=Thumbs.db)

if [ "$DRY" = "1" ]; then
  echo "→ DRY 模式，只列出差异："
  if command -v rsync >/dev/null 2>&1; then
    rsync -azn --delete --itemize-changes "${EXCLUDES[@]}" ./ "$USER@$HOST:$DIR/"
  else
    echo "   （没有 rsync，DRY 模式仅提示：会用 tar 覆盖 $DIR）"
    find . -type f -not -path './.git/*' -not -path './deploy/*' | sed 's/^/   /'
  fi
  exit 0
fi

echo "→ 上传…"
if command -v rsync >/dev/null 2>&1; then
  rsync -az --delete "${EXCLUDES[@]}" ./ "$USER@$HOST:$DIR/"
else
  # 没有 rsync 时的兜底：打包后通过 ssh 解压（会先清空目标目录里的旧文件）
  tar czf - "${EXCLUDES[@]}" index.html assets data api start.bat README.md LICENSE 2>/dev/null \
    | $SSH "rm -rf '$DIR/assets' '$DIR/data' '$DIR/index.html' '$DIR/start.bat' && tar xzf - -C '$DIR'"
fi

# ---------- 权限 ----------
echo "→ 修正权限…"
$SSH "chown -R $OWNER '$DIR' 2>/dev/null || true; find '$DIR' -type d -exec chmod 755 {} \; ; find '$DIR' -type f -exec chmod 644 {} \;; \
      if [ -f '$DIR/api/config.php' ]; then chown $OWNER '$DIR/api/config.php' 2>/dev/null || true; chmod 600 '$DIR/api/config.php'; fi"

# ---------- 重载 nginx ----------
if [ "$RELOAD_NGINX" = "1" ]; then
  echo "→ 检查并重载 nginx…"
  $SSH "nginx -t >/dev/null 2>&1 && (nginx -s reload 2>/dev/null || systemctl reload nginx 2>/dev/null || /etc/init.d/nginx reload 2>/dev/null) && echo '   nginx 已重载' || echo '   nginx 重载失败或未使用系统 nginx（宝塔请在面板里重载）'"
fi

echo ""
echo "✓ 完成：http://$HOST/  （如需域名/HTTPS 请在宝塔面板配置）"
echo "  回滚：ssh -p $PORT $USER@$HOST \"cd $DIR && rm -rf assets data index.html && tar xzf /tmp/xk-backup-$STAMP.tgz\""
