#!/usr/bin/env bash
# =============================================================================
#  打包成可上传的压缩包（给宝塔「文件 → 上传 → 解压」用）
#  用法： ./deploy/pack.sh
#  产物： dist/xiaokedz-YYYYMMDD-HHMM.zip（没有 zip 时生成 .tgz）
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.."

STAMP="$(date +%Y%m%d-%H%M)"
mkdir -p dist
BASE="dist/xiaokedz-$STAMP"
INCLUDE=(index.html assets data README.md LICENSE start.bat)

echo "→ 打包：$(pwd)"
if command -v zip >/dev/null 2>&1; then
  zip -qr "$BASE.zip" "${INCLUDE[@]}" -x '*.DS_Store' '*Thumbs.db'
  echo "✓ 已生成 $BASE.zip"
else
  tar czf "$BASE.tgz" --exclude='.DS_Store' "${INCLUDE[@]}"
  echo "✓ 已生成 $BASE.tgz（本机没有 zip，生成的包请在服务器上解压）"
fi

echo ""
echo "上传步骤："
echo "  1. 宝塔 → 文件 → 进入站点根目录（如 /www/wwwroot/你的域名）"
echo "  2. 上传 dist/ 里的压缩包 → 右键「解压」到当前目录"
echo "  3. 解压后确认 index.html 就在根目录，不要多套一层文件夹"
echo "  4. 权限：目录 755、文件 644，属主 www:www"
