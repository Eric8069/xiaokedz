/* ==========================================================================
   小课桌 · 核心工具（无依赖）
   - DOM / SVG 构造助手
   - 中文读数
   - 控件与读数区生成
   - 互动图注册表
   ========================================================================== */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var XK = window.XK = window.XK || {};

  /* ---------- DOM ---------- */
  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'class') el.className = attrs[k];
      else if (k === 'html') el.innerHTML = attrs[k];
      else if (k === 'text') el.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on' && typeof attrs[k] === 'function') el.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) el.setAttribute(k, attrs[k]);
    }
    for (var i = 2; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }

  function add(el, kid) {
    if (kid === null || kid === undefined || kid === false) return;
    if (Array.isArray(kid)) { kid.forEach(function (k) { add(el, k); }); return; }
    el.appendChild(typeof kid === 'string' || typeof kid === 'number' ? document.createTextNode(String(kid)) : kid);
  }

  function s(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    if (attrs) for (var k in attrs) {
      if (k === 'text') el.textContent = attrs[k];
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) el.setAttribute(k, attrs[k]);
    }
    for (var i = 2; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }

  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); }

  /* ---------- 数字格式 ---------- */
  function fmt(n, digits) {
    if (typeof n !== 'number' || !isFinite(n)) return String(n);
    var v = digits === undefined ? round6(n) : Number(n.toFixed(digits));
    return String(v);
  }
  function round6(n) { return Math.round(n * 1e6) / 1e6; }
  function pct(n) { return fmt(n * 100, 1) + '%'; }

  /* ---------- 中文读数 ---------- */
  var CN_D = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var CN_U = ['', '十', '百', '千'];

  function group4(n) {
    if (!n) return '';
    var str = String(n), out = '', zero = false;
    for (var i = 0; i < str.length; i++) {
      var d = +str[i], pos = str.length - 1 - i;
      if (d === 0) { zero = out !== ''; }
      else {
        if (zero) out += '零';
        zero = false;
        out += CN_D[d] + CN_U[pos];
      }
    }
    return out;
  }

  function readDigits(digits) {
    var str = String(digits).replace(/\D/g, '').replace(/^0+(?=\d)/, '');
    if (str === '0' || str === '') return '零';
    var ge = +str.slice(-4) || 0;
    var wan = str.length > 4 ? +str.slice(-8, -4) || 0 : 0;
    var yi = str.length > 8 ? +str.slice(0, -8) || 0 : 0;
    var out = '';
    if (yi > 0) out += group4(yi) + '亿';
    if (wan > 0) {
      if (out && wan < 1000) out += '零';
      out += group4(wan) + '万';
    } else if (out && ge > 0) {
      out += '零';
    }
    if (ge > 0) {
      if (out && ge < 1000 && out.slice(-1) !== '零') out += '零';
      out += group4(ge);
    }
    if (out.slice(0, 2) === '一十') out = out.slice(1);
    return out || '零';
  }

  function groupDigits(digits) {
    var str = String(digits).replace(/\D/g, '');
    var out = '', c = 0;
    for (var i = str.length - 1; i >= 0; i--) {
      out = str[i] + out;
      if (++c % 4 === 0 && i > 0) out = ' ' + out;
    }
    return out;
  }

  /* ---------- 缓动 ---------- */
  var REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function tween(from, to, dur, step, done) {
    if (REDUCE || dur <= 0) { step(to, 1); if (done) done(); return function () {}; }
    var t0 = 0, raf = 0, cancelled = false;
    function frame(t) {
      if (cancelled) return;
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur);
      var e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      step(from + (to - from) * e, e);
      if (p < 1) raf = requestAnimationFrame(frame);
      else if (done) done();
    }
    raf = requestAnimationFrame(frame);
    return function () { cancelled = true; cancelAnimationFrame(raf); };
  }

  /* ---------- 控件 ---------- */
  var uid = 0;
  function slider(host, o) {
    var id = 's' + (++uid);
    var label = h('label', { for: id, text: o.label });
    var val = h('b', { text: (o.format ? o.format(o.value) : fmt(o.value)) + (o.unit || '') });
    var wrap = h('div', { class: 'ctrl' },
      h('div', { class: 'ctrl-top' }, label, val),
      h('input', {
        id: id, type: 'range', min: o.min, max: o.max, step: o.step || 1,
        value: o.value, 'aria-label': o.label
      })
    );
    var input = wrap.querySelector('input');
    function sync() {
      var v = +input.value;
      val.textContent = (o.format ? o.format(v) : fmt(v)) + (o.unit || '');
    }
    function emit() {
      sync();
      if (o.oninput) o.oninput(+input.value);
    }
    input.addEventListener('input', emit);
    host.appendChild(wrap);
    if (o.after) o.after(wrap, input);
    return {
      el: wrap,
      input: input,
      get value() { return +input.value; },
      set: function (v, silent) {
        input.value = v;
        if (silent) sync(); else emit();
      },
      disable: function (b) { input.disabled = !!b; }
    };
  }

  function toggles(host, o) {
    var wrap = h('div', { class: 'ctrl' });
    if (o.label) wrap.appendChild(h('div', { class: 'ctrl-top' }, h('span', { text: o.label })));
    var row = h('div', { class: 'btn-row' });
    var btns = [];
    o.options.forEach(function (opt) {
      var val = typeof opt === 'object' ? opt.value : opt;
      var name = typeof opt === 'object' ? opt.label : opt;
      var b = h('button', {
        type: 'button', class: 'btn sm' + (o.cls ? ' ' + o.cls : ''), text: name,
        'aria-pressed': String(val === o.value)
      });
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        if (o.onchange) o.onchange(val);
      });
      btns.push(b);
      row.appendChild(b);
    });
    wrap.appendChild(row);
    host.appendChild(wrap);
    return {
      el: wrap,
      set: function (v) { btns.forEach(function (b, i) { var val = typeof o.options[i] === 'object' ? o.options[i].value : o.options[i]; b.setAttribute('aria-pressed', String(val === v)); }); }
    };
  }

  function button(host, o) {
    var b = h('button', { type: 'button', class: 'btn' + (o.cls ? ' ' + o.cls : ''), text: o.label });
    b.addEventListener('click', o.onClick);
    host.appendChild(b);
    return b;
  }

  function readout(host) {
    return function (rows) {
      clear(host);
      rows.forEach(function (r) {
        if (r === null) return;
        var row = h('div', { class: 'row' + (r.big ? ' big' : '') + (r.eq ? ' eq' : '') });
        if (r.eq) { row.textContent = r.eq; }
        else {
          row.appendChild(h('span', { text: r.k }));
          var b = h('b');
          if (r.html) b.innerHTML = r.html; else b.textContent = r.v;
          row.appendChild(b);
        }
        host.appendChild(row);
      });
    };
  }

  /* ---------- 互动图注册 ---------- */
  var FIG = {};
  function figure(name, fn) { FIG[name] = fn; }

  /**
   * 挂载互动图
   * @param {string} name 图类型
   * @param {object} ctx {stage, controls, readout, cfg}
   */
  function mountFigure(name, ctx) {
    var fn = FIG[name];
    if (!fn) {
      ctx.stage.appendChild(h('p', { class: 'empty', text: '这个实验还在搭建中。' }));
      return function () {};
    }
    ctx.set = readout(ctx.readout);
    try {
      return fn(ctx) || function () {};
    } catch (err) {
      console.error('[figure:' + name + ']', err);
      ctx.stage.appendChild(h('p', { class: 'empty', text: '实验加载出错，请刷新页面。' }));
      return function () {};
    }
  }

  XK.h = h; XK.s = s; XK.clear = clear; XK.fmt = fmt; XK.pct = pct;
  XK.readDigits = readDigits; XK.groupDigits = groupDigits; XK.group4 = group4;
  XK.tween = tween; XK.slider = slider; XK.toggles = toggles; XK.button = button;
  XK.readout = readout; XK.figure = figure; XK.mountFigure = mountFigure;
  XK.registerFigure = figure;
  XK.FIG = FIG;

  /* ---------- 站点元数据 ---------- */
  XK.SUBJECTS = {
    math: { key: 'math', name: '数学', cls: 'M', tone: 'var(--math)', desc: '从数位到圆面积，把抽象关系变成可以拖动的图。' },
    english: { key: 'english', name: '英语', cls: 'E', tone: 'var(--en)', desc: 'PEP 教材里的高频句型，用场景练到能开口。' },
    grammar: { key: 'grammar', name: '语法', cls: 'G', tone: 'var(--gram)', desc: '时态、单复数、句型转换，一条一条理清楚。' }
  };
})();
