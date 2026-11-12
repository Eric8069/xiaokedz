/* ==========================================================================
   小课桌 · 应用（hash 路由 + 页面渲染 + 学习进度）
   无框架、无构建、无网络请求，可直接双击 index.html 打开
   ========================================================================== */
(function () {
  'use strict';
  var XK = window.XK;
  var h = XK.h;
  var main = document.getElementById('main');
  var POINTS = (window.POINTS || []).slice();
  var SHEETS = (window.SHEETS || []).slice();
  var SUBJECTS = XK.SUBJECTS;
  var ORDER = { math: 0, english: 1, grammar: 2 };
  var DB_KEY = 'xiaokedz.v2';
  var OLD_KEY = 'xiaokedz.progress.v1';
  var db = loadDb();
  var destroyFigure = null;
  var spy = null;

  POINTS.sort(function (a, b) {
    return (ORDER[a.subject] - ORDER[b.subject]) || (a.grade - b.grade) || a.id.localeCompare(b.id);
  });
  var BY_ID = {};
  POINTS.forEach(function (p) { BY_ID[p.id] = p; });

  /* ---------- 存储：多档案 ---------- */
  function uid() { return 'p' + Date.now().toString(36) + Math.floor(Math.random() * 1000).toString(36); }

  function loadDb() {
    try {
      var raw = localStorage.getItem(DB_KEY);
      if (raw) {
        var o = JSON.parse(raw);
        if (o && o.profiles && o.profiles.length && o.current) {
          if (!o.progress) o.progress = {};
          return o;
        }
      }
    } catch (e) {}
    // 首次使用：建默认档案，并迁移旧版单用户记录
    var p = { id: uid(), name: '我的档案', at: Date.now() };
    var d = { v: 2, current: p.id, profiles: [p], progress: {} };
    d.progress[p.id] = { done: {} };
    try {
      var old = JSON.parse(localStorage.getItem(OLD_KEY) || 'null');
      if (old && old.done && Object.keys(old.done).length) d.progress[p.id].done = old.done;
    } catch (e) {}
    try { localStorage.setItem(DB_KEY, JSON.stringify(d)); } catch (e) {}
    return d;
  }

  function saveDb() { try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch (e) {} }
  function persist() { saveDb(); }

  function cur() {
    if (!db.progress[db.current]) db.progress[db.current] = { done: {} };
    if (!db.progress[db.current].done) db.progress[db.current].done = {};
    return db.progress[db.current];
  }
  function curProfile() {
    for (var i = 0; i < db.profiles.length; i++) {
      if (db.profiles[i].id === db.current) return db.profiles[i];
    }
    db.current = db.profiles[0].id;
    return db.profiles[0];
  }
  function profileById(id) {
    for (var i = 0; i < db.profiles.length; i++) if (db.profiles[i].id === id) return db.profiles[i];
    return null;
  }
  function profDone(id) {
    var p = db.progress[id];
    return p && p.done ? Object.keys(p.done).length : 0;
  }
  function profAvg(id) {
    var p = db.progress[id];
    if (!p || !p.done) return 0;
    var ks = Object.keys(p.done);
    if (!ks.length) return 0;
    var sum = 0;
    ks.forEach(function (k) { sum += p.done[k].score / p.done[k].total; });
    return Math.round(sum / ks.length * 100);
  }
  function isDone(id) { return !!cur().done[id]; }
  function doneCount(sub) {
    return POINTS.filter(function (p) { return (!sub || p.subject === sub) && isDone(p.id); }).length;
  }
  function totalCount(sub) {
    return POINTS.filter(function (p) { return !sub || p.subject === sub; }).length;
  }

  /* ---------- 小工具 ---------- */
  function gradeLabel(g, term) {
    return ['', '一', '二', '三', '四', '五', '六'][g] + '年级' + (term ? '（' + term + '）' : '');
  }
  function subOf(p) { return SUBJECTS[p.subject]; }
  function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }
  function orderIn(sub) {
    return POINTS.filter(function (p) { return p.subject === sub; });
  }
  function prevNext(p) {
    var arr = orderIn(p.subject);
    var i = arr.indexOf(p);
    return { prev: arr[i - 1] || null, next: arr[i + 1] || null };
  }
  function setActive(key) {
    document.querySelectorAll('.nav a').forEach(function (a) {
      if (a.getAttribute('data-page') === key) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }
  function ring(percent, size, stroke, color) {
    var r = (size - stroke) / 2, c = 2 * Math.PI * r;
    var svg = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="#ece6db" stroke-width="' + stroke + '"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + stroke +
      '" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + (c * (1 - percent / 100)) + '"/></svg>';
    return svg;
  }

  /* ---------- 首页 ---------- */
  function viewHome() {
    var total = POINTS.length;
    var done = doneCount();
    var pctAll = pct(done, total);

    var frag = document.createDocumentFragment();

    // hero
    var hero = h('section', { class: 'hero' });
    var left = h('div');
    left.appendChild(h('div', { class: 'tag', style: 'display:inline-block;margin-bottom:14px;background:#fff;border-color:#e0d8c8' }, '人教版 · 河南信阳 · 4-6 年级'));
    left.appendChild(h('h1', { html: '每个知识点，<br>都能<em>动手试一次</em>。' }));
    left.appendChild(h('p', {
      class: 'lead',
      html: '先猜一猜结果，再拖动滑块看变化，最后用自己的话解释。数学 15 个、英语 8 个、语法 7 个核心知识点，外加 6 张可打印的一页纸总结。'
    }));
    var tags = h('div', { class: 'hero-tags' });
    ['先预测', '再操作', '后解释', '自测 3 题', '自动记录进度'].forEach(function (t) {
      tags.appendChild(h('span', { class: 'tag' }, t));
    });
    left.appendChild(tags);
    hero.appendChild(left);

    var art = h('div', { class: 'hero-art' });
    art.innerHTML = heroArt();
    hero.appendChild(art);
    frag.appendChild(hero);

    // 科目卡
    var grid = h('div', { class: 'subject-grid' });
    ['math', 'english', 'grammar'].forEach(function (key) {
      var meta = SUBJECTS[key];
      var list = orderIn(key);
      var card = h('a', { class: 'subject-card sc-' + meta.cls, href: '#/' + key });
      card.appendChild(h('div', { class: 'sc-top' },
        h('span', { class: 'sc-dot' }),
        h('b', {}, meta.name),
        h('span', { class: 'sc-count' }, list.length + ' 个知识点')
      ));
      card.appendChild(h('p', {}, meta.desc));
      var ul = h('div', { class: 'sc-list' });
      list.slice(0, 3).forEach(function (p) {
        ul.appendChild(h('a', { href: '#/p/' + p.id },
          h('span', {}, p.grade + '年级'), p.title));
      });
      card.appendChild(ul);
      card.appendChild(h('div', { class: 'sc-go' }, '进入 ' + meta.name + ' →'));
      grid.appendChild(card);
    });
    frag.appendChild(grid);

    // 进度带
    var band = h('section', { class: 'progress-band' });
    var r = h('div', { class: 'ring' });
    r.innerHTML = ring(pctAll, 76, 7, 'var(--ink)') + '<b>' + pctAll + '%</b>';
    band.appendChild(r);
    var txt = h('div', { class: 'pb-txt' },
      h('b', {}, done ? curProfile().name + ' 已完成 ' + done + ' 个知识点' : curProfile().name + ' 还没开始，从任意一个知识点进去就行'),
      h('p', {}, done ? '继续保持，每次 10 分钟就够。' : '每次只做一个知识点，做完记得做自测。')
    );
    band.appendChild(txt);
    var bar = h('div', { class: 'pb-bar' });
    ['math', 'english', 'grammar'].forEach(function (k) {
      var i = h('i', { class: k.charAt(0) });
      i.style.width = pct(doneCount(k), total) + '%';
      bar.appendChild(i);
    });
    band.appendChild(bar);
    var more = h('a', { class: 'chip', href: '#/me', style: 'flex:none' }, '查看学习记录');
    band.appendChild(more);
    frag.appendChild(band);

    // 推荐
    var recHead = h('div', { class: 'sec-head' },
      h('h2', {}, '从这几个开始'),
      h('p', {}, '按年级跟你现在学的单元对应')
    );
    frag.appendChild(recHead);
    frag.appendChild(pointGrid(pickRecommend(), true));

    // 一页纸总结
    if (SHEETS.length) {
      var ch = h('div', { class: 'sec-head', style: 'margin-top:38px' },
        h('h2', {}, '一页纸总结'),
        h('p', {}, '考前 10 分钟翻的那种'),
        h('a', { class: 'more', href: '#/cheat' }, '全部 ' + SHEETS.length + ' 张 →')
      );
      frag.appendChild(ch);
      frag.appendChild(sheetGrid(SHEETS.slice(0, 3)));
    }

    // 使用说明
    var how = h('div', { class: 'sec-head', style: 'margin-top:38px' },
      h('h2', {}, '怎么用这个站'),
      h('p', {}, '三步，不用注册')
    );
    frag.appendChild(how);
    var steps = h('div', { class: 'list-grid' });
    [
      ['先看讲解', '带着问题读，重点句子会标黄。'],
      ['再做实验', '先选一个预测，再动手。猜错比猜对更有用。'],
      ['最后自测', '3 道题，答完自动记录；答错的地方回去看结论。']
    ].forEach(function (s, i) {
      var c = h('div', { class: 'pcard', style: 'cursor:default' });
      c.appendChild(h('div', { class: 'pcard-top' }, h('span', { class: 'badge', style: 'background:var(--paper-2);color:var(--ink-2)' }, '第 ' + (i + 1) + ' 步')));
      c.appendChild(h('h3', {}, s[0]));
      c.appendChild(h('p', { class: 'goal', style: '-webkit-line-clamp:4' }, s[1]));
      steps.appendChild(c);
    });
    frag.appendChild(steps);

    main.innerHTML = '';
    main.appendChild(frag);
  }

  function pickRecommend() {
    var byId = ['m4-01', 'm4-06', 'm5-08', 'e4-01', 'g5-04', 'g6-06'];
    var out = byId.map(function (id) { return BY_ID[id]; }).filter(Boolean);
    if (out.length < 6) {
      POINTS.forEach(function (p) { if (out.length < 6 && out.indexOf(p) < 0) out.push(p); });
    }
    return out;
  }

  function heroArt() {
    return '<svg viewBox="0 0 400 320" fill="none">' +
      '<defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f3ecdd"/></linearGradient></defs>' +
      '<rect x="26" y="30" width="348" height="260" rx="22" fill="url(#g1)" stroke="#e7e1d6"/>' +
      '<path d="M62 250 Q140 210 200 232 T338 196" stroke="#d9d2c5" stroke-width="2" stroke-dasharray="6 5"/>' +
      '<circle cx="120" cy="150" r="52" fill="#e9f0ff" stroke="#2563eb" stroke-width="2"/>' +
      '<path d="M120 150 L120 98" stroke="#2563eb" stroke-width="2.6" stroke-linecap="round"/>' +
      '<path d="M120 150 L166 172" stroke="#1e232b" stroke-width="2.6" stroke-linecap="round"/>' +
      '<path d="M120 150 m0 -34 a34 34 0 0 1 30 52" stroke="#f2b705" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<rect x="232" y="96" width="104" height="72" rx="10" fill="#fff" stroke="#e7e1d6"/>' +
      '<text x="248" y="122" font-size="12" fill="#9aa1ab" font-family="sans-serif">3.56 × 10</text>' +
      '<text x="248" y="148" font-size="19" font-weight="700" fill="#e0632f" font-family="sans-serif">35.6</text>' +
      '<rect x="196" y="196" width="176" height="46" rx="23" fill="#f2ebff" stroke="#7c3aed"/>' +
      '<text x="218" y="225" font-size="12.5" fill="#7c3aed" font-family="sans-serif">There are 3 books.</text>' +
      '<circle cx="86" cy="252" r="7" fill="#f2b705"/>' +
      '<circle cx="300" cy="64" r="5" fill="#e0632f"/>' +
      '</svg>';
  }

  /* ---------- 列表页 ---------- */
  var listState = { grade: 'all', q: '' };

  function viewList(subject, grade) {
    var meta = SUBJECTS[subject];
    if (!meta) return viewHome();
    if (grade) listState.grade = String(grade);

    var head = h('div', { class: 'point-head' });
    head.appendChild(h('div', { class: 'kicker' }, meta.name + ' · 人教版'));
    head.appendChild(h('h1', {}, meta.name + '知识点'));
    head.appendChild(h('p', { style: 'color:var(--muted);max-width:60ch' }, meta.desc));
    main.innerHTML = '';
    main.appendChild(head);

    var filters = h('div', { class: 'filters' });
    var chips = h('div', { class: 'filters', style: 'margin:0;gap:6px' });
    [['all', '全部年级'], ['4', '四年级'], ['5', '五年级'], ['6', '六年级']].forEach(function (g) {
      var b = h('button', {
        class: 'chip ' + meta.cls.toLowerCase(), type: 'button',
        'aria-pressed': String(listState.grade === g[0])
      }, g[1]);
      b.addEventListener('click', function () {
        listState.grade = g[0];
        viewList(subject);
      });
      chips.appendChild(b);
    });
    filters.appendChild(chips);

    var search = h('label', { class: 'search' });
    search.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
    var input = h('input', { type: 'search', placeholder: '搜知识点，如“通分”“there be”', value: listState.q, 'aria-label': '搜索知识点' });
    input.addEventListener('input', function () {
      listState.q = input.value.trim();
      renderGrid();
    });
    search.appendChild(input);
    filters.appendChild(search);
    main.appendChild(filters);

    var gridHost = h('div');
    main.appendChild(gridHost);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') input.blur(); });

    function filtered() {
      return orderIn(subject).filter(function (p) {
        if (listState.grade !== 'all' && String(p.grade) !== listState.grade) return false;
        if (!listState.q) return true;
        var q = listState.q.toLowerCase();
        return (p.title + ' ' + p.goal + ' ' + p.unit + ' ' + (p.tags || []).join(' ')).toLowerCase().indexOf(q) >= 0;
      });
    }

    function renderGrid() {
      var list = filtered();
      XK.clear(gridHost);
      if (!list.length) {
        gridHost.appendChild(h('p', { class: 'empty' }, '没有找到，换个关键词试试。'));
        return;
      }
      gridHost.appendChild(pointGrid(list));
    }
    renderGrid();
    setActive(subject);
  }

  function pointGrid(list) {
    var grid = h('div', { class: 'list-grid' });
    list.forEach(function (p) {
      var meta = subOf(p);
      var card = h('a', { class: 'pcard s-' + meta.cls, href: '#/p/' + p.id });
      var top = h('div', { class: 'pcard-top' });
      top.appendChild(h('span', { class: 'badge' }, meta.name));
      top.appendChild(h('span', { class: 'term', style: 'font-size:11.5px;color:var(--faint);margin-left:auto' }, p.grade + ' 年级 · ' + p.unit));
      card.appendChild(top);
      card.appendChild(h('h3', {}, p.title));
      card.appendChild(h('p', { class: 'goal' }, p.goal));
      var foot = h('div', { class: 'pcard-foot' });
      if (isDone(p.id)) {
        foot.appendChild(h('span', { class: 'done' }, '✓ 已自测 ' + cur().done[p.id].score + '/' + cur().done[p.id].total));
      } else {
        foot.appendChild(h('span', {}, '约 10 分钟'));
      }
      foot.appendChild(h('span', { style: 'margin-left:auto' }, '动手实验 →'));
      card.appendChild(foot);
      grid.appendChild(card);
    });
    return grid;
  }

  /* ---------- 详情页 ---------- */
  function viewPoint(id) {
    var p = BY_ID[id];
    if (!p) { main.innerHTML = '<p class="empty">没有这个知识点，<a href="#/">回首页</a>。</p>'; return; }
    var meta = subOf(p);
    main.innerHTML = '';

    var layout = h('div', { class: 'point-layout s-' + meta.cls });
    var article = h('article');
    var side = h('aside', { class: 'side' });

    // 面包屑
    article.appendChild(h('nav', { class: 'crumb' },
      h('a', { href: '#/' }, '首页'), h('span', {}, '/'),
      h('a', { href: '#/' + p.subject }, meta.name), h('span', {}, '/'),
      h('span', {}, gradeLabel(p.grade, p.term))
    ));

    // 头部
    var head = h('header', { class: 'point-head' });
    head.appendChild(h('div', { class: 'kicker' }, p.unit + ' · ' + gradeLabel(p.grade, p.term)));
    head.appendChild(h('h1', {}, p.title));
    var goal = h('div', { class: 'goalbox' });
    goal.appendChild(h('b', {}, '学完能做到'));
    goal.appendChild(h('p', {}, p.goal));
    head.appendChild(goal);
    article.appendChild(head);

    // 正文
    var prose = h('div', { class: 'prose' });
    (p.sections || []).forEach(function (sec, i) {
      if (sec.h) {
        var hh = h('h2', { id: 'sec-' + i }, sec.h);
        prose.appendChild(hh);
      }
      if (sec.p) prose.appendChild(h('p', { html: sec.p }));
      if (sec.ol) {
        var ol = h('ol');
        sec.ol.forEach(function (t) { ol.appendChild(h('li', { html: t })); });
        prose.appendChild(ol);
      }
      if (sec.ul) {
        var ul = h('ul');
        sec.ul.forEach(function (t) { ul.appendChild(h('li', { html: t })); });
        prose.appendChild(ul);
      }
      if (sec.table) {
        var tb = h('table', { class: 'data' });
        var thead = h('thead'), tr = h('tr');
        sec.table.head.forEach(function (t) { tr.appendChild(h('th', {}, t)); });
        thead.appendChild(tr); tb.appendChild(thead);
        var tbody = h('tbody');
        sec.table.rows.forEach(function (row) {
          var tr2 = h('tr');
          row.forEach(function (c, ci) {
            tr2.appendChild(h('td', { html: ci === 0 ? '<b>' + c + '</b>' : c }));
          });
          tbody.appendChild(tr2);
        });
        tb.appendChild(tbody);
        prose.appendChild(tb);
      }
      if (sec.note) {
        var nt = h('div', { class: 'callout ' + (sec.note.type === 'warn' ? 'warn' : 'tip') });
        nt.appendChild(h('span', { class: 'ico' }, sec.note.type === 'warn' ? '⚠' : '✓'));
        nt.appendChild(h('p', { html: sec.note.text }));
        prose.appendChild(nt);
      }
    });
    article.appendChild(prose);

    // 互动实验
    if (p.figure) article.appendChild(buildLab(p));

    // 例题
    if (p.example) {
      var ex = h('section', { id: 'ex', class: 'prose' });
      ex.appendChild(h('h2', { class: 'prose', style: 'font-size:20px;margin:34px 0 12px;display:flex;align-items:center;gap:9px' }, '例题精讲'));
      var box = h('div', { class: 'example' });
      box.appendChild(h('div', { class: 'ex-q', html: p.example.q }));
      if (p.example.steps) {
        var ol2 = h('ol');
        p.example.steps.forEach(function (t) { ol2.appendChild(h('li', { html: t })); });
        box.appendChild(ol2);
      }
      box.appendChild(h('div', { class: 'ex-a', html: '<b>答：</b>' + p.example.a }));
      ex.appendChild(box);
      article.appendChild(ex);
    }

    // 自测
    if (p.quiz && p.quiz.length) article.appendChild(buildQuiz(p));

    // 复习卡
    if (p.cards && p.cards.length) {
      var sec = h('section', { id: 'cards', class: 'prose' });
      sec.appendChild(h('h2', { class: 'prose', style: 'font-size:20px;margin:34px 0 8px' }, '复习卡片'));
      sec.appendChild(h('p', { style: 'font-size:13px;color:var(--muted)' }, '点一下卡片，看背面。睡前翻一遍，比反复读课本有用。'));
      var cards = h('div', { class: 'cards' });
      p.cards.forEach(function (c) {
        var b = h('button', { type: 'button', class: 'flip', 'aria-pressed': 'false' });
        b.appendChild(h('span', { class: 'f-tag' }, '点一下翻面'));
        b.appendChild(h('span', { class: 'f-front', html: c.f }));
        b.appendChild(h('span', { class: 'f-back', html: c.b }));
        b.addEventListener('click', function () {
          var open = b.classList.toggle('open');
          b.setAttribute('aria-pressed', String(open));
        });
        cards.appendChild(b);
      });
      sec.appendChild(cards);
      article.appendChild(sec);
    }

    // 上一节 / 下一节
    var pn = prevNext(p);
    var pager = h('nav', { class: 'pager', 'aria-label': '上下一个知识点' });
    if (pn.prev) {
      pager.appendChild(h('a', { href: '#/p/' + pn.prev.id },
        h('span', {}, '← 上一个'), h('b', {}, pn.prev.title)));
    } else {
      pager.appendChild(h('div'));
    }
    if (pn.next) {
      pager.appendChild(h('a', { class: 'next', href: '#/p/' + pn.next.id },
        h('span', {}, '下一个 →'), h('b', {}, pn.next.title)));
    }
    article.appendChild(pager);

    // 侧栏
    var toc = h('div', { class: 'toc' });
    var tocItems = [];
    (p.sections || []).forEach(function (sec, i) {
      if (!sec.h) return;
      var a = h('a', { href: '#sec-' + i }, sec.h);
      toc.appendChild(a);
      tocItems.push({ a: a, id: 'sec-' + i });
    });
    if (p.figure) {
      var a2 = h('a', { href: '#lab' }, '🔬 动手实验');
      toc.appendChild(a2); tocItems.push({ a: a2, id: 'lab' });
    }
    if (p.example) {
      var a3 = h('a', { href: '#ex' }, '例题精讲');
      toc.appendChild(a3); tocItems.push({ a: a3, id: 'ex' });
    }
    if (p.quiz) {
      var a4 = h('a', { href: '#quiz' }, '自测 3 题');
      toc.appendChild(a4); tocItems.push({ a: a4, id: 'quiz' });
    }
    var c1 = h('div', { class: 'side-card' });
    c1.appendChild(h('h4', {}, '本页目录'));
    c1.appendChild(toc);
    side.appendChild(c1);

    var c2 = h('div', { class: 'side-card' });
    c2.appendChild(h('h4', {}, '学习状态'));
    var st = h('div', { style: 'font-size:13px;line-height:1.9' });
    function paintStatus() {
      st.innerHTML = '';
      if (isDone(p.id)) {
        st.appendChild(h('div', { style: 'color:var(--good);font-weight:600' }, '✓ 自测已通过 ' + cur().done[p.id].score + '/' + cur().done[p.id].total));
        st.appendChild(h('div', { style: 'color:var(--muted);font-size:12px' }, new Date(cur().done[p.id].at).toLocaleDateString('zh-CN') + ' 完成'));
      } else {
        st.appendChild(h('div', { style: 'color:var(--muted)' }, '还没做自测'));
      }
      var b = h('button', { class: 'btn sm', type: 'button', style: 'margin-top:10px' }, isDone(p.id) ? '重做自测' : '去做自测');
      b.addEventListener('click', function () {
        var q = document.getElementById('quiz');
        if (q) q.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      st.appendChild(b);
    }
    paintStatus();
    c2.appendChild(st);
    side.appendChild(c2);

    var c3 = h('div', { class: 'side-card' });
    c3.appendChild(h('h4', {}, '同年级'));
    var nav = h('div', { class: 'side-nav' });
    orderIn(p.subject).filter(function (x) { return x.grade === p.grade && x.id !== p.id; }).slice(0, 4).forEach(function (x) {
      nav.appendChild(h('a', { href: '#/p/' + x.id }, h('span', {}, x.unit), h('b', {}, x.title)));
    });
    if (!nav.children.length) nav.appendChild(h('div', { style: 'color:var(--muted);font-size:12.5px' }, '这一册只有这一个知识点'));
    c3.appendChild(nav);
    side.appendChild(c3);

    layout.appendChild(article);
    layout.appendChild(side);
    main.appendChild(layout);

    // 目录高亮
    if (spy) spy.disconnect();
    if ('IntersectionObserver' in window) {
      spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          tocItems.forEach(function (t) {
            t.a.classList.toggle('active', t.id === en.target.id);
          });
        });
      }, { rootMargin: '-84px 0px -70% 0px', threshold: 0 });
      tocItems.forEach(function (t) {
        var el = document.getElementById(t.id);
        if (el) spy.observe(el);
      });
    }

    setActive(p.subject);
  }

  /* ---------- 实验面板 ---------- */
  function buildLab(p) {
    var f = p.figure;
    var lab = h('section', { class: 'lab', id: 'lab' });
    var head = h('div', { class: 'lab-head' });
    head.appendChild(h('span', { class: 'lab-badge' }, '动手实验'));
    head.appendChild(h('h3', {}, f.title));
    head.appendChild(h('p', { class: 'lead' }, f.lead || '先预测，再动手。'));
    lab.appendChild(head);

    var stageEl = h('div', { class: 'stage' });
    var controls = h('div', { class: 'controls' });
    var readout = h('div', { class: 'readout' });
    var side = h('aside', { class: 'lab-side' }, controls, readout,
      h('p', { class: 'lab-hint' }, f.hint || '改变左边的条件，右边读数会跟着变。'));
    var body = h('div', { class: 'lab-body locked' }, stageEl, side);

    // 预测
    var pred = h('div', { class: 'predict' });
    var pq = h('div', { class: 'predict-q' });
    pq.appendChild(h('span', { class: 'num' }, '?'));
    pq.appendChild(h('span', {}, '先猜一猜：' + f.predict.q));
    pred.appendChild(pq);
    var opts = h('div', { class: 'pred-opts' });
    var fb = h('div', { class: 'pred-feedback' });
    var answered = false;
    var keys = ['A', 'B', 'C', 'D'];

    f.predict.options.forEach(function (txt, i) {
      var b = h('button', { type: 'button', class: 'pred-opt' },
        h('span', { class: 'k' }, keys[i]), h('span', { html: txt }));
      b.addEventListener('click', function () {
        if (answered) return;
        answered = true;
        var right = i === f.predict.answer;
        opts.querySelectorAll('.pred-opt').forEach(function (x, j) {
          x.disabled = true;
          if (j === f.predict.answer) x.setAttribute('data-state', 'right');
          else if (j === i) x.setAttribute('data-state', 'wrong');
        });
        fb.className = 'pred-feedback show';
        fb.innerHTML = (right ? '<b>猜对了。</b>' : '<b>先记住你的猜测，去实验里验证。</b>') +
          ' ' + (f.predict.why || '');
        body.classList.remove('locked');
        stageEl.querySelector('.stage-mask') && stageEl.querySelector('.stage-mask').remove();
      });
      opts.appendChild(b);
    });
    pred.appendChild(opts);
    pred.appendChild(fb);
    lab.appendChild(pred);

    // 遮罩：预测前不让动手
    var mask = h('div', {
      class: 'stage-mask',
      style: 'position:absolute;inset:0;background:rgba(251,248,243,.72);backdrop-filter:blur(1px);' +
        'display:grid;place-items:center;text-align:center;padding:20px;border-radius:0;z-index:2'
    }, h('span', { style: 'font-size:13px;color:#6b7280;max-width:22ch;line-height:1.7' }, '选一个预测，就能开始动手'));
    stageEl.appendChild(mask);

    lab.appendChild(body);

    // 结论
    var insight = h('div', { class: 'insight' });
    insight.appendChild(h('span', { style: 'font-size:15px;flex:none' }, '💡'));
    insight.appendChild(h('div', { html: '<b>结论：</b>' + f.insight }));
    lab.appendChild(insight);

    if (f.frame) {
      var frame = h('div', { class: 'frame', html: '<b>试着说：</b>' + f.frame });
      lab.appendChild(frame);
    }

    // 挂载
    var mounted = false;
    function mount() {
      if (mounted) return;
      mounted = true;
      destroyFigure = XK.mountFigure(f.type, {
        stage: stageEl, controls: controls, readout: readout, cfg: f,
        tone: metaTone(p.subject), soft: metaSoft(p.subject)
      });
    }
    // 预测后解锁并挂载
    var obs = new MutationObserver(function () {
      if (!body.classList.contains('locked')) { mount(); obs.disconnect(); }
    });
    obs.observe(body, { attributes: true, attributeFilter: ['class'] });

    // 首次交互后展示结论
    function reveal() {
      if (insight.classList.contains('show')) return;
      insight.classList.add('show');
    }
    controls.addEventListener('input', reveal);
    controls.addEventListener('click', function (e) {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') reveal();
    });

    lab._start = mount;
    return lab;
  }

  function metaTone(sub) {
    return sub === 'math' ? '#2563eb' : sub === 'english' ? '#e0632f' : '#7c3aed';
  }
  function metaSoft(sub) {
    return sub === 'math' ? '#e9f0ff' : sub === 'english' ? '#fdeee6' : '#f2ebff';
  }

  /* ---------- 自测 ---------- */
  function buildQuiz(p) {
    var sec = h('section', { class: 'quiz prose', id: 'quiz' });
    sec.appendChild(h('h2', { class: 'prose', style: 'font-size:20px;margin-bottom:6px' }, '自测一下'));
    sec.appendChild(h('p', { style: 'font-size:13px;color:var(--muted);margin-bottom:16px' }, '3 道题，答对 2 道就算过关。'));
    var correct = 0, answeredCount = 0;
    var summary = h('div', { class: 'quiz-summary' });

    p.quiz.forEach(function (q, qi) {
      var item = h('div', { class: 'quiz-item' });
      var qrow = h('div', { class: 'q' });
      qrow.appendChild(h('i', {}, String(qi + 1)));
      qrow.appendChild(h('span', { html: q.q }));
      item.appendChild(qrow);
      var opts = h('div', { class: 'qopts' });
      var why = h('div', { class: 'qwhy' });
      q.options.forEach(function (txt, oi) {
        var b = h('button', { type: 'button', class: 'qopt', html: txt });
        b.addEventListener('click', function () {
          if (item.dataset.done) return;
          item.dataset.done = '1';
          var right = oi === q.answer;
          if (right) correct++;
          answeredCount++;
          opts.querySelectorAll('.qopt').forEach(function (x, j) {
            x.disabled = true;
            if (j === q.answer) x.setAttribute('data-state', 'right');
            else if (j === oi) x.setAttribute('data-state', 'wrong');
          });
          why.className = 'qwhy show';
          why.innerHTML = (right ? '<b style="color:var(--good)">答对了。</b> ' : '<b style="color:var(--bad)">再想一步。</b> ') + (q.why || '');
          if (answeredCount === p.quiz.length) {
            summary.className = 'quiz-summary show';
            var pass = correct >= Math.ceil(p.quiz.length * 2 / 3);
            summary.innerHTML = '<b>' + correct + '/' + p.quiz.length + '</b><span>' +
              (pass ? '过关，建议明天再翻一次复习卡。' : '先回到"结论"再读一遍，然后重做。') + '</span>';
            if (pass) {
              var old = cur().done[p.id];
              if (!old) {
                cur().done[p.id] = { score: correct, total: p.quiz.length, at: Date.now() };
                persist();
              }
            }
          }
        });
        opts.appendChild(b);
      });
      item.appendChild(opts);
      item.appendChild(why);
      sec.appendChild(item);
    });

    var retry = h('button', { class: 'btn sm', type: 'button' }, '重做一遍');
    retry.addEventListener('click', function () { viewPoint(p.id); window.scrollTo({ top: document.getElementById('quiz').offsetTop - 90, behavior: 'smooth' }); });
    sec.appendChild(summary);
    sec.appendChild(retry);
    return sec;
  }

  /* ---------- 学习档案 ---------- */
  var PALETTE = ['#2563eb', '#e0632f', '#7c3aed', '#15803d', '#b45309', '#0e7490'];
  function avatar(name, size) {
    var ch = (name || '?').replace(/\s/g, '').charAt(0) || '?';
    var code = 0;
    for (var i = 0; i < (name || '').length; i++) code += name.charCodeAt(i);
    var bg = PALETTE[code % PALETTE.length];
    return h('span', {
      class: 'avatar',
      style: 'background:' + bg + ';width:' + size + 'px;height:' + size + 'px;font-size:' + Math.round(size * .42) + 'px'
    }, ch);
  }

  function paintProfileBtn() {
    var p = curProfile();
    var slot = document.getElementById('pfAvatar');
    if (!slot) return;
    XK.clear(slot);
    slot.appendChild(avatar(p.name, 24));
    document.getElementById('pfName').textContent = p.name;
  }

  function switchTo(id) {
    db.current = id;
    saveDb();
    paintProfileBtn();
    closeProfileModal();
    router();
  }

  function addProfile(name) {
    if (db.profiles.length >= 8) { alert('最多建 8 个档案。'); return; }
    var base = name, n = 2;
    while (db.profiles.some(function (x) { return x.name === name; })) {
      name = base + ' ' + n; n++;
    }
    var p = { id: uid(), name: name, at: Date.now() };
    db.profiles.push(p);
    db.progress[p.id] = { done: {} };
    db.current = p.id;
    saveDb();
    paintProfileBtn();
    renderPfList();
    if (location.hash.indexOf('#/me') === 0) viewMe();
  }

  function removeProfile(id) {
    var p = profileById(id);
    if (!p || db.profiles.length <= 1) return;
    if (!confirm('删除档案「' + p.name + '」以及它的全部学习记录？删除后无法恢复。')) return;
    db.profiles = db.profiles.filter(function (x) { return x.id !== id; });
    delete db.progress[id];
    if (db.current === id) db.current = db.profiles[0].id;
    saveDb();
    paintProfileBtn();
    renderPfList();
    if (location.hash.indexOf('#/me') === 0) viewMe();
  }

  function renameProfile() {
    var p = curProfile();
    var v = prompt('给这个档案改个名字：', p.name);
    if (!v) return;
    v = v.trim().slice(0, 12);
    if (!v) return;
    p.name = v;
    saveDb();
    paintProfileBtn();
    renderPfList();
    if (location.hash.indexOf('#/me') === 0) viewMe();
  }

  function exportProfile() {
    var p = curProfile();
    var payload = {
      app: 'xiaokedz', v: 2, name: p.name,
      exportedAt: new Date().toISOString(),
      done: cur().done
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = h('a', {
      href: url,
      download: '小课桌-' + p.name + '-' + new Date().toISOString().slice(0, 10) + '.json'
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 3000);
  }

  function importFile(file) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var o = JSON.parse(r.result);
        if (!o || !o.done || typeof o.done !== 'object') throw new Error('bad');
        if (db.profiles.length >= 8) { alert('档案已满 8 个，先删掉一个再导入。'); return; }
        var name = String(o.name || '导入档案').slice(0, 10) + '（导入）';
        var id = uid();
        db.profiles.push({ id: id, name: name, at: Date.now() });
        db.progress[id] = { done: o.done };
        db.current = id;
        saveDb();
        paintProfileBtn();
        renderPfList();
        alert('已导入「' + name + '」，共 ' + Object.keys(o.done).length + ' 条记录。');
        if (location.hash.indexOf('#/me') === 0) viewMe();
      } catch (e) {
        alert('这个文件读不出来。请选择本站「导出当前档案」得到的 .json 文件。');
      }
    };
    r.readAsText(file);
  }

  var pfModal = null;
  function buildModal() {
    if (pfModal) return pfModal;
    pfModal = h('div', { class: 'modal', hidden: '', role: 'dialog', 'aria-modal': 'true', 'aria-label': '学习档案' });
    var card = h('div', { class: 'modal-card' });
    var top = h('div', { class: 'modal-top' });
    top.appendChild(h('h3', {}, '学习档案'));
    var x = h('button', { class: 'icon-btn', type: 'button', 'aria-label': '关闭' }, '✕');
    x.addEventListener('click', closeProfileModal);
    top.appendChild(x);
    card.appendChild(top);
    card.appendChild(h('p', { class: 'modal-sub' }, '每个档案单独记进度，互不影响。换设备时用下面的「导出 / 导入」把记录带走。'));
    card.appendChild(h('div', { class: 'pf-list', id: 'pfList' }));

    var form = h('div', { class: 'pf-form' });
    var input = h('input', { type: 'text', placeholder: '新档案姓名，如 小明', maxlength: '12', 'aria-label': '新档案姓名' });
    var addBtn = h('button', { class: 'btn sm', type: 'button' }, '新建');
    function doAdd() {
      var v = input.value.trim();
      if (!v) { input.focus(); return; }
      addProfile(v);
      input.value = '';
      input.focus();
    }
    addBtn.addEventListener('click', doAdd);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') doAdd(); });
    form.appendChild(input);
    form.appendChild(addBtn);
    card.appendChild(form);

    var acts = h('div', { class: 'pf-acts' });
    var ex = h('button', { class: 'btn sm', type: 'button' }, '导出当前档案');
    ex.addEventListener('click', exportProfile);
    var im = h('label', { class: 'btn sm pf-file' }, '导入档案');
    var file = h('input', { type: 'file', accept: '.json,application/json', 'aria-label': '导入进度文件' });
    file.addEventListener('change', function () {
      if (file.files && file.files[0]) { importFile(file.files[0]); file.value = ''; }
    });
    im.appendChild(file);
    var rn = h('button', { class: 'btn sm', type: 'button' }, '重命名当前');
    rn.addEventListener('click', renameProfile);
    acts.appendChild(ex);
    acts.appendChild(im);
    acts.appendChild(rn);
    card.appendChild(acts);

    pfModal.appendChild(card);
    pfModal.addEventListener('click', function (e) { if (e.target === pfModal) closeProfileModal(); });
    document.body.appendChild(pfModal);
    return pfModal;
  }

  function renderPfList() {
    var list = pfModal && pfModal.querySelector('#pfList');
    if (!list) return;
    XK.clear(list);
    db.profiles.forEach(function (p) {
      var on = p.id === db.current;
      var row = h('div', { class: 'pf-row' + (on ? ' on' : ''), role: 'button', tabindex: '0' });
      row.appendChild(avatar(p.name, 36));
      row.appendChild(h('div', { class: 'pf-info' },
        h('b', {}, p.name + (on ? ' · 当前' : '')),
        h('span', {}, profDone(p.id) + ' / ' + POINTS.length + ' 个知识点　平均 ' + profAvg(p.id) + '%')
      ));
      row.appendChild(h('span', { class: 'pf-go' }, on ? '使用中' : '切换'));
      row.addEventListener('click', function () { if (on) closeProfileModal(); else switchTo(p.id); });
      row.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); row.click(); }
      });
      if (db.profiles.length > 1) {
        var del = h('button', { class: 'pf-del', type: 'button', 'aria-label': '删除档案 ' + p.name }, '删除');
        del.addEventListener('click', function (e) { e.stopPropagation(); removeProfile(p.id); });
        row.appendChild(del);
      }
      list.appendChild(row);
    });
  }

  function openProfileModal() {
    buildModal();
    renderPfList();
    pfModal.hidden = false;
    document.getElementById('profileBtn').setAttribute('aria-expanded', 'true');
  }
  function closeProfileModal() {
    if (!pfModal) return;
    pfModal.hidden = true;
    var b = document.getElementById('profileBtn');
    if (b) b.setAttribute('aria-expanded', 'false');
  }

  /* ---------- 我的学习 ---------- */
  function viewMe() {
    main.innerHTML = '';
    var me = curProfile();
    var head = h('div', { class: 'point-head' });
    head.appendChild(h('div', { class: 'kicker' }, '本机保存 · 多档案'));
    head.appendChild(h('h1', {}, '学习档案'));
    head.appendChild(h('p', { style: 'color:var(--muted);max-width:64ch' },
      '同一台设备上，每个孩子一个档案，进度互不干扰。进度存在这台设备的浏览器里；换手机或换电脑，用「导出 / 导入」把记录带过去。'));
    main.appendChild(head);

    // 档案卡
    var grid = h('div', { class: 'pf-cards' });
    db.profiles.forEach(function (p) {
      var on = p.id === db.current;
      var card = h('div', { class: 'pf-card' + (on ? ' on' : '') });
      card.appendChild(avatar(p.name, 40));
      var info = h('div', { class: 'pf-card-info' });
      info.appendChild(h('b', {}, p.name));
      info.appendChild(h('span', {}, '已完成 ' + profDone(p.id) + ' / ' + POINTS.length));
      info.appendChild(h('span', {}, '自测平均 ' + profAvg(p.id) + '%'));
      card.appendChild(info);
      if (on) {
        card.appendChild(h('span', { class: 'pf-flag' }, '当前'));
      } else {
        var b = h('button', { class: 'btn sm', type: 'button' }, '切换');
        b.addEventListener('click', function () { switchTo(p.id); });
        card.appendChild(b);
      }
      grid.appendChild(card);
    });
    var addCard = h('button', { class: 'pf-card pf-add', type: 'button' });
    addCard.appendChild(h('span', { class: 'pf-plus' }, '+'));
    addCard.appendChild(h('span', {}, '新建档案'));
    addCard.addEventListener('click', function () {
      var v = prompt('新档案的姓名（比如孩子的小名）：');
      if (v && v.trim()) addProfile(v.trim().slice(0, 12));
    });
    grid.appendChild(addCard);
    main.appendChild(grid);

    var tools = h('div', { class: 'pf-tools' });
    var exBtn = h('button', { class: 'btn sm', type: 'button' }, '导出当前档案');
    exBtn.addEventListener('click', exportProfile);
    var imLabel = h('label', { class: 'btn sm pf-file' }, '导入档案');
    var fileInput = h('input', { type: 'file', accept: '.json,application/json', 'aria-label': '导入进度文件' });
    fileInput.addEventListener('change', function () {
      if (fileInput.files && fileInput.files[0]) { importFile(fileInput.files[0]); fileInput.value = ''; }
    });
    imLabel.appendChild(fileInput);
    var rnBtn = h('button', { class: 'btn sm', type: 'button' }, '重命名当前');
    rnBtn.addEventListener('click', renameProfile);
    tools.appendChild(exBtn);
    tools.appendChild(imLabel);
    tools.appendChild(rnBtn);
    main.appendChild(tools);

    // 当前档案统计
    var secHead = h('div', { class: 'sec-head', style: 'margin-top:34px' },
      h('h2', {}, '「' + me.name + '」的学习情况'),
      h('p', {}, '只统计当前档案')
    );
    main.appendChild(secHead);

    var total = POINTS.length, done = doneCount();
    var scores = Object.keys(cur().done).map(function (k) { return cur().done[k]; });
    var avg = scores.length ? Math.round(scores.reduce(function (a, b) { return a + b.score / b.total; }, 0) / scores.length * 100) : 0;

    var stats = h('div', { class: 'me-grid' });
    [
      ['已完成', done + ' / ' + total, '个知识点'],
      ['自测平均正确率', avg + '%', '按已完成的知识点算'],
      ['连续完成', String(streakDays()), '天（有自测记录的日子）']
    ].forEach(function (s) {
      var c = h('div', { class: 'stat' });
      c.appendChild(h('div', { class: 'n' }, s[1], h('small', {}, s[2])));
      c.appendChild(h('div', { class: 'l' }, s[0]));
      stats.appendChild(c);
    });
    main.appendChild(stats);

    var bars = h('div', { class: 'stat' });
    bars.appendChild(h('div', { class: 'l', style: 'margin-bottom:12px;color:var(--ink-2);font-size:13px;font-weight:600' }, '三科进度'));
    var wrap = h('div', { class: 'bars' });
    ['math', 'english', 'grammar'].forEach(function (k) {
      var meta = SUBJECTS[k];
      var d = doneCount(k), t = totalCount(k);
      var row = h('div', { class: 'bar-row' });
      row.appendChild(h('span', { class: 'nm' }, meta.name));
      var tr = h('div', { class: 'tr' });
      var i = h('i');
      i.style.width = pct(d, t) + '%';
      i.style.background = metaTone(k);
      tr.appendChild(i);
      row.appendChild(tr);
      row.appendChild(h('span', { class: 'vl' }, d + '/' + t));
      wrap.appendChild(row);
    });
    bars.appendChild(wrap);
    main.appendChild(bars);

    var listSec = h('section', { style: 'margin-top:30px' });
    listSec.appendChild(h('h2', { style: 'font-size:18px;margin-bottom:10px' }, '已完成的知识点'));
    var list = h('div', { class: 'done-list' });
    var items = POINTS.filter(function (p) { return isDone(p.id); });
    if (!items.length) {
      list.appendChild(h('p', { class: 'empty' }, '还没有记录。随便进一个知识点，做完自测就会出现在这里。'));
    } else {
      items.forEach(function (p) {
        var rec = cur().done[p.id];
        var row = h('a', { class: 'done-row', href: '#/p/' + p.id });
        row.appendChild(h('span', { class: 'ok' }, '✓'));
        row.appendChild(h('span', { class: 't' }, p.title));
        row.appendChild(h('span', { class: 'sc' }, rec.score + '/' + rec.total));
        row.appendChild(h('span', { class: 'dt' }, new Date(rec.at).toLocaleDateString('zh-CN')));
        list.appendChild(row);
      });
    }
    listSec.appendChild(list);
    main.appendChild(listSec);

    if (items.length) {
      var clr = h('button', { class: 'btn sm', type: 'button', style: 'margin-top:20px' }, '清空「' + me.name + '」的记录');
      clr.addEventListener('click', function () {
        if (confirm('只清空当前档案「' + me.name + '」的记录，其他档案不受影响。确定吗？')) {
          cur().done = {};
          saveDb();
          viewMe();
        }
      });
      main.appendChild(clr);
    }
  }

  function streakDays() {
    var days = {};
    Object.keys(cur().done).forEach(function (k) {
      var d = new Date(cur().done[k].at);
      days[d.toDateString()] = 1;
    });
    var n = 0, d = new Date();
    while (days[d.toDateString()]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  /* ---------- 关于 ---------- */
  function viewAbout() {
    main.innerHTML = '';
    var doc = h('div', { class: 'doc' });
    doc.appendChild(h('div', { class: 'kicker', style: 'font-size:13px;color:var(--muted)' }, '关于本站'));
    doc.appendChild(h('h1', {}, '小课桌：给人教版 4-6 年级的一个自主复习站'));
    doc.appendChild(h('p', {}, '这个站点的目标很单一：让孩子在没有大人讲解的时候，也能把一个知识点弄明白，并且知道自己到底有没有弄明白。所以每个知识点都由固定的三段组成。'));

    doc.appendChild(h('h2', {}, '三段式：预测 → 操作 → 解释'));
    doc.appendChild(h('p', { html: '<b>先预测</b>：动手之前必须先选一个答案，猜错也没关系，猜错反而更容易记住。<b>再操作</b>：每个知识点只有一个可以改变的条件（滑块、按钮或拖拽），右边的读数会立刻跟着变。<b>后解释</b>：实验下方给出结论和一句"试着说"，要求孩子用自己的话把因果关系说出来。' }));
    doc.appendChild(h('div', { class: 'callout tip' },
      h('span', { class: 'ico' }, '✓'),
      h('p', { html: '这套结构来自公开的 <b>Teachable Figures</b> 教学图设计方法（ywEdAi，代码 MIT、文字内容 CC BY 4.0），本站按其规则重写了全部图文与代码。' })
    ));

    doc.appendChild(h('h2', {}, '教材依据与版本'));
    doc.appendChild(h('ul', {},
      h('li', { html: '数学：人教版（PEP 小学英语同步的人教版数学），按单元顺序整理，覆盖四上至六上高频易错点。' }),
      h('li', { html: '英语：人教版 PEP（三年级起点）四至六年级句型与词汇。' }),
      h('li', { html: '语法：按 PEP 教材中出现顺序归纳，不与课本单元一一对应。' }),
      h('li', { html: '河南信阳各区县、各学校进度可能略有差异，<b>以学校课本和老师要求为准</b>。' })
    ));

    doc.appendChild(h('h2', {}, '多人使用：每个孩子一个档案'));
    doc.appendChild(h('p', {}, '同一台设备上可以建多个档案，各自独立记录进度，互不覆盖。适合家里两个孩子、或者一台平板轮流用。档案之间可以随时切换，右上角头像按钮或「我的学习」页都能进。'));
    doc.appendChild(h('p', {}, '要注意的是：档案存在浏览器本地，换设备不会自动同步。把自己的档案「导出」成 JSON，在另一台设备上「导入」，就能带走记录。如果需要一个班几十人跨设备同步，需要加后端账号系统（见 README「多人进度方案」）。'));

    doc.appendChild(h('h2', {}, '技术说明'));
    doc.appendChild(h('p', {}, '纯静态站点：HTML + CSS + 原生 JavaScript，没有框架、没有构建步骤、不请求任何外部资源。整个目录拷到宝塔的网站根目录就能用，也能直接双击 index.html 离线打开。'));
    doc.appendChild(h('table', { class: 'data' },
      h('thead', {}, h('tr', {}, h('th', {}, '项目'), h('th', {}, '说明'))),
      h('tbody', {},
        h('tr', {}, h('td', {}, '页面数量'), h('td', {}, '1 个 HTML 入口 + hash 路由')),
        h('tr', {}, h('td', {}, '依赖'), h('td', {}, '无（无 CDN、无字体文件、无后端）')),
        h('tr', {}, h('td', {}, '学习记录'), h('td', {}, '浏览器 localStorage，按档案分开存，可导出/导入 JSON')),
        h('tr', {}, h('td', {}, '兼容'), h('td', {}, 'Chrome / Edge / Safari / 微信内置浏览器，360px 起')),
        h('tr', {}, h('td', {}, '部署'), h('td', {}, '宝塔新建静态站点 → 上传目录 → 完成'))
      )
    ));

    doc.appendChild(h('h2', {}, '免责声明'));
    doc.appendChild(h('p', {}, '互动图中的数值为便于理解而取整，属教学简化模型，不是精确测量，也不构成工程或临床仿真。题目为巩固概念设计，不替代学校作业与考试训练。学习效果未经教学实验验证。'));
    doc.appendChild(h('p', { style: 'font-size:12.5px;color:var(--muted)' },
      '教学图设计方法参考 Teachable Figures by ywEdAi（https://github.com/ywEdAi/teachable-figures），代码 MIT，书面内容 CC BY 4.0。本站文字与实现为独立创作。'));
    main.appendChild(doc);
  }

  /* ---------- 一页纸总结 ---------- */
  function sheetGrid(list) {
    var grid = h('div', { class: 'list-grid' });
    list.forEach(function (sh) {
      var meta = SUBJECTS[sh.subject];
      var card = h('a', { class: 'pcard s-' + meta.cls, href: '#/cheat/' + sh.id });
      var top = h('div', { class: 'pcard-top' });
      top.appendChild(h('span', { class: 'badge' }, meta.name + ' · 总结'));
      top.appendChild(h('span', { style: 'margin-left:auto;font-size:11.5px;color:var(--faint)' }, '可打印'));
      card.appendChild(top);
      card.appendChild(h('h3', {}, sh.title));
      card.appendChild(h('p', { class: 'goal' }, sh.sub));
      var foot = h('div', { class: 'pcard-foot' });
      foot.appendChild(h('span', {}, (sh.blocks ? sh.blocks.length : 0) + ' 个板块 · ' + (sh.drill ? sh.drill.length : 0) + ' 题'));
      foot.appendChild(h('span', { style: 'margin-left:auto' }, '打开速查表 →'));
      card.appendChild(foot);
      grid.appendChild(card);
    });
    return grid;
  }

  function viewCheatHub() {
    main.innerHTML = '';
    var head = h('div', { class: 'point-head' });
    head.appendChild(h('div', { class: 'kicker' }, '考前 10 分钟看的那种'));
    head.appendChild(h('h1', {}, '一页纸总结'));
    head.appendChild(h('p', { style: 'color:var(--muted);max-width:62ch' },
      '把一单元、一类题的知识压成一张表：口诀开头，表格中间，易错对比压轴，最后 6 道题自查。可以打印，也可以直接存成 PDF 带到学校。'));
    main.appendChild(head);

    var note = h('div', { class: 'callout tip' });
    note.appendChild(h('span', { class: 'ico' }, '✓'));
    note.appendChild(h('p', { html: '建议用法：先合上书做题，再翻表对答案；错的那一行用笔圈出来，第二天只看圈。' }));
    main.appendChild(note);

    var groups = [['english', '英语'], ['grammar', '语法'], ['math', '数学']];
    groups.forEach(function (g) {
      var list = SHEETS.filter(function (x) { return x.subject === g[0]; });
      if (!list.length) return;
      var sec = h('div', { class: 'sec-head', style: 'margin-top:26px' },
        h('h2', {}, g[1]),
        h('p', {}, list.length + ' 张速查表')
      );
      main.appendChild(sec);
      main.appendChild(sheetGrid(list));
    });
    setActive('cheat');
  }

  function viewSheet(id) {
    var sh = null;
    SHEETS.forEach(function (x) { if (x.id === id) sh = x; });
    if (!sh) { main.innerHTML = '<p class="empty">没有这张总结，<a href="#/cheat">回总结列表</a>。</p>'; return; }
    var meta = SUBJECTS[sh.subject];
    main.innerHTML = '';

    var art = h('article', { class: 'sheet s-' + meta.cls });

    var head = h('header', { class: 'sheet-head' });
    head.appendChild(h('div', { class: 'sheet-kicker' }, meta.name + ' · 一页纸总结'));
    head.appendChild(h('h1', {}, sh.title));
    head.appendChild(h('p', { class: 'sheet-sub' }, sh.sub));
    var tools = h('div', { class: 'sheet-tools no-print' });
    var printBtn = h('button', { class: 'btn sm', type: 'button' }, '打印 / 存为 PDF');
    printBtn.addEventListener('click', function () { window.print(); });
    var ansBtn = h('button', { class: 'btn sm', type: 'button' }, '显示答案');
    ansBtn.addEventListener('click', function () {
      var on = art.classList.toggle('show-answers');
      ansBtn.textContent = on ? '隐藏答案' : '显示答案';
      ansBtn.setAttribute('aria-pressed', String(on));
    });
    tools.appendChild(printBtn);
    tools.appendChild(ansBtn);
    var back = h('a', { class: 'btn sm ghost', href: '#/cheat' }, '← 全部总结');
    tools.appendChild(back);
    head.appendChild(tools);
    art.appendChild(head);

    if (sh.mnemonic) {
      var mn = h('div', { class: 'mnemonic' });
      mn.appendChild(h('span', { class: 'mn-tag' }, '口诀'));
      mn.appendChild(h('div', { class: 'mn-txt', html: sh.mnemonic }));
      art.appendChild(mn);
    }

    (sh.blocks || []).forEach(function (b, i) {
      var sec = h('section', { class: 'sheet-sec' });
      if (b.h) {
        var t = h('h2', {}, b.h);
        sec.appendChild(t);
      }
      if (b.lead) sec.appendChild(h('p', { class: 'sheet-lead', html: b.lead }));
      if (b.table) {
        var tb = h('table', { class: 'data' });
        var thead = h('thead'), tr = h('tr');
        b.table.head.forEach(function (c) { tr.appendChild(h('th', {}, c)); });
        thead.appendChild(tr); tb.appendChild(thead);
        var tbody = h('tbody');
        b.table.rows.forEach(function (row) {
          var tr2 = h('tr');
          row.forEach(function (c, ci) {
            tr2.appendChild(h('td', { html: ci === 0 ? '<b>' + c + '</b>' : c }));
          });
          tbody.appendChild(tr2);
        });
        tb.appendChild(tbody);
        var tblwrap = h('div', { class: 'tblwrap' });
        tblwrap.appendChild(tb);
        sec.appendChild(tblwrap);
      }
      if (b.list) {
        var ol = h('ol');
        b.list.forEach(function (t2) { ol.appendChild(h('li', { html: t2 })); });
        sec.appendChild(ol);
      }
      if (b.chips) {
        var chips = h('div', { class: 'chips' });
        b.chips.forEach(function (c) { chips.appendChild(h('span', { class: 'chip-static' }, c)); });
        sec.appendChild(chips);
      }
      if (b.vs) {
        var vs = h('div', { class: 'vsgrid' });
        b.vs.forEach(function (v) {
          var card = h('div', { class: 'vs-card' });
          var pair = h('div', { class: 'vs-pair' });
          pair.appendChild(h('span', { class: 'vs-l' }, v.left));
          pair.appendChild(h('span', { class: 'vs-badge' }, 'VS'));
          pair.appendChild(h('span', { class: 'vs-r' }, v.right));
          card.appendChild(pair);
          card.appendChild(h('p', { class: 'vs-tip', html: v.tip }));
          vs.appendChild(card);
        });
        sec.appendChild(vs);
      }
      if (b.note) {
        var nt = h('div', { class: 'callout ' + (b.note.type === 'warn' ? 'warn' : 'tip') });
        nt.appendChild(h('span', { class: 'ico' }, b.note.type === 'warn' ? '⚠' : '✓'));
        nt.appendChild(h('p', { html: b.note.text }));
        sec.appendChild(nt);
      }
      art.appendChild(sec);
    });

    if (sh.drill && sh.drill.length) {
      var dr = h('section', { class: 'sheet-sec drill' });
      var CN = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
      dr.appendChild(h('h2', {}, (CN[(sh.blocks || []).length] || '') + '、自测：先做，再对答案'));
      var ol2 = h('ol', { class: 'drill-list' });
      sh.drill.forEach(function (d, di) {
        var li = h('li');
        var line = h('div', { class: 'drill-q' });
        var txt = d.q.split('______');
        txt.forEach(function (seg, si) {
          line.appendChild(h('span', { html: seg }));
          if (si < txt.length - 1) {
            line.appendChild(h('input', {
              class: 'drill-input', type: 'text', autocomplete: 'off',
              'aria-label': '第 ' + (di + 1) + ' 题第 ' + (si + 1) + ' 空'
            }));
          }
        });
        li.appendChild(line);
        if (txt.length === 1) li.appendChild(h('div', { class: 'drill-line' }));
        var ans = h('div', { class: 'ans' });
        ans.appendChild(h('b', { html: d.a }));
        ans.appendChild(h('span', { html: '　' + d.why }));
        li.appendChild(ans);
        ol2.appendChild(li);
      });
      dr.appendChild(ol2);
      dr.appendChild(h('p', { class: 'drill-hint no-print' }, '填完点右上角"显示答案"对照；答错的题回到对应表格再看一遍。'));
      art.appendChild(dr);
    }

    var foot = h('div', { class: 'sheet-foot' });
    foot.appendChild(h('span', {}, '小课桌 · 人教版 · 4-6 年级'));
    foot.appendChild(h('span', {}, '数值为教学简化，以课本为准'));
    art.appendChild(foot);

    main.appendChild(art);
    setActive('cheat');
  }

  /* ---------- 路由 ---------- */
  function router() {
    if (destroyFigure) { try { destroyFigure(); } catch (e) {} destroyFigure = null; }
    if (spy) { spy.disconnect(); spy = null; }
    var hash = location.hash.replace(/^#\/?/, '');
    var parts = hash.split('/').filter(Boolean);

    setActive('');

    if (!parts.length) viewHome();
    else if (parts[0] === 'p' && parts[1]) viewPoint(parts[1]);
    else if (parts[0] === 'cheat' && parts[1]) viewSheet(parts[1]);
    else if (parts[0] === 'cheat') viewCheatHub();
    else if (parts[0] === 'me') viewMe();
    else if (parts[0] === 'about') viewAbout();
    else if (SUBJECTS[parts[0]]) viewList(parts[0], parts[1]);
    else viewHome();

    if (!parts.length) setActive('');
    paintProfileBtn();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    closeSheet();
  }

  /* ---------- 抽屉 ---------- */
  var sheet = document.getElementById('sheet');
  var burger = document.getElementById('burger');
  function openSheet() {
    sheet.hidden = false;
    burger.setAttribute('aria-expanded', 'true');
  }
  function closeSheet() {
    sheet.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', function () {
    if (sheet.hidden) openSheet(); else closeSheet();
  });
  sheet.addEventListener('click', function (e) {
    if (e.target === sheet) closeSheet();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !sheet.hidden) closeSheet();
  });

  /* ---------- 启动 ---------- */
  var pfBtn = document.getElementById('profileBtn');
  if (pfBtn) pfBtn.addEventListener('click', openProfileModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && pfModal && !pfModal.hidden) closeProfileModal();
  });
  paintProfileBtn();
  window.addEventListener('hashchange', router);
  if (!location.hash) location.replace('#/');
  router();
})();
