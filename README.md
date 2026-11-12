# 小课桌 · 信阳小学 4-6 年级知识点

人教版小学数学、PEP 英语与统编语文知识点的**纯静态**互动教材站。每个知识点 = 一页图文讲解 + 一句「记住这一句」+ 一个可以动手做的实验（先预测 → 再操作 → 后解释）+ 3 道自测 + 复习卡片；另有 13 张可打印的**一页纸总结**（表格 ＋ 易错对比 ＋ 6 题带答案）。

- **多档案**：同一台设备上每个孩子一个档案，进度互不干扰，可导出/导入 JSON
- **可选云同步**：宝塔加一个 `api/`（PHP + MySQL），用 6 位学习码在手机 / 平板 / 电脑之间自动同步
- 无需安装、无需构建，双击 `index.html` 就能打开；**不开云同步时零网络请求**
- 整包上传到宝塔 LNMP 站点根目录即可上线
- 适配手机 / 平板 / 电脑，360px 起，微信内置浏览器可用
- 默认学习记录只存在浏览器 localStorage，不上传服务器

---

## 一、目录结构

```
xiaokedz/
├── index.html                 # 唯一入口（hash 路由，无刷新跳转）
├── assets/
│   ├── css/main.css           # 全部样式（含响应式、打印、减少动效）
│   ├── img/favicon.svg
│   └── js/
│       ├── core.js            # DOM/SVG 助手、中文读数、控件、图形注册表
│       ├── fig-math.js        # 15 个数学互动图
│       ├── fig-en.js          # 21 个英语 / 语法互动图
│       ├── fig-cn.js          # 7 个语文互动图
│       ├── app.js             # 路由、页面渲染、自测、进度存储、云同步 UI
│       ├── sync-config.js     # 云同步开关（默认 enabled: false）
│       └── sync.js            # 云同步传输层（原生 XHR，关闭时不发请求）
├── data/
│   ├── math.js                # 数学 15 个知识点（内容全在这里）
│   ├── english.js             # 英语句型 14 个
│   ├── english-grammar.js     # 英语语法 7 个（并入英语学科）
│   ├── chinese.js             # 语文 7 个
│   └── summaries.js           # 13 张一页纸总结（速查表）
├── api/                       # 可选：学习码云同步后端（PHP + MySQL）
│   ├── index.php              # status / register / login / pull / push / clear / logout
│   ├── install.sql            # 4 张表，phpMyAdmin 导入一次
│   ├── config.example.php     # 配置模板，服务器上复制成 config.php
│   └── README.md              # 宝塔部署与排错
├── deploy/
│   ├── deploy.sh              # 一键 rsync 部署（含备份、权限、重载）
│   ├── pack.sh                # 打包 zip，供宝塔上传
│   ├── rollback.sh            # 回滚到某次备份
│   ├── deploy.conf.example    # 部署配置模板
│   ├── nginx-site.conf        # 宝塔 nginx 可选优化片段
│   └── README.md              # 脚本用法与排错
└── README.md
```

一共 43 个知识点（数学 15、英语 21、语文 7）、39 个互动图类型、13 张一页纸总结。所有内容都是 `data/*.js` 里的普通对象，改文字不用碰代码。

页面路由（hash，不需要服务器 rewrite）：

| 地址 | 内容 |
|---|---|
| `#/` | 首页 |
| `#/math`、`#/english`、`#/chinese` | 分科知识点列表（可加年级：`#/math/4`） |
| `#/p/<id>` | 知识点详情 |
| `#/cheat` | 一页纸总结列表 |
| `#/cheat/<id>` | 某张总结（可打印） |
| `#/me` | 学习档案与记录（可新建/切换/导出/导入） |

---

## 二、本地预览

**方式 1（最简单）**：双击 `index.html`。所有脚本都是普通 `<script>`，没有 `fetch`、没有 ES Module，`file://` 直接可用。

**方式 2（更接近线上）**：

```bash
cd xiaokedz
python -m http.server 8080
# 打开 http://127.0.0.1:8080
```

---

## 三、宝塔 LNMP 部署

### 0. 有脚本，可以一条命令上线

```bash
cp deploy/deploy.conf.example deploy/deploy.conf   # 填 HOST / USER / DIR
DRY=1 ./deploy/deploy.sh                           # 先看差异，不真传
./deploy/deploy.sh                                 # 备份 → 同步 → 权限 → 重载
```

没有 SSH 权限就打包上传：`./deploy/pack.sh`，然后把 `dist/` 里的压缩包丢进宝塔解压。
详细说明与排错见 `deploy/README.md`。

### 1. 建站

宝塔面板 → 网站 → 添加站点：

| 项目 | 填法 |
|---|---|
| 域名 | 你的域名（如 `xx.example.com`） |
| 根目录 | 自动生成即可 |
| FTP | 不创建 |
| 数据库 | 只用纯静态就不创建；要云同步才建（见第六节） |
| PHP 版本 | 只用纯静态选「纯静态」；**要云同步必须选 PHP 7.4+**，否则 `.php` 源码会被浏览器下载 |

### 2. 上传

把 `xiaokedz/` **里面的内容**（不是 `xiaokedz` 文件夹本身）上传到站点根目录。

上传后根目录应该是：

```
/www/wwwroot/xx.example.com/
├── index.html
├── assets/
├── data/
├── api/          ← 可选，不开云同步可以不传
└── ...
```

> 用宝塔「文件」上传 zip 后在线解压最快。解压后确认 `index.html` 就在根目录，不要多套一层目录。
> 要开云同步，还得按第六节导入 `api/install.sql`、创建 `api/config.php`，并把 `deploy/nginx-site.conf` 第 6 段加进站点配置。

### 3. 权限

```bash
chown -R www:www /www/wwwroot/xx.example.com
find /www/wwwroot/xx.example.com -type d -exec chmod 755 {} \;
find /www/wwwroot/xx.example.com -type f -exec chmod 644 {} \;
```

### 4. HTTPS

宝塔 → 网站 → SSL → Let's Encrypt 申请，开启「强制 HTTPS」。

### 5. 可选：开启 gzip 与缓存

把 `deploy/nginx-site.conf` 里的 `location` 段追加到站点配置（宝塔 → 网站 → 设置 → 配置文件）的 `server { }` 内部，然后重载 nginx。全站压缩后约 100KB 左右，首屏很快。**开启云同步时，第 6 段的三条 `return 404` 是必加项**，用来挡住 `api/config.php` 和 `api/install.sql`。

### 6. 迁移

纯静态部分整个目录打包带走，换服务器解压即可，**没有环境依赖**。域名变了也不用改配置（站点内全部是相对路径 + hash 路由）。开了云同步的话，还要一并迁移 MySQL 数据（`mysqldump`）和服务器上的 `api/config.php`；`config.php` 不在压缩包里，需要单独复制。

---

## 四、如何新增 / 修改知识点

### 加一个知识点

在 `data/math.js`（或 english / chinese）数组里追加一个对象：

```js
{
  id: 'm6-16',                 // 唯一，建议 科目+年级+序号
  subject: 'math',             // math | english | chinese
  grade: 6, term: '上',        // 4 / 5 / 6；term 可省略
  unit: '第七单元',
  title: '扇形统计图',
  tags: ['统计图', '扇形'],
  goal: '一句话说清学完能做到什么。',
  sections: [
    { h: '标题', p: '段落，可写 <b>加粗</b> 和 <span class="hl">高亮</span>。' },
    { h: '清单', ol: ['第一步', '第二步'] },          // 有序列表
    { h: '表格', table: { head: ['列1','列2'], rows: [['a','b']] } },
    { h: '提醒', note: { type: 'warn', text: '易错点。' } },  // tip / warn
  ],
  figure: {
    type: 'percent',           // 复用已有图形，见下表
    title: '实验标题',
    lead: '一句话说明先做什么。',
    predict: {
      q: '动手前的问题？',
      options: ['选项A', '选项B', '选项C'],
      answer: 1,               // 正确项下标，从 0 开始
      why: '解释为什么。'
    },
    insight: '实验后要得出的结论。',
    frame: '填空式的一句话总结。',
    hint: '可选：读数区下方的小提示。'
  },
  example: { q: '例题', steps: ['步骤1', '步骤2'], a: '答案' },
  quiz: [
    { q: '题目', options: ['A','B','C'], answer: 0, why: '解析' }
  ],
  cards: [ { f: '正面问题', b: '背面答案' } ]
}
```

不需要改任何 JS，刷新即生效。

### 可复用的图形类型（`figure.type`）

| 数学（15） | | 英语（21） | |
|---|---|---|---|
| `placevalue` | 数位分级读数 | `clock` | 钟面时间 |
| `angle` | 量角器 | `preposition` | 方位介词 |
| `parallel` | 平行线距离 | `shop` | 购物问价 |
| `areamodel` | 乘法分配律面积模型 | `therebe` | There be 句型 |
| `decimal` | 十分位 / 百分位 | `comparative` | 比较级 |
| `triangleAngle` | 三角形内角和 | `tense` | 四种时态时间轴 |
| `average` | 平均数 | `wordform` | 名词复数 / 动词三单 |
| `parallelogram` | 割补法 | `pronoun` | 人称代词表 |
| `pointmove` | 小数点搬家 | `sentence` | 否定句 / 疑问句转换 |
| `balance` | 天平与等式性质 | `whword` | 特殊疑问词 |
| `volume` | 长方体体积 | `wordorder` | 语序成句 |
| `fraction` | 分数与通分 | `weather` | 天气 |
| `multiples` | 因数倍数筛 | `frequency` | 频度副词 |
| `circle` | 圆滚动量周长 | `date` | 日期序数词 |
| `percent` | 折扣 | `directions` | 问路走迷宫 |
| | | `job` | 职业问答 |
| | | `modal` | 情态动词语气 |

| 语文（7） | |
|---|---|
| `rhetoric` | 修辞诊断（比喻 / 拟人） |
| `punct` | 换标点看语气变化 |
| `sickfix` | 病句门诊（选病因） |
| `connect` | 关联词连句 |
| `explain` | 说明方法识别 |
| `poem` | 古诗意象解码 |
| `summary` | 段落压缩（概括） |

带初始状态的图形，可以加 `state`，例如：

```js
figure: { type: 'tense', state: { tense: 'past' }, ... }
figure: { type: 'wordform', state: { mode: 'third' }, ... }
figure: { type: 'sentence', state: { kind: 'be' }, ... }
```

`tense` 可选 `present` / `continuous` / `past` / `future`；`wordform` 可选 `plural` / `third`；`sentence` 可选 `kind: be|do|third`。

### 加一种新图形

在 `assets/js/fig-math.js` 或 `fig-en.js` 里注册：

```js
XK.figure('myfigure', function (ctx) {
  // ctx.stage    放 SVG / DOM
  // ctx.controls 放滑块和按钮
  // ctx.readout  右侧读数
  // ctx.set([{ k: '标签', v: '值', big: true }])
  // ctx.tone / ctx.soft  当前科目的主色与浅色
  return function () { /* 卸载时清理动画、定时器 */ };
});
```

---

## 五、一页纸总结（速查表）

面向"考前 10 分钟"和"打印带到学校"：口诀开头、表格中间、易错对比压轴、最后 6 题自查。

现成的 13 张：

| id | 标题 | 科目 |
|---|---|---|
| `prep` | 小学英语介词全表 | 英语 |
| `tense` | 四种时态一张表 | 英语 |
| `sentence` | 句型转换一张表 | 英语 |
| `noun` | 名词、代词与冠词 | 英语 |
| `cn-rhetoric` | 修辞·病句·标点 | 语文 |
| `cn-read` | 概括·说明方法·古诗意象 | 语文 |
| `math-formula` | 数学公式与单位速查 | 数学 |
| `math-trap` | 数学 15 个高频易错点 | 数学 |
| `wh` | 特殊疑问词速查 | 英语 |
| `phrase` | 小学高频短语 60 条 | 英语 |
| `math-number` | 数与代数总表 | 数学 |
| `math-geometry` | 图形与几何总表 | 数学 |
| `stat` | 统计与可能性 | 数学 |

### 新增一张总结

在 `data/summaries.js` 里追加：

```js
{
  id: 'wh', subject: 'english',
  title: '特殊疑问词一张表',
  sub: '问什么用什么，一句话定疑问词',
  tags: ['疑问词', 'what', 'where'],
  mnemonic: '划线部分答什么，疑问词就选什么。<br>地点 Where，时间 When，人物 Who。',
  blocks: [
    { h: '一、常见疑问词',
      lead: '可选的引导句。',
      table: { head: ['疑问词', '问什么', '例子'], rows: [['Where', '地点', 'Where is my bag?']] } },
    { h: '二、易错对比',
      vs: [ { left: 'What is he?', right: 'Who is he?', tip: '问职业用 What，问身份用 Who。' } ] },
    { h: '三、固定说法', chips: ['What time', 'What colour', 'How many'] }
  ],
  drill: [ { q: '对 on the desk 提问：______ is the book?', a: 'Where', why: '问地点用 Where。' } ]
}
```

字段说明：

- `blocks[].table`：表头 + 行，第一列自动加粗并禁止换行
- `blocks[].vs`：左右对比卡，自动配 VS 标记
- `blocks[].chips`：一排等宽代码风格的小标签，适合固定搭配
- `blocks[].list`：有序清单
- `blocks[].note`：`{ type: 'tip' | 'warn', text }`
- `drill[].q`：用 6 个下划线 `______` 表示填空位，页面会自动生成输入框（没有下划线则给一条书写横线）
- `drill[].a` / `drill[].why`：点"显示答案"后才出现，打印时默认隐藏

打印：页面右上角「打印 / 存为 PDF」，样式已按 A4 优化（隐藏导航、避免表格跨页断开、14mm 页边距）。想让答案一起打印，先点「显示答案」再打印。

## 六、多人使用与学习进度

### 已经做好的：本机多档案（默认，零配置）

- 第一次打开自动建一个「我的档案」；右上角头像按钮 →「新建」可加档案（最多 8 个）
- 每个档案独立存 `done` 记录，切换档案不会互相覆盖
- 「我的学习」页可以看到所有档案的完成数、平均分，并一键切换
- 把旧版单档案数据自动迁移进默认档案，不会丢
- 存储结构（`localStorage` 的 `xiaokedz.v2`）：

```json
{
  "v": 2,
  "current": "p_lxxx1",
  "profiles": [{ "id": "p_lxxx1", "name": "小明", "at": 1730000000000 }],
  "progress": {
    "p_lxxx1": { "done": { "m4-01": { "score": 3, "total": 3, "at": 1730000000000 } } }
  },
  "cloud": null
}
```

`cloud` 为 `null` 表示没登录云端；旧数据加载时会自动补这个字段，不会丢记录。

### 三种绑定方式，按需要选

| 方式 | 进度绑在哪 | 换设备 | 要后端吗 | 适合 |
|---|---|---|---|---|
| **本机多档案**（默认） | 这台设备的浏览器 | 手动导出/导入 JSON | 不要 | 一台平板、家里一两个孩子 |
| **导出 / 导入 JSON** | 一个文件 | 拷贝文件 | 不要 | 偶尔换设备、不想折腾服务器 |
| **学习码云同步** | 服务端账号 | 自动，输 6 位码 | 要 `api/`（PHP + MySQL） | 手机 + 平板 + 电脑轮流用、一个班几十人 |

> **为什么不用微信 / 系统账号登录？** 浏览器沙箱拿不到 iOS / Android / 鸿蒙的系统账号；
> 微信开放平台「网站应用」要企业营业执照 + 已备案域名 + 认证费，公众号网页授权只在微信内置浏览器有效，
> 两者都必须有服务端保存 AppSecret。更关键的是，孩子的平板登的往往是**家长的微信 / Apple ID**，
> 绑上去反而会把两个孩子的进度混在一起。6 位学习码零资质、零费用；
> 身份层已预留 `provider + external_id`，以后想接微信或 Passkey 只需加一个登录入口，不用改进度表。

### 学习码云同步：五步开启

完整步骤与排错见 `api/README.md`，这里是最短路径：

1. 宝塔 → 数据库 → 新建库 → phpMyAdmin 导入 `api/install.sql`（建 4 张表）
2. 宝塔 → 网站 → 设置 → **PHP 版本选 7.4+**（留「纯静态」会让 `.php` 源码被浏览器下载）
3. 服务器上创建配置：

```bash
cd /www/wwwroot/你的域名/api
cp config.example.php config.php
php -r "echo bin2hex(random_bytes(32)), PHP_EOL;"   # 生成 secret，复制输出
vi config.php                                       # 填 db_name / db_user / db_pass / secret
chown www:www config.php && chmod 600 config.php
```

4. 把 `deploy/nginx-site.conf` 第 6 段的三条 `return 404` 加进站点 `server { }`，挡住 `config.php` 和 `install.sql`
5. 把 `assets/js/sync-config.js` 的 `enabled` 改成 `true`，重新部署；浏览器打开
   `https://你的域名/api/index.php?act=status`，看到 `"configured":true` 即成功

然后在站点「我的学习」页 →「云同步」→ 填小名点「领取学习码」，把 6 位数字抄下来；
在另一台设备打开同一网址，输入这串数字点「登录并同步」，进度就回来了。

#### 数据表与接口

| 表 | 作用 |
|---|---|
| `xk_user` | 昵称 + `provider` / `external_id`（学习码的 HMAC，或未来的 openid / credential_id） |
| `xk_progress` | 一行一个知识点：`score` / `total` / `done_at`（毫秒时间戳，用于冲突合并） |
| `xk_token` | 只存 token 的 SHA-256 与过期时间 |
| `xk_attempt` | 按 IP 统计每天输错次数，防暴力猜 6 位码 |

接口 7 个动作：`status` / `register` / `login` / `pull` / `push` / `clear` / `logout`，全部走 `api/index.php?act=`，登录态放请求头 `X-XK-Token`。

```sql
-- 想看某个孩子做了哪些题
SELECT point_id, score, total, FROM_UNIXTIME(done_at/1000) AS 完成时间
FROM xk_progress WHERE user_id = 1 ORDER BY done_at DESC;
```

#### 使用与合并规则

- 登录后会自动新建（或复用）一个**独立的「云端档案」**，本机原有档案一律不动
- 做完自测 0.9 秒后自动上报；断网时静默失败，进度仍存本机，联网后补传
- 每条记录带客户端时间戳，服务端只在新时间戳更大时覆盖；两台设备做完不同知识点，联网后合并成并集
- 切回本机其它档案时云同步自动暂停，状态栏会提示切回哪个档案
- 登录过期只更新状态栏提示重新输学习码，不会反复弹窗打断做题

#### 安全与未成年人信息

- **学习码等于密码**：谁拿到都能看到并改写这份进度，请家长抄在本子上，不要发群里
- 数据库不存学习码明文、不存 token 明文；`api/config.php` 已进 `.gitignore`，部署脚本也不会覆盖或删除线上的它
- **只存昵称和做题记录**，不存真实姓名、手机号、生日。给未成年人使用请按最小必要原则，账号由家长代为领取
- 开了云同步务必上 HTTPS（宝塔 SSL → Let's Encrypt → 强制 HTTPS）

> 不开云同步时 `assets/js/sync.js` 不会创建任何 XHR 对象，站点依旧是零网络请求的纯静态站：
> `file://` 双击、离线、GitHub Pages 全部照常可用。

## 七、部署到 GitHub Pages（可选）

仓库根目录就是站点根目录，所以 Pages 可以零配置：

1. 新建空仓库，建议名 **`xiaokedz`**（小课桌的拼音，短、好记、几乎不会重名）
2. 推送后进 Settings → Pages → Source 选 `Deploy from a branch` → `main` / `/ (root)`
3. 一两分钟后访问 `https://<你的用户名>.github.io/xiaokedz/`

站点全部用相对路径 + hash 路由，放在子路径下也能正常工作。

## 八、改动时注意

1. **不要引入外部 CDN**（字体、图表库、图标）。站点设计为完全离线可用，宝塔服务器无外网也能跑。
2. **不要把内容改成 ES Module，也不要用 `fetch` 读本地 JSON**，否则 `file://` 打开会失败。云同步是唯一的网络调用（原生 XHR、默认关闭），别把它变成页面初始化的必需请求。
3. 互动图的数值都是教学简化模型，改参数时保持"一个原因 → 一个结果"的因果关系，不要把图做成纯动画。
4. 自测答案 `answer` 从 **0** 开始计数。
5. 修改后至少手动点一遍：预测 → 拖滑块 → 自测，确认读数与结论一致。

---

## 九、内容范围与声明

- 数学：人教版，覆盖四年级上册至六年级上册的高频易错点，按单元顺序。
- 英语：人教版 PEP（三年级起点），四至六年级核心句型。
- 英语语法：按 PEP 教材出现顺序归纳，是跨单元专题，不与某一课一一对应，归在英语学科下。
- 语文：按统编版 4-6 年级读写要求整理，覆盖修辞、标点、病句、关联词、说明方法、古诗与概括。
- 河南信阳各区县、各校进度可能不同，**以学校课本和老师要求为准**。

互动图中的数值为便于理解而取整，属教学简化模型，不是精确测量，也不构成工程或临床仿真。题目为巩固概念设计，不替代学校作业与考试训练。学习效果未经教学实验验证。

教学图设计方法参考 **Teachable Figures** by ywEdAi
（https://github.com/ywEdAi/teachable-figures），代码 MIT，书面内容 CC BY 4.0。
本站文字、题目与实现为独立创作。
