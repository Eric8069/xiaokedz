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
  id: 'noun', subject: 'grammar', title: '名词、代词与冠词',
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

]);
