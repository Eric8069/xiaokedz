# 部署脚本说明

四种部署方式，按你的习惯选一种。都是把 `index.html + assets/ + data/ + api/` 传到站点根目录，没有编译、没有依赖。

| 方式 | 适合 | 命令 |
|---|---|---|
| **服务器上 git clone** | 首次部署、想在服务器上直接拉 GitHub，以后一行 `git pull` 更新 | 见第一节 |
| **一键 rsync**（改代码最省事） | 有服务器 SSH，改完就想上线 | `./deploy/deploy.sh` |
| **打包上传** | 只有宝塔面板权限、服务器连不上 GitHub、或服务器在内网 | `./deploy/pack.sh` 然后面板上传解压 |
| **手动拖拽** | 只装一次，以后很少改 | 直接把文件拖进宝塔文件管理器 |

> `api/` 是可选的云同步后端。不用这个功能也完全可以部署，站点仍是纯静态。

---

## 一、服务器上直接 git clone（宝塔终端）

适合：宝塔面板能开「终端」（或用 SSH 连服务器），且服务器能访问 `github.com`。

### 1. 打开终端，确认 git 已装

宝塔面板左侧 →「终端」，粘贴：

```bash
git --version || (yum install -y git || apt-get install -y git)
```

### 2. 先测一下能不能连上 GitHub

```bash
git ls-remote https://github.com/Eric8069/xiaokedz.git HEAD
```

能打印一串 commit id 再往下走。**国内服务器连 GitHub 超时 / 443 报错很常见**，遇到就别折腾代理了，直接跳到「三、打包上传」，效果完全一样。
（仓库是 public，匿名克隆即可，不需要账号密码；本机已验证 `HEAD = 799ed5e`。）

### 3. 克隆到站点根目录

> ⚠️ 宝塔建站时会自动放 `index.html`、`404.html`、`.user.ini`，**目录不是空的**。
> 直接 `git clone ... .` 会报 `fatal: destination path '.' already exists and is not an empty directory`。
> 所以先 clone 到临时子目录，再把内容（含 `.gitignore` 等隐藏文件）搬上来，宝塔的 `.user.ini` 会保留。

```bash
SITE=/www/wwwroot/你的域名          # ← 改成宝塔「网站 → 设置 → 根目录」里的实际路径
cd "$SITE" || exit 1
git clone --depth=1 https://github.com/Eric8069/xiaokedz.git .src
shopt -s dotglob
mv .src/* .
rmdir .src
chown -R www:www "$SITE"
find "$SITE" -type d -exec chmod 755 {} \;
find "$SITE" -type f -exec chmod 644 {} \;
ls -la "$SITE" | head -20
```

看到 `index.html`、`assets/`、`data/`、`api/` 都在 `$SITE` 这一层就对了；**不要多套一层 `xiaokedz/`**，否则页面会样式全丢。
`--depth=1` 只拉最新版本，不带历史，几十 KB 很快。

### 4. 以后更新（这就是 clone 方式的价值）

**标准工作流：本地改代码 → `git push` → 服务器上跑一行更新脚本。**

```bash
cd /www/wwwroot/你的域名 && bash deploy/server-update.sh
```

脚本会自动：检查有没有本地改动 → `git pull --ff-only origin main` → 修正属主/权限 → 打印版本号。
它只做 fast-forward，不 merge、不 reset，不会悄悄覆盖任何东西。

想手动更也可以：

```bash
cd /www/wwwroot/你的域名
git pull --ff-only origin main
chown -R www:www .
```

⚠️ **两条约定**（不然更新会卡住）：

- `api/config.php` 已被 `.gitignore` 排除，**服务器上的数据库密码不会被 pull 覆盖**，放心。
- 但 `assets/js/sync-config.js` 这类**被跟踪的文件不要在服务器上直接改**。要开云同步，请在本地仓库把 `enabled` 改成 `true` 再 `push`，服务器只负责拉。否则脚本会检测到本地改动并停止，提示你 `git stash` 或 `git checkout --`。

### 5. 不想用 git 了 / 想换成脚本部署

```bash
cd /www/wwwroot/你的域名 && rm -rf .git deploy dist
```

删掉后改用打包上传或 `deploy.sh` 都行，站点文件不受影响。

> ⚠️ clone 会把 `.git/`、`deploy/` 一起放进网站根目录。务必按第六节加上 `nginx-site.conf` 的**第 7 段**，挡住这些目录，否则 `/deploy/deploy.conf.example`、`.git/config` 会被外网直接读到。

---

## 二、一键部署 `deploy.sh`

### 1. 准备配置

```bash
cp deploy/deploy.conf.example deploy/deploy.conf
```

编辑 `deploy/deploy.conf`，最少填三项：

```ini
HOST=你的服务器IP
USER=root
DIR=/www/wwwroot/你的域名
```

> `deploy.conf` 里有服务器地址，已在 `.gitignore` 里排除，不会被提交到 GitHub。

### 2. 先空跑一次看看差异

```bash
DRY=1 ./deploy/deploy.sh
```

只列出会新增/修改/删除哪些文件，不会真的传。

### 3. 正式部署

```bash
./deploy/deploy.sh
```

脚本会依次做：

1. **预检**：远程目录是否存在（不存在直接退出，不会建错地方）
2. **备份**：把线上现有文件打包成 `/tmp/xk-backup-时间戳.tgz`，只保留最近 5 份
3. **同步**：优先 `rsync -az --delete`，没有 rsync 就自动改用 `tar | ssh` 管道
4. **权限**：`chown www:www`，目录 755、文件 644；`api/config.php` 单独设 600
5. **重载**：`nginx -t` 通过后重载 nginx
6. 打印回滚命令

排除项：`.git`、`node_modules`、`_test`、`deploy`、`dist`、系统垃圾文件，以及 **`api/config.php`**。

> 最后一条很重要：`rsync --delete` 会把服务器上「本地没有的文件」删掉。数据库密码只存在服务器上的
> `api/config.php`，所以脚本特意排除它——**重复部署不会覆盖、也不会删掉线上配置**。

### 常用变体

```bash
# 传完不重载 nginx
RELOAD_NGINX=0 ./deploy/deploy.sh

# 临时指定另一台机器，不写配置文件
HOST=10.0.0.8 USER=www DIR=/www/wwwroot/test ./deploy/deploy.sh
```

### Windows 上怎么跑

脚本是 bash 脚本，在 **Git Bash** 里执行（装 Git 时自带）：

```bash
cd /c/Users/你的用户名/WorkBuddy/.../xiaokedz
./deploy/deploy.sh
```

Git Bash 一般没有 `rsync`，脚本会自动走 `tar | ssh` 兜底，效果一样。首次连接会问 `yes/no`，输一次 `yes` 即可。

---

## 三、打包上传 `pack.sh`

```bash
./deploy/pack.sh
# ✓ 已生成 dist/xiaokedz-20261112-1800.zip（或 .tgz）
```

然后：宝塔 → 文件 → 站点根目录 → 上传 → 右键解压。
`.tgz` 也可以在宝塔终端里解：

```bash
cd /www/wwwroot/你的域名
tar xzf xiaokedz-20261112-1800.tgz
chown -R www:www .
```

压缩包里**故意不含 `api/config.php`**，重复上传解压不会覆盖线上数据库配置。
解压后在服务器上把 `api/config.example.php` 复制成 `api/config.php` 并填好数据库信息。

⚠️ 解压后确认 `index.html` 就在根目录；如果多套了一层 `xiaokedz/`，把里面的文件移到根目录再删空文件夹。

---

## 四、回滚 `rollback.sh`

```bash
# 看有哪些备份
./deploy/rollback.sh

# 回到某一次
./deploy/rollback.sh /tmp/xk-backup-20261112-180000.tgz
```

回滚会替换 `assets/ data/ index.html start.bat`，**不动 `api/`**，所以线上数据库配置和学习记录都不受影响。

---

## 五、云同步首次部署（可选，只做一次）

完整步骤见 `api/README.md`，这里列要点：

1. 宝塔 → 数据库 → 新建库 → phpMyAdmin 导入 `api/install.sql`（4 张表）
2. 宝塔 → 网站 → 设置 → **PHP 版本选 7.4+，不要留「纯静态」**（否则 `.php` 源码会被浏览器下载）
3. 服务器上：`cd api && cp config.example.php config.php`，填数据库信息和一段随机 `secret`，`chmod 600`
4. 把 `deploy/nginx-site.conf` 的第 6 段（三条 `return 404`）加进站点 `server { }`，挡住 `config.php` / `install.sql`。也可以放进宝塔「伪静态」框（会被 include 进 `server { }`），但**只放那三条行**，别整段粘、更别写成 `location ^~ /api/ { return 404; }` 把整个 API 挡掉；存完 `nginx -t` 验一下
5. 本地把 `assets/js/sync-config.js` 的 `enabled` 改成 `true`，push 后在服务器跑 `bash deploy/server-update.sh`（别在服务器上直接改，会被更新脚本拦下）
6. 浏览器打开 `https://你的域名/api/index.php?act=status`，看到 `"configured":true` **只表示配置文件读到了**：这个接口不连数据库、也不读前端 JS。还要在「我的学习」点一次「领取学习码」验数据库，F12 看 Network 验前端开关。完整分层自检见 `api/README.md` 第五节

前端开关不开时，站点**不会发出任何网络请求**，双击 `index.html`、离线、GitHub Pages 都照常可用。

---

## 六、部署之后要做的

- **站点根目录**：宝塔 → 网站 → 设置 → 根目录，必须指到含 `index.html` 的那一层
- **HTTPS**：宝塔 → 网站 → SSL → Let's Encrypt，开启「强制 HTTPS」（用了云同步就必开）
- **gzip / 缓存 / 安全规则**：把 `deploy/nginx-site.conf` 里的内容追加到站点配置的 `server { }` 内；**用 git clone 部署的话第 7 段必加**
- **GitHub Pages**（可选）：仓库 Settings → Pages → `main` / `(root)`，访问 `https://用户名.github.io/xiaokedz/`。Pages 没有 PHP，会自动退回纯静态模式，不影响使用

## 七、排错

| 现象 | 原因 / 处理 |
|---|---|
| `fatal: destination path '.' already exists` | 宝塔默认文件没清空。按第一节「clone 到 `.src` 再 mv」做，别直接删 `.user.ini` |
| `detected dubious ownership in repository` | git 2.35.2+ 的安全校验：目录属主 `www:www`、终端是 `root`。执行 `git config --global --add safe.directory /www/wwwroot/你的域名` 即可，**不要 reset --hard**。`server-update.sh` 已内置自动修复 |
| `git: command not found` | `yum install -y git` |
| `Failed to connect to github.com port 443` | 国内服务器常见。改用第三节打包上传，或给服务器配代理 |
| `Permission denied (publickey)` | 没配 SSH 公钥。先 `ssh-copy-id root@服务器IP`，或在宝塔「终端」里生成密钥 |
| `Connection timed out` | 安全组/防火墙没放行 22 端口，或 IP 写错 |
| 部署后 404 | `DIR` / `SITE` 指错了。用 `ssh root@IP "ls /www/wwwroot"` 确认真实目录名 |
| 页面样式丢失 | 解压多套了一层目录，`assets/` 不在根目录 |
| 改了内容但页面没变 | 浏览器缓存，强制刷新（Ctrl+F5）；或宝塔开了 CDN 缓存 |
| `/api/index.php` 返回 404 | `api/` 没和 `index.html` 同级；或 nginx 的 `try_files` 把请求吃掉了 |
| 访问 php 变成下载文件 | 站点 PHP 版本还是「纯静态」，见第五节第 2 步 |
| 页面提示「连不上服务器」 | `sync-config.js` 的 `enabled` 没改，或 `endpoint` 路径不对；F12 看 Network |
| 每次部署后又要重填数据库密码 | 说明本地 `api/config.php` 被上传覆盖了；脚本已排除，检查是不是手动整包覆盖 |
