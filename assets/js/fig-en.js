/* ==========================================================================
   小课桌 · 英语与语法互动图（11 个）
   ========================================================================== */
(function () {
  'use strict';
  var XK = window.XK, s = XK.s, h = XK.h, fmt = XK.fmt;
  var C = {
    ink: '#1e232b', ink2: '#3d4552', mut: '#7a8290', faint: '#aab0b9',
    line: '#c9c1b2', grid: '#e7e1d6', white: '#fff',
    blue: '#2563eb', blueL: '#dbe6ff', gold: '#f2b705', goldL: '#fff0bf',
    green: '#15803d', greenL: '#dcf0e2', red: '#c2410c', redL: '#fbe3d6'
  };
  function T(x, y, str, o) {
    o = o || {};
    return s('text', {
      x: x, y: y, fill: o.fill || C.ink, 'font-size': o.size || 13,
      'text-anchor': o.anchor || 'middle', 'font-weight': o.weight || 400,
      'font-family': o.mono ? 'ui-monospace,monospace' : null
    }, str);
  }
  function line(x1, y1, x2, y2, o) {
    o = o || {};
    return s('line', {
      x1: x1, y1: y1, x2: x2, y2: y2, stroke: o.stroke || C.line,
      'stroke-width': o.w || 2, 'stroke-dasharray': o.dash || null, 'stroke-linecap': 'round'
    });
  }
  function stage(host, vb, label) {
    var el = s('svg', { viewBox: vb, role: 'img', 'aria-label': label });
    host.appendChild(el);
    return el;
  }
  function card(host) {
    var el = h('div', {
      style: 'width:100%;max-width:420px;background:#fff;border:1px solid #e7e1d6;border-radius:14px;' +
        'padding:18px 16px;box-shadow:0 1px 2px rgba(0,0,0,.04);text-align:center'
    });
    host.appendChild(el);
    return el;
  }
  function tone(ctx) { return ctx.tone || '#e0632f'; }
  function soft(ctx) { return ctx.soft || '#fdeee6'; }

  /* ==========================================================
     16. 时间表达 —— 钟面
     ========================================================== */
  XK.figure('clock', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '一个可以调时间的钟面');
    var g = s('g'); svg.appendChild(g);
    var H = 3, M = 30;

    var W1 = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
    var W20 = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
      'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    function w(n) { return n < 20 ? W20[n] : (n === 20 ? 'twenty' : 'twenty-' + W20[n - 20]); }

    function draw() {
      XK.clear(g);
      var cx = 210, cy = 148, R = 104;
      g.appendChild(s('circle', { cx: cx, cy: cy, r: R, fill: '#fff', stroke: C.ink2, 'stroke-width': 2.4 }));
      for (var i = 0; i < 60; i++) {
        var a = i * 6 * Math.PI / 180;
        var r1 = R - 3, r2 = R - (i % 5 === 0 ? 13 : 7);
        g.appendChild(line(cx + r1 * Math.sin(a), cy - r1 * Math.cos(a),
          cx + r2 * Math.sin(a), cy - r2 * Math.cos(a),
          { stroke: i % 5 === 0 ? C.ink : C.faint, w: i % 5 === 0 ? 1.8 : 1 }));
      }
      for (var n = 1; n <= 12; n++) {
        var ang = n * 30 * Math.PI / 180;
        g.appendChild(T(cx + (R - 28) * Math.sin(ang), cy - (R - 28) * Math.cos(ang) + 5, String(n), { size: 13, weight: 600 }));
      }
      var ma = M * 6 * Math.PI / 180, ha = (H % 12) * 30 * Math.PI / 180 + M * 0.5 * Math.PI / 180;
      g.appendChild(line(cx, cy, cx + 54 * Math.sin(ha), cy - 54 * Math.cos(ha), { stroke: C.ink, w: 5 }));
      g.appendChild(line(cx, cy, cx + 80 * Math.sin(ma), cy - 80 * Math.cos(ma), { stroke: tone(ctx), w: 3.4 }));
      g.appendChild(s('circle', { cx: cx, cy: cy, r: 4.5, fill: C.ink }));
      g.appendChild(T(cx, cy + R + 40, H + ':' + pad(M), { size: 26, weight: 700, mono: true }));
      // 右侧句式
      var tx = 344;
      g.appendChild(T(tx, 82, '问时间', { size: 10.5, fill: C.mut, anchor: 'start' }));
      g.appendChild(T(tx, 104, 'What time is it?', { size: 12, weight: 600, anchor: 'start', fill: tone(ctx) }));
    }
    function pad(n) { return (n < 10 ? '0' : '') + n; }

    function phrase() {
      var hh = H % 12 || 12;
      if (M === 0) return "It's " + w(hh) + " o'clock.";
      if (M === 15) return "It's a quarter past " + w(hh) + '.';
      if (M === 30) return "It's half past " + w(hh) + '.';
      if (M === 45) return "It's a quarter to " + w(hh % 12 + 1) + '.';
      if (M < 30) return "It's " + w(M) + ' past ' + w(hh) + '.';
      return "It's " + w(60 - M) + ' to ' + w(hh % 12 + 1) + '.';
    }

    function update() {
      var hh = H % 12 || 12;
      var kind = M === 0 ? "整点：o'clock" : M === 30 ? '半点：half past' :
        M === 15 || M === 45 ? '一刻：a quarter' : M < 30 ? '过几分：past' : '差几分：to';
      ctx.set([
        { k: '时间', v: H + ':' + pad(M), big: true },
        { k: '英语', v: phrase() },
        { k: '句式', v: kind },
        { k: '中文', v: hh + ' 点' + (M === 0 ? '整' : (M < 30 ? '过 ' + M + ' 分' : '差 ' + (60 - M) + ' 分')) },
        { k: '', eq: 'past 表示"过"，to 表示"差"，半小时用 half' }
      ]);
    }

    XK.slider(ctx.controls, { label: '时针', min: 1, max: 12, value: H, oninput: function (v) { H = v; draw(); update(); } });
    XK.slider(ctx.controls, { label: '分针', min: 0, max: 55, step: 5, value: M, oninput: function (v) { M = v; draw(); update(); } });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     17. 方位介词
     ========================================================== */
  XK.figure('preposition', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '小猫和纸箱的不同位置');
    var g = s('g'); svg.appendChild(g);
    var prep = 'in';
    var DATA = {
      'in': { en: 'The cat is in the box.', zh: '小猫在箱子里。', tip: 'in = 在……里面（被包围）' },
      'on': { en: 'The cat is on the box.', zh: '小猫在箱子上。', tip: 'on = 在……上面（接触表面）' },
      'under': { en: 'The cat is under the box.', zh: '小猫在箱子下面。', tip: 'under = 在……正下方' },
      'behind': { en: 'The cat is behind the box.', zh: '小猫在箱子后面。', tip: 'behind = 在……后面' },
      'in front of': { en: 'The cat is in front of the box.', zh: '小猫在箱子前面。', tip: 'in front of = 在……前面' },
      'next to': { en: 'The cat is next to the box.', zh: '小猫在箱子旁边。', tip: 'next to = 紧挨着、在……旁边' }
    };

    function cat(x, y, sc) {
      sc = sc || 1;
      var gg = s('g', { transform: 'translate(' + x + ',' + y + ') scale(' + sc + ')' });
      gg.appendChild(s('ellipse', { cx: 0, cy: 0, rx: 26, ry: 22, fill: '#f3d9bd', stroke: '#c99e73', 'stroke-width': 1.6 }));
      gg.appendChild(s('circle', { cx: 0, cy: -14, r: 17, fill: '#f7e3cc', stroke: '#c99e73', 'stroke-width': 1.6 }));
      gg.appendChild(s('polygon', { points: '-13,-26 -8,-40 0,-27', fill: '#f7e3cc', stroke: '#c99e73', 'stroke-width': 1.4 }));
      gg.appendChild(s('polygon', { points: '13,-26 8,-40 0,-27', fill: '#f7e3cc', stroke: '#c99e73', 'stroke-width': 1.4 }));
      gg.appendChild(s('circle', { cx: -6, cy: -16, r: 2.2, fill: '#4b3a2a' }));
      gg.appendChild(s('circle', { cx: 6, cy: -16, r: 2.2, fill: '#4b3a2a' }));
      gg.appendChild(s('path', { d: 'M -3 -9 Q 0 -5 3 -9', fill: 'none', stroke: '#4b3a2a', 'stroke-width': 1.4, 'stroke-linecap': 'round' }));
      gg.appendChild(s('path', { d: 'M 24 6 Q 40 -2 34 -14', fill: 'none', stroke: '#c99e73', 'stroke-width': 3.2, 'stroke-linecap': 'round' }));
      return gg;
    }

    function boxBody() {
      var gg = s('g');
      gg.appendChild(s('ellipse', { cx: 240, cy: 223, rx: 96, ry: 8, fill: 'rgba(90,75,50,.10)' }));
      gg.appendChild(s('rect', { x: 150, y: 100, width: 180, height: 120, rx: 7, fill: '#f6f1e6', stroke: '#a98d61', 'stroke-width': 2 }));
      gg.appendChild(s('rect', { x: 150, y: 100, width: 180, height: 22, rx: 7, fill: '#cbb28a', stroke: '#a98d61', 'stroke-width': 2 }));
      gg.appendChild(T(240, 116, 'BOX', { size: 10, fill: '#6b5433', weight: 700 }));
      return gg;
    }

    function frontBand() {
      var gg = s('g');
      gg.appendChild(s('rect', { x: 150, y: 196, width: 180, height: 24, rx: 3, fill: '#e8dcc6', stroke: '#a98d61', 'stroke-width': 2 }));
      return gg;
    }

    function draw() {
      XK.clear(g);
      g.appendChild(line(52, 276, 428, 276, { stroke: C.grid, w: 1.5 }));
      if (prep === 'behind') {
        g.appendChild(boxBody());
        g.appendChild(cat(240, 128, 1));
      } else if (prep === 'in') {
        g.appendChild(boxBody());
        g.appendChild(cat(240, 176, 1));
        g.appendChild(frontBand());
      } else if (prep === 'on') {
        g.appendChild(boxBody());
        g.appendChild(cat(240, 82, 1));
      } else if (prep === 'under') {
        g.appendChild(boxBody());
        g.appendChild(cat(240, 252, .92));
      } else if (prep === 'in front of') {
        g.appendChild(boxBody());
        g.appendChild(cat(240, 244, 1.05));
      } else if (prep === 'next to') {
        g.appendChild(boxBody());
        g.appendChild(cat(376, 246, 1));
      }
      g.appendChild(T(240, 296, DATA[prep].en, { size: 13, weight: 600, fill: tone(ctx) }));
    }

    function update() {
      var d = DATA[prep];
      ctx.set([
        { k: '介词', v: prep, big: true },
        { k: '句子', v: d.en },
        { k: '中文', v: d.zh },
        { k: '用法', v: d.tip },
        { k: '', eq: 'Where is the cat? — It is ' + prep + ' the box.' }
      ]);
    }

    XK.toggles(ctx.controls, {
      label: '把小猫放到', options: ['in', 'on', 'under', 'behind', 'in front of', 'next to'],
      value: prep,
      onchange: function (v) { prep = v; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     18. 购物问价 How much
     ========================================================== */
  XK.figure('shop', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '购物问价的句型示意图');
    var g = s('g'); svg.appendChild(g);
    var ITEMS = [
      { en: 'apple', pl: 'apples', zh: '苹果', p: 3 },
      { en: 'book', pl: 'books', zh: '书', p: 12 },
      { en: 'pen', pl: 'pens', zh: '钢笔', p: 5 },
      { en: 'T-shirt', pl: 'T-shirts', zh: 'T 恤', p: 45 }
    ];
    var idx = 0, qty = 2;

    function draw() {
      XK.clear(g);
      var it = ITEMS[idx];
      // 商品卡
      g.appendChild(s('rect', { x: 44, y: 46, width: 190, height: 170, rx: 14, fill: soft(ctx), stroke: tone(ctx), 'stroke-width': 1.6 }));
      g.appendChild(T(139, 100, it.en, { size: 19, weight: 700, fill: tone(ctx) }));
      g.appendChild(T(139, 128, it.zh, { size: 12, fill: C.mut }));
      g.appendChild(T(139, 176, '￥' + it.p, { size: 26, weight: 700 }));
      g.appendChild(T(139, 198, 'each', { size: 11, fill: C.faint }));
      // 数量
      for (var i = 0; i < qty; i++) {
        var x = 274 + (i % 3) * 46, y = 74 + Math.floor(i / 3) * 62;
        g.appendChild(s('rect', { x: x, y: y, width: 38, height: 38, rx: 8, fill: '#fff', stroke: C.line }));
        g.appendChild(T(x + 19, y + 25, '1', { size: 13, fill: C.mut }));
      }
      g.appendChild(T(340, 210, '共 ' + qty + ' 个', { size: 12, fill: C.mut }));
      var total = it.p * qty;
      g.appendChild(T(340, 236, '合计 ￥' + total, { size: 15, weight: 700, fill: tone(ctx) }));
      g.appendChild(T(240, 282, qty === 1 ? 'How much is the ' + it.en + '?' : 'How much are the ' + it.pl + '?', { size: 13, weight: 600, fill: C.ink }));
    }

    function update() {
      var it = ITEMS[idx], one = qty === 1;
      var q = one ? 'How much is the ' + it.en + '?' : 'How much are the ' + it.pl + '?';
      var a = one ? "It's " + it.p + ' yuan.' : "They're " + it.p * qty + ' yuan.';
      ctx.set([
        { k: '问句', v: q, big: true },
        { k: '答句', v: a },
        { k: '中文', v: one ? '这个' + it.zh + '多少钱？' : '这些' + it.zh + '多少钱？' },
        { k: '单复数', v: one ? 'is / It\'s' : 'are / They\'re' },
        { k: '', eq: '一个用 is，两个以上用 are' }
      ]);
    }

    XK.toggles(ctx.controls, {
      label: '买什么', options: ITEMS.map(function (x, i) { return { value: i, label: x.en }; }),
      value: idx, onchange: function (v) { idx = v; draw(); update(); }
    });
    XK.slider(ctx.controls, {
      label: '买几个', min: 1, max: 5, value: qty,
      oninput: function (v) { qty = v; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     19. There be 句型
     ========================================================== */
  XK.figure('therebe', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '桌上数量不同的物品');
    var g = s('g'); svg.appendChild(g);
    var n = 3, noun = { s: 'book', pl: 'books', zh: '书' }, place = { en: 'on the desk', zh: '在桌子上' };

    function draw() {
      XK.clear(g);
      // 桌面
      var y = 196;
      g.appendChild(s('rect', { x: 92, y: y, width: 300, height: 12, rx: 3, fill: '#d9c9ad', stroke: '#b09a75' }));
      g.appendChild(line(112, y + 12, 104, 250, { stroke: '#b09a75', w: 5 }));
      g.appendChild(line(372, y + 12, 380, 250, { stroke: '#b09a75', w: 5 }));
      // 书本
      for (var i = 0; i < n; i++) {
        var x = 132 + (i % 3) * 66, yy = y - 22 - Math.floor(i / 3) * 24;
        g.appendChild(s('rect', { x: x, y: yy, width: 54, height: 20, rx: 2, fill: i % 2 ? '#cfe0ff' : '#e9f0ff', stroke: tone(ctx), 'stroke-width': 1.4 }));
        g.appendChild(line(x + 8, yy, x + 8, yy + 20, { stroke: tone(ctx), w: 1 }));
      }
      g.appendChild(T(240, 282, n + ' 个 ' + noun.pl + ' ' + place.en, { size: 12, fill: C.mut }));
    }

    function update() {
      var one = n === 1;
      var sent = one ? 'There is a ' + noun.s + ' ' + place.en + '.' : 'There are ' + n + ' ' + noun.pl + ' ' + place.en + '.';
      ctx.set([
        { k: '句子', v: sent, big: true },
        { k: '中文', v: '有 ' + n + ' 本' + noun.zh + ' ' + place.zh + '。' },
        { k: '结构', v: one ? 'There is + 单数' : 'There are + 复数' },
        { k: '就近原则', v: 'There is a book and two pens…（看最近的名词）' },
        { k: '', eq: 'There be 表示"某地有某物"，不是"某人有"' }
      ]);
    }

    XK.slider(ctx.controls, {
      label: '数量', min: 1, max: 5, value: n,
      oninput: function (v) { n = v; draw(); update(); }
    });
    XK.toggles(ctx.controls, {
      label: '放在', options: [
        { value: 'on the desk', label: '桌上' },
        { value: 'in the box', label: '盒子里' },
        { value: 'under the chair', label: '椅子下' }
      ],
      value: place.en,
      onchange: function (v) {
        place = { en: v, zh: v === 'on the desk' ? '在桌子上' : v === 'in the box' ? '在盒子里' : '在椅子下面' };
        draw(); update();
      }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     20. 形容词比较级
     ========================================================== */
  XK.figure('comparative', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '两个身高不同的人');
    var g = s('g'); svg.appendChild(g);
    var h1 = 152, h2 = 138, adj = 'tall';
    var RULES = {
      tall: { cmp: 'taller', zh: '更高的', rule: '一般直接加 -er' },
      heavy: { cmp: 'heavier', zh: '更重的', rule: '辅音字母 + y，变 y 为 i 再加 -er' }
    };

    function person(x, hgt, name, tone2) {
      var sc = hgt / 160 * 150;
      var gy = 244;
      var gg = s('g');
      gg.appendChild(s('circle', { cx: x, cy: gy - sc, r: sc * .13, fill: '#f7e3cc', stroke: '#c99e73', 'stroke-width': 1.6 }));
      gg.appendChild(s('rect', { x: x - sc * .12, y: gy - sc + sc * .15, width: sc * .24, height: sc * .42, rx: sc * .06, fill: tone2, stroke: 'rgba(0,0,0,.08)' }));
      gg.appendChild(line(x - sc * .07, gy - sc * .42, x - sc * .07, gy, { stroke: '#3d4552', w: 5 }));
      gg.appendChild(line(x + sc * .07, gy - sc * .42, x + sc * .07, gy, { stroke: '#3d4552', w: 5 }));
      gg.appendChild(line(x - sc * .16, gy - sc * .56, x + sc * .16, gy - sc * .56, { stroke: tone2, w: 5 }));
      gg.appendChild(T(x, gy + 16, name, { size: 11.5, weight: 600 }));
      // 身高虚线
      gg.appendChild(line(x + sc * .28, gy, x + sc * .28, gy - sc, { stroke: C.faint, w: 1, dash: '4 3' }));
      gg.appendChild(T(x + sc * .34, gy - sc + 4, hgt + ' cm', { size: 9.5, fill: C.mut, anchor: 'start' }));
      return gg;
    }

    function draw() {
      XK.clear(g);
      g.appendChild(line(40, 244, 440, 244, { stroke: C.line, w: 2 }));
      g.appendChild(person(140, h1, 'Tom', tone(ctx)));
      g.appendChild(person(300, h2, 'Sam', '#7c3aed'));
      var taller = h1 === h2 ? null : h1 > h2 ? 'Tom' : 'Sam';
      if (taller) {
        g.appendChild(T(240, 284, taller + ' is ' + RULES[adj].cmp + ' than ' + (taller === 'Tom' ? 'Sam' : 'Tom') + '.', { size: 12.5, weight: 600, fill: tone(ctx) }));
      } else {
        g.appendChild(T(240, 284, 'They are the same height.', { size: 12.5, fill: C.mut }));
      }
    }

    function update() {
      var cmp = RULES[adj].cmp;
      var eq = h1 === h2;
      var sen = eq ? 'Tom is as tall as Sam.' : (h1 > h2 ? 'Tom is ' + cmp + ' than Sam.' : 'Sam is ' + cmp + ' than Tom.');
      ctx.set([
        { k: '比较级', v: adj + ' → ' + cmp, big: true },
        { k: '句子', v: sen },
        { k: '变化规则', v: RULES[adj].rule },
        { k: '同义句', v: eq ? '两人一样高' : (h1 > h2 ? 'Sam is shorter than Tom.' : 'Tom is shorter than Sam.') },
        { k: '', eq: '比较级 + than，表示"比……更……"' }
      ]);
    }

    XK.slider(ctx.controls, { label: 'Tom 身高', min: 120, max: 165, value: h1, unit: ' cm', oninput: function (v) { h1 = v; draw(); update(); } });
    XK.slider(ctx.controls, { label: 'Sam 身高', min: 120, max: 165, value: h2, unit: ' cm', oninput: function (v) { h2 = v; draw(); update(); } });
    XK.toggles(ctx.controls, {
      label: '换个形容词', options: [{ value: 'tall', label: 'tall' }, { value: 'heavy', label: 'heavy' }],
      value: adj, onchange: function (v) { adj = v; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     21. 时态时间轴
     ========================================================== */
  XK.figure('tense', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '四种时态在时间轴上的位置');
    var g = s('g'); svg.appendChild(g);
    var ST = (ctx.cfg && ctx.cfg.state) || {};
    var t = ST.tense || 'present', subj = ST.subj || 'I';
    var DATA = {
      present: {
        name: '一般现在时', pos: .52, marker: 'every day / usually',
        form: function (s2) { return s2 === 'I' ? 'play' : 'plays'; },
        sent: function (s2) { return s2 + ' ' + (s2 === 'I' ? 'play' : 'plays') + ' football every day.'; },
        zh: '我（他）每天踢足球。', struct: '主语 + 动词原形 / 三单'
      },
      continuous: {
        name: '现在进行时', pos: .52, marker: 'now / look / listen',
        form: function (s2) { return (s2 === 'I' ? 'am' : s2 === 'He' ? 'is' : 'are') + ' playing'; },
        sent: function (s2) { return s2 + ' ' + (s2 === 'I' ? 'am' : s2 === 'He' ? 'is' : 'are') + ' playing football now.'; },
        zh: '我（他）正在踢足球。', struct: '主语 + be + 动词-ing'
      },
      past: {
        name: '一般过去时', pos: .2, marker: 'yesterday / last week',
        form: function () { return 'played'; },
        sent: function (s2) { return s2 + ' played football yesterday.'; },
        zh: '我（他）昨天踢了足球。', struct: '主语 + 动词过去式'
      },
      future: {
        name: '一般将来时', pos: .82, marker: 'tomorrow / next week',
        form: function () { return 'will play'; },
        sent: function (s2) { return s2 + ' will play football tomorrow.'; },
        zh: '我（他）明天要踢足球。', struct: '主语 + will + 动词原形'
      }
    };

    function draw() {
      XK.clear(g);
      var y = 150, x0 = 54, x1 = 426;
      g.appendChild(line(x0, y, x1, y, { stroke: C.ink2, w: 2.4 }));
      g.appendChild(s('polygon', { points: (x1 + 8) + ',' + y + ' ' + x1 + ',' + (y - 6) + ' ' + x1 + ',' + (y + 6), fill: C.ink2 }));
      var labels = [['过去', .2], ['现在', .52], ['将来', .82]];
      labels.forEach(function (l) {
        g.appendChild(line(x0 + (x1 - x0) * l[1], y - 8, x0 + (x1 - x0) * l[1], y + 8, { stroke: C.faint, w: 1 }));
        g.appendChild(T(x0 + (x1 - x0) * l[1], y + 26, l[0], { size: 11, fill: C.mut }));
      });
      // 现在的高亮带
      var px = x0 + (x1 - x0) * DATA[t].pos;
      g.appendChild(s('circle', { cx: px, cy: y, r: 8, fill: tone(ctx) }));
      g.appendChild(s('circle', { cx: px, cy: y, r: 14, fill: 'none', stroke: tone(ctx), opacity: .3, 'stroke-width': 3 }));
      // 动作图标
      var iy = 80;
      g.appendChild(s('circle', { cx: px, cy: iy, r: 26, fill: soft(ctx), stroke: tone(ctx), 'stroke-width': 1.4 }));
      g.appendChild(s('circle', { cx: px - 7, cy: iy - 6, r: 4, fill: tone(ctx) }));
      g.appendChild(line(px - 4, iy + 6, px + 6, iy - 2, { stroke: tone(ctx), w: 3 }));
      g.appendChild(line(px + 6, iy - 2, px + 12, iy + 8, { stroke: tone(ctx), w: 3 }));
      g.appendChild(T(px, iy - 34, DATA[t].name, { size: 11.5, weight: 600, fill: tone(ctx) }));
      g.appendChild(T(px, y + 48, DATA[t].marker, { size: 10.5, fill: C.mut }));
    }

    function update() {
      var d = DATA[t];
      ctx.set([
        { k: d.name, v: d.sent(subj), big: true },
        { k: '中文', v: d.zh },
        { k: '结构', v: d.struct },
        { k: '动词形式', v: d.form(subj) },
        { k: '时间标志词', v: d.marker },
        { k: '', eq: '先看时间标志词，再定时态，最后变动词' }
      ]);
    }

    XK.toggles(ctx.controls, {
      label: '选时态', options: [
        { value: 'present', label: '一般现在' },
        { value: 'continuous', label: '现在进行' },
        { value: 'past', label: '一般过去' },
        { value: 'future', label: '一般将来' }
      ],
      value: t, onchange: function (v) { t = v; draw(); update(); }
    });
    XK.toggles(ctx.controls, {
      label: '主语', options: [{ value: 'I', label: 'I' }, { value: 'He', label: 'He' }],
      value: subj, onchange: function (v) { subj = v; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     22. 词形变化器（复数 / 三单）
     ========================================================== */
  XK.figure('wordform', function (ctx) {
    var ST = (ctx.cfg && ctx.cfg.state) || {};
    var mode = ST.mode || 'plural', sel = 0;
    var DATA = {
      plural: [
        { w: 'cat', r: 'cats', rule: '一般直接加 -s' },
        { w: 'box', r: 'boxes', rule: '以 s、x、ch、sh 结尾，加 -es' },
        { w: 'baby', r: 'babies', rule: '辅音字母 + y，变 y 为 i 再加 -es' },
        { w: 'knife', r: 'knives', rule: '以 f / fe 结尾，变 f 为 v 再加 -es' },
        { w: 'man', r: 'men', rule: '不规则变化，要单独记' },
        { w: 'child', r: 'children', rule: '不规则变化，要单独记' },
        { w: 'sheep', r: 'sheep', rule: '单复数同形' },
        { w: 'photo', r: 'photos', rule: '以 o 结尾但表示"照片"，直接加 -s' }
      ],
      third: [
        { w: 'play', r: 'plays', rule: '一般直接加 -s' },
        { w: 'like', r: 'likes', rule: '以 e 结尾，直接加 -s' },
        { w: 'go', r: 'goes', rule: '以 o 结尾，加 -es' },
        { w: 'watch', r: 'watches', rule: '以 ch 结尾，加 -es' },
        { w: 'study', r: 'studies', rule: '辅音字母 + y，变 y 为 i 再加 -es' },
        { w: 'have', r: 'has', rule: '不规则变化' },
        { w: 'be', r: 'is', rule: '不规则变化' },
        { w: 'do', r: 'does', rule: '以 o 结尾，加 -es' }
      ]
    };

    var box = card(ctx.stage);
    var chips = h('div', { style: 'display:flex;flex-wrap:wrap;gap:6px;justify-content:center' });
    ctx.stage.appendChild(chips);

    function common(a, b) {
      var i = 0;
      while (i < a.length && i < b.length && a[i] === b[i]) i++;
      return i;
    }

    function draw() {
      var item = DATA[mode][sel];
      var cp = common(item.w, item.r);
      var head = mode === 'plural' ? '复数形式' : '第三人称单数';
      box.innerHTML = '';
      box.appendChild(h('div', { style: 'font-size:11px;letter-spacing:.08em;color:#9aa1ab;margin-bottom:12px' }, head));
      var line = h('div', { style: 'display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;font-size:26px;font-weight:700;letter-spacing:.01em' });
      line.appendChild(h('span', { style: 'color:#1e232b' }, item.w));
      line.appendChild(h('span', { style: 'color:#aab0b9;font-size:20px' }, '→'));
      var out = h('span', { style: 'color:#1e232b' });
      out.appendChild(h('span', {}, item.r.slice(0, cp)));
      out.appendChild(h('span', { style: 'color:' + tone(ctx) }, item.r.slice(cp) || '（不变）'));
      line.appendChild(out);
      box.appendChild(line);
      box.appendChild(h('div', { style: 'margin-top:14px;font-size:13px;color:#3d4552;background:#f7f3ea;border-radius:9px;padding:9px 12px;text-align:left' }, item.rule));

      XK.clear(chips);
      DATA[mode].forEach(function (x, i) {
        var b = h('button', {
          type: 'button',
          'aria-pressed': String(i === sel),
          style: 'padding:6px 11px;border-radius:999px;font-size:12.5px;cursor:pointer;min-height:34px;' +
            'border:1.5px solid ' + (i === sel ? tone(ctx) : '#dcd5c8') + ';' +
            'background:' + (i === sel ? tone(ctx) : '#fff') + ';color:' + (i === sel ? '#fff' : '#3d4552')
        }, x.w);
        b.addEventListener('click', function () { sel = i; draw(); update(); });
        chips.appendChild(b);
      });
    }

    function update() {
      var item = DATA[mode][sel];
      ctx.set([
        { k: '原词', v: item.w, big: true },
        { k: '变化后', v: item.r },
        { k: '规则', v: item.rule },
        { k: '同类例词', v: DATA[mode].slice(0, 4).map(function (x) { return x.r; }).join('、') },
        { k: '', eq: mode === 'plural' ? '注意：不规则复数只能靠记' : '注意：主语是 he / she / it 时动词才变' }
      ]);
    }

    XK.toggles(ctx.controls, {
      label: '练哪一类', options: [{ value: 'plural', label: '名词复数' }, { value: 'third', label: '动词三单' }],
      value: mode,
      onchange: function (v) { mode = v; sel = 0; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     23. 人称代词表
     ========================================================== */
  XK.figure('pronoun', function (ctx) {
    var DATA = [
      { p: 'I', o: 'me', a: 'my', n: 'mine', zh: '我', ex: 'This is my book. It\'s mine.' },
      { p: 'you', o: 'you', a: 'your', n: 'yours', zh: '你 / 你们', ex: 'Is this your pen? Yes, it\'s yours.' },
      { p: 'he', o: 'him', a: 'his', n: 'his', zh: '他', ex: 'That is his bag. It\'s his.' },
      { p: 'she', o: 'her', a: 'her', n: 'hers', zh: '她', ex: 'Her coat is red. The red one is hers.' },
      { p: 'it', o: 'it', a: 'its', n: 'its', zh: '它', ex: 'The cat likes its box.' },
      { p: 'we', o: 'us', a: 'our', n: 'ours', zh: '我们', ex: 'This is our classroom. It\'s ours.' },
      { p: 'they', o: 'them', a: 'their', n: 'theirs', zh: '他们', ex: 'Their house is big. It\'s theirs.' }
    ];
    var sel = 0;

    function draw() {
      XK.clear(ctx.stage);
      var tbl = h('table', {
        style: 'width:100%;max-width:440px;border-collapse:collapse;background:#fff;font-size:13px;' +
          'border:1px solid #e7e1d6;border-radius:12px;overflow:hidden'
      });
      var thead = h('thead');
      var hr = h('tr');
      ['人称', '主格', '宾格', '形容词性物主', '名词性物主'].forEach(function (t) {
        hr.appendChild(h('th', {
          style: 'padding:8px 6px;background:#f7f3ea;font-weight:600;font-size:11.5px;color:#6b7280;border-bottom:1px solid #e7e1d6;text-align:center'
        }, t));
      });
      thead.appendChild(hr); tbl.appendChild(thead);
      var tb = h('tbody');
      DATA.forEach(function (d, i) {
        var tr = h('tr', { style: 'cursor:pointer' });
        tr.addEventListener('click', function () { sel = i; draw(); update(); });
        [d.zh, d.p, d.o, d.a, d.n].forEach(function (v, j) {
          tr.appendChild(h('td', {
            style: 'padding:9px 6px;text-align:center;border-bottom:1px solid #f0ebe1;' +
              (i === sel ? 'background:' + soft(ctx) + ';' : '') +
              (j === 0 ? 'color:#6b7280;font-size:12px;' : 'font-weight:600;')
          }, v));
        });
        tb.appendChild(tr);
      });
      tbl.appendChild(tb);
      ctx.stage.appendChild(tbl);
    }

    function update() {
      var d = DATA[sel];
      ctx.set([
        { k: '主格（做主语）', v: d.p + ' — ' + d.p + ' like music.', big: true },
        { k: '宾格（做宾语）', v: d.o + ' — Give it to ' + d.o + '.' },
        { k: '形容词性物主', v: d.a + ' + 名词：' + d.a + ' book' },
        { k: '名词性物主', v: d.n + '（后面不加名词）' },
        { k: '例句', v: d.ex },
        { k: '', eq: '后面有名词用 my/your…，没有名词用 mine/yours…' }
      ]);
    }

    XK.toggles(ctx.controls, {
      label: '选一个人称', options: DATA.map(function (d, i) { return { value: i, label: d.zh }; }),
      value: sel, onchange: function (v) { sel = v; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     24. 句型转换（否定句 / 一般疑问句）
     ========================================================== */
  XK.figure('sentence', function (ctx) {
    var ST = (ctx.cfg && ctx.cfg.state) || {};
    var kind = ST.kind || 'be', type = ST.type || 'neg';
    var DATA = {
      be: {
        name: '含 be 动词：She is a teacher.',
        subj: 'She', verb: 'is', rest: 'a teacher',
        neg: 'She isn\'t a teacher.',
        ask: 'Is she a teacher?',
        short: 'Yes, she is. / No, she isn\'t.',
        step: ['找到 be 动词 is', '否定：is 后面加 not → isn\'t', '疑问：把 Is 提到句首，句末加 ?']
      },
      do: {
        name: '实义动词：They like apples.',
        subj: 'They', verb: 'like', rest: 'apples',
        neg: 'They don\'t like apples.',
        ask: 'Do they like apples?',
        short: 'Yes, they do. / No, they don\'t.',
        step: ['句子没有 be 动词，借助动词 do', '否定：don\'t + 动词原形', '疑问：Do 放句首，动词用原形']
      },
      third: {
        name: '第三人称单数：He likes apples.',
        subj: 'He', verb: 'likes', rest: 'apples',
        neg: 'He doesn\'t like apples.',
        ask: 'Does he like apples?',
        short: 'Yes, he does. / No, he doesn\'t.',
        step: ['主语是 He，用助动词 does', '否定：doesn\'t + 动词原形（likes 变回 like）', '疑问：Does 放句首，likes 也变回 like']
      }
    };
    var box = card(ctx.stage);

    function draw() {
      var d = DATA[kind];
      box.innerHTML = '';
      box.appendChild(h('div', { style: 'font-size:11px;letter-spacing:.08em;color:#9aa1ab;margin-bottom:10px' }, '原句'));
      box.appendChild(h('div', { style: 'font-size:19px;font-weight:700;margin-bottom:14px' }, d.name.replace(/^.*：/, '')));
      box.appendChild(h('div', { style: 'font-size:11px;letter-spacing:.08em;color:#9aa1ab;margin-bottom:8px' }, type === 'neg' ? '否定句' : '一般疑问句'));
      var out = h('div', { style: 'font-size:20px;font-weight:700;color:' + tone(ctx) }, type === 'neg' ? d.neg : d.ask);
      box.appendChild(out);
      if (type === 'ask') {
        box.appendChild(h('div', { style: 'margin-top:12px;font-size:13px;color:#3d4552' }, d.short));
      }
      box.appendChild(h('div', {
        style: 'margin-top:14px;font-size:12px;color:#6b7280;border-top:1px dashed #e7e1d6;padding-top:10px;text-align:left'
      }, type === 'neg' ? '否定句 = 在 be / 助动词后面加 not' : '一般疑问句 = 把 be / 助动词提到句首'));
    }

    function update() {
      var d = DATA[kind];
      ctx.set([
        { k: '原句', v: d.name.replace(/^.*：/, ''), big: true },
        { k: '否定句', v: d.neg },
        { k: '一般疑问句', v: d.ask },
        { k: '简答', v: d.short },
        { k: '第 1 步', v: d.step[0] },
        { k: '第 2 步', v: d.step[1] },
        { k: '第 3 步', v: d.step[2] },
        { k: '', eq: '有 be 用 be，没 be 借 do / does' }
      ]);
    }

    XK.toggles(ctx.controls, {
      label: '选句子', options: [
        { value: 'be', label: 'be 动词' },
        { value: 'do', label: '实义动词' },
        { value: 'third', label: '三单' }
      ],
      value: kind, onchange: function (v) { kind = v; draw(); update(); }
    });
    XK.toggles(ctx.controls, {
      label: '变成', options: [{ value: 'neg', label: '否定句' }, { value: 'ask', label: '一般疑问句' }],
      value: type, onchange: function (v) { type = v; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     25. 特殊疑问词
     ========================================================== */
  XK.figure('whword', function (ctx) {
    var DATA = [
      { s: 'I get up at six.', part: 'at six', wh: 'When', q: 'When do you get up?', zh: '你什么时候起床？' },
      { s: 'She is my sister.', part: 'my sister', wh: 'Who', q: 'Who is she?', zh: '她是谁？' },
      { s: 'The book is on the desk.', part: 'on the desk', wh: 'Where', q: 'Where is the book?', zh: '书在哪里？' },
      { s: 'I like blue.', part: 'blue', wh: 'What colour', q: 'What colour do you like?', zh: '你喜欢什么颜色？' },
      { s: 'It is Monday.', part: 'Monday', wh: 'What day', q: 'What day is it?', zh: '今天星期几？' },
      { s: 'Tom is reading.', part: 'Tom', wh: 'Who', q: 'Who is reading?', zh: '谁在读书？' }
    ];
    var OPTS = ['When', 'Who', 'Where', 'What colour', 'What day', 'How'];
    var idx = 0, chosen = null;
    var box = card(ctx.stage);

    function draw() {
      var d = DATA[idx];
      box.innerHTML = '';
      box.appendChild(h('div', { style: 'font-size:11px;letter-spacing:.08em;color:#9aa1ab;margin-bottom:10px' }, '对划线部分提问'));
      var parts = d.s.split(d.part);
      var line = h('div', { style: 'font-size:19px;font-weight:600;line-height:1.6' });
      line.appendChild(h('span', {}, parts[0]));
      line.appendChild(h('span', { style: 'background:#ffe9a8;border-bottom:2px solid #f2b705;padding:1px 2px' }, d.part));
      line.appendChild(h('span', {}, parts[1] || ''));
      box.appendChild(line);
      var choices = h('div', { style: 'display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:16px' });
      ['When', 'Who', 'Where', 'What colour'].forEach(function (w) {
        var isRight = w === d.wh;
        var state = chosen === null ? '' : (w === chosen ? (isRight ? 'right' : 'wrong') : (chosen && isRight ? 'right' : ''));
        var b = h('button', {
          type: 'button',
          style: 'padding:8px 14px;border-radius:10px;font-size:14px;cursor:pointer;min-height:40px;' +
            'border:1.5px solid ' + (state === 'right' ? '#15803d' : state === 'wrong' ? '#e6a281' : '#dcd5c8') + ';' +
            'background:' + (state === 'right' ? '#e8f6ec' : state === 'wrong' ? '#fdece3' : '#fff') + ';' +
            'color:' + (state === 'right' ? '#15803d' : state === 'wrong' ? '#c2410c' : '#3d4552')
        }, w);
        b.addEventListener('click', function () { chosen = w; draw(); update(); });
        choices.appendChild(b);
      });
      box.appendChild(choices);
      if (chosen !== null) {
        var ok = chosen === d.wh;
        box.appendChild(h('div', {
          style: 'margin-top:14px;font-size:13.5px;color:' + (ok ? '#15803d' : '#c2410c') + ';font-weight:600'
        }, ok ? '✓ 正确：' + d.q : '再想想：划线部分是"' + d.part + '"，应该用 ' + d.wh));
      }
    }

    function update() {
      var d = DATA[idx];
      ctx.set([
        { k: '划线部分', v: d.part, big: true },
        { k: '该用疑问词', v: d.wh },
        { k: '问句', v: d.q },
        { k: '中文', v: d.zh },
        { k: '', eq: '疑问词放句首，后面接一般疑问句语序' }
      ]);
    }

    XK.toggles(ctx.controls, {
      label: '换一个句子', options: DATA.map(function (x, i) { return { value: i, label: '第 ' + (i + 1) + ' 句' }; }),
      value: idx, onchange: function (v) { idx = v; chosen = null; draw(); update(); }
    });
    XK.button(ctx.controls, {
      label: '再试一次', cls: 'ghost', onClick: function () { chosen = null; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     26. 语序成句
     ========================================================== */
  XK.figure('wordorder', function (ctx) {
    var SETS = [
      { ans: ['She', 'goes', 'to', 'school', 'by', 'bus', '.'], hint: '她坐公交车去上学。' },
      { ans: ['There', 'is', 'a', 'book', 'on', 'the', 'desk', '.'], hint: '桌上有一本书。' },
      { ans: ['What', 'time', 'do', 'you', 'get', 'up', '?'], hint: '你几点起床？' }
    ];
    var si = 0, pool = [], built = [], checked = false;
    var wrap = h('div', { style: 'width:100%;display:flex;flex-direction:column;gap:14px;align-items:center' });
    var lineEl = h('div', {
      style: 'min-height:56px;width:100%;border:2px dashed #dcd5c8;border-radius:12px;background:#fff;' +
        'display:flex;flex-wrap:wrap;gap:6px;padding:10px;align-items:center;justify-content:center'
    });
    var poolEl = h('div', { style: 'display:flex;flex-wrap:wrap;gap:6px;justify-content:center' });
    var msg = h('div', { style: 'font-size:13px;min-height:20px' });
    wrap.appendChild(lineEl); wrap.appendChild(poolEl); wrap.appendChild(msg);
    ctx.stage.appendChild(wrap);

    function reset() {
      pool = SETS[si].ans.slice();
      // 固定打乱顺序
      var punct = pool.filter(function (w) { return w === '.' || w === '?' || w === ','; });
      var words = pool.filter(function (w) { return punct.indexOf(w) < 0; });
      pool = words.map(function (w, i) { return { w: w, k: (i * 7 + 3) % 11 }; })
        .sort(function (a, b) { return a.k - b.k; }).map(function (o) { return o.w; }).concat(punct);
      built = []; checked = false; msg.textContent = '';
      draw();
    }

    function tile(word, onClick, faded) {
      return h('button', {
        type: 'button', style: 'padding:9px 13px;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;' +
          'min-height:42px;border:1.5px solid ' + (faded ? '#e7e1d6' : '#dcd5c8') + ';background:' + (faded ? '#faf7f1' : '#fff')
      }, word);
    }
    // 上面这个返回值被覆盖，改为在 draw 中绑定事件
    function makeTile(word, onClick, faded) {
      var b = tile(word, onClick, faded);
      b.addEventListener('click', onClick);
      return b;
    }

    function draw() {
      XK.clear(lineEl); XK.clear(poolEl);
      if (!built.length) {
        lineEl.appendChild(h('span', { style: 'color:#aab0b9;font-size:13px' }, '点下面的单词，按顺序排成句子'));
      }
      built.forEach(function (w, i) {
        if (w === '.' || w === '?' || w === ',') {
          lineEl.appendChild(h('span', { style: 'font-size:19px;font-weight:700;color:#3d4552' }, w));
          return;
        }
        lineEl.appendChild(makeTile(w, function () {
          pool.push(w); built.splice(i, 1); checked = false; msg.textContent = ''; draw();
        }, false));
      });
      pool.forEach(function (w, i) {
        poolEl.appendChild(makeTile(w, function () {
          built.push(w); pool.splice(i, 1); checked = false; msg.textContent = ''; draw();
        }, true));
      });
    }

    function check() {
      var ans = SETS[si].ans;
      var ok = built.length === ans.length && built.every(function (w, i) { return w === ans[i]; });
      if (ok) {
        msg.style.color = '#15803d';
        msg.textContent = '✓ 完全正确：' + ans.join(' ').replace(' .', '.').replace(' ?', '?');
      } else {
        msg.style.color = '#c2410c';
        msg.textContent = '还不对：英语句子基本顺序是「主语 + 谓语 + 其他」，疑问句把疑问词放最前。';
      }
      checked = true;
    }

    XK.toggles(ctx.controls, {
      label: '换一句', options: SETS.map(function (x, i) { return { value: i, label: '第 ' + (i + 1) + ' 句' }; }),
      value: si, onchange: function (v) { si = v; reset(); update(); }
    });
    XK.button(ctx.controls, { label: '检查', onClick: check });
    XK.button(ctx.controls, { label: '重排', cls: 'ghost', onClick: reset });

    function update() {
      ctx.set([
        { k: '目标意思', v: SETS[si].hint, big: true },
        { k: '已排单词', v: built.length ? built.join(' ') : '还没开始' },
        { k: '剩余单词', v: pool.length + ' 个' },
        { k: '', eq: '陈述句：主语 + 动词 + 其他；疑问句：疑问词 + 助动词 + 主语 + 动词' }
      ]);
    }

    reset(); update();
    return function () {};
  });

})();
