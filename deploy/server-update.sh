#!/usr/bin/env bash
# =============================================================================
#  小课桌 · 服务器上一键更新（配合「git clone 到站点根目录」的部署方式）
#
#  用法：在站点根目录执行
#          cd /www/wwwroot/你的域名 && bash deploy/server-update.sh
#    或： bash deploy/server-update.sh /www/wwwroot/你的域名
#
#  工作流：本地改代码 → git push → 服务器上跑这个脚本。
#  注意：api/config.php 已被 .gitignore 排除，更新不会覆盖线上数据库密码；
#        但被 git 跟踪的文件（例如 assets/js/sync-config.js）不要在服务器上直接改，
#        否则脚本会检测到本地改动并停止，避免 pull 冲突。
# =============================================================================
set -euo pipefail

SITE="${1:-$(pwd)}"
cd "$SITE" || { echo "✗ 目录不存在：$SITE"; exit 1; }

if [ ! -d .git ]; then
  echo "✗ $SITE 不是 git 仓库，这个脚本只给「clone 部署」用。"
  echo "  用 deploy.sh / pack.sh 部署的，请继续用那两种方式更新。"
  exit 1
fi

echo "→ 站点：$SITE"
echo "→ 当前版本：$(git rev-parse --short HEAD) $(git log -1 --format=%s)"

if [ -n "$(git status --porcelain)" ]; then
  echo ""
  echo "✗ 检测到本地改动，为避免覆盖已停止更新："
  git status --short
  echo ""
  echo "  处理方式（二选一）："
  echo "    git stash && bash deploy/server-update.sh && git stash pop  # 暂存后恢复（可能与新版本冲突）"
  echo "    git checkout -- <文件>                                      # 放弃该文件本地改动"
  echo ""
  echo "  推荐：服务器保持干净，改本地仓库 → git push → 再跑本脚本。"
  exit 1
fi

echo "→ 拉取 origin/main …"
if ! git pull --ff-only origin main; then
  echo "✗ 拉取失败。若提示 diverged / non-fast-forward，说明本地与远端历史分叉："
  echo "    git fetch origin && git reset --hard origin/main  # ⚠ 会丢弃服务器上所有本地改动"
  exit 1
fi

echo "→ 修正权限 …"
chown -R www:www "$SITE" 2>/dev/null || true
find "$SITE" -type d -exec chmod 755 {} \;
find "$SITE" -type f -exec chmod 644 {} \;
if [ -f "$SITE/api/config.php" ]; then
  chown www:www "$SITE/api/config.php" 2>/dev/null || true
  chmod 600 "$SITE/api/config.php"
fi
chmod +x "$SITE/deploy/server-update.sh" 2>/dev/null || true

echo ""
echo "✓ 已更新到 $(git rev-parse --short HEAD) $(git log -1 --format=%s)"
echo "  浏览器强制刷新 Ctrl+F5 看新内容（CSS/JS 有 7 天缓存）"
