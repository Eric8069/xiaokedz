/* ==========================================================================
   小课桌 · 语文互动图（7 个）
   rhetoric 修辞诊断 / punct 标点语气 / sickfix 病句门诊 /
   connect 关联词 / explain 说明方法 / poem 古诗意象 / summary 概括压缩
   ========================================================================== */
(function () {
  'use strict';
  var XK = window.XK, s = XK.s, h = XK.h;
  var C = {
    ink: '#1e232b', ink2: '#3d4552', mut: '#6b7280', faint: '#9aa1ab',
    line: '#e7e1d6', paper: '#fbf8f3', white: '#fff',
    green: '#15803d', greenL: '#e8f6ec', red: '#c2410c', redL: '#fdece3',
    gold: '#f2b705', goldL: '#fff6d8', blue: '#2563eb', blueL: '#e9f0ff'
  };

  function tone(ctx) { return ctx.tone || '#0f766e'; }

  function T(x, y, str, o) {
    o = o || {};
    return s('text', {
      x: x, y: y, fill: o.fill || C.ink, 'font-size': o.size || 13,
      'text-anchor': o.anchor || 'middle', 'font-weight': o.weight || 400
    }, str);
  }

  /* 舞台卡片：宽度自适应，居中 */
  function box(host, maxw) {
    var el = h('div', {
      style: 'width:100%;max-width:' + (maxw || 460) + 'px;margin:0 auto;background:' + C.white +
        ';border:1px solid ' + C.line + ';border-radius:16px;padding:18px 16px;' +
        'box-shadow:0 1px 2px rgba(0,0,0,.04);text-align:center'
    });
    host.appendChild(el);
    return el;
  }

  function p(text, style) {
    return h('div', { style: 'font-size:13px;color:' + C.ink2 + ';' + (style || '') }, text);
  }

  /* 可选按钮行 */
  function pills(host, items, sel, onPick, color, size) {
    var wrap = h('div', { style: 'display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:12px' });
    items.forEach(function (it, i) {
      var b = h('button', {
        type: 'button',
        'aria-pressed': String(i === sel),
        style: 'padding:7px 12px;border-radius:999px;cursor:pointer;min-height:36px;' +
          'font-size:' + (size || 13) + 'px;line-height:1.3;' +
          'border:1.5px solid ' + (i === sel ? color : '#dcd5c8') + ';' +
          'background:' + (i === sel ? color : '#fff') + ';color:' + (i === sel ? '#fff' : C.ink2)
      }, it);
      b.addEventListener('click', function () { onPick(i); });
      wrap.appendChild(b);
    });
    host.appendChild(wrap);
    return wrap;
  }

  /* 判定按钮：选对绿、选错红 */
  function quizRow(host, items, answer, picked, onPick) {
    var wrap = h('div', { style: 'display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:12px' });
    items.forEach(function (it, i) {
      var st = '';
      if (picked !== null) {
        if (i === answer) st = 'border-color:' + C.green + ';background:' + C.greenL + ';color:' + C.green;
        else if (i === picked) st = 'border-color:' + C.red + ';background:' + C.redL + ';color:' + C.red;
      }
      var b = h('button', {
        type: 'button', disabled: picked !== null,
        style: 'padding:7px 12px;border-radius:10px;cursor:pointer;min-height:36px;font-size:13px;' +
          'border:1.5px solid ' + (picked === null ? '#dcd5c8' : '#e7e1d6') + ';background:#fff;color:' + C.ink2 + ';' + st
      }, it);
      b.addEventListener('click', function () { onPick(i); });
      wrap.appendChild(b);
    });
    host.appendChild(wrap);
  }

  /* ==========================================================
     1. 修辞诊断台
     ========================================================== */
  XK.figure('rhetoric', function (ctx) {
    var ST = (ctx.cfg && ctx.cfg.state) || {};
    var mode = ST.mode || 'simile', sel = 0;

    var DATA = {
      simile: [
        { s: '月亮像一只小船。', ok: true, ben: '月亮', yu: '小船', sim: '弯弯的、两头尖', why: '天体比交通工具，是两类事物' },
        { s: '云朵像棉花糖。', ok: true, ben: '云朵', yu: '棉花糖', sim: '白白的、软软的', why: '自然景物比食物，是两类事物' },
        { s: '片片落叶像一只只黄蝴蝶。', ok: true, ben: '落叶', yu: '黄蝴蝶', sim: '黄色、会打转飘落', why: '植物比动物，是两类事物' },
        { s: '他长得像他爸爸。', ok: false, why: '人和人是同一类，只是比较，不是比喻' },
        { s: '这只笔像我丢的那支。', ok: false, why: '表示猜测、不确定，不是比喻' },
        { s: '他好像知道这件事。', ok: false, why: '「好像」表示推测，不是比喻' }
      ],
      personify: [
        { s: '小鸟在枝头唱歌。', act: '唱歌', why: '唱歌是人的行为，把小鸟当人写' },
        { s: '小溪唱着歌跑向远方。', act: '唱歌、跑', why: '唱歌和跑都是人的动作' },
        { s: '花儿在风中点头。', act: '点头', why: '点头是人的动作' },
        { s: '太阳公公露出了笑脸。', act: '公公、笑脸', why: '称呼和表情都是人的' },
        { s: '春风像母亲的手抚摸着你。', act: '抚摸', why: '「抚摸」是人的动作；前半句还是比喻' }
      ]
    };

    var host = h('div', { style: 'width:100%' });
    ctx.stage.appendChild(host);
    var body = box(host);
    var chipsHost = h('div', { style: 'width:100%' });
    host.appendChild(chipsHost);

    function draw() {
      var item = DATA[mode][sel];
      body.innerHTML = '';

      body.appendChild(h('div', { style: 'font-size:11px;letter-spacing:.08em;color:' + C.faint + ';margin-bottom:10px' },
        mode === 'simile' ? '判断是不是比喻' : '找出人的动作'));
      body.appendChild(h('div', { style: 'font-size:19px;font-weight:700;line-height:1.6;color:' + C.ink },
        '「' + item.s + '」'));

      if (mode === 'simile') {
        var tag = h('div', {
          style: 'margin-top:12px;display:inline-block;padding:5px 12px;border-radius:999px;font-size:13px;font-weight:700;' +
            'background:' + (item.ok ? C.greenL : C.redL) + ';color:' + (item.ok ? C.green : C.red)
        }, item.ok ? '✓ 是比喻' : '✗ 不是比喻');
        body.appendChild(tag);

        if (item.ok) {
          var grid = h('div', { style: 'display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px' });
          [['本体', item.ben], ['喻体', item.yu], ['相似点', item.sim]].forEach(function (r) {
            var c = h('div', { style: 'background:' + C.paper + ';border-radius:10px;padding:9px 6px' });
            c.appendChild(h('div', { style: 'font-size:11px;color:' + C.faint + ';margin-bottom:3px' }, r[0]));
            c.appendChild(h('div', { style: 'font-size:14px;font-weight:700;color:' + C.ink }, r[1]));
            grid.appendChild(c);
          });
          body.appendChild(grid);
        }
        body.appendChild(h('div', {
          style: 'margin-top:12px;font-size:13px;color:' + C.ink2 + ';background:' + C.paper + ';border-radius:9px;padding:9px 11px;text-align:left'
        }, item.why));
      } else {
        body.appendChild(h('div', {
          style: 'margin-top:12px;display:inline-block;padding:5px 12px;border-radius:999px;font-size:13px;font-weight:700;' +
            'background:' + C.greenL + ';color:' + C.green
        }, '✓ 拟人'));
        body.appendChild(h('div', {
          style: 'margin-top:12px;font-size:14px;color:' + C.ink2 + ';background:' + C.paper + ';border-radius:9px;padding:10px 11px;text-align:left'
        }, '把物当人写的地方：' + item.act + '。' + item.why));
      }

      XK.clear(chipsHost);
      pills(chipsHost, DATA[mode].map(function (x) { return x.s.replace(/。$/, ''); }), sel, function (i) {
        sel = i; draw(); update();
      }, tone(ctx), 12);
    }

    function update() {
      var item = DATA[mode][sel];
      if (mode === 'simile') {
        ctx.set([
          { k: '是不是比喻', v: item.ok ? '是' : '不是', big: true },
          item.ok ? { k: '本体 → 喻体', v: item.ben + ' → ' + item.yu } : null,
          item.ok ? { k: '相似点', v: item.sim } : null,
          { k: '同类例词', eq: item.why }
        ]);
      } else {
        ctx.set([
          { k: '修辞', v: '拟人', big: true },
          { k: '人的动作', v: item.act },
          { k: '', eq: item.why }
        ]);
      }
    }

    XK.toggles(ctx.controls, {
      label: '看哪一类', value: mode,
      options: [{ value: 'simile', label: '比喻判断' }, { value: 'personify', label: '拟人判断' }],
      onchange: function (v) { mode = v; sel = 0; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     2. 换个标点试试
     ========================================================== */
  XK.figure('punct', function (ctx) {
    var ST = (ctx.cfg && ctx.cfg.state) || {};
    var i = ST.i || 0, pick = null;

    var DATA = [
      {
        s: '他来了', right: 0, open: true,
        mean: ['叙述一件事，语气平静。', '表示疑问：他真的来了吗？', '表示惊喜或惊讶：他居然来了！']
      },
      {
        s: '你吃饭了吗', right: 1,
        mean: ['说成陈述就怪了，句子在提问，要用问号。', '正确。「吗」是疑问语气词，必须用问号。', '语气太强，像在质问，不合适。']
      },
      {
        s: '多美的景色啊', right: 2,
        mean: ['赞叹的语气被压平了，读不出感情。', '这句不是提问，用问号不对。', '正确。「多……啊」是赞叹，用叹号。']
      },
      {
        s: '请把门关上', right: 2,
        mean: ['也可以，语气平和地请求。', '不是提问，用问号不合适。', '正确。祈使句用叹号，语气更明确。']
      }
    ];

    var body = box(ctx.stage);
    var chipsHost = h('div', { style: 'width:100%' });
    ctx.stage.appendChild(chipsHost);

    function draw() {
      var d = DATA[i];
      pick = null;
      body.innerHTML = '';
      body.appendChild(h('div', { style: 'font-size:11px;letter-spacing:.08em;color:' + C.faint + ';margin-bottom:14px' },
        '给这句话选一个句末标点'));
      body.appendChild(h('div', { style: 'font-size:24px;font-weight:700;color:' + C.ink + ';letter-spacing:.04em' },
        d.s + (pick === null ? '？' : ['。', '？', '！'][pick])));
      body.appendChild(h('div', { style: 'font-size:12px;color:' + C.faint + ';margin-top:8px' },
        '先猜一个，再看读出来是什么意思'));

      var opts = h('div', { style: 'display:flex;gap:10px;justify-content:center;margin-top:16px' });
      ['。句号', '？问号', '！叹号'].forEach(function (name, k) {
        var st = '';
        if (pick !== null) {
          if (k === d.right) st = 'border-color:' + C.green + ';background:' + C.greenL + ';color:' + C.green;
          else if (k === pick) st = 'border-color:' + C.red + ';background:' + C.redL + ';color:' + C.red;
        }
        var b = h('button', {
          type: 'button', disabled: pick !== null,
          style: 'min-width:74px;min-height:46px;border-radius:12px;cursor:pointer;font-size:14px;font-weight:700;' +
            'border:1.5px solid ' + (pick === null ? '#dcd5c8' : C.line) + ';background:#fff;color:' + C.ink2 + ';' + st
        }, name);
        b.addEventListener('click', function () {
          pick = k;
          draw();
          body.appendChild(h('div', {
            style: 'margin-top:14px;font-size:14px;line-height:1.7;text-align:left;border-radius:10px;padding:11px 13px;' +
              'background:' + (k === d.right ? C.greenL : C.redL) + ';color:' + (k === d.right ? C.green : C.red)
          }, (k === d.right ? '✓ ' : '✗ 再想想：') + d.mean[k]));
          update();
        });
        opts.appendChild(b);
      });
      body.appendChild(opts);

      XK.clear(chipsHost);
      pills(chipsHost, DATA.map(function (x) { return x.s; }), i, function (k) { i = k; draw(); update(); }, tone(ctx), 12);
    }

    function update() {
      var d = DATA[i];
      ctx.set([
        { k: '句子', v: '「' + d.s + '」', big: true },
        { k: '该用什么', v: ['句号 。', '问号 ？', '叹号 ！'][d.right] },
        { k: '', eq: d.open ? '这一句三种标点都能用，但语气不一样' : '标点不同，语气就不同' }
      ]);
    }

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     3. 病句门诊
     ========================================================== */
  XK.figure('sickfix', function (ctx) {
    var ST = (ctx.cfg && ctx.cfg.state) || {};
    var i = ST.i || 0, pick = null;
    var TYPES = ['成分残缺', '搭配不当', '语序颠倒', '重复啰嗦', '前后矛盾', '指代不明'];

    var DATA = [
      { s: '通过这次活动，使我明白了团结的重要。', ans: 0, why: '「通过……使……」让句子没有主语。', fix: '这次活动使我明白了团结的重要。' },
      { s: '他的写作水平明显改进了。', ans: 1, why: '「水平」要配「提高」，不能配「改进」。', fix: '他的写作水平明显提高了。' },
      { s: '我们要及时改正并发现错误。', ans: 2, why: '先发现才能改正，顺序反了。', fix: '我们要及时发现并改正错误。' },
      { s: '他大约有二十岁左右。', ans: 3, why: '「大约」和「左右」意思重复。', fix: '他大约二十岁。' },
      { s: '我估计他今天一定会来。', ans: 4, why: '「估计」不确定，「一定」确定，前后矛盾。', fix: '我估计他今天会来。' },
      { s: '小明和小刚在讨论问题，他不同意他的意见。', ans: 5, why: '两个「他」指谁不清楚。', fix: '小明不同意小刚的意见。' }
    ];

    var body = box(ctx.stage, 480);
    var chipsHost = h('div', { style: 'width:100%' });
    ctx.stage.appendChild(chipsHost);

    function draw() {
      var d = DATA[i];
      pick = null;
      body.innerHTML = '';
      body.appendChild(h('div', { style: 'font-size:11px;letter-spacing:.08em;color:' + C.faint + ';margin-bottom:12px' },
        '这句话病在哪？'));
      body.appendChild(h('div', { style: 'font-size:17px;font-weight:700;line-height:1.7;color:' + C.ink }, '「' + d.s + '」'));

      var wr = h('div', { style: 'display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:14px' });
      TYPES.forEach(function (name, k) {
        var st = '';
        if (pick !== null) {
          if (k === d.ans) st = 'border-color:' + C.green + ';background:' + C.greenL + ';color:' + C.green;
          else if (k === pick) st = 'border-color:' + C.red + ';background:' + C.redL + ';color:' + C.red;
        }
        var b = h('button', {
          type: 'button', disabled: pick !== null,
          style: 'padding:7px 12px;border-radius:9px;cursor:pointer;min-height:36px;font-size:12.5px;' +
            'border:1.5px solid ' + (pick === null ? '#dcd5c8' : C.line) + ';background:#fff;color:' + C.ink2 + ';' + st
        }, name);
        b.addEventListener('click', function () {
          pick = k;
          draw();
          body.appendChild(h('div', {
            style: 'margin-top:14px;text-align:left;border-radius:10px;padding:11px 13px;font-size:13.5px;line-height:1.75;' +
              'background:' + (k === d.ans ? C.greenL : C.redL) + ';color:' + (k === d.ans ? C.green : C.red)
          },
            (k === d.ans ? '✓ 对了。' : '✗ 是「' + TYPES[d.ans] + '」。') + d.why));
          body.appendChild(h('div', {
            style: 'margin-top:9px;text-align:left;border-radius:10px;padding:11px 13px;background:' + C.paper + ';font-size:14px;color:' + C.ink
          }, h('b', { style: 'color:' + tone(ctx) }, '改：'), d.fix));
          update();
        });
        wr.appendChild(b);
      });
      body.appendChild(wr);

      XK.clear(chipsHost);
      pills(chipsHost, DATA.map(function (x, k) { return '第' + (k + 1) + '句'; }), i, function (k) { i = k; draw(); update(); }, tone(ctx), 12);
    }

    function update() {
      var d = DATA[i];
      ctx.set([
        { k: '病因', v: TYPES[d.ans], big: true },
        { k: '改后', v: d.fix },
        { k: '', eq: d.why }
      ]);
    }

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     4. 句子接头处（关联词）
     ========================================================== */
  XK.figure('connect', function (ctx) {
    var ST = (ctx.cfg && ctx.cfg.state) || {};
    var i = ST.i || 0, pick = null;

    var DATA = [
      { a: '天气很冷', b: '他坚持晨跑', rel: '转折', ans: 0, opts: ['虽然……但是……', '因为……所以……', '如果……就……'], why: '前后意思相反，是转折。' },
      { a: '他认真复习', b: '他考得不错', rel: '因果', ans: 1, opts: ['不但……而且……', '因为……所以……', '虽然……但是……'], why: '前面是因，后面是果。' },
      { a: '明天天晴', b: '我们去爬山', rel: '假设', ans: 2, opts: ['既……又……', '只有……才……', '如果……就……'], why: '事情还没发生，是假设。' },
      { a: '坚持练习', b: '能写好字', rel: '条件', ans: 1, opts: ['如果……就……', '只有……才……', '因为……所以……'], why: '强调唯一条件，用「只有……才……」。' },
      { a: '他会画画', b: '他会弹琴', rel: '并列', ans: 0, opts: ['既……又……', '虽然……但是……', '因为……所以……'], why: '两件事同时具备，是并列。' },
      { a: '他学习好', b: '他乐于助人', rel: '递进', ans: 2, opts: ['只有……才……', '如果……就……', '不但……而且……'], why: '后一层比前一层更进一步，是递进。' }
    ];

    var body = box(ctx.stage, 480);
    var chipsHost = h('div', { style: 'width:100%' });
    ctx.stage.appendChild(chipsHost);

    function join(k) {
      var d = DATA[i], o = d.opts[k] || '';
      var parts = o.split('……');
      return (parts[0] || '') + d.a + '，' + (parts[1] || '') + d.b + '。';
    }

    function draw() {
      var d = DATA[i];
      pick = null;
      body.innerHTML = '';
      body.appendChild(h('div', { style: 'font-size:11px;letter-spacing:.08em;color:' + C.faint + ';margin-bottom:14px' },
        '这两句话是什么关系？'));

      var two = h('div', { style: 'display:flex;flex-direction:column;gap:8px;align-items:center' });
      [d.a, d.b].forEach(function (t) {
        two.appendChild(h('div', {
          style: 'font-size:16px;font-weight:700;color:' + C.ink + ';background:' + C.paper +
            ';border-radius:10px;padding:10px 14px;min-width:60%'
        }, t));
      });
      body.appendChild(two);

      var opts = h('div', { style: 'display:flex;flex-direction:column;gap:6px;margin-top:14px' });
      d.opts.forEach(function (name, k) {
        var st = '';
        if (pick !== null) {
          if (k === d.ans) st = 'border-color:' + C.green + ';background:' + C.greenL + ';color:' + C.green;
          else if (k === pick) st = 'border-color:' + C.red + ';background:' + C.redL + ';color:' + C.red;
        }
        var b = h('button', {
          type: 'button', disabled: pick !== null,
          style: 'padding:9px 12px;border-radius:10px;cursor:pointer;min-height:40px;font-size:14px;' +
            'border:1.5px solid ' + (pick === null ? '#dcd5c8' : C.line) + ';background:#fff;color:' + C.ink2 + ';' + st
        }, name);
        b.addEventListener('click', function () {
          pick = k;
          draw();
          body.appendChild(h('div', {
            style: 'margin-top:12px;font-size:15px;font-weight:600;line-height:1.7;border-radius:10px;padding:11px 13px;' +
              'background:' + (k === d.ans ? C.greenL : C.redL) + ';color:' + (k === d.ans ? C.green : C.red)
          }, join(k)));
          body.appendChild(h('div', {
            style: 'margin-top:8px;font-size:13px;color:' + C.ink2 + ';text-align:left;padding:0 3px'
          }, (k === d.ans ? '✓ ' : '✗ 正确的是「' + d.opts[d.ans] + '」。') + d.why));
          update();
        });
        opts.appendChild(b);
      });
      body.appendChild(opts);

      XK.clear(chipsHost);
      pills(chipsHost, DATA.map(function (x) { return x.rel; }), i, function (k) { i = k; draw(); update(); }, tone(ctx), 12);
    }

    function update() {
      var d = DATA[i];
      ctx.set([
        { k: '关系', v: d.rel, big: true },
        { k: '应该用', v: d.opts[d.ans] },
        { k: '连起来', v: join(d.ans) },
        { k: '', eq: d.why }
      ]);
    }

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     5. 说明方法识别器
     ========================================================== */
  XK.figure('explain', function (ctx) {
    var ST = (ctx.cfg && ctx.cfg.state) || {};
    var i = ST.i || 0, pick = null;
    var MS = ['列数字', '打比方', '作比较', '举例子', '分类别'];

    var DATA = [
      { s: '赵州桥长五十多米，宽九米多。', ans: 0, mark: '五十多、九米多', use: '准确写出桥的长和宽' },
      { s: '地球像一叶扁舟，飘在宇宙中。', ans: 1, mark: '像', use: '形象写出地球在宇宙中的渺小' },
      { s: '鲸的一条舌头就有十几头大肥猪那么重。', ans: 2, mark: '有……那么重', use: '用熟悉的大肥猪作参照，写出舌头很重' },
      { s: '很多动物会冬眠，比如松鼠、刺猬、青蛙。', ans: 3, mark: '比如', use: '具体说明哪些动物会冬眠' },
      { s: '图书分为文学、科技、历史三类。', ans: 4, mark: '分为', use: '条理清楚地说明图书的种类' }
    ];

    var body = box(ctx.stage, 480);
    var chipsHost = h('div', { style: 'width:100%' });
    ctx.stage.appendChild(chipsHost);

    function draw() {
      var d = DATA[i];
      pick = null;
      body.innerHTML = '';
      body.appendChild(h('div', { style: 'font-size:11px;letter-spacing:.08em;color:' + C.faint + ';margin-bottom:12px' },
        '这句话用了哪种说明方法？'));
      body.appendChild(h('div', { style: 'font-size:16px;font-weight:700;line-height:1.8;color:' + C.ink }, '「' + d.s + '」'));

      var wrap = h('div', { style: 'display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:14px' });
      MS.forEach(function (name, k) {
        var st = '';
        if (pick !== null) {
          if (k === d.ans) st = 'border-color:' + C.green + ';background:' + C.greenL + ';color:' + C.green;
          else if (k === pick) st = 'border-color:' + C.red + ';background:' + C.redL + ';color:' + C.red;
        }
        var b = h('button', {
          type: 'button', disabled: pick !== null,
          style: 'padding:8px 13px;border-radius:10px;cursor:pointer;min-height:38px;font-size:13px;' +
            'border:1.5px solid ' + (pick === null ? '#dcd5c8' : C.line) + ';background:#fff;color:' + C.ink2 + ';' + st
        }, name);
        b.addEventListener('click', function () {
          pick = k;
          draw();
          body.appendChild(h('div', {
            style: 'margin-top:14px;text-align:left;border-radius:10px;padding:11px 13px;font-size:13.5px;line-height:1.75;' +
              'background:' + (k === d.ans ? C.greenL : C.redL) + ';color:' + (k === d.ans ? C.green : C.red)
          },
            (k === d.ans ? '✓ 对了。' : '✗ 应该是「' + MS[d.ans] + '」。') +
            '标志是「' + d.mark + '」，作用是' + d.use + '。'));
          update();
        });
        wrap.appendChild(b);
      });
      body.appendChild(wrap);

      XK.clear(chipsHost);
      pills(chipsHost, DATA.map(function (x, k) { return '第' + (k + 1) + '句'; }), i, function (k) { i = k; draw(); update(); }, tone(ctx), 12);
    }

    function update() {
      var d = DATA[i];
      ctx.set([
        { k: '说明方法', v: MS[d.ans], big: true },
        { k: '标志词', v: d.mark },
        { k: '作用', v: d.use }
      ]);
    }

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     6. 意象解码器
     ========================================================== */
  XK.figure('poem', function (ctx) {
    var ST = (ctx.cfg && ctx.cfg.state) || {};
    var i = ST.i || 0;

    var DATA = [
      { ju: '举头望明月，低头思故乡。', img: '月', emo: '思乡、想念亲人', exp: '月圆人缺，抬头看见月亮，最容易想起家里的亲人。' },
      { ju: '客舍青青柳色新。', img: '柳', emo: '送别、挽留', exp: '「柳」与「留」谐音，古人送别时折柳相赠，所以柳成了送别的符号。' },
      { ju: '乡书何处达？归雁洛阳边。', img: '雁', emo: '思念、盼音信', exp: '古人认为大雁能传书，看见北归的雁，就想到托它带信回家。' },
      { ju: '墙角数枝梅，凌寒独自开。', img: '梅', emo: '高洁、坚强', exp: '梅花在寒冬开放，越是冷越开得好，用来比喻人的品格。' },
      { ju: '百川东到海，何时复西归？', img: '流水', emo: '时光一去不返', exp: '江水只会向东流，不会倒回来，比喻光阴过去就回不来了。' }
    ];

    var PIC = {
      '月': function (g) {
        g.appendChild(s('circle', { cx: 0, cy: 0, r: 34, fill: '#fff3c4' }));
        g.appendChild(s('circle', { cx: -8, cy: -6, r: 30, fill: '#f7e6a1' }));
        g.appendChild(s('path', { d: 'M-50 40 q14 -9 28 0 t28 0', stroke: '#cfc6ae', 'stroke-width': 3, fill: 'none', opacity: .85 }));
        g.appendChild(s('path', { d: 'M-34 50 q12 -7 24 0', stroke: '#dcd3bd', 'stroke-width': 2.5, fill: 'none', opacity: .8 }));
      },
      '柳': function (g) {
        g.appendChild(s('path', { d: 'M0 44 L0 -34', stroke: '#8a6b4a', 'stroke-width': 6, 'stroke-linecap': 'round' }));
        [-1, 0, 1].forEach(function (k, idx) {
          var x = k * 18;
          g.appendChild(s('path', { d: 'M0 ' + (-30 + idx * 6) + ' q' + x + ' 6 ' + x + ' 30', stroke: '#7fae6a', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }));
          g.appendChild(s('path', { d: 'M' + x + ' ' + (0 + idx * 6) + ' q-3 14 2 26', stroke: '#8fbf78', 'stroke-width': 2, fill: 'none' }));
        });
      },
      '雁': function (g) {
        [[-24, -6], [0, 4], [24, -10]].forEach(function (c) {
          g.appendChild(s('path', {
            d: 'M' + (c[0] - 11) + ' ' + c[1] + ' q11 -12 22 0 q11 -12 22 0',
            stroke: '#3d4552', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round'
          }));
        });
        g.appendChild(s('path', { d: 'M-42 30 q42 12 84 0', stroke: '#b8c6d6', 'stroke-width': 2, 'stroke-dasharray': '4 5', fill: 'none' }));
      },
      '梅': function (g) {
        g.appendChild(s('path', { d: 'M-40 34 L-6 6 L14 -14 L34 -34', stroke: '#7a5a3e', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }));
        g.appendChild(s('path', { d: 'M-6 6 L-26 -12', stroke: '#7a5a3e', 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' }));
        [[-26, -14], [-8, 4], [12, -16], [30, -36], [36, -26]].forEach(function (c) {
          for (var k = 0; k < 5; k++) {
            var a = (Math.PI * 2 / 5) * k;
            g.appendChild(s('circle', { cx: c[0] + Math.cos(a) * 5, cy: c[1] + Math.sin(a) * 5, r: 4, fill: '#c2410c', opacity: .85 }));
          }
          g.appendChild(s('circle', { cx: c[0], cy: c[1], r: 2.4, fill: '#f2b705' }));
        });
      },
      '流水': function (g) {
        [-18, 0, 18].forEach(function (y, idx) {
          g.appendChild(s('path', {
            d: 'M-44 ' + y + ' q11 -8 22 0 t22 0 t22 0 t22 0',
            stroke: idx === 1 ? '#2b8fb5' : '#7fc0d6', 'stroke-width': idx === 1 ? 4 : 3, fill: 'none', 'stroke-linecap': 'round'
          }));
        });
        g.appendChild(s('path', { d: 'M34 -30 L46 -34 L42 -24', stroke: '#2b8fb5', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }));
      }
    };

    var body = box(ctx.stage, 440);
    var chipsHost = h('div', { style: 'width:100%' });
    ctx.stage.appendChild(chipsHost);

    function draw() {
      var d = DATA[i];
      body.innerHTML = '';
      body.appendChild(h('div', { style: 'font-size:11px;letter-spacing:.08em;color:' + C.faint + ';margin-bottom:9px' },
        '这句诗里的景物，藏着什么心情？'));
      body.appendChild(h('div', { style: 'font-size:17px;font-weight:700;color:' + C.ink + ';line-height:1.7' }, '「' + d.ju + '」'));

      var svg = s('svg', { viewBox: '-60 -60 120 120', style: 'width:120px;height:120px;margin:12px auto 2px;display:block' });
      var g = s('g');
      (PIC[d.img] || function () {})(g);
      svg.appendChild(g);
      body.appendChild(svg);

      body.appendChild(h('div', {
        style: 'display:inline-block;margin-top:6px;padding:5px 13px;border-radius:999px;font-size:13px;font-weight:700;' +
          'background:' + C.greenL + ';color:' + C.green
      }, '意象：' + d.img + ' → ' + d.emo));

      body.appendChild(h('div', {
        style: 'margin-top:10px;font-size:13.5px;line-height:1.75;text-align:left;color:' + C.ink2 +
          ';background:' + C.paper + ';border-radius:10px;padding:10px 12px'
      }, d.exp));

      XK.clear(chipsHost);
      pills(chipsHost, DATA.map(function (x) { return x.img; }), i, function (k) { i = k; draw(); update(); }, tone(ctx), 13);
    }

    function update() {
      var d = DATA[i];
      ctx.set([
        { k: '意象', v: d.img, big: true },
        { k: '常表达', v: d.emo },
        { k: '', eq: d.exp }
      ]);
    }

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     7. 段落压缩器
     ========================================================== */
  XK.figure('summary', function (ctx) {
    var ST = (ctx.cfg && ctx.cfg.state) || {};
    var i = ST.i || 0, lv = 0;

    var DATA = [
      {
        who: '我和妈妈', what: '去菜市场买菜，我帮妈妈提袋子', res: '心里很快乐',
        levels: [
          '星期天，我和妈妈去菜市场。市场里人很多，有卖蔬菜的，有卖水果的，还有卖鱼的。妈妈买了西红柿和鸡蛋，我帮妈妈提着袋子。回家的路上，我觉得帮妈妈做事很快乐。',
          '星期天，我和妈妈去菜市场。妈妈买了菜，我帮妈妈提着袋子，回家路上觉得很快乐。',
          '星期天我和妈妈去买菜，我帮妈妈提袋子，心里很快乐。',
          '我和妈妈去买菜，我帮着提袋子。'
        ]
      },
      {
        who: '松鼠', what: '有一条又大又蓬松的尾巴', res: '能当降落伞、能保暖',
        levels: [
          '松鼠的尾巴又大又蓬松。它从高处跳下时，尾巴张开像一把降落伞，让它稳稳落地。冬天睡觉时，尾巴还能当被子盖在身上保暖。',
          '松鼠的尾巴又大又蓬松，跳下时能当降落伞，冬天能当被子保暖。',
          '松鼠的尾巴又大又蓬松，能当降落伞，还能保暖。',
          '松鼠的尾巴用处很大。'
        ]
      }
    ];

    var body = box(ctx.stage, 520);

    function draw() {
      var d = DATA[i];
      body.innerHTML = '';
      body.appendChild(h('div', { style: 'font-size:11px;letter-spacing:.08em;color:' + C.faint + ';margin-bottom:10px' },
        '一步步删到只剩主干'));
      body.appendChild(h('div', {
        style: 'font-size:14.5px;line-height:1.9;color:' + C.ink + ';text-align:left;background:' + C.paper +
          ';border-radius:11px;padding:12px 14px'
      }, d.levels[lv]));

      var meter = h('div', { style: 'display:flex;align-items:center;gap:8px;margin-top:12px' });
      meter.appendChild(h('div', { style: 'font-size:12px;color:' + C.faint }, '字数'));
      var bar = h('div', { style: 'flex:1;height:8px;background:#efe9dd;border-radius:999px;overflow:hidden' });
      var fill = h('div', {
        style: 'height:100%;width:' + Math.min(100, d.levels[lv].length * 1.4) + '%;background:' + tone(ctx) + ';border-radius:999px;transition:width .2s'
      });
      bar.appendChild(fill);
      meter.appendChild(bar);
      meter.appendChild(h('div', { style: 'font-size:13px;font-weight:700;color:' + tone(ctx) + ';min-width:3em;text-align:right' },
        d.levels[lv].length + ' 字'));
      body.appendChild(meter);

      body.appendChild(h('div', {
        style: 'margin-top:12px;font-size:13px;color:' + C.ink2 + ';text-align:left;line-height:1.8'
      }, h('b', { style: 'color:' + tone(ctx) }, '主干：'),
        d.who + ' · ' + d.what + ' · ' + d.res));

      var chipsHost = h('div', { style: 'width:100%' });
      body.appendChild(chipsHost);
      pills(chipsHost, DATA.map(function (x, k) { return k === 0 ? '写事' : '写物'; }), i, function (k) {
        i = k; lv = 0; draw(); update();
      }, tone(ctx), 12);
    }

    function update() {
      var d = DATA[i];
      var names = ['原文', '删掉描写', '合并举例', '只留主干'];
      ctx.set([
        { k: '当前', v: names[lv], big: true },
        { k: '字数', v: d.levels[lv].length + ' 字' },
        { k: '主干', v: d.who + '｜' + d.what },
        { k: '', eq: lv === 3 ? '再短就要丢信息了，考试一般要求 20-30 字' : '继续删，看看最短能到多少' }
      ]);
    }

    XK.toggles(ctx.controls, {
      label: '压缩到哪一步', value: 0,
      options: [{ value: 0, label: '原文' }, { value: 1, label: '删描写' }, { value: 2, label: '合并' }, { value: 3, label: '一句话' }],
      onchange: function (v) { lv = +v; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

})();
