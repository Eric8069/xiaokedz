# 部署脚本说明

三种部署方式，按你的习惯选一种。都是把 `index.html + assets/ + data/ + api/` 传到站点根目录，没有编译、没有依赖。

| 方式 | 适合 | 命令 |
|---|---|---|
| **一键 rsync**（推荐） | 有服务器 SSH，改完就想上线 | `./deploy/deploy.sh` |
| **打包上传** | 只有宝塔面板权限，或服务器在内网 | `./deploy/pack.sh` 然后面板上传解压 |
| **手动拖拽** | 只装一次，以后很少改 | 直接把文件拖进宝塔文件管理器 |

> `api/` 是可选的云同步后端。不用这个功能也完全可以部署，站点仍是纯静态。

---

## 一、一键部署 `deploy.sh`

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

## 二、打包上传 `pack.sh`

```bash
./deploy/pack.sh
# ✓ 已生成 dist/xiaokedz-20261112-1800.zip
```

然后：宝塔 → 文件 → 站点根目录 → 上传 → 右键解压。

压缩包里**故意不含 `api/config.php`**，重复上传解压不会覆盖线上数据库配置。
解压后在服务器上把 `api/config.example.php` 复制成 `api/config.php` 并填好数据库信息。

⚠️ 解压后确认 `index.html` 就在根目录；如果多套了一层 `xiaokedz/`，把里面的文件移到根目录再删空文件夹。

---

## 三、回滚 `rollback.sh`

```bash
# 看有哪些备份
./deploy/rollback.sh

# 回到某一次
./deploy/rollback.sh /tmp/xk-backup-20261112-180000.tgz
```

回滚会替换 `assets/ data/ index.html start.bat`，**不动 `api/`**，所以线上数据库配置和学习记录都不受影响。

---

## 四、云同步首次部署（可选，只做一次）

完整步骤见 `api/README.md`，这里列要点：

1. 宝塔 → 数据库 → 新建库 → phpMyAdmin 导入 `api/install.sql`（4 张表）
2. 宝塔 → 网站 → 设置 → **PHP 版本选 7.4+，不要留「纯静态」**（否则 `.php` 源码会被浏览器下载）
3. 服务器上：`cd api && cp config.example.php config.php`，填数据库信息和一段随机 `secret`，`chmod 600`
4. 把 `deploy/nginx-site.conf` 的第 6 段（三条 `return 404`）加进站点 `server { }`，挡住 `config.php` / `install.sql`
5. 本地把 `assets/js/sync-config.js` 的 `enabled` 改成 `true`，重新部署
6. 浏览器打开 `https://你的域名/api/index.php?act=status`，看到 `"configured":true` 即成功

前端开关不开时，站点**不会发出任何网络请求**，双击 `index.html`、离线、GitHub Pages 都照常可用。

---

## 五、部署之后要做的

- **HTTPS**：宝塔 → 网站 → SSL → Let's Encrypt，开启「强制 HTTPS」（用了云同步就必开）
- **gzip / 缓存 / 安全规则**：把 `deploy/nginx-site.conf` 里的内容追加到站点配置的 `server { }` 内
- **GitHub Pages**（可选）：仓库 Settings → Pages → `main` / `(root)`，访问 `https://用户名.github.io/xiaokedz/`。Pages 没有 PHP，会自动退回纯静态模式，不影响使用

## 六、排错

| 现象 | 原因 / 处理 |
|---|---|
| `Permission denied (publickey)` | 没配 SSH 公钥。先 `ssh-copy-id root@服务器IP`，或在宝塔「终端」里生成密钥 |
| `Connection timed out` | 安全组/防火墙没放行 22 端口，或 IP 写错 |
| 部署后 404 | `DIR` 指错了。用 `ssh root@IP "ls /www/wwwroot"` 确认真实目录名 |
| 页面样式丢失 | 压缩包解压多套了一层目录，`assets/` 不在根目录 |
| 改了内容但页面没变 | 浏览器缓存，强制刷新（Ctrl+F5）；或宝塔开了 CDN 缓存 |
| `/api/index.php` 返回 404 | `api/` 没和 `index.html` 同级；或 nginx 的 `try_files` 把请求吃掉了 |
| 访问 php 变成下载文件 | 站点 PHP 版本还是「纯静态」，见第四节第 2 步 |
| 页面提示「连不上服务器」 | `sync-config.js` 的 `enabled` 没改，或 `endpoint` 路径不对；F12 看 Network |
| 每次部署后又要重填数据库密码 | 说明本地 `api/config.php` 被上传覆盖了；脚本已排除，检查是不是手动整包覆盖 |
