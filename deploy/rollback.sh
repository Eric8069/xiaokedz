#!/usr/bin/env bash
# =============================================================================
#  回滚到某次部署前的备份
#  用法：
#    ./deploy/rollback.sh                 # 列出服务器上的备份
#    ./deploy/rollback.sh /tmp/xk-backup-20261112-180000.tgz
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.."

CONF="deploy/deploy.conf"
[ -f "$CONF" ] && . "$CONF"

HOST="${HOST:?请先在 deploy/deploy.conf 里配置 HOST}"
USER="${USER:-root}"
PORT="${PORT:-22}"
DIR="${DIR:-/www/wwwroot/xiaokedz}"
OWNER="${OWNER:-www:www}"

SSH="ssh -p $PORT $USER@$HOST"

if [ $# -lt 1 ]; then
  echo "服务器上的备份："
  $SSH "ls -lh /tmp/xk-backup-*.tgz 2>/dev/null" || echo "  （没有找到备份）"
  echo ""
  echo "用法： ./deploy/rollback.sh /tmp/xk-backup-YYYYMMDD-HHMMSS.tgz"
  exit 0
fi

FILE="$1"
echo "→ 回滚 $DIR ← $FILE"
$SSH "test -f '$FILE' || { echo '备份文件不存在'; exit 1; }"
$SSH "cd '$DIR' && rm -rf assets data index.html start.bat && tar xzf '$FILE' -C '$DIR'"
$SSH "chown -R $OWNER '$DIR' 2>/dev/null || true; find '$DIR' -type d -exec chmod 755 {} \; ; find '$DIR' -type f -exec chmod 644 {} \;"
$SSH "nginx -s reload 2>/dev/null || systemctl reload nginx 2>/dev/null || true"
echo "✓ 已回滚"
