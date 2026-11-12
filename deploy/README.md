# 部署脚本说明

三种部署方式，按你的习惯选一种。都是把 `index.html + assets/ + data/` 传到站点根目录，没有编译、没有依赖。

| 方式 | 适合 | 命令 |
|---|---|---|
| **一键 rsync**（推荐） | 有服务器 SSH，改完就想上线 | `./deploy/deploy.sh` |
| **打包上传** | 只有宝塔面板权限，或服务器在内网 | `./deploy/pack.sh` 然后面板上传解压 |
| **手动拖拽** | 只装一次，以后很少改 | 直接把文件拖进宝塔文件管理器 |

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
4. **权限**：`chown www:www`，目录 755、文件 644
5. **重载**：`nginx -t` 通过后重载 nginx
6. 打印回滚命令

排除项：`.git`、`node_modules`、`_test`、`deploy`、系统垃圾文件。

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

⚠️ 解压后确认 `index.html` 就在根目录；如果多套了一层 `xiaokedz/`，把里面的文件移到根目录再删空文件夹。

---

## 三、回滚 `rollback.sh`

```bash
# 看有哪些备份
./deploy/rollback.sh

# 回到某一次
./deploy/rollback.sh /tmp/xk-backup-20261112-180000.tgz
```

回滚会替换 `assets/ data/ index.html start.bat`，其他文件不动。

---

## 四、上一次部署之后要做的

- **HTTPS**：宝塔 → 网站 → SSL → Let's Encrypt，开启「强制 HTTPS」
- **gzip / 缓存**：把 `deploy/nginx-site.conf` 里的内容追加到站点配置的 `server { }` 内
- **GitHub Pages**（可选）：仓库 Settings → Pages → `main` / `(root)`，访问 `https://用户名.github.io/xiaokedz/`

## 五、排错

| 现象 | 原因 / 处理 |
|---|---|
| `Permission denied (publickey)` | 没配 SSH 公钥。先 `ssh-copy-id root@服务器IP`，或在宝塔「终端」里生成密钥 |
| `Connection timed out` | 安全组/防火墙没放行 22 端口，或 IP 写错 |
| 部署后 404 | `DIR` 指错了。用 `ssh root@IP "ls /www/wwwroot"` 确认真实目录名 |
| 页面样式丢失 | 压缩包解压多套了一层目录，`assets/` 不在根目录 |
| 改了内容但页面没变 | 浏览器缓存，强制刷新（Ctrl+F5）；或宝塔开了 CDN 缓存 |
