# 小课桌 · 信阳小学 4-6 年级知识点

人教版小学数学、PEP 英语与语法知识点的**纯静态**互动教材站。每个知识点 = 一页图文讲解 + 一个可以动手做的实验（先预测 → 再操作 → 后解释）+ 3 道自测 + 复习卡片；另有 6 张可打印的**一页纸总结**（表格 ＋ 易错对比 ＋ 6 题带答案）。
支持**多档案**：同一台设备上每个孩子一个档案，进度互不干扰，可导出/导入 JSON。

- 无需安装、无需构建、无需数据库，双击 `index.html` 就能打开
- 整包上传到宝塔 LNMP 站点根目录即可上线
- 适配手机 / 平板 / 电脑，360px 起，微信内置浏览器可用
- 学习记录存在浏览器 localStorage，不上传服务器

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
│       ├── fig-en.js          # 11 个英语 / 语法互动图
│       └── app.js             # 路由、页面渲染、自测、进度存储
├── data/
│   ├── math.js                # 数学 15 个知识点（内容全在这里）
│   ├── english.js             # 英语 8 个
│   ├── grammar.js             # 语法 7 个
│   └── summaries.js           # 6 张一页纸总结（速查表）
├── deploy/
│   └── nginx-site.conf        # 宝塔 nginx 可选优化片段
└── README.md
```

一共 30 个知识点、26 个互动图类型、6 张一页纸总结。所有内容都是 `data/*.js` 里的普通对象，改文字不用碰代码。

页面路由（hash，不需要服务器 rewrite）：

| 地址 | 内容 |
|---|---|
| `#/` | 首页 |
| `#/math`、`#/english`、`#/grammar` | 分科知识点列表（可加年级：`#/math/4`） |
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

### 1. 建站

宝塔面板 → 网站 → 添加站点：

| 项目 | 填法 |
|---|---|
| 域名 | 你的域名（如 `xx.example.com`） |
| 根目录 | 自动生成即可 |
| FTP | 不创建 |
| 数据库 | 不创建（本站在纯静态，不需要 MySQL） |
| PHP 版本 | **纯静态** |

### 2. 上传

把 `xiaokedz/` **里面的内容**（不是 `xiaokedz` 文件夹本身）上传到站点根目录。

上传后根目录应该是：

```
/www/wwwroot/xx.example.com/
├── index.html
├── assets/
├── data/
└── ...
```

> 用宝塔「文件」上传 zip 后在线解压最快。解压后确认 `index.html` 就在根目录，不要多套一层目录。

### 3. 权限

```bash
chown -R www:www /www/wwwroot/xx.example.com
find /www/wwwroot/xx.example.com -type d -exec chmod 755 {} \;
find /www/wwwroot/xx.example.com -type f -exec chmod 644 {} \;
```

### 4. HTTPS

宝塔 → 网站 → SSL → Let's Encrypt 申请，开启「强制 HTTPS」。

### 5. 可选：开启 gzip 与缓存

把 `deploy/nginx-site.conf` 里的 `location` 段追加到站点配置（宝塔 → 网站 → 设置 → 配置文件）的 `server { }` 内部，然后重载 nginx。全站压缩后约 100KB 左右，首屏很快。

### 6. 迁移

整个目录打包带走，换服务器解压即可，**没有任何环境依赖**。域名变了也不用改配置（站点内全部是相对路径 + hash 路由）。

---

## 四、如何新增 / 修改知识点

### 加一个知识点

在 `data/math.js`（或 english / grammar）数组里追加一个对象：

```js
{
  id: 'm6-16',                 // 唯一，建议 科目+年级+序号
  subject: 'math',             // math | english | grammar
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

| 数学 | | 英语 / 语法 | |
|---|---|---|---|
| `placevalue` | 数位分级读数 | `clock` | 钟面时间 |
| `angle` | 量角器 | `preposition` | 方位介词 |
| `parallel` | 平行线距离 | `shop` | 购物问价 |
| `areamodel` | 乘法分配律面积模型 | `therebe` | There be |
| `decimal` | 十分位 / 百分位 | `comparative` | 比较级 |
| `triangleAngle` | 三角形内角和 | `tense` | 四种时态时间轴 |
| `average` | 平均数 | `wordform` | 名词复数 / 动词三单 |
| `parallelogram` | 割补 | `pronoun` | 人称代词表 |
| `pointmove` | 小数点搬家 | `sentence` | 否定句 / 疑问句转换 |
| `balance` | 天平与等式性质 | `whword` | 特殊疑问词 |
| `volume` | 长方体体积 | `wordorder` | 语序成句 |
| `fraction` | 分数与通分 | | |
| `multiples` | 因数倍数筛 | | |
| `circle` | 圆滚动 | | |
| `percent` | 折扣 | | |

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

现成的 6 张：

| id | 标题 | 科目 |
|---|---|---|
| `prep` | 小学英语介词全表 | 英语 |
| `tense` | 四种时态一张表 | 英语 |
| `sentence` | 句型转换一张表 | 英语 |
| `noun` | 名词、代词与冠词 | 语法 |
| `math-formula` | 数学公式与单位速查 | 数学 |
| `math-trap` | 数学 15 个高频易错点 | 数学 |

### 新增一张总结

在 `data/summaries.js` 里追加：

```js
{
  id: 'wh', subject: 'grammar',
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

### 已经做好的：本机多档案

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
  }
}
```

### 换设备 / 多个孩子用不同设备

浏览器本地存储**不会自动同步**。两条路：

**A. 导出 / 导入（零成本，现在就能用）**
「我的学习」→「导出当前档案」得到一个 JSON；在另一台设备打开本站 →「导入档案」→ 自动建一个新档案并切过去。

**B. 加后端账号（一个班几十人时用这个）**
宝塔本来就是 LNMP，加一个 `api/` 目录和两张表即可，不需要 Node、不需要换服务器：

```sql
CREATE TABLE xk_user (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nick VARCHAR(32) NOT NULL,
  login_code CHAR(64) NOT NULL,   -- 学号 + 口令，password_hash() 后存
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_code (login_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE xk_progress (
  user_id BIGINT UNSIGNED NOT NULL,
  point_id VARCHAR(16) NOT NULL,
  score TINYINT UNSIGNED NOT NULL DEFAULT 0,
  total TINYINT UNSIGNED NOT NULL DEFAULT 3,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, point_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

接口只需三个动作：

| 动作 | 说明 |
|---|---|
| `login` | 学号 + 口令 → 返回 token（不用邮箱、不用注册流程，老师发码） |
| `pull` | 用 token 拉自己的全部 progress |
| `push` | 交完自测上报 `{pointId, score, total}`，服务端 upsert |

前端改动很小：把 `cur()` 换成「本地缓存 + 后台同步」，登录态存 token，离线时继续用 localStorage、联网后补传。需要的话可以按这个方案补 `api/` 和登录页。

> 提醒：真要给一个班用，务必先想清楚未成年人信息的最小化——只存昵称和学号，不要存真实姓名、手机号、生日。

## 七、部署到 GitHub Pages（可选）

仓库根目录就是站点根目录，所以 Pages 可以零配置：

1. 新建空仓库，建议名 **`xiaokedz`**（小课桌的拼音，短、好记、几乎不会重名）
2. 推送后进 Settings → Pages → Source 选 `Deploy from a branch` → `main` / `/ (root)`
3. 一两分钟后访问 `https://<你的用户名>.github.io/xiaokedz/`

站点全部用相对路径 + hash 路由，放在子路径下也能正常工作。

## 八、改动时注意

1. **不要引入外部 CDN**（字体、图表库、图标）。站点设计为完全离线可用，宝塔服务器无外网也能跑。
2. **不要改用 ES Module 或 `fetch` 读 JSON**，否则 `file://` 打开会失败，也失去"拷走即用"的优势。
3. 互动图的数值都是教学简化模型，改参数时保持"一个原因 → 一个结果"的因果关系，不要把图做成纯动画。
4. 自测答案 `answer` 从 **0** 开始计数。
5. 修改后至少手动点一遍：预测 → 拖滑块 → 自测，确认读数与结论一致。

---

## 九、内容范围与声明

- 数学：人教版，覆盖四年级上册至六年级上册的高频易错点，按单元顺序。
- 英语：人教版 PEP（三年级起点），四至六年级核心句型。
- 语法：按 PEP 教材出现顺序归纳，是跨单元专题，不与某一课一一对应。
- 河南信阳各区县、各校进度可能不同，**以学校课本和老师要求为准**。

互动图中的数值为便于理解而取整，属教学简化模型，不是精确测量，也不构成工程或临床仿真。题目为巩固概念设计，不替代学校作业与考试训练。学习效果未经教学实验验证。

教学图设计方法参考 **Teachable Figures** by ywEdAi
（https://github.com/ywEdAi/teachable-figures），代码 MIT，书面内容 CC BY 4.0。
本站文字、题目与实现为独立创作。
