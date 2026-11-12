/* ==========================================================================
   小课桌 · 语法知识点（按 PEP 出现顺序归纳，7 个）
   ========================================================================== */
window.POINTS = (window.POINTS || []).concat([

/* ------------------------------------------------------------------ 1 */
{
  id: 'g4-01', subject: 'grammar', grade: 4, term: '上', unit: '语法专题 · 名词',
  title: '名词单复数：加 s 还是加 es',
  tags: ['名词', '复数', '规则变化', '不规则'],
  goal: '能根据词尾判断名词复数加 -s、-es 还是变 y 为 i，并记住常见不规则复数。',
  sections: [
    { h: '先分清可数不可数',
      p: '能一个一个数的名词是可数名词，有单复数：a book / two books。不能直接数的是不可数名词，没有复数：water、milk、rice、bread。' },
    { h: '规则变化看词尾',
      table: {
        head: ['词尾情况', '变化', '例子'],
        rows: [
          ['一般情况', '加 -s', 'cat → cats, book → books'],
          ['s、x、ch、sh 结尾', '加 -es', 'bus → buses, box → boxes, watch → watches'],
          ['辅音字母 + y 结尾', '变 y 为 i 加 -es', 'baby → babies, city → cities'],
          ['元音字母 + y 结尾', '直接加 -s', 'boy → boys, day → days'],
          ['f / fe 结尾', '多数变 f 为 v 加 -es', 'knife → knives, leaf → leaves'],
          ['o 结尾', '有的加 -es，有的加 -s', 'potato → potatoes, photo → photos']
        ]
      },
      note: { type: 'tip', text: 'o 结尾的单词要单独记：potato、tomato、hero 加 -es；photo、piano、radio 加 -s。' } },
    { h: '不规则变化只能记',
      p: 'man → men，woman → women，child → children，foot → feet，tooth → teeth，mouse → mice。还有一些单复数同形：sheep、fish、deer。' },
    { h: '易错点',
      note: { type: 'warn', text: '不是所有以 y 结尾的都变 ies：day → days（y 前面是元音字母 a）。判断要看 y <b>前面那个字母</b>。' } }
  ],
  figure: {
    type: 'wordform', state: { mode: 'plural' },
    title: '复数变化器',
    lead: '点不同的词，看词尾怎么变、为什么这么变。',
    predict: {
      q: 'box 的复数形式是：',
      options: ['boxs', 'boxes', 'boxies'],
      answer: 1,
      why: '以 x 结尾，加 -es。s、x、ch、sh 结尾都加 -es。'
    },
    insight: '判断复数不是看"字母长得像不像"，而是看<b>词尾类型</b>：s/x/ch/sh 加 es，辅音 + y 变 ies。',
    frame: '一个 box，两个 （　）；一个 baby，两个 （　）。',
    hint: '点 knife，看看 f 变成什么了。'
  },
  example: {
    q: '写出下列名词的复数：box、baby、knife、man、sheep',
    steps: [
      'box 以 x 结尾 → boxes。',
      'baby 是辅音字母 b + y → babies。',
      'knife 以 fe 结尾 → knives。',
      'man 不规则 → men；sheep 单复数同形 → sheep。'
    ],
    a: 'boxes, babies, knives, men, sheep'
  },
  quiz: [
    { q: 'watch 的复数是：', options: ['watchs', 'watches', 'watchies'], answer: 1,
      why: '以 ch 结尾，加 -es。' },
    { q: 'city 的复数是：', options: ['citys', 'cities', 'cityes'], answer: 1,
      why: '辅音字母 t + y，变 y 为 i 加 -es。' },
    { q: 'child 的复数是：', options: ['childs', 'childes', 'children'], answer: 2,
      why: 'child 是不规则变化，复数是 children。' }
  ],
  cards: [
    { f: '什么时候加 -es？', b: '以 s、x、ch、sh 结尾。' },
    { f: 'baby 为什么变 babies？', b: '辅音字母 b + y，变 y 为 i 加 -es。' },
    { f: '单复数同形的词', b: 'sheep、fish、deer。' }
  ]
},

/* ------------------------------------------------------------------ 2 */
{
  id: 'g4-02', subject: 'grammar', grade: 4, term: '下', unit: '语法专题 · 代词',
  title: '人称代词与物主代词',
  tags: ['代词', '主格', '宾格', '物主代词'],
  goal: '能分清主格、宾格、形容词性物主代词和名词性物主代词，并选对形式。',
  sections: [
    { h: '四种形式，四个位置',
      table: {
        head: ['形式', '作用', '例子'],
        rows: [
          ['主格', '做主语，放在动词前', 'She is my sister.'],
          ['宾格', '做宾语，放在动词或介词后', 'Give it to her.'],
          ['形容词性物主', '后面必须跟名词', 'her book'],
          ['名词性物主', '单独用，后面不跟名词', 'The book is hers.']
        ]
      } },
    { h: '一句话记住区别',
      p: '<b>后面有名词，用 my / your / her；后面没名词，用 mine / yours / hers。</b>This is my book. = This book is mine.' },
    { h: '容易错的几个',
      ul: [
        'its 和 it\'s 不是一回事：its 是"它的"，it\'s 是 it is 的缩写。',
        'he 的宾格是 him，不是 he。',
        'they 的形容词性物主是 their，名词性是 theirs。'
      ],
      note: { type: 'warn', text: '常见错误：This is she book. 应为 This is her book. 主语用 she，但修饰名词要用 her。' } }
  ],
  figure: {
    type: 'pronoun',
    title: '一张表看清四种形式',
    lead: '点任意一个人称，看它的四种形式和例句。',
    predict: {
      q: '"这本书是我的"，英语应该说：',
      options: ['This book is my.', 'This book is mine.', 'This book is me.'],
      answer: 1,
      why: '后面没有名词，要用名词性物主代词 mine。my 后面必须跟名词。'
    },
    insight: '主格做主语，宾格做宾语，物主代词表"谁的"。<b>看后面有没有名词</b>是选 my 还是 mine 的唯一标准。',
    frame: 'This is （　） book. It\'s （　）.',
    hint: '点 she，比较 her 和 hers 的例句。'
  },
  example: {
    q: '填空：① This is ___ (I) pen. ② The red bag is ___ (she). ③ Give ___ (he) the book.',
    steps: [
      '① pen 是名词，前面用形容词性物主 my。',
      '② 后面没有名词，用名词性物主 hers。',
      '③ 在动词 give 后面做宾语，用宾格 him。'
    ],
    a: '① my　② hers　③ him'
  },
  quiz: [
    { q: 'This is ___ book.（她的）', options: ['she', 'her', 'hers'], answer: 1,
      why: 'book 是名词，前面用形容词性物主 her。' },
    { q: 'The pen is ___.（我的）', options: ['my', 'mine', 'me'], answer: 1,
      why: '后面没有名词，用名词性物主 mine。' },
    { q: 'Give ___ the ball.（给他）', options: ['he', 'him', 'his'], answer: 1,
      why: '动词后面做宾语，用宾格 him。' }
  ],
  cards: [
    { f: 'my 和 mine 怎么选？', b: '后面有名词用 my，没名词用 mine。' },
    { f: 'he 的宾格', b: 'him' },
    { f: 'its 和 it\'s', b: 'its 是"它的"，it\'s 是 it is。' }
  ]
},

/* ------------------------------------------------------------------ 3 */
{
  id: 'g4-03', subject: 'grammar', grade: 4, term: '上', unit: '语法专题 · be 动词',
  title: 'be 动词：am、is、are 怎么选',
  tags: ['be动词', 'am', 'is', 'are'],
  goal: '能根据主语选对 am / is / are，并正确写出否定句和一般疑问句。',
  sections: [
    { h: '一句口诀',
      p: '<b>我用 am，你用 are，is 跟着他她它；单数名词用 is，复数名词全用 are。</b>' },
    { h: '对照表',
      table: {
        head: ['主语', 'be 动词', '例子'],
        rows: [
          ['I', 'am', 'I am a student.'],
          ['you / we / they', 'are', 'You are my friend.'],
          ['he / she / it', 'is', 'She is tall.'],
          ['单数名词', 'is', 'The cat is cute.'],
          ['复数名词', 'are', 'The cats are cute.']
        ]
      } },
    { h: '缩写',
      p: 'I\'m、you\'re、he\'s、she\'s、it\'s、we\'re、they\'re。否定缩写：isn\'t、aren\'t（am not 一般不缩写）。' },
    { h: '否定与疑问',
      p: '否定：在 be 后面加 not。She isn\'t a teacher. 疑问：把 be 提到句首。Is she a teacher? 回答：Yes, she is. / No, she isn\'t.' },
    { h: '易错点',
      note: { type: 'warn', text: '句子里已经有 be 动词，就不能再加 do / does。不能说 Does she is a teacher?' } }
  ],
  figure: {
    type: 'sentence', state: { kind: 'be' },
    title: 'be 动词句的两种变身',
    lead: '选"be 动词"句子，切换否定句和一般疑问句。',
    predict: {
      q: '"She is a teacher." 的否定句是：',
      options: ['She not is a teacher.', 'She isn\'t a teacher.', 'She doesn\'t is a teacher.'],
      answer: 1,
      why: '有 be 动词就直接在 is 后面加 not，缩写成 isn\'t。'
    },
    insight: '有 be 动词时，否定和疑问都靠 be 自己完成，<b>不需要 do / does</b>。',
    frame: 'She （　） a teacher. 否定：She （　） a teacher. 疑问：（　） she a teacher?',
    hint: '切到"一般疑问句"，看 Is 跑到哪里去了。'
  },
  example: {
    q: '把 "They are students." 改成否定句和一般疑问句。',
    steps: [
      '找 be 动词：are。',
      '否定：are 后面加 not → They aren\'t students.',
      '疑问：Are 提前 → Are they students? 回答 Yes, they are.'
    ],
    a: 'They aren\'t students. / Are they students?'
  },
  quiz: [
    { q: 'I ___ a pupil.', options: ['am', 'is', 'are'], answer: 0, why: '主语是 I，用 am。' },
    { q: 'The books ___ new.', options: ['is', 'are', 'am'], answer: 1, why: 'books 是复数，用 are。' },
    { q: '___ she your sister?', options: ['Is', 'Are', 'Does'], answer: 0,
      why: '主语 she 是单数，be 动词用 Is，提到句首构成疑问句。' }
  ],
  cards: [
    { f: 'be 动词口诀', b: '我用 am，你用 are，is 跟着他她它。' },
    { f: '否定怎么变？', b: 'be 后面加 not：isn\'t / aren\'t。' },
    { f: '疑问怎么变？', b: '把 be 动词提到句首。' }
  ]
},

/* ------------------------------------------------------------------ 4 */
{
  id: 'g5-04', subject: 'grammar', grade: 5, term: '上', unit: '语法专题 · 动词三单',
  title: '动词第三人称单数',
  tags: ['三单', '一般现在时', 'does', '动词变化'],
  goal: '能在主语是 he / she / it 时把动词变成三单形式，并在否定和疑问句中还原动词原形。',
  sections: [
    { h: '什么时候要变',
      p: '一般现在时里，主语是<b>第三人称单数</b>（he、she、it、my father、the cat 等"一个他/她/它"）时，动词要加 -s 或 -es。' },
    { h: '变化规则',
      table: {
        head: ['词尾情况', '变化', '例子'],
        rows: [
          ['一般动词', '加 -s', 'play → plays'],
          ['以 e 结尾', '加 -s', 'like → likes'],
          ['s、x、ch、sh、o 结尾', '加 -es', 'go → goes, watch → watches'],
          ['辅音字母 + y 结尾', '变 y 为 i 加 -es', 'study → studies'],
          ['不规则', '单独记', 'have → has, be → is, do → does']
        ]
      } },
    { h: '否定和疑问要"打回原形"',
      p: 'He plays football. → He <b>doesn\'t play</b> football. → <b>Does</b> he <b>play</b> football? 一旦用了 does / doesn\'t，后面动词必须回到原形。' },
    { h: '易错点',
      note: { type: 'warn', text: 'doesn\'t 后面加 -s 是最常见的错误：He doesn\'t plays. 应该写成 He doesn\'t play.' } }
  ],
  figure: {
    type: 'wordform', state: { mode: 'third' },
    title: '三单变化器',
    lead: '切到"动词三单"，逐个看规则和例外。',
    predict: {
      q: 'go 的第三人称单数形式是：',
      options: ['gos', 'goes', 'goies'],
      answer: 1,
      why: '以 o 结尾的动词加 -es，go → goes。'
    },
    insight: '三单变化和名词复数很像，但注意 <b>have → has</b> 这种不规则变化，只能单独记。',
    frame: 'He （　） （　） football every day.（play）',
    hint: '点 be，看看它的三单是什么。'
  },
  example: {
    q: '用所给动词的适当形式填空：① He ___ (like) apples. ② She ___ (not watch) TV. ③ ___ your brother ___ (go) to school by bus?',
    steps: [
      '① 主语 He，动词加 -s → likes。',
      '② 否定句用 doesn\'t，后面动词还原 → doesn\'t watch。',
      '③ 一般疑问句用 Does 开头，动词还原 → Does … go。'
    ],
    a: '① likes　② doesn\'t watch　③ Does; go'
  },
  quiz: [
    { q: 'She ___ to school every day.', options: ['go', 'goes', 'going'], answer: 1,
      why: '主语 She 是三单，go 加 -es。' },
    { q: 'He doesn\'t ___ TV.', options: ['watches', 'watch', 'watching'], answer: 1,
      why: 'doesn\'t 后面动词必须用原形。' },
    { q: 'have 的三单形式是：', options: ['haves', 'has', 'haves'], answer: 1,
      why: 'have 是不规则变化，三单是 has。' }
  ],
  cards: [
    { f: '什么时候变三单？', b: '一般现在时，主语是 he / she / it 等第三人称单数。' },
    { f: 'doesn\'t 后面用什么？', b: '动词原形。' },
    { f: 'study 怎么变？', b: '变 y 为 i 加 -es：studies。' }
  ]
},

/* ------------------------------------------------------------------ 5 */
{
  id: 'g5-05', subject: 'grammar', grade: 5, term: '下', unit: '语法专题 · 疑问句',
  title: '特殊疑问词：问什么用什么',
  tags: ['疑问词', 'what', 'where', 'when', 'who'],
  goal: '能根据划线部分选择合适的疑问词，并写出语序正确的特殊疑问句。',
  sections: [
    { h: '常见疑问词',
      table: {
        head: ['疑问词', '问什么', '例子'],
        rows: [
          ['What', '什么', 'What is this?'],
          ['Where', '在哪里', 'Where is my bag?'],
          ['When / What time', '什么时候 / 几点', 'When do you get up?'],
          ['Who', '谁', 'Who is that girl?'],
          ['Whose', '谁的', 'Whose book is this?'],
          ['Why', '为什么', 'Why are you late?'],
          ['How', '怎么样', 'How are you?'],
          ['How many', '多少（可数）', 'How many books?']
        ]
      } },
    { h: '句子结构',
      p: '<b>疑问词 + 一般疑问句语序？</b> 例如：Where <b>is</b> the book? Where <b>do</b> you live? 注意疑问词后面不能直接跟陈述句语序。' },
    { h: '看划线部分定疑问词',
      p: '划线是"地点"用 Where，是"时间"用 When / What time，是"人"用 Who，是"物品"用 What，是"数量"用 How many。' },
    { h: '易错点',
      note: { type: 'warn', text: 'Who 做主语时后面直接跟动词，不加 do：Who is reading?（不是 Who does reading?）' } }
  ],
  figure: {
    type: 'whword',
    title: '给划线部分选疑问词',
    lead: '看句子里的划线部分，先自己选，再看答案。',
    predict: {
      q: '划线部分是 "at six"（时间），应该用哪个疑问词？',
      options: ['What', 'When', 'Where'],
      answer: 1,
      why: '问时间用 When，也可以用 What time。'
    },
    insight: '疑问词不是猜出来的，而是<b>由划线部分回答的是"什么信息"</b>决定的：地点、时间、人物、原因、数量。',
    frame: 'I get up at six. → （　） do you get up?',
    hint: '换到第 3 句，注意 Where 后面 is 的位置。'
  },
  example: {
    q: '对划线部分提问：She is my sister.（划线：my sister）',
    steps: [
      '划线部分回答的是"谁"，用 Who。',
      '原句有 be 动词 is，把 is 提前。',
      'Who is she?'
    ],
    a: 'Who is she?'
  },
  quiz: [
    { q: '对 "on the desk" 提问，用：', options: ['When', 'Where', 'Who'], answer: 1,
      why: 'on the desk 表示地点，用 Where。' },
    { q: '对 "Monday" 提问，用：', options: ['What day', 'What time', 'How'], answer: 0,
      why: '问星期几用 What day。' },
    { q: '___ is reading? — Tom.', options: ['Who', 'Where', 'What'], answer: 0,
      why: '问"谁"用 Who，Who 做主语时后面直接跟动词。' }
  ],
  cards: [
    { f: '问地点用什么？', b: 'Where' },
    { f: '问时间用什么？', b: 'When 或 What time' },
    { f: '特殊疑问句的语序', b: '疑问词 + 一般疑问句语序。' }
  ]
},

/* ------------------------------------------------------------------ 6 */
{
  id: 'g6-06', subject: 'grammar', grade: 6, term: '上', unit: '语法专题 · 句型转换',
  title: '否定句与一般疑问句',
  tags: ['否定句', '一般疑问句', 'do', 'does', 'don\'t'],
  goal: '掌握"有 be 用 be，没 be 借 do/does"的转换方法，能正确改写否定句和一般疑问句。',
  sections: [
    { h: '先看句子里有没有 be 动词',
      p: '有 am / is / are，就直接用 be 动词做否定和疑问；没有 be 动词（只有实义动词），就要借 <b>do / does / did</b>。' },
    { h: '两种情况对照',
      table: {
        head: ['原句', '否定句', '一般疑问句'],
        rows: [
          ['She is a teacher.', 'She isn\'t a teacher.', 'Is she a teacher?'],
          ['They like apples.', 'They don\'t like apples.', 'Do they like apples?'],
          ['He likes apples.', 'He doesn\'t like apples.', 'Does he like apples?']
        ]
      },
      note: { type: 'tip', text: '注意第三行：用了 doesn\'t / Does 之后，likes 必须变回 like。' } },
    { h: '三步走',
      ol: [
        '找动词：是 be 还是实义动词？',
        '选助动词：be 用它自己；实义动词用 do / does（主语三单用 does）。',
        '改后检查：助动词后面的动词是不是原形？'
      ] },
    { h: '简答',
      p: 'Is she a teacher? — Yes, she is. / No, she isn\'t. Do they like apples? — Yes, they do. / No, they don\'t. 简答要用<b>同一个助动词</b>回答。' }
  ],
  figure: {
    type: 'sentence', state: { kind: 'third' },
    title: '句型转换器',
    lead: '换句子、换句型，看每一步怎么改。',
    predict: {
      q: '"He likes apples." 的否定句是：',
      options: ['He doesn\'t likes apples.', 'He doesn\'t like apples.', 'He not likes apples.'],
      answer: 1,
      why: '用了 doesn\'t 之后，likes 必须还原成 like。'
    },
    insight: '助动词是"吸收时态和人称"的角色，它一出现，后面的动词就<b>只负责意思</b>，必须用原形。',
    frame: 'He （　） apples. → He （　） （　） apples. → （　） he （　） apples?',
    hint: '切到"三单"，对比 do 和 does 的差别。'
  },
  example: {
    q: '按要求改写句子：They like apples.（否定句 / 一般疑问句）',
    steps: [
      '句子没有 be 动词，主语 They 不是三单，借 do。',
      '否定：They don\'t like apples.',
      '疑问：Do they like apples? 回答 Yes, they do.'
    ],
    a: 'They don\'t like apples. / Do they like apples?'
  },
  quiz: [
    { q: '"She is a nurse." 的否定句是：', options: ['She doesn\'t a nurse.', 'She isn\'t a nurse.', 'She not is a nurse.'], answer: 1,
      why: '有 be 动词，直接在 is 后加 not。' },
    { q: '"Tom plays football." 的一般疑问句是：', options: ['Do Tom play football?', 'Does Tom play football?', 'Does Tom plays football?'], answer: 1,
      why: '主语 Tom 是三单，用 Does，后面动词还原为 play。' },
    { q: '简答：Do they like apples? — Yes, ___', options: ['they do', 'they are', 'they like'], answer: 0,
      why: '用 do 提问就用 do 回答。' }
  ],
  cards: [
    { f: '有 be 动词怎么变？', b: '直接加 not / 把 be 提前。' },
    { f: '没有 be 动词怎么办？', b: '借 do / does，后面动词用原形。' },
    { f: '简答用什么？', b: '用和问句相同的助动词。' }
  ]
},

/* ------------------------------------------------------------------ 7 */
{
  id: 'g6-07', subject: 'grammar', grade: 6, term: '下', unit: '语法专题 · 语序',
  title: '英语句子语序：把词排对',
  tags: ['语序', '陈述句', '疑问句', '句子成分'],
  goal: '掌握"主语 + 谓语 + 其他"的基本语序，能把打乱的单词排成正确的句子。',
  sections: [
    { h: '英语和中文最大的不同',
      p: '中文可以说"我昨天在公园遇到了他"，时间地点可以放前面。英语的基本顺序是<b>主语 + 谓语 + 宾语 + 地点 + 时间</b>：I met him in the park yesterday.' },
    { h: '疑问句要"提前"',
      p: '一般疑问句把 be 或助动词提到主语前面：You are a student. → Are you a student? 特殊疑问句在一般疑问句前再加疑问词：Where do you live?' },
    { h: '几个固定顺序',
      ul: [
        '形容词放名词前：a red apple（不是 an apple red）。',
        '时间地点一般放句末，先地点后时间：at school yesterday。',
        '频率副词放实义动词前、be 动词后：I often go. / She is always late.'
      ],
      note: { type: 'tip', text: '排句子时先找<b>主语</b>和<b>动词</b>，把它们放在最前面，剩下的按"谁 + 做什么 + 什么 + 哪里 + 什么时候"往里填。' } }
  ],
  figure: {
    type: 'wordorder',
    title: '把单词排成句子',
    lead: '点单词把它放进句子，排好后点"检查"。',
    predict: {
      q: '英语陈述句的基本顺序是：',
      options: ['主语 + 谓语 + 其他', '谓语 + 主语 + 其他', '其他 + 主语 + 谓语'],
      answer: 0,
      why: '英语是"主语先行"的语言，先说谁，再说做什么。'
    },
    insight: '疑问句不是"把词倒过来"，而是<b>把助动词或 be 提到主语前面</b>，其余顺序不变。',
    frame: 'She goes to school by bus. → （　） she （　） to school by bus?',
    hint: '第 3 句是特殊疑问句，注意 What time 和 do 的位置。'
  },
  example: {
    q: '连词成句：is / a / there / book / the / on / desk',
    steps: [
      '先找固定的 there be 结构：There is …',
      '再接名词：a book。',
      '最后接地点：on the desk。',
      'There is a book on the desk.'
    ],
    a: 'There is a book on the desk.'
  },
  quiz: [
    { q: '选出语序正确的句子：', options: ['She by bus goes to school.', 'She goes to school by bus.', 'Goes she to school by bus.'], answer: 1,
      why: '主语 + 谓语 + 地点 + 方式，方式状语放句末。' },
    { q: '疑问句 Are you a student? 中，Are 为什么在前面？', options: ['因为 be 动词要提前', '因为 you 是宾语', '没有原因，固定搭配'], answer: 0,
      why: '一般疑问句把 be 动词提到主语前面。' },
    { q: 'a red apple 还是 a apple red？', options: ['a red apple', 'a apple red', '都对'], answer: 0,
      why: '形容词修饰名词时放在名词前面。' }
  ],
  cards: [
    { f: '陈述句基本语序', b: '主语 + 谓语 + 宾语 + 地点 + 时间' },
    { f: '一般疑问句怎么变？', b: '把 be 或助动词提到主语前。' },
    { f: '形容词放哪？', b: '放在所修饰的名词前面。' }
  ]
}

]);
