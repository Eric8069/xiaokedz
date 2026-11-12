/* ==========================================================================
   小课桌 · 数学互动图（15 个）
   每个图：一个可改变的原因 → 一个可读出的结果
   ========================================================================== */
(function () {
  'use strict';
  var XK = window.XK, s = XK.s, h = XK.h, fmt = XK.fmt;
  var C = {
    ink: '#1e232b', ink2: '#3d4552', mut: '#7a8290', faint: '#aab0b9',
    line: '#c9c1b2', grid: '#e7e1d6', soft: '#f4efe6',
    blue: '#2563eb', blueL: '#dbe6ff', blueF: '#eff4ff',
    gold: '#f2b705', goldL: '#fff0bf',
    green: '#15803d', greenL: '#dcf0e2',
    red: '#c2410c', redL: '#fbe3d6', white: '#ffffff'
  };
  var SERIF = '"Songti SC","SimSun",serif';

  function T(x, y, str, o) {
    o = o || {};
    return s('text', {
      x: x, y: y, fill: o.fill || C.ink, 'font-size': o.size || 13,
      'text-anchor': o.anchor || 'middle',
      'font-weight': o.weight || 400,
      'font-family': o.serif ? SERIF : null,
      'dominant-baseline': o.base || 'auto',
      opacity: o.opacity || null
    }, str);
  }
  function line(x1, y1, x2, y2, o) {
    o = o || {};
    return s('line', {
      x1: x1, y1: y1, x2: x2, y2: y2,
      stroke: o.stroke || C.line, 'stroke-width': o.w || 2,
      'stroke-dasharray': o.dash || null, 'stroke-linecap': 'round'
    });
  }
  function stage(host, vb, label) {
    var svg = s('svg', { viewBox: vb, role: 'img', 'aria-label': label });
    host.appendChild(svg);
    return svg;
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ==========================================================
     1. 大数的认识 —— 分级读数
     ========================================================== */
  XK.figure('placevalue', function (ctx) {
    var digits = '30500000'.split('').map(Number);
    var U = {
      2: ['千亿', '百亿', '十亿', '亿'],
      1: ['千万', '百万', '十万', '万'],
      0: ['千', '百', '十', '个']
    };
    var GN = { 2: '亿级', 1: '万级', 0: '个级' };
    var wrap = h('div', { style: 'width:100%;display:flex;flex-direction:column;gap:12px;align-items:center' });
    var cap = h('div', { style: 'font-size:12px;color:#9aa1ab;text-align:center;line-height:1.7' });
    var groups = h('div', { style: 'display:flex;gap:14px;flex-wrap:wrap;justify-content:center;align-items:flex-start' });
    wrap.appendChild(cap);
    wrap.appendChild(groups);
    ctx.stage.appendChild(wrap);

    function chunks() {
      var out = [], arr = digits.slice();
      for (var i = arr.length; i > 0; i -= 4) out.unshift(arr.slice(Math.max(0, i - 4), i));
      return out;
    }

    function paint() {
      XK.clear(groups);
      var cs = chunks();
      cs.forEach(function (grp, gi) {
        var type = cs.length - 1 - gi; // 0 个级 1 万级 2 亿级
        var col = h('div', {
          style: 'display:flex;flex-direction:column;align-items:center;gap:6px;' +
            'background:#fbf7ee;border:1px solid #efe8db;border-radius:12px;padding:8px 7px 6px'
        });
        col.appendChild(h('div', {
          style: 'font-size:11px;letter-spacing:.08em;color:#9aa1ab'
        }, GN[type]));
        var row = h('div', { style: 'display:flex;gap:5px' });
        grp.forEach(function (d, k) {
          var idx = digits.length - (cs.length - gi) * 4 - (grp.length - k);
          // 修正：直接计算全局下标
          var base = 0;
          for (var q = 0; q < gi; q++) base += cs[q].length;
          idx = base + k;
          var b = h('button', {
            type: 'button',
            'aria-label': '第' + (idx + 1) + '位数字' + d + '，点击加一',
            style: 'width:34px;height:44px;border:1.5px solid ' + (d ? '#c9c1b2' : '#e7e1d6') +
              ';border-radius:9px;background:' + (d ? '#fff' : '#faf7f1') +
              ';font:600 19px/1 ui-monospace,monospace;color:' + (d ? '#1e232b' : '#c9c1b2') +
              ';cursor:pointer;transition:background .12s'
          }, String(d));
          b.addEventListener('click', function () {
            digits[idx] = (digits[idx] + 1) % 10;
            paint(); update();
          });
          row.appendChild(b);
        });
        col.appendChild(row);
        var units = h('div', { style: 'display:flex;gap:5px' });
        var names = U[type].slice(4 - grp.length);
        names.forEach(function (nm) {
          units.appendChild(h('div', { style: 'width:34px;text-align:center;font-size:10.5px;color:#aab0b9' }, nm));
        });
        col.appendChild(units);
        groups.appendChild(col);
      });
    }

    function update() {
      var str = digits.join('').replace(/^0+(?=\d)/, '');
      var num = Number(str);
      var placeNames = ['个', '十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿'];
      var high = placeNames[digits.length - 1];
      var rows = [
        { k: '这个数', v: XK.groupDigits(digits.join('')), big: true },
        { k: '读作', v: XK.readDigits(digits.join('')) },
        { k: '最高位', v: high ? high + '位' : '—' }
      ];
      var tail4 = digits.slice(-4).join('');
      if (digits.length > 4) {
        rows.push({ k: '四舍五入到万位', v: '约 ' + XK.groupDigits(String(Math.round(num / 1e4))) + ' 万' });
      }
      if (tail4 === '0000' && digits.length > 4) {
        rows.push({ k: '改写成"万"作单位', v: XK.groupDigits(String(num / 1e4)) + ' 万' });
      }
      if (digits.slice(-8).join('') === '00000000' && digits.length > 8) {
        rows.push({ k: '改写成"亿"作单位', v: XK.groupDigits(String(num / 1e8)) + ' 亿' });
      }
      rows.push({ k: '', eq: '点任意一位数字，它会加 1（9 之后回到 0）' });
      ctx.set(rows);
      var cs2 = chunks(), parts = [];
      cs2.forEach(function (g2, gi) {
        var ty = cs2.length - 1 - gi;
        parts.push(GN[ty] + ' ' + g2.length + ' 位');
      });
      cap.textContent = '共 ' + digits.length + ' 位　|　' + parts.join(' + ');
    }

    function rand(n) {
      var a = [String(1 + Math.floor(Math.random() * 9))];
      for (var i = 1; i < n; i++) a.push(String(Math.floor(Math.random() * 10)));
      return a.map(Number);
    }

    var lenS = XK.slider(ctx.controls, {
      label: '这个数有几位', min: 5, max: 12, value: 8, unit: ' 位',
      oninput: function (v) { digits = rand(v); paint(); update(); }
    });
    XK.button(ctx.controls, {
      label: '换一个数', onClick: function () {
        digits = rand(lenS.value); paint(); update();
      }
    });

    paint(); update();
    return function () {};
  });

  /* ==========================================================
     2. 角的度量 —— 角的大小与边的长短无关
     ========================================================== */
  XK.figure('angle', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '量角器与一个可以改变大小的角');
    var cx = 240, cy = 254, R = 196;
    var gTicks = s('g'), gArc = s('g'), gRays = s('g');
    svg.appendChild(s('path', {
      d: 'M ' + (cx - R) + ' ' + cy + ' A ' + R + ' ' + R + ' 0 0 1 ' + (cx + R) + ' ' + cy,
      fill: C.blueF, stroke: C.line, 'stroke-width': 1.5
    }));
    for (var a = 0; a <= 180; a += 5) {
      var rad = a * Math.PI / 180;
      var r1 = R, r2 = R - (a % 10 === 0 ? 13 : 6);
      gTicks.appendChild(line(cx + r1 * Math.cos(rad), cy - r1 * Math.sin(rad),
        cx + r2 * Math.cos(rad), cy - r2 * Math.sin(rad), { stroke: a % 30 === 0 ? C.ink2 : C.faint, w: a % 30 === 0 ? 1.4 : 1 }));
      if (a % 30 === 0) {
        gTicks.appendChild(T(cx + (R - 27) * Math.cos(rad), cy - (R - 27) * Math.sin(rad) + 4,
          String(a), { size: 10.5, fill: C.mut }));
      }
    }
    svg.appendChild(gTicks);
    svg.appendChild(gArc);
    svg.appendChild(gRays);

    var deg = 50, len = 100;

    function draw() {
      var rad = deg * Math.PI / 180, L = R * len / 100;
      XK.clear(gArc); XK.clear(gRays);
      // 角弧
      var rk = 74;
      var x2 = cx + rk * Math.cos(rad), y2 = cy - rk * Math.sin(rad);
      gArc.appendChild(s('path', {
        d: 'M ' + (cx + rk) + ' ' + cy + ' A ' + rk + ' ' + rk + ' 0 0 0 ' + x2 + ' ' + y2,
        fill: 'none', stroke: C.blue, 'stroke-width': 2
      }));
      // 两条边
      gRays.appendChild(line(cx, cy, cx + L, cy, { stroke: C.ink, w: 2.6 }));
      gRays.appendChild(line(cx, cy, cx + L * Math.cos(rad), cy - L * Math.sin(rad), { stroke: C.ink, w: 2.6 }));
      gRays.appendChild(s('circle', { cx: cx, cy: cy, r: 4.5, fill: C.ink }));
      // 度数
      var mx = cx + (rk + 20) * Math.cos(rad / 2), my = cy - (rk + 20) * Math.sin(rad / 2);
      if (deg > 8) gRays.appendChild(T(mx, my + 4, deg + '°', { size: 14, weight: 700, fill: C.blue }));
    }

    function update() {
      var type = deg === 0 ? '一条射线' : deg < 90 ? '锐角' : deg === 90 ? '直角' : deg < 180 ? '钝角' : '平角';
      ctx.set([
        { k: '角的大小', v: deg + '°', big: true },
        { k: '按大小分类', v: type },
        { k: '与直角相比', v: deg === 90 ? '正好相等' : deg < 90 ? '小 ' + (90 - deg) + '°' : '大 ' + (deg - 90) + '°' },
        { k: '两条边的长度', v: '原来的 ' + len + '%' },
        { k: '', eq: '角的大小只看两条边张开的程度' }
      ]);
    }

    XK.slider(ctx.controls, {
      label: '角的大小', min: 0, max: 180, value: deg, unit: '°',
      oninput: function (v) { deg = v; draw(); update(); }
    });
    XK.slider(ctx.controls, {
      label: '把边延长到', min: 40, max: 100, value: len, unit: '%',
      oninput: function (v) { len = v; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     3. 平行与垂直 —— 平行线间的距离
     ========================================================== */
  XK.figure('parallel', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '两条直线与它们之间的距离');
    var g = s('g'); svg.appendChild(g);
    var tilt = 0, gap = 70;
    var y1 = 118, cx0 = 240;

    function draw() {
      XK.clear(g);
      var m = Math.tan(tilt * Math.PI / 180);
      // 直线1
      g.appendChild(line(38, y1, 442, y1, { stroke: C.ink, w: 2.4 }));
      g.appendChild(T(452, y1 + 4, 'l₁', { size: 12, fill: C.mut }));
      // 直线2
      var yA = y1 + gap + (38 - cx0) * m, yB = y1 + gap + (442 - cx0) * m;
      g.appendChild(line(38, yA, 442, yB, { stroke: C.blue, w: 2.4 }));
      g.appendChild(T(452, yB + 4, 'l₂', { size: 12, fill: C.blue }));

      // 三条虚线段
      var dist = Math.abs(gap) * Math.cos(tilt * Math.PI / 180);
      var cos = Math.cos(tilt * Math.PI / 180), sin = Math.sin(tilt * Math.PI / 180);
      [116, 240, 364].forEach(function (x) {
        var y2 = y1 + gap + (x - cx0) * m;
        // 法线方向 (-sin, cos) 向下
        var ex = x + dist * sin, ey = y1 + dist * cos;
        g.appendChild(line(x, y1, ex, ey, { stroke: C.gold, w: 2, dash: '4 3' }));
        g.appendChild(s('circle', { cx: x, cy: y1, r: 2.6, fill: C.gold }));
        g.appendChild(s('circle', { cx: ex, cy: ey, r: 2.6, fill: C.gold }));
        g.appendChild(T((x + ex) / 2 + 18, (y1 + ey) / 2, fmt(dist / 20, 1) + '格', { size: 10.5, fill: '#8a6d00' }));
      });

      // 交点
      if (Math.abs(tilt) > 0.4) {
        var xi = cx0 - gap / m;
        if (xi > 30 && xi < 450) {
          var yi = y1 + (xi - cx0) * m;
          g.appendChild(s('circle', { cx: xi, cy: yi, r: 5, fill: C.red }));
          g.appendChild(T(xi, yi - 12, '相交', { size: 11, fill: C.red, weight: 600 }));
        }
      }
    }

    function update() {
      var dist = Math.abs(gap) * Math.cos(tilt * Math.PI / 180);
      ctx.set([
        { k: '两条直线', v: tilt === 0 ? '互相平行' : '会相交', big: true },
        { k: '三个位置的距离', v: tilt === 0 ? '处处相等' : '不相等' },
        { k: '距离', v: fmt(dist / 20, 1) + ' 格' },
        { k: '', eq: '在同一平面内，不相交的两条直线叫平行线' }
      ]);
    }

    XK.slider(ctx.controls, {
      label: '把 l₂ 斜一点', min: 0, max: 12, value: 0, unit: '°',
      oninput: function (v) { tilt = v; draw(); update(); }
    });
    XK.slider(ctx.controls, {
      label: '两条线的距离', min: 40, max: 120, value: 70,
      oninput: function (v) { gap = v; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     4. 乘法分配律 —— 面积模型
     ========================================================== */
  XK.figure('areamodel', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '把 12 拆成 10 加 2 的长方形面积图');
    var g = s('g'); svg.appendChild(g);
    var A = 25, B1 = 10, B2 = 2;

    function draw() {
      XK.clear(g);
      var b = B1 + B2;
      var ux = Math.min(330 / b, 10), uy = Math.min(210 / A, 9);
      var x0 = 78, y0 = 272, W = b * ux, H = A * uy;
      // 底色
      g.appendChild(s('rect', { x: x0, y: y0 - H, width: B1 * ux, height: H, fill: C.blueL, stroke: C.blue, 'stroke-width': 1.6 }));
      g.appendChild(s('rect', { x: x0 + B1 * ux, y: y0 - H, width: B2 * ux, height: H, fill: C.goldL, stroke: C.blue, 'stroke-width': 1.6 }));
      // 网格
      for (var i = 5; i < A; i += 5) {
        g.appendChild(line(x0, y0 - i * uy, x0 + W, y0 - i * uy, { stroke: '#ffffff', w: 1, opacity: .8 }));
      }
      // 标注
      g.appendChild(T(x0 + B1 * ux / 2, y0 - H / 2, A + ' × ' + B1, { size: 13, weight: 600, fill: C.blue }));
      g.appendChild(T(x0 + B1 * ux + B2 * ux / 2, y0 - H / 2, A + ' × ' + B2, { size: 13, weight: 600, fill: '#8a6d00' }));
      // 尺寸线
      g.appendChild(line(x0, y0 + 10, x0 + W, y0 + 10, { stroke: C.ink2, w: 1.2 }));
      g.appendChild(T(x0 + B1 * ux / 2, y0 + 26, String(B1), { size: 11, fill: C.ink2 }));
      g.appendChild(T(x0 + B1 * ux + B2 * ux / 2, y0 + 26, String(B2), { size: 11, fill: C.ink2 }));
      g.appendChild(line(x0 - 8, y0, x0 - 8, y0 - H, { stroke: C.ink2, w: 1.2 }));
      g.appendChild(T(x0 - 14, y0 - H / 2, String(A), { size: 11, fill: C.ink2, anchor: 'end' }));
      // 大括号
      g.appendChild(T(x0 + W / 2, y0 + 46, b + '（' + B1 + ' + ' + B2 + '）', { size: 11.5, fill: C.mut }));
    }

    function update() {
      var b = B1 + B2;
      ctx.set([
        { k: '整个长方形', v: A + ' × ' + b + ' = ' + A * b, big: true },
        { k: '分成两块相加', v: A * B1 + ' + ' + A * B2 + ' = ' + (A * B1 + A * B2) },
        { k: '结论', v: '两种算法结果相同' },
        { k: '', eq: A + '×(' + B1 + '+' + B2 + ') = ' + A + '×' + B1 + ' + ' + A + '×' + B2 }
      ]);
    }

    XK.slider(ctx.controls, {
      label: '每行几个（长）', min: 12, max: 30, value: A,
      oninput: function (v) { A = v; draw(); update(); }
    });
    XK.slider(ctx.controls, {
      label: '整十部分', min: 10, max: 40, step: 10, value: B1,
      oninput: function (v) { B1 = v; draw(); update(); }
    });
    XK.slider(ctx.controls, {
      label: '个位部分', min: 1, max: 9, value: B2,
      oninput: function (v) { B2 = v; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     5. 小数的意义 —— 十分位与百分位
     ========================================================== */
  XK.figure('decimal', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '把一个正方形平均分成若干份并涂色');
    var g = s('g'); svg.appendChild(g);
    var den = 100, k = 30;

    function draw() {
      XK.clear(g);
      var x0 = 44, y0 = 40, S = 210;
      var cols = den === 100 ? 10 : 10, rows = 10;
      var cw = S / cols, ch = S / rows;
      g.appendChild(s('rect', { x: x0, y: y0, width: S, height: S, fill: '#fff', stroke: C.line, 'stroke-width': 1.5 }));
      if (den === 10) {
        for (var r0 = 0; r0 < 10; r0++) {
          g.appendChild(s('rect', {
            x: x0, y: y0 + r0 * ch, width: S, height: ch,
            fill: r0 < k ? C.blueL : '#fff', stroke: C.grid, 'stroke-width': 1
          }));
        }
      } else {
        for (var r = 0; r < 10; r++) {
          for (var c = 0; c < 10; c++) {
            var i = r * 10 + c;
            g.appendChild(s('rect', {
              x: x0 + c * cw, y: y0 + r * ch, width: cw, height: ch,
              fill: i < k ? C.blueL : '#fff', stroke: C.grid, 'stroke-width': .8
            }));
          }
        }
      }
      g.appendChild(s('rect', { x: x0, y: y0, width: S, height: S, fill: 'none', stroke: C.ink2, 'stroke-width': 1.8 }));

      // 右侧说明
      var tx = 292;
      g.appendChild(T(tx, 66, '平均分成', { size: 11, fill: C.mut, anchor: 'start' }));
      g.appendChild(T(tx, 92, den + ' 份', { size: 20, weight: 700, anchor: 'start' }));
      g.appendChild(T(tx, 124, '涂色', { size: 11, fill: C.mut, anchor: 'start' }));
      g.appendChild(T(tx, 150, k + ' 份', { size: 20, weight: 700, anchor: 'start', fill: C.blue }));
      g.appendChild(T(tx, 182, '每份是', { size: 11, fill: C.mut, anchor: 'start' }));
      g.appendChild(T(tx, 204, '1/' + den, { size: 15, weight: 600, anchor: 'start', serif: true }));
    }

    function value() { return den === 10 ? k / 10 : k / 100; }
    function decStr() {
      if (den === 10) return '0.' + k;
      return '0.' + (k < 10 ? '0' + k : k);
    }
    function readStr() {
      var s2 = decStr().slice(2).split('').map(function (d) {
        return ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'][+d];
      }).join('');
      return '零点' + s2;
    }
    function update() {
      var frac = k + '/' + den;
      var simp = '';
      if (den === 100 && k % 10 === 0 && k > 0) simp = ' = ' + (k / 10) + '/10';
      ctx.set([
        { k: '分数', v: frac + simp, big: true },
        { k: '小数', v: decStr() },
        { k: '读作', v: readStr() },
        { k: '表示', v: k + ' 个 ' + (den === 10 ? '0.1' : '0.01') },
        { k: '', eq: '分母是 10、100、1000… 的分数，可以写成小数' }
      ]);
    }

    XK.toggles(ctx.controls, {
      label: '平均分成', options: [{ value: 10, label: '10 份' }, { value: 100, label: '100 份' }],
      value: den,
      onchange: function (v) {
        den = v; k = Math.min(k, den);
        numS.input.max = den; numS.set(k);
        draw(); update();
      }
    });
    var numS = XK.slider(ctx.controls, {
      label: '涂色份数', min: 1, max: 100, value: k,
      oninput: function (v) { k = v; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     6. 三角形内角和
     ========================================================== */
  XK.figure('triangleAngle', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '一个可以改变两个角的三角形');
    var g = s('g'); svg.appendChild(g);
    var A = 62, B = 58;
    var colA = 0, colB = 0;

    function trig(deg) { return Math.sin(deg * Math.PI / 180); }

    function draw() {
      XK.clear(g);
      var Cc = 180 - A - B;
      var b = trig(B), c = trig(Cc);
      // 顶点：A 在原点，B 在 (c,0)，C 由 A 出发长 b、与 AB 成 A 角
      var Cx = b * Math.cos(A * Math.PI / 180), Cy = b * Math.sin(A * Math.PI / 180);
      var pts = [[0, 0], [c, 0], [Cx, Cy]];
      // 缩放
      var maxX = Math.max(c, Cx), maxY = Cy;
      var sc = Math.min(330 / (maxX + 0.12), 205 / (maxY + 0.12));
      var ox = (480 - maxX * sc) / 2;
      var oy = (300 - maxY * sc) / 2 + maxY * sc;
      var V = pts.map(function (p) { return [ox + p[0] * sc, oy - p[1] * sc]; });

      g.appendChild(s('polygon', {
        points: V.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '),
        fill: C.blueF, stroke: C.blue, 'stroke-width': 2.2, 'stroke-linejoin': 'round'
      }));
      // 角弧
      var labels = [A, B, Cc];
      V.forEach(function (p, i) {
        var p1 = V[(i + 1) % 3], p2 = V[(i + 2) % 3];
        var a1 = Math.atan2(p1[1] - p[1], p1[0] - p[0]);
        var a2 = Math.atan2(p2[1] - p[1], p2[0] - p[0]);
        var r = 30;
        var diff = a2 - a1;
        while (diff > Math.PI) diff -= 2 * Math.PI;
        while (diff < -Math.PI) diff += 2 * Math.PI;
        var sweep = diff > 0 ? 1 : 0;
        var sx = p[0] + r * Math.cos(a1), sy = p[1] + r * Math.sin(a1);
        var ex = p[0] + r * Math.cos(a2), ey = p[1] + r * Math.sin(a2);
        g.appendChild(s('path', {
          d: 'M ' + sx + ' ' + sy + ' A ' + r + ' ' + r + ' 0 0 ' + sweep + ' ' + ex + ' ' + ey,
          fill: 'none', stroke: C.gold, 'stroke-width': 2
        }));
        var mid = a1 + diff / 2;
        g.appendChild(T(p[0] + (r + 18) * Math.cos(mid), p[1] + (r + 18) * Math.sin(mid) + 4,
          labels[i] + '°', { size: 12, weight: 700, fill: '#8a6d00' }));
        g.appendChild(s('circle', { cx: p[0], cy: p[1], r: 3.2, fill: C.ink }));
      });
      g.appendChild(T(240, Math.min(292, oy + 30), '∠1 + ∠2 + ∠3 = ' + (A + B + Cc) + '°', { size: 13, weight: 600, fill: C.blue }));
    }

    function update() {
      var Cc = 180 - A - B;
      var type = [A, B, Cc].every(function (x) { return x < 90; }) ? '锐角三角形'
        : [A, B, Cc].some(function (x) { return x === 90; }) ? '直角三角形' : '钝角三角形';
      ctx.set([
        { k: '三个角', v: A + '° + ' + B + '° + ' + Cc + '°', big: true },
        { k: '内角和', v: '180°（始终不变）' },
        { k: '按角分类', v: type },
        { k: '', eq: '无论三角形大小、形状，内角和都是 180°' }
      ]);
    }

    var sA = XK.slider(ctx.controls, {
      label: '∠1', min: 15, max: 140, value: A, unit: '°',
      oninput: function (v) {
        A = v;
        if (A + B > 165) { B = 165 - A; sB.set(B, true); }
        draw(); update();
      }
    });
    var sB = XK.slider(ctx.controls, {
      label: '∠2', min: 15, max: 140, value: B, unit: '°',
      oninput: function (v) {
        B = v;
        if (A + B > 165) { A = 165 - B; sA.set(A, true); }
        draw(); update();
      }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     7. 平均数 —— 移多补少
     ========================================================== */
  XK.figure('average', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '三根柱子与一条表示平均数的虚线');
    var g = s('g'); svg.appendChild(g);
    var vals = [88, 92, 76], names = ['语文', '数学', '英语'];

    function draw() {
      XK.clear(g);
      var x0 = 74, y0 = 250, W = 320, H = 190;
      var mean = (vals[0] + vals[1] + vals[2]) / 3;
      // 坐标
      g.appendChild(line(x0 - 16, y0, x0 + W + 10, y0, { stroke: C.ink2, w: 1.4 }));
      [0, 50, 100].forEach(function (v) {
        var y = y0 - v / 100 * H;
        g.appendChild(line(x0 - 6, y, x0 + W + 6, y, { stroke: C.grid, w: 1 }));
        g.appendChild(T(x0 - 12, y + 4, String(v), { size: 10, fill: C.faint, anchor: 'end' }));
      });
      var bw = 62, gap = (W - bw * 3) / 3;
      vals.forEach(function (v, i) {
        var x = x0 + gap / 2 + i * (bw + gap);
        var hh = v / 100 * H;
        g.appendChild(s('rect', { x: x, y: y0 - hh, width: bw, height: hh, rx: 5, fill: i === 2 ? C.goldL : C.blueL, stroke: i === 2 ? '#d8a900' : C.blue, 'stroke-width': 1.4 }));
        g.appendChild(T(x + bw / 2, y0 - hh - 8, String(v), { size: 12.5, weight: 700, fill: i === 2 ? '#8a6d00' : C.blue }));
        g.appendChild(T(x + bw / 2, y0 + 20, names[i], { size: 11.5, fill: C.mut }));
      });
      var my = y0 - mean / 100 * H;
      g.appendChild(line(x0 - 10, my, x0 + W + 8, my, { stroke: C.red, w: 1.8, dash: '6 4' }));
      g.appendChild(s('rect', { x: x0 + W - 92, y: my - 24, width: 96, height: 19, rx: 5, fill: '#fff' }));
      g.appendChild(T(x0 + W - 44, my - 10, '平均数 ' + fmt(mean, 1), { size: 11, fill: C.red, weight: 600 }));
      // 移多补少的箭头
      var maxI = vals.indexOf(Math.max.apply(null, vals));
      var minI = vals.indexOf(Math.min.apply(null, vals));
      if (maxI !== minI) {
        var xm = x0 + gap / 2 + maxI * (bw + gap) + bw / 2;
        var xn = x0 + gap / 2 + minI * (bw + gap) + bw / 2;
        g.appendChild(line(xm, y0 - vals[maxI] / 100 * H - 26, xn, y0 - vals[minI] / 100 * H - 26, { stroke: C.green, w: 1.5, dash: '3 3' }));
        g.appendChild(T((xm + xn) / 2, y0 - 36 - Math.min(vals[maxI], vals[minI]) / 100 * H, '移多补少', { size: 10.5, fill: C.green }));
      }
    }

    function update() {
      var mean = (vals[0] + vals[1] + vals[2]) / 3;
      ctx.set([
        { k: '三个数', v: vals.join('、'), big: true },
        { k: '总数', v: String(vals[0] + vals[1] + vals[2]) },
        { k: '平均数', v: '总数 ÷ 3 = ' + fmt(mean, 1) },
        { k: '范围', v: '在 ' + Math.min.apply(null, vals) + ' 与 ' + Math.max.apply(null, vals) + ' 之间' },
        { k: '', eq: '平均数 = 总数 ÷ 份数，比最大的小、比最大的大' }
      ]);
    }

    vals.forEach(function (v, i) {
      XK.slider(ctx.controls, {
        label: names[i], min: 30, max: 100, value: v,
        oninput: function (nv) { vals[i] = nv; draw(); update(); }
      });
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     8. 平行四边形面积 —— 割补成长方形
     ========================================================== */
  XK.figure('parallelogram', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '把平行四边形剪下一块拼成长方形');
    var gFill = s('g'), gTri = s('g'), gAnno = s('g');
    svg.appendChild(gFill); svg.appendChild(gTri); svg.appendChild(gAnno);
    var b = 6, hh = 4, cut = false;
    var triOffset = 0;

    function geom() {
      var sc = Math.min(300 / (b + hh * 0.5), 170 / hh, 40);
      var sk = hh * 0.5;
      var ox = 90, oy = 250;
      function P(x, y) { return [ox + x * sc, oy - y * sc]; }
      return { sc: sc, sk: sk, ox: ox, oy: oy, P: P };
    }

    function draw() {
      XK.clear(gFill); XK.clear(gTri); XK.clear(gAnno);
      var G = geom(), P = G.P, sk = G.sk;
      // 原平行四边形轮廓（虚线）
      gFill.appendChild(s('polygon', {
        points: [P(0, 0), P(b, 0), P(b + sk, hh), P(sk, hh)].map(function (p) { return p.join(','); }).join(' '),
        fill: C.blueF, stroke: C.line, 'stroke-width': 1.2, 'stroke-dasharray': '5 4'
      }));
      // 主体（去掉左边三角形后的梯形）
      gFill.appendChild(s('polygon', {
        points: [P(sk, 0), P(b, 0), P(b + sk, hh), P(sk, hh)].map(function (p) { return p.join(','); }).join(' '),
        fill: C.blueL, stroke: C.blue, 'stroke-width': 2
      }));
      // 被剪下的三角形
      gTri.setAttribute('transform', 'translate(' + (triOffset * G.sc) + ',0)');
      gTri.appendChild(s('polygon', {
        points: [P(0, 0), P(sk, hh), P(sk, 0)].map(function (p) { return p.join(','); }).join(' '),
        fill: C.goldL, stroke: '#d8a900', 'stroke-width': 1.8
      }));
      // 高
      var xh = sk;
      gAnno.appendChild(line(P(xh, 0)[0], P(xh, 0)[1], P(xh, hh)[0], P(xh, hh)[1], { stroke: C.red, w: 1.6, dash: '5 3' }));
      gAnno.appendChild(line(P(0, 0)[0], P(0, 0)[1] + 16, P(b, 0)[0], P(b, 0)[1] + 16, { stroke: C.ink2, w: 1.4 }));
      gAnno.appendChild(T((P(0, 0)[0] + P(b, 0)[0]) / 2, P(0, 0)[1] + 32, '底 = ' + b, { size: 11.5, fill: C.ink2 }));
      gAnno.appendChild(T(P(xh, hh / 2)[0] + 10, P(xh, hh / 2)[1], '高 = ' + hh, { size: 11.5, fill: C.red, anchor: 'start' }));
      // 剪的示意
      if (!cut) {
        gAnno.appendChild(line(P(sk, hh)[0], P(sk, hh)[1] - 8, P(0, 0)[0], P(0, 0)[1] - 8, { stroke: C.gold, w: 1.4, dash: '4 3' }));
        gAnno.appendChild(T(P(sk / 2, 0)[0] - 6, P(0, 0)[1] - 18, '剪一刀', { size: 10.5, fill: '#8a6d00' }));
      }
    }

    function update() {
      ctx.set([
        { k: '底 × 高', v: b + ' × ' + hh + ' = ' + b * hh, big: true },
        { k: '邻边（斜边）', v: fmt(Math.sqrt(Math.pow(hh * 0.5, 2) + hh * hh), 2) },
        { k: '拼成的图形', v: '长方形，长 = ' + b + '，宽 = ' + hh },
        { k: '面积', v: b * hh + ' 平方格' },
        { k: '', eq: '平行四边形面积 = 底 × 高（不是底 × 邻边）' }
      ]);
    }

    XK.slider(ctx.controls, {
      label: '底', min: 3, max: 9, value: b, unit: ' 格',
      oninput: function (v) { b = v; draw(); update(); }
    });
    XK.slider(ctx.controls, {
      label: '高', min: 2, max: 6, value: hh, unit: ' 格',
      oninput: function (v) { hh = v; draw(); update(); }
    });
    var btn = XK.button(ctx.controls, {
      label: '剪一刀，拼成长方形', onClick: function () {
        cut = !cut;
        btn.textContent = cut ? '还原' : '剪一刀，拼成长方形';
        var from = triOffset, to = cut ? b : 0;
        XK.tween(from, to, 620, function (v) { triOffset = v; draw(); });
      }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     9. 小数乘法 —— 小数点搬家
     ========================================================== */
  XK.figure('pointmove', function (ctx) {
    var digits = '356', p = 2, k = 0;

    function repr() {
      var pp = p, d = digits, intPart, frac;
      if (pp <= 0) { intPart = d + '0'.repeat(-pp); frac = ''; }
      else if (pp >= d.length) { intPart = '0'; frac = '0'.repeat(pp - d.length) + d; }
      else { intPart = d.slice(0, d.length - pp); frac = d.slice(d.length - pp); }
      return { int: intPart, frac: frac, str: intPart + (frac ? '.' + frac : '') };
    }

    var wrap = h('div', { style: 'width:100%;display:flex;flex-direction:column;gap:14px;align-items:center' });
    var rowEl = h('div', { style: 'display:flex;align-items:center;gap:2px;justify-content:center;flex-wrap:nowrap;font:600 26px/1 ui-monospace,monospace' });
    var base = h('div', { style: 'font-size:12px;color:#9aa1ab' }, '原来的数是 3.56');
    wrap.appendChild(rowEl); wrap.appendChild(base);
    ctx.stage.appendChild(wrap);

    function draw() {
      XK.clear(rowEl);
      var r = repr();
      var cell = function (ch) {
        return h('span', {
          style: 'display:inline-grid;place-items:center;min-width:32px;height:44px;border-radius:8px;' +
            'background:#fff;border:1.5px solid #dcd5c8;padding:0 6px'
        }, ch);
      };
      r.int.split('').forEach(function (ch) { rowEl.appendChild(cell(ch)); });
      if (r.frac) {
        rowEl.appendChild(h('span', { style: 'display:inline-block;align-self:flex-end;width:9px;height:9px;border-radius:50%;background:#2563eb;margin:0 7px 10px' }));
        r.frac.split('').forEach(function (ch) { rowEl.appendChild(cell(ch)); });
      }
      rowEl.appendChild(h('span', { style: 'font-size:13px;color:#6b7280;margin-left:10px;font-family:inherit' }, '＝ ' + r.str));
    }

    function update() {
      var r = repr();
      var dir = k === 0 ? '没动' : k > 0 ? '向右移动 ' + k + ' 位' : '向左移动 ' + (-k) + ' 位';
      var op = k === 0 ? '原数' : k > 0 ? '× ' + Math.pow(10, k) : '÷ ' + Math.pow(10, -k);
      ctx.set([
        { k: '算式', v: '3.56 ' + op + ' = ' + r.str, big: true },
        { k: '小数点', v: dir },
        { k: '位数不够时', v: '用 0 补足（如 0.0356）' },
        { k: '', eq: '乘 10、100、1000，就是小数点向右移 1、2、3 位' }
      ]);
    }

    function go(delta) {
      k = clamp(k + delta, -3, 3);
      p = 2 - k;
      draw(); update();
    }

    var row1 = h('div', { class: 'btn-row' });
    ctx.controls.appendChild(row1);
    XK.button(row1, { label: '× 10', onClick: function () { go(1); } });
    XK.button(row1, { label: '× 100', onClick: function () { go(2); } });
    var row2 = h('div', { class: 'btn-row' });
    ctx.controls.appendChild(row2);
    XK.button(row2, { label: '÷ 10', onClick: function () { go(-1); } });
    XK.button(row2, { label: '÷ 100', onClick: function () { go(-2); } });
    XK.button(ctx.controls, {
      label: '重来', cls: 'ghost', onClick: function () { k = 0; p = 2; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     10. 等式的性质 —— 天平
     ========================================================== */
  XK.figure('balance', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '一架两边同时加减砝码仍保持平衡的天平');
    var g = s('g'); svg.appendChild(g);
    var A = 3, B = 9, n = 0;
    var wobble = 0;

    function blocks(x, y, count, color, label) {
      var per = 6, sz = 13, gap = 3;
      for (var i = 0; i < count; i++) {
        var col = i % per, row = Math.floor(i / per);
        g.appendChild(s('rect', {
          x: x + col * (sz + gap), y: y - row * (sz + gap),
          width: sz, height: sz, rx: 2.5, fill: color, stroke: 'rgba(0,0,0,.12)'
        }));
      }
      if (label) g.appendChild(T(x + 40, y + 22, label, { size: 10, fill: C.mut }));
    }

    function draw() {
      XK.clear(g);
      var cx = 240, pivotY = 96, beamY = 78, tilt = wobble;
      var lx = cx - 128, rx = cx + 128;
      var ly = beamY + (lx - cx) * Math.tan(tilt * Math.PI / 180);
      var ry = beamY + (rx - cx) * Math.tan(tilt * Math.PI / 180);
      // 支架
      g.appendChild(s('polygon', { points: cx + ',96 ' + (cx - 26) + ',236 ' + (cx + 26) + ',236', fill: '#efe9dc', stroke: C.line }));
      g.appendChild(s('rect', { x: cx - 46, y: 232, width: 92, height: 8, rx: 4, fill: '#e2dbcd' }));
      // 横梁
      g.appendChild(line(lx, ly, rx, ry, { stroke: C.ink, w: 5 }));
      g.appendChild(s('circle', { cx: cx, cy: pivotY - 6, r: 7, fill: C.gold, stroke: '#c99700' }));
      g.appendChild(line(cx, pivotY, cx, beamY, { stroke: C.ink2, w: 3 }));
      // 秤盘
      [lx, rx].forEach(function (x, i) {
        var y = i ? ry : ly;
        g.appendChild(line(x, y, x, y + 34, { stroke: C.ink2, w: 1.4 }));
        g.appendChild(s('path', {
          d: 'M ' + (x - 46) + ' ' + (y + 34) + ' h 92 l -12 18 h -68 z',
          fill: '#fff', stroke: C.line, 'stroke-width': 1.4
        }));
      });
      // 左盘：x + A + n
      var left = A + n, right = B + n;
      g.appendChild(s('rect', {
        x: lx - 96, y: ly + 8, width: 38, height: 30, rx: 6,
        fill: C.blue, stroke: '#1b4fc4'
      }));
      g.appendChild(T(lx - 77, ly + 28, 'x', { size: 17, weight: 700, fill: '#fff' }));
      blocks(lx - 48, ly + 36, left, C.goldL, '+' + left);
      blocks(rx - 52, ry + 36, right, C.blueL, right + '');
      g.appendChild(T(lx, ly - 16, 'x + ' + A + (n >= 0 ? ' + ' + n : ' − ' + (-n)), { size: 12, fill: C.ink2 }));
      g.appendChild(T(rx, ry - 16, String(B + n), { size: 12, fill: C.ink2 }));
      g.appendChild(T(cx, 276, '两边同时' + (n >= 0 ? '加 ' + n : '减 ' + (-n)) + ' 个，天平仍然平衡', { size: 11.5, fill: C.mut }));
    }

    function update() {
      var left = A + n, eq = 'x + ' + left + ' = ' + (B + n);
      ctx.set([
        { k: '现在的等式', v: eq, big: true },
        { k: '天平', v: '仍然平衡' },
        { k: 'x 等于', v: String(B - A) + '（两边同时减 ' + A + '）' },
        { k: '', eq: '等式两边同时加或减同一个数，等式仍然成立' }
      ]);
    }

    function jump() {
      XK.tween(0, 3, 120, function (v) { wobble = v; draw(); }, function () {
        XK.tween(3, 0, 220, function (v) { wobble = v; draw(); });
      });
    }

    XK.slider(ctx.controls, {
      label: '左边再加几个（负数是拿走）', min: -A, max: 6, value: 0,
      format: function (v) { return v >= 0 ? '+' + v : String(v); },
      oninput: function (v) { n = v; draw(); update(); }
    });
    XK.button(ctx.controls, {
      label: '两边同时减 ' + A + '，求 x', onClick: function () {
        n = -A; draw(); update(); jump();
        ctx.controls.querySelector('input[type=range]').value = -A;
      }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     11. 长方体体积 —— 每层几个、共几层
     ========================================================== */
  XK.figure('volume', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '可以改变长宽高的长方体');
    var g = s('g'); svg.appendChild(g);
    var L = 4, W = 3, H = 2;

    function draw() {
      XK.clear(g);
      var u = Math.min(46, 250 / (L + 0.5 * W), 180 / (H + 0.35 * W));
      var bw = (L + 0.5 * W) * u, bh = (H + 0.35 * W) * u;
      var ox = (480 - bw) / 2, oy = (300 + bh) / 2;
      function P(x, y, z) {
        return [ox + x * u + z * 0.5 * u, oy - y * u - z * 0.35 * u];
      }
      function poly(pts, fill, stroke, w) {
        return s('polygon', {
          points: pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '),
          fill: fill, stroke: stroke || '#2563eb', 'stroke-width': w || 1.4, 'stroke-linejoin': 'round'
        });
      }
      // 顶面、右面、前面（后画的前面在最上层）
      g.appendChild(poly([P(0, H, 0), P(L, H, 0), P(L, H, W), P(0, H, W)], '#dbe6ff'));
      g.appendChild(poly([P(L, 0, 0), P(L, 0, W), P(L, H, W), P(L, H, 0)], '#b9cdfa'));
      g.appendChild(poly([P(0, 0, 0), P(L, 0, 0), P(L, H, 0), P(0, H, 0)], '#eff4ff'));

      // 前面单位格
      for (var i = 1; i < L; i++) {
        var a1 = P(i, 0, 0), a2 = P(i, H, 0);
        g.appendChild(line(a1[0], a1[1], a2[0], a2[1], { stroke: '#c3d3f5', w: 1 }));
      }
      for (var j = 1; j < H; j++) {
        var b1 = P(0, j, 0), b2 = P(L, j, 0);
        g.appendChild(line(b1[0], b1[1], b2[0], b2[1], { stroke: '#c3d3f5', w: 1 }));
      }
      // 右面单位格
      for (var k = 1; k < W; k++) {
        var c1 = P(L, 0, k), c2 = P(L, H, k);
        g.appendChild(line(c1[0], c1[1], c2[0], c2[1], { stroke: '#a9c0ee', w: 1 }));
      }
      for (var j2 = 1; j2 < H; j2++) {
        var d1 = P(L, j2, 0), d2 = P(L, j2, W);
        g.appendChild(line(d1[0], d1[1], d2[0], d2[1], { stroke: '#a9c0ee', w: 1 }));
      }
      // 顶面单位格
      for (var x2 = 1; x2 < L; x2++) {
        var e1 = P(x2, H, 0), e2 = P(x2, H, W);
        g.appendChild(line(e1[0], e1[1], e2[0], e2[1], { stroke: '#c3d3f5', w: 1 }));
      }
      for (var z2 = 1; z2 < W; z2++) {
        var f1 = P(0, H, z2), f2 = P(L, H, z2);
        g.appendChild(line(f1[0], f1[1], f2[0], f2[1], { stroke: '#c3d3f5', w: 1 }));
      }
      // 标注
      var pL = P(L / 2, 0, 0), pW = P(L, 0, W / 2), pH = P(0, H / 2, 0);
      g.appendChild(T(pL[0], pL[1] + 22, '长 ' + L, { size: 12, weight: 600, fill: C.blue }));
      g.appendChild(T(pW[0] + 24, pW[1] + 12, '宽 ' + W, { size: 12, weight: 600, fill: '#1b4fc4', anchor: 'start' }));
      g.appendChild(T(pH[0] - 12, pH[1] + 4, '高 ' + H, { size: 12, weight: 600, fill: C.ink2, anchor: 'end' }));
      g.appendChild(T(240, 288, '每层 ' + L + '×' + W + ' = ' + L * W + ' 个小方块，共 ' + H + ' 层', { size: 11.5, fill: C.mut }));
    }

    function update() {
      ctx.set([
        { k: '长 × 宽 × 高', v: L + ' × ' + W + ' × ' + H + ' = ' + L * W * H, big: true },
        { k: '每层个数', v: L * W + ' 个' },
        { k: '层数', v: H + ' 层' },
        { k: '体积', v: L * W * H + ' 立方厘米' },
        { k: '', eq: '底面积 × 高 = 体积' }
      ]);
    }

    XK.slider(ctx.controls, { label: '长', min: 1, max: 5, value: L, oninput: function (v) { L = v; draw(); update(); } });
    XK.slider(ctx.controls, { label: '宽', min: 1, max: 5, value: W, oninput: function (v) { W = v; draw(); update(); } });
    XK.slider(ctx.controls, { label: '高', min: 1, max: 5, value: H, oninput: function (v) { H = v; draw(); update(); } });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     12. 分数 —— 意义与通分比较
     ========================================================== */
  XK.figure('fraction', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '两条分数条与通分比较');
    var g = s('g'); svg.appendChild(g);
    var b = 2, a = 1, d = 3, c = 2;

    function gcd(x, y) { return y ? gcd(y, x % y) : x; }

    function bar(y, num, den, color, label) {
      var x0 = 52, W = 300, Hh = 46;
      for (var i = 0; i < den; i++) {
        g.appendChild(s('rect', {
          x: x0 + i * W / den, y: y, width: W / den, height: Hh,
          fill: i < num ? color : '#fff', stroke: '#c9c1b2', 'stroke-width': 1.2
        }));
      }
      g.appendChild(T(x0 - 14, y + 29, label, { size: 12.5, weight: 600, anchor: 'end' }));
      g.appendChild(T(x0 + W + 12, y + 29, num + '/' + den, { size: 13, weight: 700, anchor: 'start', fill: color === C.blueL ? C.blue : '#8a6d00' }));
    }

    function draw() {
      XK.clear(g);
      bar(46, a, b, C.blueL, '第一个');
      bar(122, c, d, C.goldL, '第二个');
      var lcm = b * d / gcd(b, d);
      var na = a * lcm / b, nc = c * lcm / d;
      g.appendChild(T(240, 214, '通分：分母都变成 ' + lcm, { size: 12, fill: C.ink2 }));
      g.appendChild(T(240, 238, na + '/' + lcm + ' 与 ' + nc + '/' + lcm, { size: 15, weight: 600, serif: true }));
      g.appendChild(T(240, 266, na === nc ? '两个分数一样大' : na > nc ? '第一个大' : '第二个大', { size: 13, weight: 700, fill: C.blue }));
    }

    function update() {
      var lcm = b * d / gcd(b, d);
      var cmp = a * d === c * b ? '相等' : a * d > c * b ? a + '/' + b + ' 更大' : c + '/' + d + ' 更大';
      ctx.set([
        { k: '第一个分数', v: a + '/' + b + ' ≈ ' + fmt(a / b, 3), big: true },
        { k: '第二个分数', v: c + '/' + d + ' ≈ ' + fmt(c / d, 3) },
        { k: '比一比', v: cmp },
        { k: '通分', v: (a * lcm / b) + '/' + lcm + ' 与 ' + (c * lcm / d) + '/' + lcm },
        { k: '', eq: '分母不同，先通分再比较；分子分母同乘一个数，分数大小不变' }
      ]);
    }

    var s1 = XK.slider(ctx.controls, {
      label: '第一个：分母', min: 2, max: 12, value: b,
      oninput: function (v) { b = v; a = Math.min(a, b); s2.input.max = b; s2.set(a); draw(); update(); }
    });
    var s2 = XK.slider(ctx.controls, {
      label: '第一个：分子', min: 1, max: b, value: a,
      oninput: function (v) { a = v; draw(); update(); }
    });
    var s3 = XK.slider(ctx.controls, {
      label: '第二个：分母', min: 2, max: 12, value: d,
      oninput: function (v) { d = v; c = Math.min(c, d); s4.input.max = d; s4.set(c); draw(); update(); }
    });
    var s4 = XK.slider(ctx.controls, {
      label: '第二个：分子', min: 1, max: d, value: c,
      oninput: function (v) { c = v; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     13. 因数与倍数 —— 1~30 网格
     ========================================================== */
  XK.figure('multiples', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '1 到 30 的数字网格，标出某个数的倍数');
    var g = s('g'); svg.appendChild(g);
    var k = 3, sel = 0;

    function factorsOf(n) {
      var out = [];
      for (var i = 1; i <= n; i++) if (n % i === 0) out.push(i);
      return out;
    }

    function draw() {
      XK.clear(g);
      var cols = 6, cw = 58, ch = 40, x0 = 64, y0 = 22;
      for (var n = 1; n <= 30; n++) {
        var i = n - 1, r = Math.floor(i / cols), cc = i % cols;
        var x = x0 + cc * cw, y = y0 + r * ch;
        var isMul = n % k === 0;
        var g2 = s('g', { style: 'cursor:pointer' });
        g2.appendChild(s('rect', {
          x: x, y: y, width: cw - 8, height: ch - 8, rx: 7,
          fill: n === sel ? C.blue : isMul ? C.blueL : '#fff',
          stroke: n === sel ? C.blue : isMul ? '#9db9f7' : C.grid,
          'stroke-width': n === sel ? 2 : 1.2
        }));
        g2.appendChild(T(x + (cw - 8) / 2, y + 21, String(n), {
          size: 13, weight: isMul ? 700 : 500,
          fill: n === sel ? '#fff' : isMul ? C.blue : C.ink2
        }));
        (function (nn) {
          g2.addEventListener('click', function () { sel = nn; draw(); update(); });
        })(n);
        g.appendChild(g2);
      }
      g.appendChild(T(240, 258, k + ' 的倍数（蓝色）在 1~30 中有 ' + Math.floor(30 / k) + ' 个', { size: 12, fill: C.ink2 }));
      g.appendChild(T(240, 282, '点一个数，看它的因数', { size: 10.5, fill: C.faint }));
    }

    function update() {
      var mul = [];
      for (var i = 1; i <= 30; i++) if (i % k === 0) mul.push(i);
      var rows = [
        { k: k + ' 的倍数', v: mul.slice(0, 8).join('、') + (mul.length > 8 ? ' …' : ''), big: true },
        { k: '在 1~30 中的个数', v: mul.length + ' 个' },
        { k: '最小的倍数', v: String(k) }
      ];
      if (sel) {
        var fs = factorsOf(sel);
        rows.push({ k: sel + ' 的因数', v: fs.join('、') });
        rows.push({ k: sel + ' 的因数个数', v: fs.length + ' 个（最小 1，最大 ' + sel + '）' });
      } else {
        rows.push({ k: '提示', v: '点网格里的数，看它的因数' });
      }
      rows.push({ k: '', eq: '一个数的倍数是无限的，因数个数是有限的' });
      ctx.set(rows);
    }

    XK.toggles(ctx.controls, {
      label: '看几的倍数', options: [2, 3, 5, 7], value: k,
      onchange: function (v) { k = v; draw(); update(); }
    });
    XK.button(ctx.controls, {
      label: '清空所选', cls: 'ghost', onClick: function () { sel = 0; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

  /* ==========================================================
     14. 圆的周长 —— 滚一圈
     ========================================================== */
  XK.figure('circle', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '一个圆沿直尺滚动一圈');
    var g = s('g'); svg.appendChild(g);
    var d = 4, u = 22;
    var theta = 0, anim = null;

    function draw() {
      XK.clear(g);
      var r = d * u / 2, cx = 90 + r + theta * r, cy = 200 - r;
      // 地面与直尺
      g.appendChild(line(40, 200, 460, 200, { stroke: C.ink2, w: 1.6 }));
      for (var i = 0; i <= d * 8; i += d) {
        var x = 90 + i * u;
        if (x > 458) break;
        g.appendChild(line(x, 200, x, 208, { stroke: C.line, w: 1 }));
      }
      // 起点刻度
      g.appendChild(line(90, 186, 90, 214, { stroke: C.gold, w: 2 }));
      g.appendChild(T(90, 228, '起点', { size: 10, fill: '#8a6d00' }));
      // 圆
      var gg = s('g', { transform: 'rotate(' + (theta * 180 / Math.PI) + ' ' + cx + ' ' + cy + ')' });
      gg.appendChild(s('circle', { cx: cx, cy: cy, r: r, fill: C.blueF, stroke: C.blue, 'stroke-width': 2 }));
      gg.appendChild(s('line', { x1: cx - r, y1: cy, x2: cx + r, y2: cy, stroke: C.blue, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
      gg.appendChild(s('circle', { cx: cx, cy: cy + r, r: 4.5, fill: C.red }));
      g.appendChild(gg);
      // 走过的距离
      if (theta > 0.02) {
        var dx = theta * r;
        g.appendChild(line(90, 168, 90 + dx, 168, { stroke: C.red, w: 2, dash: '5 3' }));
        g.appendChild(T(90 + dx / 2, 160, '滚过的长度 = ' + fmt(dx / u, 2) + ' 格', { size: 10.5, fill: C.red }));
      }
      g.appendChild(T(240, 282, '直径 ' + d + ' 格 · 周长 ≈ 3.14 × ' + d + ' = ' + fmt(3.14 * d, 2) + ' 格', { size: 11.5, fill: C.mut }));
    }

    function update() {
      ctx.set([
        { k: '直径 d', v: d + ' 格', big: true },
        { k: '周长 C = πd', v: '≈ 3.14 × ' + d + ' = ' + fmt(3.14 * d, 2) + ' 格' },
        { k: '半径 r', v: d / 2 + ' 格' },
        { k: '面积 S = πr²', v: '≈ ' + fmt(3.14 * (d / 2) * (d / 2), 2) + ' 平方格' },
        { k: '', eq: '圆的周长总是它直径的 3 倍多一些（π ≈ 3.14）' }
      ]);
    }

    XK.slider(ctx.controls, {
      label: '直径', min: 2, max: 5, value: d, unit: ' 格',
      oninput: function (v) { if (anim) anim(); d = v; theta = 0; draw(); update(); }
    });
    var btn = XK.button(ctx.controls, {
      label: '让圆滚一圈', onClick: function () {
        if (anim) anim();
        theta = 0;
        anim = XK.tween(0, 2 * Math.PI, 1800, function (v) { theta = v; draw(); }, function () { anim = null; });
      }
    });

    draw(); update();
    return function () { if (anim) anim(); };
  });

  /* ==========================================================
     15. 百分数 —— 折扣
     ========================================================== */
  XK.figure('percent', function (ctx) {
    var svg = stage(ctx.stage, '0 0 480 300', '原价与打折后的价格条');
    var g = s('g'); svg.appendChild(g);
    var P = 300, z = 8;

    function draw() {
      XK.clear(g);
      var pay = P * z / 10, save = P - pay;
      var x0 = 60, W = 360, y0 = 92, Hh = 54;
      g.appendChild(s('rect', { x: x0, y: y0, width: W, height: Hh, rx: 8, fill: '#f4efe6', stroke: C.line }));
      g.appendChild(s('rect', { x: x0, y: y0, width: W * z / 10, height: Hh, rx: 8, fill: C.blueL, stroke: C.blue, 'stroke-width': 1.4 }));
      g.appendChild(T(x0 + W * z / 10 / 2, y0 + 34, '现价 ' + fmt(pay, 0) + ' 元', { size: 13, weight: 700, fill: C.blue }));
      if (save > 4) {
        g.appendChild(T(x0 + W * z / 10 + (W * (1 - z / 10)) / 2, y0 + 34, '省 ' + fmt(save, 0) + ' 元', { size: 12, fill: C.mut }));
      }
      g.appendChild(T(x0 - 12, y0 + 34, '原价', { size: 11.5, anchor: 'end', fill: C.mut }));
      g.appendChild(T(x0 + W, y0 - 12, P + ' 元', { size: 13, weight: 600, anchor: 'end' }));

      // 折扣大数字
      g.appendChild(T(240, 208, z + ' 折', { size: 40, weight: 700, fill: C.blue }));
      g.appendChild(T(240, 236, '现价是原价的 ' + fmt(z * 10, 0) + '%', { size: 12, fill: C.mut }));
      g.appendChild(T(240, 262, '也就是便宜了 ' + fmt(100 - z * 10, 0) + '%', { size: 12, fill: C.red }));
      g.appendChild(T(240, 288, '注意：打八折 ≠ 便宜 8 元', { size: 11, fill: C.faint }));
    }

    function update() {
      var pay = P * z / 10;
      ctx.set([
        { k: '现价', v: fmt(pay, 0) + ' 元', big: true },
        { k: '算式', v: P + ' × ' + fmt(z * 10, 0) + '% = ' + fmt(pay, 0) },
        { k: '便宜了', v: fmt(P - pay, 0) + ' 元（' + fmt(100 - z * 10, 0) + '%）' },
        { k: '折扣率', v: fmt(z * 10, 0) + '%' },
        { k: '', eq: '几折就是原价的百分之几十' }
      ]);
    }

    XK.slider(ctx.controls, {
      label: '原价', min: 100, max: 600, step: 20, value: P, unit: ' 元',
      oninput: function (v) { P = v; draw(); update(); }
    });
    XK.slider(ctx.controls, {
      label: '打几折', min: 5, max: 9.5, step: .5, value: z, unit: ' 折',
      format: function (v) { return fmt(v, 1); },
      oninput: function (v) { z = v; draw(); update(); }
    });

    draw(); update();
    return function () {};
  });

})();
