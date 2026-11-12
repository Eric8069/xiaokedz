/* ==========================================================================
   小课桌 · 一页纸总结（速查表 / 打印版）
   结构：口诀 + 表格 + 易错对比 + 固定搭配 + 6 题自测
   ========================================================================== */
window.SHEETS = (window.SHEETS || []).concat([

/* ------------------------------------------------------------------ 1 */
{
  id: 'prep', subject: 'english', title: '小学英语介词全表',
  sub: '时间 · 地点 · 方向 · 方式，一张表理清',
  tags: ['介词', 'in', 'on', 'at', '易错'],
  mnemonic: '年月周前要用 in，具体日子却不行；<br>遇到几号要用 on，上午下午又是 in；<br>要说某日上下午，用 on 换 in 才能行；<br>午夜黄昏用 at，黎明时分也用 at。',
  blocks: [
    {
      h: '一、时间介词：in / on / at 怎么选',
      lead: '口诀只能救急，真正的判断标准是"<b>范围由大到小</b>"：in 管一大段，on 管某一天，at 管某一刻。',
      table: {
        head: ['介词', '用于', '例子'],
        rows: [
          ['in', '年、月、季节、泛指的上下午/晚上', 'in 2026、in May、in summer、in the morning'],
          ['on', '具体某天、星期、某天的上下午', 'on Monday、on May 1st、on Sunday morning'],
          ['at', '具体时刻、中午、夜晚', 'at 7:00、at noon、at night'],
          ['for', '持续一段时间', 'for two hours'],
          ['since', '从过去某时到现在', 'since 2020'],
          ['before / after', '在……之前 / 之后', 'before lunch、after school'],
          ['during', '在……期间', 'during the holiday'],
          ['until', '直到……', 'until 9 o\'clock']
        ]
      },
      note: { type: 'tip', text: '最容易错的是 <b>on Sunday morning</b>：虽然 morning 前面一般用 in，但一旦指明"星期几的早上"，就改用 on。' }
    },
    {
      h: '二、地点介词：在里面、在表面、在某点',
      table: {
        head: ['介词', '含义', '例子'],
        rows: [
          ['in', '在……内部（被包围）', 'in the box、in the classroom'],
          ['on', '在……表面（接触）', 'on the desk、on the wall'],
          ['at', '在某个点（小地方）', 'at the door、at the bus stop'],
          ['under', '在……正下方', 'under the chair'],
          ['behind', '在……后面', 'behind the door'],
          ['in front of', '在……前面', 'in front of the house'],
          ['next to / beside', '在……旁边', 'next to the bed'],
          ['between', '在两者之间', 'between the bank and the shop'],
          ['near', '在……附近', 'near the park'],
          ['over / above', '在……上方（over 有"覆盖"意味）', 'a bridge over the river'],
          ['around', '在……周围', 'around the table']
        ]
      }
    },
    {
      h: '三、方向与方式',
      table: {
        head: ['类别', '常见词', '例子'],
        rows: [
          ['方向', 'to、from、into、out of、across、through、along、up、down', 'go to school、walk across the street、through the forest'],
          ['交通方式', 'by + 交通工具（不加冠词）', 'by bus、by bike、by plane'],
          ['交通方式', 'on foot（固定说法）', 'I go to school on foot.'],
          ['工具', 'with + 具体工具', 'write with a pen'],
          ['语言', 'in + 语言', 'say it in English']
        ]
      },
      note: { type: 'warn', text: '<b>by bus</b> 中间不加 a/the；但用 in / on 时就要加：<b>in a car</b>、<b>on the bus</b>。' }
    },
    {
      h: '四、最容易混的 6 组',
      vs: [
        { left: 'in the tree', right: 'on the tree', tip: '外来的（鸟、猫、人）在树上用 in；长在树上的（叶子、果子）用 on。' },
        { left: 'on the wall', right: 'in the wall', tip: '挂在墙面表面用 on；嵌进墙体里（窗、洞）用 in。' },
        { left: 'at night', right: 'in the evening', tip: '两个都是固定搭配，不能互换说成 in night 或 at evening。' },
        { left: 'in time', right: 'on time', tip: 'in time 是"及时赶上"，on time 是"准时、按点"。' },
        { left: 'go to school', right: 'go to the school', tip: '不加 the 表示"去上学"（目的）；加 the 表示"去那所学校"（地点）。' },
        { left: 'in the morning', right: 'on Monday morning', tip: '泛指早上用 in，指明哪一天的早上就用 on。' }
      ]
    },
    {
      h: '五、背下来就能用的固定搭配',
      chips: ['in the morning', 'in the afternoon', 'in the evening', 'at noon', 'at night', 'at home', 'at school', 'on Monday', 'on Monday morning', 'on May 1st', 'in 2026', 'in summer', 'by bus', 'by bike', 'on foot', 'in English', 'with a pen', 'next to me', 'in front of the house', 'between you and me']
    }
  ],
  drill: [
    { q: 'I get up ______ six o\'clock.', a: 'at', why: '具体时刻用 at。' },
    { q: 'We have a party ______ May 1st.', a: 'on', why: '具体到某月某日，用 on。' },
    { q: 'She goes to school ______ bike every day.', a: 'by', why: 'by + 交通工具，中间不加冠词。' },
    { q: 'My birthday is ______ August.', a: 'in', why: '只有月份、没有具体日子，用 in。' },
    { q: 'The cat is hiding ______ the door.（在门后）', a: 'behind', why: '在……后面用 behind。' },
    { q: 'Look! A bird is singing ______ the tree.（鸟在树上）', a: 'in', why: '鸟是外来的，在树上用 in；长在树上的果子才用 on。' }
  ]
},

/* ------------------------------------------------------------------ 2 */
{
  id: 'tense', subject: 'english', title: '四种时态一张表',
  sub: '一般现在 · 现在进行 · 一般过去 · 一般将来',
  tags: ['时态', '三单', '过去式', 'will'],
  mnemonic: '先找时间词，再定时态，最后变动词。<br>每天用一般，now 在进行，昨天用过去，明天 will 上。',
  blocks: [
    {
      h: '一、四种时态对照',
      table: {
        head: ['时态', '结构', '标志词', '例子'],
        rows: [
          ['一般现在时', '动词原形 / 三单加 -s', 'every day、usually、often、sometimes', 'He plays football every day.'],
          ['现在进行时', 'am / is / are + 动词-ing', 'now、look、listen、at the moment', 'He is playing football now.'],
          ['一般过去时', '动词过去式', 'yesterday、last week、two days ago', 'He played football yesterday.'],
          ['一般将来时', 'will + 原形 / be going to + 原形', 'tomorrow、next week、soon', 'He will play football tomorrow.']
        ]
      },
      note: { type: 'tip', text: '判断顺序永远是：<b>先看时间词</b>，没有时间词就看上下文，最后才想动词怎么变。' }
    },
    {
      h: '二、动词怎么变（三张规则表）',
      table: {
        head: ['变化', '规则', '例子'],
        rows: [
          ['三单 -s', '一般加 -s；s/x/ch/sh/o 结尾加 -es；辅音 + y 变 i 加 -es', 'plays、watches、goes、studies'],
          ['三单不规则', '单独记', 'have → has、be → is、do → does'],
          ['现在分词 -ing', '一般加 -ing；不发音 e 去 e；重读闭音节双写', 'playing、making、running'],
          ['过去式 -ed', '一般加 -ed；e 结尾加 -d；辅音 + y 变 i 加 -ed；重读闭音节双写', 'played、liked、studied、stopped'],
          ['过去式不规则', '单独记', 'go → went、see → saw、have → had、do → did']
        ]
      }
    },
    {
      h: '三、最容易错的 5 个地方',
      vs: [
        { left: 'He plays…', right: 'He is playing…', tip: '前者是"经常"，后者是"此刻正在"。有 now/look 就用后者。' },
        { left: 'didn\'t go', right: 'didn\'t went', tip: 'didn\'t 后面必须用原形，这是最高频扣分点。' },
        { left: 'Does he like…?', right: 'Does he likes…?', tip: 'Does 已经承担了三单，动词回原形。' },
        { left: 'will play', right: 'will plays', tip: 'will 后面永远跟原形。' },
        { left: 'I am going to swim.', right: 'I am going to swimming.', tip: 'be going to 后面也是动词原形。' }
      ]
    },
    {
      h: '四、时间标志词速记',
      chips: ['every day', 'usually', 'often', 'sometimes', 'now', 'look', 'listen', 'yesterday', 'last weekend', 'two days ago', 'tomorrow', 'next week', 'soon', 'this evening']
    }
  ],
  drill: [
    { q: 'He ______ (play) football every day.', a: 'plays', why: 'every day 用一般现在时，主语 He 是三单。' },
    { q: 'Look! The boys ______ (play) football.', a: 'are playing', why: 'Look! 提示现在进行时，主语复数用 are。' },
    { q: 'She ______ (go) to Beijing last year.', a: 'went', why: 'last year 用一般过去时，go 的过去式是 went。' },
    { q: 'We ______ (visit) the museum tomorrow.', a: 'will visit / are going to visit', why: 'tomorrow 用一般将来时，两种结构都对。' },
    { q: 'My mother ______ (not watch) TV now.', a: 'isn\'t watching', why: 'now 用现在进行时，否定在 be 后加 not。' },
    { q: '______ he ______ (like) apples?', a: 'Does; like', why: '一般现在时疑问句，三单用 Does，动词回原形。' }
  ]
},

/* ------------------------------------------------------------------ 3 */
{
  id: 'sentence', subject: 'english', title: '句型转换一张表',
  sub: '否定句 · 一般疑问句 · 简答，三种句子一次说清',
  tags: ['否定句', '一般疑问句', 'do', 'does', 'be'],
  mnemonic: '有 be 用 be，没 be 借 do；<br>does 管三单，did 管过去；<br>助动词一出现，后面动词回原形。',
  blocks: [
    {
      h: '一、三类句子对照',
      table: {
        head: ['原句', '否定句', '一般疑问句', '简答'],
        rows: [
          ['She is a teacher.', 'She isn\'t a teacher.', 'Is she a teacher?', 'Yes, she is. / No, she isn\'t.'],
          ['They like apples.', 'They don\'t like apples.', 'Do they like apples?', 'Yes, they do. / No, they don\'t.'],
          ['He likes apples.', 'He doesn\'t like apples.', 'Does he like apples?', 'Yes, he does. / No, he doesn\'t.'],
          ['She went home.', 'She didn\'t go home.', 'Did she go home?', 'Yes, she did. / No, she didn\'t.']
        ]
      }
    },
    {
      h: '二、三步走，不会乱',
      list: [
        '<b>第一步 找动词</b>：句子里有没有 am / is / are / was / were？',
        '<b>第二步 选助动词</b>：有 be 就用 be；没有就用 do（I/you/we/they）、does（he/she/it）、did（过去）。',
        '<b>第三步 检查</b>：助动词后面的动词，是不是原形？'
      ],
      note: { type: 'tip', text: '简答要用<b>和问句相同的助动词</b>：Do…? → Yes, I do. Is…? → Yes, it is. Did…? → Yes, I did.' }
    },
    {
      h: '三、高频错误对照',
      vs: [
        { left: 'She doesn\'t like it.', right: 'She doesn\'t likes it.', tip: 'doesn\'t 后面的动词必须回原形。' },
        { left: 'Do you have a pen?', right: 'Are you have a pen?', tip: '实义动词 have 要借 do，不能直接用 be。' },
        { left: 'Is he your brother?', right: 'Does he is your brother?', tip: '句子里已经有 be，就不能再加 do/does。' },
        { left: 'Yes, I do.', right: 'Yes, I am.', tip: '答语要和问句的助动词一致。' },
        { left: 'He isn\'t at home.', right: 'He doesn\'t at home.', tip: 'be 动词句的否定直接加 not。' }
      ]
    },
    {
      h: '四、还有这些句型',
      table: {
        head: ['句型', '结构', '例子'],
        rows: [
          ['There be', 'There is / are + 名词 + 地点', 'There are two books on the desk.'],
          ['祈使句', '动词原形开头；否定用 Don\'t', 'Open the door. / Don\'t run.'],
          ['特殊疑问句', '疑问词 + 一般疑问句语序', 'Where do you live?'],
          ['感叹句', 'What a + 形容词 + 名词！/ How + 形容词！', 'What a nice day! / How nice!']
        ]
      }
    }
  ],
  drill: [
    { q: 'She is a nurse.（改否定句）', a: 'She isn\'t a nurse.', why: '有 be 动词，直接在 is 后加 not。' },
    { q: 'Tom plays football.（改一般疑问句）', a: 'Does Tom play football?', why: '主语三单，用 Does，动词回原形。' },
    { q: 'They like apples.（改否定句）', a: 'They don\'t like apples.', why: '主语不是三单，用 don\'t。' },
    { q: 'I went to the park.（改一般疑问句）', a: 'Did you go to the park?', why: '过去时用 Did，动词回原形，I 变 you。' },
    { q: 'Is she your sister?（作否定回答）', a: 'No, she isn\'t.', why: 'Is 提问就用 is 回答。' },
    { q: 'He has a bike.（改否定句）', a: 'He doesn\'t have a bike.', why: '三单 has 在 doesn\'t 后回原形 have。' }
  ]
},

/* ------------------------------------------------------------------ 4 */
{
  id: 'noun', subject: 'english', title: '名词、代词与冠词',
  sub: '复数规则 · 四类代词 · a/an/the',
  tags: ['名词', '代词', '冠词', 'some', 'any'],
  mnemonic: '名词看可数，复数看词尾；<br>代词分四格，物主看后面有没有名词；<br>冠词看读音，不看字母。',
  blocks: [
    {
      h: '一、可数还是不可数',
      table: {
        head: ['类别', '特点', '例子'],
        rows: [
          ['可数名词', '能一个个数，有单复数', 'a book / two books、an apple / three apples'],
          ['不可数名词', '不能直接数，没有复数', 'water、milk、rice、bread、juice、money'],
          ['既可以又可数', '意思不同', 'chicken 鸡肉（不可数）/ 小鸡（可数）']
        ]
      },
      note: { type: 'tip', text: '不可数名词要表示数量，用<b>量词 + of</b>：a glass of water、two pieces of bread。' }
    },
    {
      h: '二、复数变化规则',
      table: {
        head: ['词尾情况', '变化', '例子'],
        rows: [
          ['一般', '加 -s', 'cat → cats'],
          ['s、x、ch、sh', '加 -es', 'bus → buses、box → boxes、watch → watches'],
          ['辅音字母 + y', '变 y 为 i 加 -es', 'baby → babies、city → cities'],
          ['元音字母 + y', '直接加 -s', 'boy → boys、day → days'],
          ['f / fe', '多数变 f 为 v 加 -es', 'knife → knives、leaf → leaves'],
          ['o 结尾', '有的加 -es，有的加 -s', 'potato → potatoes、photo → photos'],
          ['不规则', '单独记', 'man → men、child → children、foot → feet、mouse → mice'],
          ['单复数同形', '不变', 'sheep、fish、deer']
        ]
      }
    },
    {
      h: '三、四类代词一张表',
      table: {
        head: ['人称', '主格', '宾格', '形容词性物主', '名词性物主'],
        rows: [
          ['我', 'I', 'me', 'my', 'mine'],
          ['你 / 你们', 'you', 'you', 'your', 'yours'],
          ['他', 'he', 'him', 'his', 'his'],
          ['她', 'she', 'her', 'her', 'hers'],
          ['它', 'it', 'it', 'its', 'its'],
          ['我们', 'we', 'us', 'our', 'ours'],
          ['他们', 'they', 'them', 'their', 'theirs']
        ]
      },
      note: { type: 'tip', text: '判断口诀：<b>动词前用主格，动词/介词后用宾格；后面有名词用 my，没有名词用 mine。</b>' }
    },
    {
      h: '四、冠词 a / an / the',
      table: {
        head: ['冠词', '用法', '例子'],
        rows: [
          ['a', '辅音音素开头的单数可数名词前', 'a book、a university（u 读 /juː/）'],
          ['an', '元音音素开头的单数可数名词前', 'an apple、an hour（h 不发音）'],
          ['the', '特指、上文提过、独一无二', 'the sun、the book on the desk'],
          ['不加冠词', '泛指复数、不可数、专有名词', 'I like apples. / She is in Class 2.']
        ]
      },
      note: { type: 'warn', text: 'a / an 看的是<b>读音</b>不是字母：an hour（h 不发音，开头是元音）、a useful book（u 读 /juː/，是辅音）。' }
    },
    {
      h: '五、some 还是 any',
      list: [
        '<b>some</b>：肯定句；也可用于表示"请求、建议"的疑问句（Would you like some tea?）',
        '<b>any</b>：否定句和一般疑问句（I don\'t have any pens. / Do you have any pens?）'
      ]
    }
  ],
  drill: [
    { q: 'There are three ______ (box) on the desk.', a: 'boxes', why: '以 x 结尾，加 -es。' },
    { q: 'This is ______ (I) book. It\'s ______ (I).', a: 'my; mine', why: '有名词用 my，没名词用 mine。' },
    { q: 'I have ______ (a / an) orange every day.', a: 'an', why: 'orange 以元音音素开头。' },
    { q: 'She has two ______ (child).', a: 'children', why: 'child 是不规则复数。' },
    { q: 'Give ______ (he) the ball.', a: 'him', why: '动词后面用宾格。' },
    { q: 'I don\'t have ______ (some / any) milk.', a: 'any', why: '否定句用 any。' }
  ]
},

/* ------------------------------------------------------------------ 5 */
{
  id: 'math-formula', subject: 'math', title: '数学公式与单位速查',
  sub: '周长面积 · 体积表面积 · 单位换算 · 数量关系',
  tags: ['公式', '单位换算', '面积', '体积'],
  mnemonic: '周长是"绕一圈"，面积是"铺满它"，体积是"装多少"。<br>单位换算记进率：长度 10，面积 100，体积 1000。',
  blocks: [
    {
      h: '一、平面图形的周长与面积',
      table: {
        head: ['图形', '周长', '面积'],
        rows: [
          ['长方形', 'C = (a + b) × 2', 'S = a × b'],
          ['正方形', 'C = a × 4', 'S = a²'],
          ['平行四边形', '四条边相加', 'S = 底 × 高'],
          ['三角形', '三条边相加', 'S = 底 × 高 ÷ 2'],
          ['梯形', '四条边相加', 'S = (上底 + 下底) × 高 ÷ 2'],
          ['圆', 'C = πd = 2πr', 'S = πr²']
        ]
      },
      note: { type: 'warn', text: '三角形和梯形算面积时，<b>"÷2"千万不能丢</b>。求底或高时反过来：底 = 面积 × 2 ÷ 高。' }
    },
    {
      h: '二、立体图形的表面积与体积',
      table: {
        head: ['图形', '表面积', '体积'],
        rows: [
          ['长方体', 'S = (ab + ah + bh) × 2', 'V = abh = 底面积 × 高'],
          ['正方体', 'S = 6a²', 'V = a³'],
          ['圆柱', 'S = 2πr² + 2πrh', 'V = πr²h'],
          ['圆锥', '—', 'V = ⅓πr²h']
        ]
      }
    },
    {
      h: '三、单位换算（进率表）',
      table: {
        head: ['类别', '进率', '例子'],
        rows: [
          ['长度', '10', '1 m = 10 dm = 100 cm = 1000 mm'],
          ['面积', '100', '1 m² = 100 dm² = 10000 cm²'],
          ['体积 / 容积', '1000', '1 m³ = 1000 dm³；1 L = 1000 mL'],
          ['质量', '1000', '1 t = 1000 kg，1 kg = 1000 g'],
          ['时间', '60 / 24', '1 h = 60 min，1 天 = 24 h'],
          ['人民币', '10', '1 元 = 10 角 = 100 分']
        ]
      },
      note: { type: 'tip', text: '大单位化小单位<b>乘</b>进率，小单位化大单位<b>除</b>进率。面积进率是长度的平方，别按 10 算。' }
    },
    {
      h: '四、运算定律',
      table: {
        head: ['定律', '字母表示', '用处'],
        rows: [
          ['加法交换律', 'a + b = b + a', '凑整'],
          ['加法结合律', '(a + b) + c = a + (b + c)', '先凑整再相加'],
          ['乘法交换律', 'a × b = b × a', '凑整'],
          ['乘法结合律', '(a × b) × c = a × (b × c)', '25 × 4、125 × 8'],
          ['乘法分配律', '(a + b) × c = a × c + b × c', '102 × 36、99 × 25']
        ]
      }
    },
    {
      h: '五、常用数量关系',
      chips: ['单价 × 数量 = 总价', '速度 × 时间 = 路程', '工作效率 × 时间 = 工作总量', '总数 ÷ 份数 = 平均数', '图上距离 ÷ 比例尺 = 实际距离', '利息 = 本金 × 利率 × 时间']
    },
    {
      h: '六、分数、小数、百分数互化',
      table: {
        head: ['转换', '方法', '例子'],
        rows: [
          ['分数 → 小数', '分子 ÷ 分母', '3/4 = 0.75'],
          ['小数 → 百分数', '小数点右移两位加 %', '0.75 = 75%'],
          ['百分数 → 小数', '小数点左移两位去 %', '75% = 0.75'],
          ['百分数 → 分数', '写成分母 100 再约分', '75% = 3/4'],
          ['折扣', '几折 = 百分之几十', '八折 = 80%']
        ]
      }
    }
  ],
  drill: [
    { q: '长方形长 8 cm、宽 5 cm，面积是 ______ 平方厘米。', a: '40', why: 'S = 8 × 5 = 40。' },
    { q: '三角形底 10 cm、高 6 cm，面积是 ______ 平方厘米。', a: '30', why: 'S = 10 × 6 ÷ 2 = 30，别忘了 ÷2。' },
    { q: '3.5 m = ______ cm', a: '350', why: '1 m = 100 cm，乘 100，小数点右移两位。' },
    { q: '棱长 4 cm 的正方体，体积是 ______ 立方厘米。', a: '64', why: 'V = 4³ = 64。' },
    { q: '直径 6 cm 的圆，周长是 ______ cm（π 取 3.14）。', a: '18.84', why: 'C = πd = 3.14 × 6 = 18.84。' },
    { q: '原价 400 元，打七五折，现价 ______ 元。', a: '300', why: '400 × 75% = 300。' }
  ]
},

/* ------------------------------------------------------------------ 6 */
{
  id: 'math-trap', subject: 'math', title: '数学 15 个高频易错点',
  sub: '不是不会，是每次都掉进同一个坑',
  tags: ['易错', '读数', '余数', '单位', '近似数'],
  mnemonic: '做错题的时候，先问自己三句：<br>单位统一了吗？问题问的是哪个量？<br>答案合理吗（估一估）？',
  blocks: [
    {
      h: '一、数与读数',
      table: {
        head: ['易错点', '正确做法'],
        rows: [
          ['读数见 0 就读', '先分级；每级末尾的 0 不读，中间连续的 0 只读一个'],
          ['漏写 0 占位', '按级写，写完数位数'],
          ['近似数忘写"约"', '四舍五入求出的结果必须写"约"'],
          ['改写与省略混淆', '改写（如 3050 万）用"＝"，省略尾数用"≈"']
        ]
      }
    },
    {
      h: '二、计算',
      table: {
        head: ['易错点', '正确做法'],
        rows: [
          ['竖式第二层不错位', '第二层表示"多少个十"，末位要和十位对齐'],
          ['有余数除法写错', '余数必须比除数小；验算：商 × 除数 + 余数 = 被除数'],
          ['小数加减不对齐', '小数点对齐，也就是相同数位对齐'],
          ['小数乘法点错小数点', '先按整数乘，再看两个因数一共有几位小数'],
          ['除法余数的小数点', '余数的小数点要和被除数的小数点对齐']
        ]
      }
    },
    {
      h: '三、图形与单位',
      table: {
        head: ['易错点', '正确做法'],
        rows: [
          ['三角形、梯形忘 ÷2', '公式里带 ÷2 的，算完回头检查'],
          ['面积单位写成厘米', '周长用长度单位，面积用平方单位'],
          ['体积与容积混用', '体积从外面量，容积从里面量'],
          ['单位不统一就计算', '先化成同一单位，再代入公式'],
          ['平行四边形用邻边算面积', '必须用底 × 对应的高']
        ]
      }
    },
    {
      h: '四、分数、百分数与比例',
      table: {
        head: ['易错点', '正确做法'],
        rows: [
          ['异分母直接加分子', '先通分，再算分子'],
          ['约分不彻底', '一直除到分子分母互质为止'],
          ['百分数带单位', '百分数只表示倍比关系，不带单位'],
          ['打八折 = 便宜 8 元', '打八折是便宜原价的 20%'],
          ['按比分配直接除', '先求总份数，再求每份是多少']
        ]
      }
    },
    {
      h: '五、最坑的 4 组对比',
      vs: [
        { left: '"增加到" 3 倍', right: '"增加了" 3 倍', tip: '增加到 3 倍是变成原来的 3 倍；增加了 3 倍是变成 4 倍。' },
        { left: '1/2 米', right: '1/2', tip: '带单位的表示具体长度；不带单位的是比例。' },
        { left: '周长', right: '面积', tip: '周长绕一圈（厘米），面积铺满（平方厘米），不能比大小。' },
        { left: '求"多多少"', right: '求"是几倍"', tip: '先看清问题问的是差还是倍，别算完就写答案。' }
      ]
    }
  ],
  drill: [
    { q: '6.05 的计数单位是 ______，它有 ______ 个这样的单位。', a: '0.01；605', why: '末位在百分位，计数单位 0.01；6.05 = 605 个 0.01。' },
    { q: '一个数除以 7，商是 12，余数最大是 ______。', a: '6', why: '余数必须比除数小，最大是 7 − 1 = 6。' },
    { q: '底 6 cm、高 4 cm 的三角形，面积是 ______ 平方厘米。', a: '12', why: '6 × 4 ÷ 2 = 12。' },
    { q: '把 3.6 扩大到原来的 100 倍是 ______。', a: '360', why: '小数点右移两位。' },
    { q: '一件商品先涨 10%，再降 10%，现价与原价比是 ______（涨了/降了/不变）。', a: '降了', why: '1 × 1.1 × 0.9 = 0.99，比原价低。' },
    { q: '甲 : 乙 = 3 : 5，两人共 80 元，甲有 ______ 元。', a: '30', why: '总份数 8，每份 10 元，甲 3 份 = 30 元。' }
  ]
}
,
/* ------------------------------------------------------------------ 7 */
{
  id: 'wh', subject: 'english', title: '特殊疑问词速查',
  sub: '问什么用什么，一张表定疑问词',
  tags: ['疑问词', 'what', 'where', 'when', 'how'],
  mnemonic: '看划线部分回答的是"什么信息"，就选哪个疑问词。<br>地点 Where，时间 When，人物 Who，原因 Why，方式 How。',
  blocks: [
    {
      h: '一、九个疑问词',
      table: {
        head: ['疑问词', '问什么', '例子'],
        rows: [
          ['What', '什么（事物）', 'What is this?'],
          ['Where', '在哪里（地点）', 'Where is my bag?'],
          ['When / What time', '什么时候 / 几点', 'When do you get up?'],
          ['Who', '谁（人物）', 'Who is that girl?'],
          ['Whose', '谁的（所属）', 'Whose book is this?'],
          ['Why', '为什么（原因）', 'Why are you late?'],
          ['How', '怎么样（方式、状态）', 'How do you go to school?'],
          ['How many', '多少（可数名词）', 'How many books?'],
          ['How much', '多少（不可数 / 价钱）', 'How much water? / How much is it?']
        ]
      }
    },
    {
      h: '二、句子结构',
      lead: '特殊疑问句 = <b>疑问词 + 一般疑问句语序</b>。不是把陈述句的词倒过来。',
      table: {
        head: ['原句', '提问', '问句'],
        rows: [
          ['The book is on the desk.', '对 on the desk 提问', 'Where is the book?'],
          ['I get up at six.', '对 at six 提问', 'When do you get up?'],
          ['She likes apples.', '对 apples 提问', 'What does she like?'],
          ['Tom is reading.', '对 Tom 提问', 'Who is reading?']
        ]
      },
      note: { type: 'tip', text: 'Who 作主语时后面直接跟动词，不加 do：Who is reading?（不是 Who does reading?）' }
    },
    {
      h: '三、最容易混的三组',
      vs: [
        { left: 'How many books?', right: 'How much water?', tip: '可数名词复数用 How many；不可数名词用 How much。' },
        { left: 'What is he?', right: 'Who is he?', tip: '问职业用 What（What does he do?），问身份/姓名用 Who。' },
        { left: 'What time is it?', right: 'When is the party?', tip: '问钟点用 What time，问日期/时间点用 When 都可以。' }
      ]
    }
  ],
  drill: [
    { q: '对 "on the desk" 提问：______ is the book?', a: 'Where', why: '问地点用 Where。' },
    { q: '对 "at six" 提问：______ do you get up?', a: 'When / What time', why: '问时间用 When 或 What time。' },
    { q: '对 "my sister" 提问：______ is she?', a: 'Who', why: '问人用 Who。' },
    { q: '对 "blue" 提问：______ colour do you like?', a: 'What', why: '问颜色用 What colour。' },
    { q: '对 "three" 提问：______ books do you have?', a: 'How many', why: 'books 可数，用 How many。' },
    { q: '对 "by bus" 提问：______ do you go to school?', a: 'How', why: '问方式用 How。' }
  ]
},

/* ------------------------------------------------------------------ 8 */
{
  id: 'phrase', subject: 'english', title: '小学高频短语 60 条',
  sub: '动词短语 · 介词短语 · 日常交际',
  tags: ['短语', '固定搭配', '口语'],
  mnemonic: '短语不要拆开背，整块记、整块用。<br>先记动词 + 介词，再记时间地点搭配。',
  blocks: [
    {
      h: '一、动词短语（最常考）',
      chips: ['get up 起床', 'go to bed 上床睡觉', 'have breakfast 吃早饭', 'do homework 做作业', 'watch TV 看电视', 'play sports 做运动', 'take photos 拍照', 'listen to music 听音乐', 'read books 读书', 'clean the room 打扫房间', 'wash the clothes 洗衣服', 'look after 照顾', 'look for 寻找', 'look at 看', 'come from 来自', 'be good at 擅长', 'be interested in 对……感兴趣', 'go shopping 去购物', 'have a good time 玩得开心', 'take a bus 乘公交']
    },
    {
      h: '二、介词短语（时间 / 地点）',
      chips: ['in the morning', 'in the afternoon', 'in the evening', 'at noon', 'at night', 'on Monday', 'on Sunday morning', 'in May', 'on May 1st', 'in 2026', 'at home', 'at school', 'in the box', 'on the desk', 'under the chair', 'next to the bed', 'in front of the house', 'between A and B', 'by bus', 'on foot']
    },
    {
      h: '三、日常交际 20 句',
      table: {
        head: ['场景', '英语', '中文'],
        rows: [
          ['打招呼', 'How are you? — Fine, thank you.', '你好吗？——很好，谢谢。'],
          ['介绍', 'This is my friend, Amy.', '这是我的朋友艾米。'],
          ['请求', 'Can I borrow your pen?', '我能借你的笔吗？'],
          ['道谢', 'Thank you. — You\'re welcome.', '谢谢。——不客气。'],
          ['道歉', 'Sorry. — That\'s OK.', '对不起。——没关系。'],
          ['购物', 'How much is it? — It\'s 20 yuan.', '多少钱？——20 元。'],
          ['问路', 'Excuse me, where is the bank?', '打扰一下，银行在哪里？'],
          ['打电话', 'This is Tom speaking.', '我是汤姆。'],
          ['邀请', 'Would you like to come?', '你愿意来吗？'],
          ['告别', 'See you tomorrow.', '明天见。']
        ]
      }
    },
    {
      h: '四、短语的三个坑',
      vs: [
        { left: 'listen to music', right: 'listen music', tip: 'listen 后面必须加 to。' },
        { left: 'be good at swimming', right: 'be good at swim', tip: 'at 是介词，后面动词要加 -ing。' },
        { left: 'go to school', right: 'go to the school', tip: '不加 the 是"去上学"，加 the 是"去那所学校"。' }
      ]
    }
  ],
  drill: [
    { q: 'I get up ______ six thirty.', a: 'at', why: '具体时刻用 at。' },
    { q: 'She is good ______ drawing.', a: 'at', why: 'be good at 是固定搭配，at 后接动名词。' },
    { q: 'We have lunch ______ noon.', a: 'at', why: 'at noon 是固定说法。' },
    { q: 'He goes to school ______ foot.', a: 'on', why: 'on foot 是固定搭配。' },
    { q: 'Please listen ______ the teacher.', a: 'to', why: 'listen to 不能丢 to。' },
    { q: 'I ______ my homework after dinner.（做作业）', a: 'do', why: 'do homework 是固定搭配，homework 前不加 a。' }
  ]
},

/* ------------------------------------------------------------------ 9 */
{
  id: 'math-number', subject: 'math', title: '数与代数总表',
  sub: '整数 · 小数 · 分数 · 百分数 · 因数倍数',
  tags: ['数与代数', '运算', '分数', '百分数'],
  mnemonic: '加减看数位，乘除看小数点；<br>分数加减先通分，乘除先约分。',
  blocks: [
    {
      h: '一、整数运算',
      table: {
        head: ['内容', '规则 / 公式', '例子'],
        rows: [
          ['运算顺序', '先乘除后加减，有括号先算括号', '12 + 8 × 3 = 36'],
          ['乘法分配律', '(a + b) × c = a × c + b × c', '25 × 12 = 25 × 10 + 25 × 2'],
          ['有余数除法', '被除数 = 商 × 除数 + 余数（余数 < 除数）', '17 ÷ 5 = 3……2'],
          ['四舍五入', '看尾数最高位，≥5 进一，<5 舍去', '3.46 ≈ 3.5']
        ]
      }
    },
    {
      h: '二、小数',
      table: {
        head: ['运算', '法则', '例子'],
        rows: [
          ['加减', '小数点对齐（相同数位对齐）', '3.6 + 0.45 = 4.05'],
          ['乘法', '先按整数乘，再看两个因数共几位小数', '0.3 × 0.4 = 0.12'],
          ['除法', '把除数变成整数，被除数同步移动小数点', '1.2 ÷ 0.3 = 4'],
          ['乘除 10/100/1000', '小数点右移 / 左移相应位数', '3.56 × 100 = 356'],
          ['近似数', '保留几位就看下一位', '5.678 ≈ 5.68（保留两位）']
        ]
      },
      note: { type: 'tip', text: '小数末尾添 0 或去 0，大小不变；但小数<b>中间</b>的 0 不能动。' }
    },
    {
      h: '三、分数',
      table: {
        head: ['运算', '法则', '例子'],
        rows: [
          ['加减（同分母）', '分母不变，分子相加减', '3/7 + 2/7 = 5/7'],
          ['加减（异分母）', '先通分，再算分子', '1/2 + 1/3 = 5/6'],
          ['乘法', '分子乘分子，分母乘分母，能约分先约分', '2/3 × 3/4 = 1/2'],
          ['除法', '除以一个数 = 乘它的倒数', '2/3 ÷ 4/5 = 5/6'],
          ['基本性质', '分子分母同乘或同除以相同的数（0 除外）', '6/8 = 3/4']
        ]
      }
    },
    {
      h: '四、百分数与比',
      table: {
        head: ['内容', '关系', '例子'],
        rows: [
          ['百分数 → 小数', '小数点左移两位去 %', '75% = 0.75'],
          ['小数 → 百分数', '小数点右移两位加 %', '0.8 = 80%'],
          ['折扣', '几折 = 百分之几十', '八折 = 80%'],
          ['按比分配', '先求总份数，再求每份', '3:5 分 80 元 → 30 和 50'],
          ['比例尺', '图上距离 : 实际距离', '1:1000 表示图上 1cm = 实际 10m']
        ]
      }
    },
    {
      h: '五、因数与倍数',
      chips: ['因数有限（最小 1，最大本身）', '倍数无限（最小本身）', '2 的倍数：个位偶数', '5 的倍数：个位 0 或 5', '3 的倍数：各位数字和是 3 的倍数', '质数：只有 1 和本身', '1 既不是质数也不是合数', '2 是唯一的偶质数']
    }
  ],
  drill: [
    { q: '12 + 8 × 3 = ______', a: '36', why: '先算乘法 8 × 3 = 24，再加 12。' },
    { q: '3.6 + 0.45 = ______', a: '4.05', why: '小数点对齐相加。' },
    { q: '1/2 + 1/3 = ______', a: '5/6', why: '通分：3/6 + 2/6 = 5/6。' },
    { q: '2/3 ÷ 4/5 = ______', a: '5/6', why: '除以 4/5 等于乘 5/4：2/3 × 5/4 = 5/6。' },
    { q: '一件商品打八折，现价是原价的 ______%。', a: '80', why: '八折就是 80%。' },
    { q: '24 和 36 的最大公因数是 ______。', a: '12', why: '24 = 2²×2×3，36 = 2²×3²，公因数取 2²×3 = 12。' }
  ]
},

/* ------------------------------------------------------------------ 10 */
{
  id: 'math-geometry', subject: 'math', title: '图形与几何总表',
  sub: '线角 · 图形 · 运动 · 位置 · 周长面积体积',
  tags: ['几何', '三角形', '圆', '图形运动'],
  mnemonic: '周长绕一圈，面积铺满它，体积装多少。<br>三角形梯形别忘除以 2。',
  blocks: [
    {
      h: '一、线与角',
      table: {
        head: ['概念', '要点'],
        rows: [
          ['直线 / 射线 / 线段', '直线无端点、射线一个端点、线段两个端点'],
          ['平行', '同一平面内不相交；距离处处相等'],
          ['垂直', '相交成直角，交点叫垂足'],
          ['角的分类', '锐角 <90°，直角 90°，钝角 90°–180°，平角 180°'],
          ['角的大小', '只看两边张开的程度，与边的长短无关']
        ]
      }
    },
    {
      h: '二、三角形与四边形',
      table: {
        head: ['图形', '特征'],
        rows: [
          ['三角形', '内角和 180°；按角分锐角/直角/钝角；按边分等腰/等边'],
          ['等腰三角形', '两腰相等，两底角相等'],
          ['等边三角形', '三边相等，每个角 60°'],
          ['平行四边形', '对边平行且相等，易变形；面积 = 底 × 高'],
          ['梯形', '只有一组对边平行；面积 = (上底+下底)×高÷2'],
          ['圆', '半径决定大小；d = 2r；C = πd；S = πr²']
        ]
      }
    },
    {
      h: '三、图形的运动',
      table: {
        head: ['运动', '要点', '例子'],
        rows: [
          ['平移', '方向、大小、形状都不变', '电梯上下'],
          ['旋转', '绕一个点转动，形状大小不变', '风车、时针'],
          ['轴对称', '沿对称轴对折能完全重合', '蝴蝶、正方形'],
          ['放大与缩小', '形状不变，大小按比例变', '按 2:1 放大']
        ]
      }
    },
    {
      h: '四、位置与方向',
      chips: ['数对 (列, 行)', '东、南、西、北', '东北、东南、西北、西南', '图上距离 ÷ 比例尺 = 实际距离', '北偏东 30°']
    },
    {
      h: '五、周长、面积、体积',
      table: {
        head: ['图形', '周长', '面积 / 体积'],
        rows: [
          ['长方形', '(a+b)×2', 'a×b'],
          ['正方形', 'a×4', 'a²'],
          ['平行四边形', '四边相加', '底×高'],
          ['三角形', '三边相加', '底×高÷2'],
          ['梯形', '四边相加', '(上底+下底)×高÷2'],
          ['圆', '2πr', 'πr²'],
          ['长方体', '—', 'V = abh'],
          ['正方体', '—', 'V = a³'],
          ['圆柱', '—', 'V = πr²h']
        ]
      }
    }
  ],
  drill: [
    { q: '三角形内角和是 ______ 度。', a: '180', why: '任意三角形都是 180°。' },
    { q: '底 8cm、高 5cm 的三角形面积是 ______ 平方厘米。', a: '20', why: '8 × 5 ÷ 2 = 20。' },
    { q: '直径 10cm 的圆，半径是 ______ cm。', a: '5', why: 'd = 2r，所以 r = 5。' },
    { q: '正方形边长 6cm，周长 ______ cm，面积 ______ 平方厘米。', a: '24；36', why: '周长 6×4 = 24，面积 6×6 = 36。' },
    { q: '长 5、宽 4、高 3 的长方体体积是 ______。', a: '60', why: '5 × 4 × 3 = 60。' },
    { q: '图形平移后，形状和大小 ______。', a: '不变', why: '平移只改变位置，不改变形状和大小。' }
  ]
},

/* ------------------------------------------------------------------ 11 */
{
  id: 'stat', subject: 'math', title: '统计与可能性',
  sub: '统计图 · 平均数 · 可能性',
  tags: ['统计', '平均数', '扇形统计图', '可能性'],
  mnemonic: '条形看多少，折线看变化，扇形看比例。<br>平均数 = 总数 ÷ 份数。',
  blocks: [
    {
      h: '一、三种统计图怎么选',
      table: {
        head: ['统计图', '擅长表示', '什么时候用'],
        rows: [
          ['条形统计图', '数量的多少', '比较几个班的人数'],
          ['折线统计图', '数量的增减变化', '一周气温变化、成绩变化'],
          ['扇形统计图', '各部分占总数的百分比', '零花钱的用途占比']
        ]
      },
      note: { type: 'tip', text: '扇形统计图里的百分比加起来必须是 <b>100%</b>；算某部分数量用"总数 × 百分比"。' }
    },
    {
      h: '二、平均数',
      table: {
        head: ['要点', '说明'],
        rows: [
          ['求法', '平均数 = 总数 ÷ 份数'],
          ['范围', '一定在最小数和最大数之间'],
          ['特点', '容易被极端值影响（一个特别大的数会把它拉高）'],
          ['反向求总数', '总数 = 平均数 × 份数']
        ]
      }
    },
    {
      h: '三、可能性',
      table: {
        head: ['说法', '含义', '例子'],
        rows: [
          ['一定', '必然发生（100%）', '太阳从东边升起'],
          ['可能', '有可能发生，也有可能不发生', '明天会下雨'],
          ['不可能', '不会发生（0%）', '公鸡下蛋'],
          ['用分数表示', '数量越多，可能性越大', '3 红 1 白，摸到红球的可能性是 3/4']
        ]
      }
    },
    {
      h: '四、易错点',
      vs: [
        { left: '平均数 40 人', right: '每班都 40 人', tip: '平均数是"匀出来的"，不代表每个班都一样。' },
        { left: '折线统计图', right: '条形统计图', tip: '要看"变化趋势"用折线，只看"多少"用条形。' },
        { left: '可能性 1/2', right: '一定发生', tip: '1/2 只是可能性大小，不是必然结果。' }
      ]
    }
  ],
  drill: [
    { q: '4 个数的平均数是 25，它们的总数是 ______。', a: '100', why: '总数 = 平均数 × 份数 = 25 × 4。' },
    { q: '要表示一周气温的变化，最适合用 ______ 统计图。', a: '折线', why: '折线统计图能看出增减变化。' },
    { q: '袋子里有 3 个红球、1 个白球，摸到红球的可能性是 ______。', a: '3/4', why: '红球 3 个，一共 4 个，3 ÷ 4 = 3/4。' },
    { q: '扇形统计图中，各部分百分比之和是 ______。', a: '100%', why: '整个圆代表总数，即 100%。' },
    { q: '一组数中加入一个更大的数，平均数会 ______。', a: '变大', why: '总数变大，份数加 1，但新数高于原平均数。' },
    { q: '"明天可能下雨"表示这件事 ______ 发生。', a: '有可能', why: '可能 = 不一定发生，也不一定不发生。' }
  ]
},

/* ------------------------------------------------------------------ 12 */
{
  id: 'cn-rhetoric', subject: 'chinese', title: '修辞·病句·标点一张表',
  sub: '四年级到六年级最高频的三类语文题，一张纸全查完',
  tags: ['比喻', '拟人', '病句', '标点', '易错'],
  mnemonic: '比喻抓相似，拟人给动作；<br>病句四字诀：缺的补、多的删、乱的调、错的换；<br>标点看语气：句号平、问号疑、叹号惊。',
  blocks: [
    {
      h: '一、修辞：三种最常考',
      lead: '判断修辞不要凭感觉，按<b>判断标准</b>对号入座。',
      table: {
        head: ['修辞', '判断标准', '例句'],
        rows: [
          ['比喻', '本体和喻体是<b>两类事物</b>，有相似点', '落叶像一只只黄蝴蝶。'],
          ['拟人', '把物当人写，给它人的动作、心情', '小鸟在枝头唱歌。'],
          ['排比', '三个或以上结构相似的分句连用', '春天来了，柳绿了，花红了，水暖了。'],
          ['夸张', '故意说得比实际大或小', '飞流直下三千尺。']
        ]
      },
      note: { type: 'warn', text: '带「像」不一定是比喻：「他长得像他爸爸」是同类比较；「他好像知道」是推测。' }
    },
    {
      h: '二、病句：六类病灶与改法',
      table: {
        head: ['类型', '病灶', '例子 → 改法'],
        rows: [
          ['成分残缺', '缺主语、谓语或宾语', '通过活动，使我明白 → 删「通过」或「使」'],
          ['搭配不当', '词和词配不上', '水平改进 → 水平提高'],
          ['语序颠倒', '顺序不合理', '改正并发现 → 发现并改正'],
          ['重复啰嗦', '意思重复', '大约二十岁左右 → 大约二十岁'],
          ['前后矛盾', '前后说法打架', '估计一定会来 → 估计会来'],
          ['指代不明', '「他」指谁不清', '他不同意他 → 小明不同意小刚']
        ]
      }
    },
    {
      h: '三、标点：句末与句中',
      table: {
        head: ['标点', '用在哪', '例子'],
        rows: [
          ['。', '陈述一件事，语气平', '今天下雨了。'],
          ['？', '提问、疑问', '今天下雨了吗？'],
          ['！', '赞叹、惊喜、命令', '多美的景色啊！'],
          ['，', '句子中间的一般停顿', '天晴了，我们出发吧。'],
          ['、', '并列的<b>词语</b>之间', '苹果、香蕉、梨'],
          ['；', '并列的<b>分句</b>之间', '春天播种；秋天收获。'],
          ['：', '提示下文', '老师说：「安静。」'],
          ['「」', '直接说的话、特殊名称', '他说：「我来了。」']
        ]
      }
    },
    {
      h: '四、最容易混的 5 组',
      vs: [
        { left: '他像他爸爸', right: '月亮像小船', tip: '前者同类比较，不是比喻；后者两类事物，是比喻。' },
        { left: '苹果、香蕉', right: '他爱唱歌，爱画画', tip: '并列词语用顿号；并列短语或分句用逗号。' },
        { left: '水平提高', right: '水平改进', tip: '「水平、质量、效率」都配「提高」。' },
        { left: '发现并改正', right: '改正并发现', tip: '先发现才能改正，语序不能反。' },
        { left: '他说：「我来了。」', right: '他说：「我来了」。', tip: '句末标点放在引号里面。' }
      ]
    }
  ],
  drill: [
    { q: '「片片落叶像一只只黄蝴蝶。」用了 ______ 修辞。', a: '比喻', why: '落叶（植物）和黄蝴蝶（动物）是两类事物，外形相似。' },
    { q: '「小溪唱着歌跑向远方。」用了 ______ 修辞。', a: '拟人', why: '「唱歌、跑」是人的动作，把小溪当人写。' },
    { q: '「通过这次活动，使我明白了道理。」应删去 ______ 或 ______。', a: '「通过」/「使」', why: '两个词同时出现会让句子没有主语。' },
    { q: '「他的写作水平明显改进了。」应把「改进」改为 ______。', a: '提高', why: '水平、质量、效率都配「提高」。' },
    { q: '「多美的景色啊」后面应加 ______。', a: '！', why: '赞叹语气，用叹号。' },
    { q: '「书桌上摆着铅笔 橡皮 尺子」空白处应填 ______。', a: '、', why: '并列的词语之间用顿号。' }
  ]
},

/* ------------------------------------------------------------------ 13 */
{
  id: 'cn-read', subject: 'chinese', title: '阅读概括·说明方法·古诗意象',
  sub: '阅读理解最常考的三件事，一张表理清',
  tags: ['概括', '说明方法', '古诗', '意象', '阅读'],
  mnemonic: '概括三刀：找中心、抓要素、删枝叶；<br>说明方法看标志：数字、比方、作比较、举例子、分类别；<br>古诗先找景：月思乡、柳送别、雁传书、梅高洁。',
  blocks: [
    {
      h: '一、概括：不同文体抓不同要素',
      table: {
        head: ['文体', '要抓的要素', '公式'],
        rows: [
          ['写事', '谁 + 做了什么 + 结果', '小明帮妈妈买菜，心里很快乐。'],
          ['写人', '谁 + 什么特点 + 例子', '爷爷是个爱种花的人。'],
          ['写景', '哪里 + 什么样子 + 特点', '秋天的香山红叶似火。'],
          ['说明', '对象 + 主要特点', '松鼠的尾巴又大又蓬松。']
        ]
      },
      note: { type: 'tip', text: '概括三条硬要求：<b>不丢主要信息、不加自己的感想、越短越好</b>。考试一般要求 20–30 字。' }
    },
    {
      h: '二、说明方法：看标志词',
      table: {
        head: ['方法', '标志', '作用'],
        rows: [
          ['列数字', '具体数目、约、多', '准确'],
          ['打比方', '像、好像、仿佛', '形象'],
          ['作比较', '比、相当于、那么', '有参照、好理解'],
          ['举例子', '比如、例如、如', '具体'],
          ['分类别', '分为、一类是……另一类是', '有条理']
        ]
      },
      note: { type: 'warn', text: '一句话可能有两种方法：「舌头有十几头猪那么重」= 列数字 + 作比较。答题时方法 + 作用都要写。' }
    },
    {
      h: '三、古诗意象速查',
      table: {
        head: ['意象', '常表达', '诗句'],
        rows: [
          ['月', '思乡、念亲', '举头望明月，低头思故乡。'],
          ['柳', '送别、挽留', '客舍青青柳色新。'],
          ['雁', '思念、书信', '乡书何处达？归雁洛阳边。'],
          ['梅', '高洁、坚强', '墙角数枝梅，凌寒独自开。'],
          ['竹', '正直、有节', '咬定青山不放松。'],
          ['流水', '时光流逝', '百川东到海，何时复西归？']
        ]
      }
    },
    {
      h: '四、最容易混的 4 组',
      vs: [
        { left: '概括', right: '复述', tip: '概括是压缩、留主干；复述是把内容再讲一遍，篇幅接近原文。' },
        { left: '比喻（记叙文）', right: '打比方（说明文）', tip: '同样的「像」，记叙文里叫比喻，说明文里叫打比方。' },
        { left: '举例子', right: '作比较', tip: '有「比如、例如」是举例子；有「比、相当于」是作比较。' },
        { left: '中心句', right: '过渡句', tip: '中心句概括全段意思，多在段首段尾；过渡句是承上启下。' }
      ]
    }
  ],
  drill: [
    { q: '概括写事类段落，要保留的要素是：谁、______、结果。', a: '做了什么', why: '写事抓人物、事件、结果三要素。' },
    { q: '「赵州桥长五十多米，宽九米多。」用了 ______ 说明方法。', a: '列数字', why: '有具体数目，作用是准确。' },
    { q: '「地球像一叶扁舟。」用了 ______ 说明方法。', a: '打比方', why: '有「像」，把地球比作扁舟，作用是形象。' },
    { q: '「很多动物会冬眠，比如松鼠、刺猬。」用了 ______ 说明方法。', a: '举例子', why: '有「比如」，作用是具体。' },
    { q: '古诗中「柳」常表达 ______ 之情。', a: '送别（挽留）', why: '「柳」谐音「留」，古人折柳送别。' },
    { q: '「举头望明月，低头思故乡」中「月」表达 ______。', a: '思乡', why: '月是古诗中最典型的思乡意象。' }
  ]
}

]);
