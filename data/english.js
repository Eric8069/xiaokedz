/* ==========================================================================
   小课桌 · 英语知识点（人教版 PEP，8 个）
   ========================================================================== */
window.POINTS = (window.POINTS || []).concat([

/* ------------------------------------------------------------------ 1 */
{
  id: 'e4-01', subject: 'english', grade: 4, term: '下', unit: 'Unit 2 What time is it?',
  title: '用英语说时间',
  tags: ['时间', 'o\'clock', 'half past', 'quarter'],
  goal: '会用 o\'clock、half past、a quarter past / to 说出整点、半点、一刻钟，并回答 What time is it?',
  sections: [
    { h: '先记住问句',
      p: '问时间：<b>What time is it?</b> 或者 <b>What\'s the time?</b> 回答用 <b>It\'s …</b>，不要说 "It is time" 就完事，后面要接具体时间。' },
    { h: '三种最常见的说法',
      table: {
        head: ['时间', '英语', '说明'],
        rows: [
          ['3:00', 'It\'s three o\'clock.', '整点用 o\'clock'],
          ['3:30', 'It\'s half past three.', '半点用 half past'],
          ['3:15', 'It\'s a quarter past three.', '过一刻用 a quarter past'],
          ['3:45', 'It\'s a quarter to four.', '差一刻用 a quarter to（下一个整点）']
        ]
      },
      note: { type: 'tip', text: 'past 是"过"，to 是"差"。3:45 已经快到 4 点，所以是 a quarter to <b>four</b>，不是 three。' } },
    { h: '其他分钟数',
      p: '分钟不是 15、30 的时候，用"分钟 + past / to + 小时"。3:20 = twenty past three；3:50 = ten to four。也可以直接读数字：three twenty、three fifty，口语里同样能听懂。' },
    { h: '常见错误',
      note: { type: 'warn', text: '不要按中文顺序说成 three half 或 half to three。英语把"分钟"放在前面，先说分、再说时。' } },
    { h: '用进句子里',
      p: 'It\'s time for English class. / It\'s time to go to school. 这两句是课本里的高频句，注意 for 后面接名词，to 后面接动词。' }
  ],
  figure: {
    type: 'clock',
    title: '拨动指针，说出时间',
    lead: '调时针、分针，看英语表达怎么变。',
    predict: {
      q: '3:30 用英语怎么说？',
      options: ['half past three', 'three half', 'half to three'],
      answer: 0,
      why: '半点固定说 half past + 小时，31 分以后才用 to。'
    },
    insight: '英语时间表达的顺序是<b>先分后时</b>：分钟 + past / to + 小时。15 分钟用 a quarter，30 分钟用 half。',
    frame: 'It\'s （　）. It\'s time for （　）.',
    hint: '把分针拖到 45，注意 to 后面换成下一个整点。'
  },
  example: {
    q: '用英语说出 7:00、9:15、4:45。',
    steps: [
      '7:00 整点 → It\'s seven o\'clock.',
      '9:15 过一刻 → It\'s a quarter past nine.',
      '4:45 差一刻到 5 点 → It\'s a quarter to five.'
    ],
    a: 'It\'s seven o\'clock. / It\'s a quarter past nine. / It\'s a quarter to five.'
  },
  quiz: [
    { q: '8:00 用英语说是：', options: ['eight o\'clock', 'eight half', 'half eight'], answer: 0,
      why: '整点用 o\'clock。' },
    { q: '9:15 应该说：', options: ['a quarter to nine', 'a quarter past nine', 'half past nine'], answer: 1,
      why: '15 分是"过一刻"，用 a quarter past。' },
    { q: '4:45 应该说：', options: ['a quarter past four', 'a quarter to five', 'half past four'], answer: 1,
      why: '45 分是"差一刻到 5 点"，用 a quarter to five。' }
  ],
  cards: [
    { f: '问时间', b: 'What time is it? — It\'s …' },
    { f: '半点怎么说', b: 'half past + 小时' },
    { f: '45 分怎么说', b: 'a quarter to + 下一个整点' }
  ]
},

/* ------------------------------------------------------------------ 2 */
{
  id: 'e4-02', subject: 'english', grade: 4, term: '上', unit: 'Unit 4 My home',
  title: 'Where is it? 方位介词',
  tags: ['介词', 'in', 'on', 'under', 'where'],
  goal: '会用 in、on、under、behind、in front of、next to 说出物品的位置，并回答 Where is …?',
  sections: [
    { h: '问位置',
      p: '问单个物品：<b>Where is the cat?</b> 回答：<b>It\'s in the box.</b> 问多个物品用 <b>Where are the books?</b> 回答 <b>They\'re on the desk.</b>' },
    { h: '六个高频介词',
      table: {
        head: ['介词', '意思', '例子'],
        rows: [
          ['in', '在……里面', 'in the box'],
          ['on', '在……上面（接触）', 'on the desk'],
          ['under', '在……正下方', 'under the chair'],
          ['behind', '在……后面', 'behind the door'],
          ['in front of', '在……前面', 'in front of the house'],
          ['next to', '在……旁边', 'next to the bed']
        ]
      } },
    { h: 'in 和 on 最容易混',
      p: '东西被"包起来"用 <b>in</b>：in the box、in the bag。东西放在表面、有接触用 <b>on</b>：on the desk、on the wall。' },
    { h: '固定搭配要整句记',
      note: { type: 'tip', text: 'on the wall（在墙上）、in the tree（在树上，指长在树上）、on the tree（也是树上，但指挂在树上）。小学阶段先整体记住 on the wall、in the box 这样的短语。' } }
  ],
  figure: {
    type: 'preposition',
    title: '把小猫放到不同位置',
    lead: '切换介词，看小猫和箱子的相对位置，读句子。',
    predict: {
      q: '小猫在箱子里面，应该用哪个词？',
      options: ['on', 'in', 'under'],
      answer: 1,
      why: '被箱子包围、在里面，用 in。on 是放在表面，under 是在下面。'
    },
    insight: '介词不是背中文意思，而是记<b>空间画面</b>：in 是被包住，on 是贴着表面，under 是正下方。',
    frame: 'Where is the cat? — It\'s （　） the box.',
    hint: '切到 behind，看看小猫是不是被箱子挡住了。'
  },
  example: {
    q: '根据图片描述：书在桌子上，猫在椅子下面，球在盒子旁边。',
    steps: [
      '书和桌面接触 → The book is on the desk.',
      '猫在椅子正下方 → The cat is under the chair.',
      '球紧挨着盒子 → The ball is next to the box.'
    ],
    a: 'The book is on the desk. The cat is under the chair. The ball is next to the box.'
  },
  quiz: [
    { q: 'The book is ___ the desk.（书在桌上）', options: ['in', 'on', 'under'], answer: 1,
      why: '和桌面接触，在表面，用 on。' },
    { q: 'The cat is ___ the box.（猫在箱子里）', options: ['in', 'on', 'next to'], answer: 0,
      why: '被箱子围住，用 in。' },
    { q: 'Where ___ the books?', options: ['is', 'are', 'am'], answer: 1,
      why: 'books 是复数，be 动词用 are。' }
  ],
  cards: [
    { f: 'in 和 on 的区别', b: 'in 被包住，on 贴表面。' },
    { f: 'under 是什么意思', b: '在……正下方。' },
    { f: 'Where are the books?', b: 'They\'re on the desk.' }
  ]
},

/* ------------------------------------------------------------------ 3 */
{
  id: 'e4-03', subject: 'english', grade: 4, term: '下', unit: 'Unit 6 Shopping',
  title: 'How much? 购物问价',
  tags: ['购物', 'how much', '单复数', 'yuan'],
  goal: '会用 How much is / are …? 问价格，并用 It\'s / They\'re … yuan. 回答。',
  sections: [
    { h: '问价钱的基本句型',
      p: '单数：<b>How much is the apple?</b> — <b>It\'s three yuan.</b> 复数：<b>How much are the apples?</b> — <b>They\'re six yuan.</b>' },
    { h: '为什么有时用 is，有时用 are',
      p: '看<b>问的东西是几个</b>。一个用 is / It\'s，两个以上用 are / They\'re。这一点和中文不同，中文"多少钱"永远不变。' },
    { h: 'yuan 的用法',
      p: 'yuan 是人民币单位，英语里<b>不加 s</b>：3 yuan、50 yuan。美元才分 dollar / dollars。' },
    { h: '购物常用句',
      ul: [
        'Can I help you? — Yes, please.',
        'I\'d like this one. / I\'ll take it.',
        'How much is it? — It\'s 45 yuan.',
        'That\'s too expensive. / It\'s cheap.'
      ],
      note: { type: 'tip', text: 'this / that 指单数，these / those 指复数。问这些多少钱：How much are these?' } }
  ],
  figure: {
    type: 'shop',
    title: '买几个，句子里用 is 还是 are',
    lead: '换商品、改数量，看问句和答句怎么变。',
    predict: {
      q: '买两个苹果，问价钱应该用：',
      options: ['How much is the apples?', 'How much are the apples?', 'How much the apples?'],
      answer: 1,
      why: 'apples 是复数，be 动词用 are，回答用 They\'re。'
    },
    insight: '英语里 be 动词要跟<b>名词的单复数</b>一致：一个 is，多个 are。价钱本身不决定用哪个。',
    frame: 'How much （　） the （　）? — （　） （　） yuan.',
    hint: '把数量从 1 调到 3，注意 It\'s 变成 They\'re。'
  },
  example: {
    q: '一本书 12 元，买 3 本。用英语问答。',
    steps: [
      '书是复数（3 本），用 are。',
      '问：How much are the books?',
      '答：They\'re 36 yuan.（12 × 3 = 36）'
    ],
    a: 'How much are the books? — They\'re thirty-six yuan.'
  },
  quiz: [
    { q: 'How much ___ this pen?', options: ['is', 'are', 'am'], answer: 0,
      why: 'this pen 是单数，用 is。' },
    { q: 'How much are the apples? — ___ 6 yuan.', options: ['It\'s', 'They\'re', 'They'], answer: 1,
      why: 'apples 是复数，用 They\'re。' },
    { q: '50 元用英语写是：', options: ['50 yuans', '50 yuan', '50 dollar'], answer: 1,
      why: 'yuan 不加 s。' }
  ],
  cards: [
    { f: '问单数价格', b: 'How much is the …? — It\'s … yuan.' },
    { f: '问复数价格', b: 'How much are the …? — They\'re … yuan.' },
    { f: 'yuan 要加 s 吗？', b: '不加，3 yuan 就是正确写法。' }
  ]
},

/* ------------------------------------------------------------------ 4 */
{
  id: 'e5-04', subject: 'english', grade: 5, term: '上', unit: 'Unit 5 There is a big bed',
  title: 'There be 句型：某地有某物',
  tags: ['there be', 'is', 'are', '就近原则'],
  goal: '会用 There is / There are 描述房间里有什么，并注意名词单复数和"就近原则"。',
  sections: [
    { h: '它表示"存在"',
      p: '<b>There is a book on the desk.</b> 意思是"桌上有一本书"。注意它说的是<b>某地有某物</b>，不是"某人有某物"。我有本书要说 I have a book.' },
    { h: '单数用 is，复数用 are',
      p: 'There is + 单数名词；There are + 复数名词。There is a bed. / There are two beds.' },
    { h: '就近原则',
      p: '当有几个并列的名词时，be 动词跟<b>最靠近它的那个名词</b>一致：There <b>is</b> a book and two pens on the desk.（最近的是 a book，用 is）' },
    { h: '否定和疑问',
      ul: [
        '否定：There isn\'t a cat. / There aren\'t any books.',
        '疑问：Is there a park near here? — Yes, there is.',
        '对数量提问：How many books are there?'
      ],
      note: { type: 'warn', text: '否定句和疑问句里，复数名词前常用 any，不用 some。' } }
  ],
  figure: {
    type: 'therebe',
    title: '改变数量，句子跟着变',
    lead: '调整数量、换位置，看 is / are 什么时候切换。',
    predict: {
      q: 'There ___ two apples on the desk.',
      options: ['is', 'are', 'be'],
      answer: 1,
      why: 'two apples 是复数，用 are。'
    },
    insight: 'There be 的 be 动词只看<b>后面的名词</b>：一个用 is，多个用 are。',
    frame: 'There （　） a （　） on the desk. / There （　） three （　） on the desk.',
    hint: '把数量从 1 调到 2，观察句子怎么变。'
  },
  example: {
    q: '描述你的房间：有一张床、两把椅子、一个书架。',
    steps: [
      '一张床是单数 → There is a bed.',
      '两把椅子是复数 → There are two chairs.',
      '一个书架是单数 → There is a bookshelf.',
      '合成一段：There is a bed, two chairs and a bookshelf in my room.（最近的是 a bed，用 is）'
    ],
    a: 'There is a bed, two chairs and a bookshelf in my room.'
  },
  quiz: [
    { q: 'There ___ a book on the desk.', options: ['is', 'are', 'have'], answer: 0,
      why: 'a book 是单数，用 is。' },
    { q: 'There ___ some flowers in the garden.', options: ['is', 'are', 'has'], answer: 1,
      why: 'flowers 是复数，用 are。' },
    { q: 'There is a pen and two books. 这里为什么用 is？', options: ['因为 pen 是单数', '因为书是复数', '因为句子错了'], answer: 0,
      why: '就近原则：be 动词跟最靠近它的 a pen 一致。' }
  ],
  cards: [
    { f: 'There be 表示什么？', b: '某地有某物（不是某人有）。' },
    { f: 'is 还是 are？', b: '看后面名词：单数 is，复数 are。' },
    { f: '就近原则', b: '有多个名词时，跟最近的那个一致。' }
  ]
},

/* ------------------------------------------------------------------ 5 */
{
  id: 'e5-05', subject: 'english', grade: 5, term: '下', unit: 'Unit 5 Whose dog is it?',
  title: '现在进行时：正在发生的事',
  tags: ['现在进行时', 'be + ing', 'now', 'look'],
  goal: '会用 be + 动词-ing 描述正在进行的动作，并记住 now、look、listen 这些标志词。',
  sections: [
    { h: '什么时候用',
      p: '动作<b>此刻正在发生</b>，就用现在进行时。句子里常有 now、look、listen、at the moment 这些提示。' },
    { h: '结构',
      p: '<span class="hl">主语 + am / is / are + 动词-ing</span>。I am reading. He is running. They are playing.' },
    { h: '动词-ing 的变化',
      table: {
        head: ['情况', '变化', '例子'],
        rows: [
          ['一般动词', '直接加 -ing', 'play → playing'],
          ['以不发音 e 结尾', '去 e 加 -ing', 'make → making'],
          ['重读闭音节', '双写末尾字母加 -ing', 'run → running, swim → swimming'],
          ['以 ie 结尾', '变 ie 为 y 加 -ing', 'lie → lying']
        ]
      } },
    { h: '和一般现在时的区别',
      p: '一般现在时说"经常、每天"：I play football every day. 现在进行时说"此刻正在"：I am playing football now. 同一件事，时间不同，形式就不同。' },
    { h: '易错点',
      note: { type: 'warn', text: 'be 动词和 -ing 缺一不可。不能说 He playing，也不能说 He is play。' } }
  ],
  figure: {
    type: 'tense', state: { tense: 'continuous' },
    title: '在时间轴上看见"正在进行"',
    lead: '选"现在进行"，看时间点、动词形式和标志词。',
    predict: {
      q: 'Look! The boys ___ football.',
      options: ['play', 'are playing', 'played'],
      answer: 1,
      why: 'Look! 提示动作正在发生，用现在进行时 are playing。'
    },
    insight: '看到 now / look / listen，先想<b>正在进行</b>；看到 every day / usually，才用一般现在时。',
    frame: 'Look! He （　） （　） now.',
    hint: '切到"一般现在"，比较同一个动词的形式差别。'
  },
  example: {
    q: '用所给动词的适当形式填空：Look! The cat ___ (sleep) under the chair.',
    steps: [
      'Look! 表示动作正在发生，用现在进行时。',
      '主语 the cat 是单数，be 动词用 is。',
      'sleep 直接加 -ing → sleeping。'
    ],
    a: 'is sleeping'
  },
  quiz: [
    { q: 'She ___ a book now.', options: ['reads', 'is reading', 'read'], answer: 1,
      why: 'now 提示现在进行时：is reading。' },
    { q: 'run 的 -ing 形式是：', options: ['runing', 'running', 'runs'], answer: 1,
      why: '重读闭音节，双写 n 再加 -ing。' },
    { q: '下面哪句是现在进行时？', options: ['I go to school every day.', 'I am going to school now.', 'I went to school yesterday.'], answer: 1,
      why: 'be + 动词-ing，且有 now，是现在进行时。' }
  ],
  cards: [
    { f: '现在进行时的结构', b: 'am / is / are + 动词-ing' },
    { f: '三个标志词', b: 'now、look、listen' },
    { f: 'run 怎么变？', b: '双写末尾字母：running。' }
  ]
},

/* ------------------------------------------------------------------ 6 */
{
  id: 'e6-06', subject: 'english', grade: 6, term: '下', unit: 'Unit 1 How tall are you?',
  title: '比较级：比一比谁更高',
  tags: ['比较级', 'than', 'taller', 'heavier'],
  goal: '会用形容词比较级 + than 比较两个人或物，掌握加 -er、双写、变 y 为 i 等规则。',
  sections: [
    { h: '基本句型',
      p: '<b>A + be + 比较级 + than + B.</b> 例如：I\'m taller than you. 注意比较级后面跟 <b>than</b>，不是 then。' },
    { h: '比较级怎么变',
      table: {
        head: ['情况', '规则', '例子'],
        rows: [
          ['一般形容词', '直接加 -er', 'tall → taller'],
          ['以 e 结尾', '加 -r', 'nice → nicer'],
          ['辅音字母 + y 结尾', '变 y 为 i 加 -er', 'heavy → heavier'],
          ['重读闭音节', '双写末尾字母加 -er', 'big → bigger'],
          ['多音节词', '前面加 more', 'beautiful → more beautiful']
        ]
      } },
    { h: '常见的不规则变化',
      p: 'good → better，bad → worse，many / much → more，little → less。这几个只能记。' },
    { h: '回答身高体重',
      p: 'How tall are you? — I\'m 1.52 metres tall. How heavy are you? — I\'m 40 kilograms. 注意 metre 和 kilogram 的拼写。' },
    { h: '易错点',
      note: { type: 'warn', text: '比较级不能"双重比较"：不能说 more taller、tallerer。也不能用 very 修饰比较级，要用 much / a lot。' } }
  ],
  figure: {
    type: 'comparative',
    title: '拖动身高，句子自动变',
    lead: '调两个人的身高，看比较级句子和同义句。',
    predict: {
      q: 'tall 的比较级是：',
      options: ['taller', 'more tall', 'tallerer'],
      answer: 0,
      why: '单音节形容词直接加 -er，不能加 more，也不能重复加。'
    },
    insight: '比较级只变<b>形容词</b>，句型是 A is + 比较级 + than + B。反过来比就用反义词：taller ↔ shorter。',
    frame: 'Tom is （　） than Sam. / Sam is （　） than Tom.',
    hint: '让两个人一样高，句子会变成 as tall as。'
  },
  example: {
    q: '用 heavy 的比较级造句：Tom 45 kg，Sam 38 kg。',
    steps: [
      'heavy 是"辅音字母 + y"结尾，变 y 为 i 加 -er → heavier。',
      'Tom 更重，所以 Tom 放前面。',
      'Tom is heavier than Sam.'
    ],
    a: 'Tom is heavier than Sam.'
  },
  quiz: [
    { q: 'big 的比较级是：', options: ['biger', 'bigger', 'more big'], answer: 1,
      why: '重读闭音节，双写 g 加 -er。' },
    { q: 'heavy 的比较级是：', options: ['heavyer', 'heavier', 'more heavy'], answer: 1,
      why: '辅音字母 + y 结尾，变 y 为 i 加 -er。' },
    { q: 'I\'m ___ than you.', options: ['tall', 'taller', 'tallest'], answer: 1,
      why: '有 than，说明是两者比较，用比较级 taller。' }
  ],
  cards: [
    { f: '比较级句型', b: 'A + be + 比较级 + than + B' },
    { f: 'heavy 怎么变？', b: '变 y 为 i 加 -er：heavier。' },
    { f: 'good 的比较级', b: 'better（不规则）' }
  ]
},

/* ------------------------------------------------------------------ 7 */
{
  id: 'e6-07', subject: 'english', grade: 6, term: '下', unit: 'Unit 2 Last weekend',
  title: '一般过去时：讲昨天的事',
  tags: ['一般过去时', '过去式', 'yesterday', 'did'],
  goal: '会用动词过去式讲述过去发生的事，掌握 -ed 的变化和不规则动词。',
  sections: [
    { h: '什么时候用',
      p: '动作发生在<b>过去</b>，和现在没有直接关系，就用一般过去时。常见标志词：yesterday、last weekend、two days ago、just now、in 2020。' },
    { h: '动词怎么变',
      table: {
        head: ['情况', '规则', '例子'],
        rows: [
          ['一般动词', '加 -ed', 'play → played'],
          ['以 e 结尾', '加 -d', 'like → liked'],
          ['辅音 + y 结尾', '变 y 为 i 加 -ed', 'study → studied'],
          ['重读闭音节', '双写末尾字母加 -ed', 'stop → stopped'],
          ['不规则', '单独记', 'go → went, see → saw, have → had']
        ]
      } },
    { h: '否定和疑问要借 did',
      p: '否定：I <b>didn\'t</b> go to school yesterday. 疑问：<b>Did</b> you go to school yesterday? 注意 did 后面动词<b>必须回到原形</b>：didn\'t went 是错的。' },
    { h: 'be 动词的过去式',
      p: 'am / is → was，are → were。I was at home. They were happy. 否定直接加 not：wasn\'t、weren\'t。' },
    { h: '易错点',
      note: { type: 'warn', text: '句子里一旦出现 did / didn\'t，后面的动词就不能再用过去式。这是考试里最常见的扣分点。' } }
  ],
  figure: {
    type: 'tense', state: { tense: 'past' },
    title: '过去时在时间轴上的位置',
    lead: '选"一般过去"，看时间点、动词形式和标志词。',
    predict: {
      q: 'yesterday 提示句子应该用：',
      options: ['一般现在时', '一般过去时', '一般将来时'],
      answer: 1,
      why: 'yesterday 表示昨天，动作已经发生，用一般过去时。'
    },
    insight: '先找时间标志词，再决定动词形式：<b>yesterday / last … / ago → 过去式</b>。',
    frame: 'Yesterday I （　） （　）. It was fun.',
    hint: '切到"一般现在"，比较 play 和 played。'
  },
  example: {
    q: '用所给动词的适当形式填空：Last weekend I ___ (visit) my grandparents.',
    steps: [
      'Last weekend 是过去时间，用一般过去时。',
      'visit 是规则动词，直接加 -ed → visited。',
      '句意：上周末我拜访了祖父母。'
    ],
    a: 'visited'
  },
  quiz: [
    { q: 'go 的过去式是：', options: ['goed', 'went', 'gone'], answer: 1,
      why: 'go 是不规则动词，过去式是 went。' },
    { q: 'He ___ to Beijing last year.', options: ['go', 'goes', 'went'], answer: 2,
      why: 'last year 是过去时间，用过去式 went。' },
    { q: 'I didn\'t ___ my homework yesterday.', options: ['did', 'do', 'does'], answer: 1,
      why: 'didn\'t 后面动词用原形 do。' }
  ],
  cards: [
    { f: '过去时的标志词', b: 'yesterday、last weekend、… ago' },
    { f: 'did 后面的动词', b: '必须用原形。' },
    { f: 'be 动词过去式', b: 'am / is → was，are → were。' }
  ]
},

/* ------------------------------------------------------------------ 8 */
{
  id: 'e6-08', subject: 'english', grade: 6, term: '上', unit: 'Unit 3 My weekend plan',
  title: '一般将来时：说说明天做什么',
  tags: ['一般将来时', 'will', 'be going to', 'tomorrow'],
  goal: '会用 will 和 be going to 表达计划与预测，掌握 tomorrow、next week 等标志词。',
  sections: [
    { h: '两种说法',
      p: '① <b>will + 动词原形</b>：I will visit my grandma tomorrow. ② <b>be going to + 动词原形</b>：I am going to visit my grandma tomorrow. 两者很多时候可以互换。' },
    { h: '什么时候用哪个',
      table: {
        head: ['形式', '更常用于'],
        rows: [
          ['will', '临时决定、预测、承诺'],
          ['be going to', '已经计划好、有迹象要发生']
        ]
      },
      note: { type: 'tip', text: '小学阶段只要会用两种结构造句即可，不必纠结细微差别。' } },
    { h: '时间标志词',
      p: 'tomorrow、next week、next month、this evening、soon、in the future。看到这些词，动词就用"将来"的形式。' },
    { h: '否定和疑问',
      p: 'will 的否定是 <b>won\'t</b>，疑问把 will 提前：Will you go? — Yes, I will. be going to 的疑问把 be 提前：Are you going to swim?' },
    { h: '易错点',
      note: { type: 'warn', text: 'will 后面一定是动词原形，不能加 s、不能加 ed、不能加 ing。' } }
  ],
  figure: {
    type: 'tense', state: { tense: 'future' },
    title: '将来时在时间轴上的位置',
    lead: '选"一般将来"，对照三种时态的时间点。',
    predict: {
      q: 'tomorrow 提示句子应该用：',
      options: ['一般过去时', '一般现在时', '一般将来时'],
      answer: 2,
      why: 'tomorrow 表示明天，动作还没发生，用一般将来时。'
    },
    insight: '时间轴是最好的判断工具：<b>左边是过去，中间是现在，右边是将来</b>。先定位，再选时态。',
    frame: 'Tomorrow I （　） （　） my grandparents.',
    hint: '在四种时态之间来回切，看同一个动词 play 的四种形态。'
  },
  example: {
    q: '用 be going to 造句：我打算这个周末去看电影。',
    steps: [
      '主语 I，be 动词用 am。',
      '结构：am going to + 动词原形 see。',
      '加时间：this weekend。'
    ],
    a: 'I am going to see a film this weekend.'
  },
  quiz: [
    { q: 'She ___ visit her aunt next week.', options: ['will', 'is', 'did'], answer: 0,
      why: 'next week 是将来时间，用 will + 动词原形。' },
    { q: 'will 后面接：', options: ['动词原形', '动词-ing', '动词过去式'], answer: 0,
      why: 'will 是情态动词，后面永远跟动词原形。' },
    { q: 'Are you going to swim tomorrow? — Yes, ___', options: ['I am', 'I do', 'I will'], answer: 0,
      why: '用 be going to 提问，就用 be 动词回答。' }
  ],
  cards: [
    { f: '将来时的两种结构', b: 'will + 动词原形 / be going to + 动词原形' },
    { f: '标志词', b: 'tomorrow、next week、soon' },
    { f: 'will 的否定', b: 'won\'t（will not）' }
  ]
}
,
/* ------------------------------------------------------------------ 9 */
{
  id: 'e4-09', subject: 'english', grade: 4, term: '下', unit: 'Unit 3 Weather',
  title: '天气与季节：What\'s the weather like?',
  tags: ['天气', 'weather', 'sunny', '季节'],
  goal: '会用 What\'s the weather like? 问天气，用 It\'s sunny / rainy / cold. 回答，并能说出冷热该穿什么。',
  sections: [
    { h: '问天气的两个句子',
      p: '问某地天气：<b>What\'s the weather like in Beijing?</b> 也可以说 <b>How\'s the weather?</b> 回答统一用 <b>It\'s + 天气词</b>。' },
    { h: '天气词表',
      table: {
        head: ['词', '中文', '例句'],
        rows: [
          ['sunny', '晴朗的', 'It\'s sunny today.'],
          ['cloudy', '多云的', 'It\'s cloudy in Shanghai.'],
          ['windy', '有风的', 'It\'s windy outside.'],
          ['rainy', '下雨的', 'It\'s rainy in summer.'],
          ['snowy', '下雪的', 'It\'s snowy in Harbin.'],
          ['hot / cold', '热的 / 冷的', 'It\'s hot in Sanya.'],
          ['warm / cool', '暖和的 / 凉爽的', 'It\'s cool in autumn.']
        ]
      },
      note: { type: 'tip', text: '天气词大多由名词加 <b>-y</b> 变来：rain → rainy，wind → windy，snow → snowy，cloud → cloudy。' } },
    { h: '冷热与穿衣',
      p: '冷热用 hot、cold、warm、cool。提醒别人穿衣：<b>Put on your coat.</b> 脱下：<b>Take off your hat.</b> 注意 put on 和 take off 的宾语如果是代词，要放中间：put it on。' },
    { h: '最容易错的地方',
      note: { type: 'warn', text: '天气的主语是 <b>it</b>：It is sunny. 不能说 Today is sunny. / The weather is sunny today 虽然也对，但小学阶段统一用 It。' } }
  ],
  figure: {
    type: 'weather', state: { w: 'rainy' },
    title: '换城市、换天气，句子跟着变',
    lead: '选一种天气，看问句和答句怎么变。',
    predict: {
      q: '问天气时，答句的主语应该用：',
      options: ['Today', 'It', 'The weather is'],
      answer: 1,
      why: '英语里谈天气固定用 it 作主语：It is sunny. 说成 Today is sunny 是中式英语。'
    },
    insight: '问天气是 <b>What\'s the weather like?</b>，答句永远是 <b>It\'s + 天气词</b>，句式不变，只换形容词。',
    frame: 'What\'s the weather like in （　）? — It\'s （　）.',
    hint: '把天气切到 snowy，再想想哈尔滨的冬天。'
  },
  example: {
    q: '看图回答：北京今天下雨，上海多云。用英语各说一句。',
    steps: [
      '先确定主语用 It。',
      '北京下雨：It\'s rainy in Beijing.',
      '上海多云：It\'s cloudy in Shanghai.'
    ],
    a: 'It\'s rainy in Beijing. It\'s cloudy in Shanghai.'
  },
  quiz: [
    { q: '___ the weather like in Beijing?', options: ['What\'s', 'How', 'Where\'s'], answer: 0,
      why: '问天气的固定句型是 What\'s the weather like…?' },
    { q: 'It\'s ___. Take your umbrella.', options: ['sunny', 'rainy', 'windy'], answer: 1,
      why: '要带伞说明在下雨，用 rainy。' },
    { q: '下面哪句是对的？', options: ['Today is sunny.', 'It is sunny today.', 'It sunny today.'], answer: 1,
      why: '天气用 it 作主语，且要有 be 动词。' }
  ],
  cards: [
    { f: '问天气', b: 'What\'s the weather like in…? / How\'s the weather?' },
    { f: '答天气', b: 'It\'s sunny / rainy / windy / snowy / cloudy.' },
    { f: '天气词怎么来的？', b: '名词加 -y：rain → rainy，wind → windy。' }
  ]
},

/* ------------------------------------------------------------------ 10 */
{
  id: 'e5-10', subject: 'english', grade: 5, term: '上', unit: 'Unit 2 My week',
  title: '频度副词：always 到 never',
  tags: ['频度副词', 'always', 'usually', 'often', 'sometimes', 'never'],
  goal: '能按频率从高到低排列五个频度副词，并把它们放在句子里正确的位置。',
  sections: [
    { h: '五个副词，一条尺子',
      p: '把它们想成一条从 100% 到 0% 的尺子：<b>always</b>（总是，100%）→ <b>usually</b>（通常，约 85%）→ <b>often</b>（经常，约 65%）→ <b>sometimes</b>（有时，约 35%）→ <b>never</b>（从不，0%）。' },
    { h: '位置只有两条规则',
      ul: [
        '<b>实义动词前</b>：I <b>always</b> get up at 6:30. / She <b>often</b> plays football.',
        '<b>be 动词、助动词后</b>：She is <b>always</b> late. / I don\'t <b>usually</b> eat out.'
      ],
      note: { type: 'warn', text: '不要说 I get up always at 6:30，也不要说 She always is late。位置错了意思还是那个意思，但一听就不地道。' } },
    { h: '问频率',
      p: '<b>How often do you…?</b> 回答可以用频度副词，也可以说具体次数：Twice a week.（一周两次）' },
    { h: '和一般现在时绑在一起',
      p: '频度副词描述的是"经常发生"的习惯，所以句子用<b>一般现在时</b>。主语是 he / she / it 时，动词要加 s。' }
  ],
  figure: {
    type: 'frequency',
    title: '把副词放到频率尺上',
    lead: '点一个副词，看它在 0–100% 上的位置和句子里的位置。',
    predict: {
      q: '"我总是 6:30 起床"，always 应该放在哪里？',
      options: ['I get up always at 6:30.', 'I always get up at 6:30.', 'Always I get up at 6:30.'],
      answer: 1,
      why: '频度副词放在实义动词 get up 的前面。'
    },
    insight: '位置口诀：<b>实义动词前，be 动词后</b>。记住这两条，五个副词都不会放错。',
    frame: 'I （　） get up at 6:30.（总是）',
    hint: '切到 never，看它在 0% 的位置，句子里的位置却不变。'
  },
  example: {
    q: '用 usually 改写：I go to school by bus.（我通常坐公交上学）',
    steps: [
      'go 是实义动词，usually 放在它前面。',
      '主语 I 不是三单，动词不变。',
      'I usually go to school by bus.'
    ],
    a: 'I usually go to school by bus.'
  },
  quiz: [
    { q: 'She ___ late for school.', options: ['always is', 'is always', 'always'], answer: 1,
      why: 'be 动词后面放频度副词：is always late。' },
    { q: '频率最高的是：', options: ['often', 'usually', 'always'], answer: 2,
      why: 'always 是 100%，usually 约 85%，often 约 65%。' },
    { q: 'He ___ plays football after school.', options: ['often', 'often is', 'is often'], answer: 0,
      why: '实义动词 plays 前面用 often。' }
  ],
  cards: [
    { f: '五个频度副词排序', b: 'always > usually > often > sometimes > never' },
    { f: '位置规则', b: '实义动词前，be 动词 / 助动词后。' },
    { f: '问频率', b: 'How often do you…? — Twice a week.' }
  ]
},

/* ------------------------------------------------------------------ 11 */
{
  id: 'e5-11', subject: 'english', grade: 5, term: '下', unit: 'Unit 3 My school calendar',
  title: '日期与序数词',
  tags: ['日期', '序数词', 'month', 'birthday'],
  goal: '会写出和读出英语日期（May 1st），知道什么时候用 in、什么时候用 on。',
  sections: [
    { h: '十二个月先背熟',
      p: 'January、February、March、April、May、June、July、August、September、October、November、December。月份首字母<b>永远大写</b>。' },
    { h: '日期要用序数词',
      table: {
        head: ['规律', '例子'],
        rows: [
          ['一般加 -th', 'four → fourth（4th），six → sixth（6th）'],
          ['1、2、3 特殊', 'one → first（1st），two → second（2nd），three → third（3rd）'],
          ['8、9、12 去字母再加', 'eight → eighth，nine → ninth，twelve → twelfth'],
          ['几十几，只变个位', 'twenty-one → twenty-first（21st）'],
          ['11、12、13 都是 -th', 'eleventh、twelfth、thirteenth']
        ]
      } },
    { h: '写法与读法',
      p: '写：<b>May 1st</b> 或 <b>May 1</b>；读：<b>May the first</b>。中文的"5月1日"在英语里是"月份在前、日期在后"，和中文顺序相反。' },
    { h: 'in 还是 on',
      note: { type: 'tip', text: '只说月份用 <b>in</b>：in May；具体到某一天用 <b>on</b>：on May 1st。这一点和中文习惯不一样，考试常考。' },
      p: '问生日：<b>When is your birthday?</b> — <b>It\'s in May.</b> / <b>It\'s on May 1st.</b>' }
  ],
  figure: {
    type: 'date', state: { m: 5, d: 1 },
    title: '翻日历，读日期',
    lead: '调月份和日期，看英文写法和序数词怎么变。',
    predict: {
      q: '5 月 1 日的英文写法是：',
      options: ['May 1th', 'May 1st', 'May 1rd'],
      answer: 1,
      why: '1 的序数词是 first，缩写是 1st。只有 2 是 2nd、3 是 3rd，其余都是 th。'
    },
    insight: '序数词缩写看<b>最后一个数字</b>：1→st、2→nd、3→rd，但 11、12、13 例外，都是 th。',
    frame: 'My birthday is （　） May.（只说到月份）',
    hint: '把日期调到 21，看是不是 21st 而不是 21th。'
  },
  example: {
    q: '用英语写出并读出：5 月 1 日、3 月 8 日、12 月 25 日。',
    steps: [
      '5 月 1 日 → May 1st，读 May the first。',
      '3 月 8 日 → March 8th，读 March the eighth（eight 去 t 加 th）。',
      '12 月 25 日 → December 25th，读 December the twenty-fifth。'
    ],
    a: 'May 1st / March 8th / December 25th'
  },
  quiz: [
    { q: '3 的序数词缩写是：', options: ['3th', '3rd', '3st'], answer: 1,
      why: 'three → third，缩写 3rd。' },
    { q: 'My birthday is ___ October.', options: ['in', 'on', 'at'], answer: 0,
      why: '只说月份，用 in。' },
    { q: 'Children\'s Day is ___ June 1st.', options: ['in', 'on', 'at'], answer: 1,
      why: '具体到某一天，用 on。' }
  ],
  cards: [
    { f: '1、2、3 的序数词', b: 'first (1st)、second (2nd)、third (3rd)' },
    { f: '11、12、13 有什么特别？', b: '都是 -th：11th、12th、13th，不是 11st。' },
    { f: 'in 还是 on？', b: '月份用 in，具体某天用 on。' }
  ]
},

/* ------------------------------------------------------------------ 12 */
{
  id: 'e5-14', subject: 'english', grade: 5, term: '上', unit: 'Unit 4 What can you do?',
  title: '情态动词 can / must / should',
  tags: ['情态动词', 'can', 'must', 'should'],
  goal: '掌握 can、must、should 的意思和用法，知道它们后面都跟动词原形，并会写否定形式。',
  sections: [
    { h: '三个词，三种语气',
      table: {
        head: ['情态动词', '意思', '用法', '例句'],
        rows: [
          ['can', '能、会', '能力；也可以表示许可', 'I can swim. / Can I go out?'],
          ['should', '应该', '提建议，语气中等', 'You should do your homework.'],
          ['must', '必须', '规定、必须做，语气最强', 'You must wear a helmet.']
        ]
      } },
    { h: '否定形式要记牢',
      p: '<b>can\'t</b>（不会 / 不可以）、<b>shouldn\'t</b>（不应该）、<b>mustn\'t</b>（禁止）。注意 mustn\'t 不是"不必"，"不必"是 don\'t have to。' },
    { h: '后面永远跟原形',
      p: '<span class="hl">can / must / should 后面直接跟动词原形</span>，不加 s、不加 ed、不加 ing。这一点和助动词一样。' },
    { h: '换个说法',
      p: 'can 的疑问句把 can 提前：Can you swim? — Yes, I can. / No, I can\'t. must 和 should 同理：Should I go? / Must I finish it now?' },
    { h: '易错点',
      note: { type: 'warn', text: 'He can swims. ✗ → He can swim. ✓ 主语是三单也不影响，因为情态动词已经"管住"了动词形式。' } }
  ],
  figure: {
    type: 'modal', state: { m: 'must' },
    title: '语气由弱到强',
    lead: '切换三个情态动词，看句子、否定和语气强度。',
    predict: {
      q: 'must 后面的动词应该用什么形式？',
      options: ['加 s', '用原形', '加 ing'],
      answer: 1,
      why: '情态动词后面的动词一律用原形：You must wear a helmet.'
    },
    insight: '情态动词像一个"盖子"，盖住后面的动词，让它只能是<b>原形</b>。',
    frame: 'You （　） wear a helmet.（必须）',
    hint: '切到 should，感受一下语气从"必须"变成"建议"。'
  },
  example: {
    q: '用 must 改写：You wear a helmet. 并改成否定句。',
    steps: [
      'must 后面跟动词原形 wear。',
      '肯定：You must wear a helmet.',
      '否定：must 后面加 not，缩写成 mustn\'t。'
    ],
    a: 'You must wear a helmet. / You mustn\'t wear a helmet.'
  },
  quiz: [
    { q: 'She can ___ very well.', options: ['sings', 'sing', 'singing'], answer: 1,
      why: 'can 后面跟动词原形。' },
    { q: 'You ___ cross the road when the light is red.', options: ['must', 'mustn\'t', 'can'], answer: 1,
      why: '红灯不能过马路，用 mustn\'t 表示禁止。' },
    { q: 'should 的否定形式是：', options: ['shouldn\'t', 'don\'t should', 'not should'], answer: 0,
      why: '直接在 should 后面加 not，缩写成 shouldn\'t。' }
  ],
  cards: [
    { f: '三个情态动词的语气', b: 'can（能力）< should（建议）< must（必须）' },
    { f: '后面跟什么？', b: '一律跟动词原形。' },
    { f: 'mustn\'t 和 don\'t have to', b: 'mustn\'t 是禁止；don\'t have to 是不必。' }
  ]
},

/* ------------------------------------------------------------------ 13 */
{
  id: 'e6-12', subject: 'english', grade: 6, term: '上', unit: 'Unit 1 How can I get there?',
  title: '问路与指路',
  tags: ['问路', 'turn left', 'go straight', 'crossing'],
  goal: '会用 How can I get to…? 问路，用 Go straight / Turn left / Turn right 指路。',
  sections: [
    { h: '怎么问',
      p: '<b>How can I get to the museum?</b>（我怎么去博物馆？）也可以说 <b>Where is the museum?</b> 或者 <b>Is there a museum near here?</b>' },
    { h: '指路四句话',
      table: {
        head: ['英语', '中文', '用法'],
        rows: [
          ['Go straight.', '一直往前走。', '直行'],
          ['Turn left.', '向左转。', '第一个路口左转'],
          ['Turn right.', '向右转。', '第一个路口右转'],
          ['At the crossing.', '在十字路口。', '常和 turn 连用'],
          ['It\'s next to…', '它在……旁边。', '补充位置'],
          ['It\'s between A and B.', '在 A 和 B 之间。', '两个参照物']
        ]
      },
      note: { type: 'tip', text: 'left / right 是副词，前面不加介词：Turn left. 不说 Turn to left。' } },
    { h: '礼貌一点',
      p: '开头加 <b>Excuse me</b>，结尾说 <b>Thank you</b>。别人道谢时回答 <b>You\'re welcome.</b> 这三句是真实场景里最有用的。' },
    { h: '易错点',
      note: { type: 'warn', text: 'go straight 里 straight 是副词，不能写成 straightly；turn left / right 也不加 to。' } }
  ],
  figure: {
    type: 'directions',
    title: '按指令走到学校',
    lead: '点"向前走 / 左转 / 右转"，把小人从家带到学校。',
    predict: {
      q: '"一直往前走"用英语怎么说？',
      options: ['Go straight.', 'Go straightly.', 'Go to straight.'],
      answer: 0,
      why: 'straight 本身就是副词，不需要加 -ly，也不加 to。'
    },
    insight: '指路就是把三个动作串起来：<b>先直走，到路口再转弯</b>。句型都很短，说慢一点对方反而更清楚。',
    frame: 'Excuse me, how can I get to the school? — （　） straight and （　） left.',
    hint: '先从家向右走两步，再左转向上，就能到学校。'
  },
  example: {
    q: '把路线说成英语：从家出发，向右走，然后左转，一直走到学校。',
    steps: [
      '起步：Go straight.',
      '到路口左转：Turn left at the crossing.',
      '继续直走：Go straight again. The school is on your right.'
    ],
    a: 'Go straight. Turn left at the crossing. Go straight again. The school is on your right.'
  },
  quiz: [
    { q: '___ left at the crossing.', options: ['Turn', 'Go', 'Take'], answer: 0,
      why: '转弯用 turn：Turn left / Turn right。' },
    { q: 'How can I get ___ the park?', options: ['to', 'at', 'in'], answer: 0,
      why: 'get to 表示"到达"。' },
    { q: 'It\'s ___ the bank and the shop.', options: ['between', 'next', 'behind'], answer: 0,
      why: '在两者之间用 between A and B。' }
  ],
  cards: [
    { f: '问路', b: 'How can I get to…? / Where is…?' },
    { f: '三个指路短语', b: 'Go straight. / Turn left. / Turn right.' },
    { f: 'left 前要加 to 吗？', b: '不加：Turn left. 不是 Turn to left。' }
  ]
},

/* ------------------------------------------------------------------ 14 */
{
  id: 'e6-13', subject: 'english', grade: 6, term: '上', unit: 'Unit 5 What does he do?',
  title: '职业：What does he do?',
  tags: ['职业', 'job', 'does', '三单'],
  goal: '会问别人的职业和工作地点，并能用 He\'s a… / He works in… 回答，注意三单形式。',
  sections: [
    { h: '两个问句',
      p: '问职业：<b>What does he do?</b> = <b>What\'s his job?</b> 问工作地点：<b>Where does he work?</b> 注意主语是 he / she，所以用 <b>does</b>，不用 do。' },
    { h: '常见职业',
      table: {
        head: ['职业', '中文', '工作地点'],
        rows: [
          ['doctor', '医生', 'in a hospital'],
          ['teacher', '老师', 'in a school'],
          ['driver', '司机', 'in a bus company'],
          ['cook', '厨师', 'in a restaurant'],
          ['farmer', '农民', 'on a farm'],
          ['police officer', '警察', 'in a police station'],
          ['singer', '歌手', 'on a stage'],
          ['writer', '作家', 'at home']
        ]
      } },
    { h: '回答时的三单',
      p: 'He <b>works</b> in a hospital.（work 加 s）She <b>teaches</b> English.（teach 加 es）。否定和疑问里动词回原形：He doesn\'t work here. / Does he work here?' },
    { h: '问"你将来想做什么"',
      p: '<b>What do you want to be?</b> — <b>I want to be a doctor.</b> 注意这里主语是 you，用 do，不用 does。' }
  ],
  figure: {
    type: 'job',
    title: '换职业，换句子',
    lead: '选一个职业，看问句、答句和工作地点怎么变。',
    predict: {
      q: 'What ___ he do?',
      options: ['do', 'does', 'is'],
      answer: 1,
      why: '主语 he 是第三人称单数，助动词用 does，后面动词用原形 do。'
    },
    insight: '问职业用 <b>does</b> 是因为主语是 he / she；一旦用了 does，后面的动词就回到原形。',
    frame: 'What does he do? — He\'s a （　）.',
    hint: '切到 cook，注意工作地点用的是 in a restaurant。'
  },
  example: {
    q: '根据提示写两句话：Tom 的爸爸是医生，在医院工作。',
    steps: [
      '问职业用 He\'s a doctor.',
      '工作地点用 He works in a hospital.（work 加 s）',
      '两句都用 he 作主语，动词要注意三单。'
    ],
    a: 'He\'s a doctor. He works in a hospital.'
  },
  quiz: [
    { q: 'What ___ your mother do?', options: ['do', 'does', 'is'], answer: 1,
      why: 'your mother 相当于 she，用 does。' },
    { q: 'He ___ in a school.', options: ['work', 'works', 'working'], answer: 1,
      why: '主语 he 是三单，动词加 s。' },
    { q: '— What\'s his job? — ___', options: ['He\'s a driver.', 'He\'s driving.', 'He driver.'], answer: 0,
      why: '问职业回答"他是……"，用 He\'s a + 职业。' }
  ],
  cards: [
    { f: '问职业', b: 'What does he do? / What\'s his job?' },
    { f: '问工作地点', b: 'Where does he work? — He works in…' },
    { f: '三单要注意什么？', b: 'does 提问、works 加 s，用了 does 就回原形。' }
  ]
}

]);
