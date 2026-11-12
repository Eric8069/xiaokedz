/* ==========================================================================
   小课桌 · 云同步传输层（原生 XHR，ES5，无依赖）
   只负责收发，不碰 localStorage；具体绑定与合并逻辑在 app.js。
   关闭时 call() 直接回调 disabled，不创建 XHR 对象。
   ========================================================================== */
(function () {
  'use strict';
  var CFG = window.XK_SYNC_CONFIG || {};
  var XK = window.XK = window.XK || {};
  var enabled = !!CFG.enabled;
  var endpoint = CFG.endpoint || 'api/index.php';
  var timeout = CFG.timeout || 8000;

  function call(act, data, token, cb) {
    if (!enabled) {
      setTimeout(function () { cb('disabled', null); }, 0);
      return;
    }
    var url = endpoint + (endpoint.indexOf('?') >= 0 ? '&' : '?') +
      'act=' + encodeURIComponent(act) + '&_=' + Date.now();
    var xhr;
    try { xhr = new XMLHttpRequest(); } catch (e) { cb('network', null); return; }
    var done = false;
    function finish(err, res) {
      if (done) return;
      done = true;
      cb(err, res);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      var res = null;
      try { res = JSON.parse(xhr.responseText); } catch (e) { res = null; }
      if (xhr.status >= 200 && xhr.status < 300 && res && res.ok) finish(null, res);
      else if (xhr.status === 401) finish('unauthorized', res);
      else if (xhr.status === 429) finish('rate_limited', res);
      else if (!xhr.status) finish('network', res);
      else finish((res && res.error) || 'server', res);
    };
    xhr.ontimeout = function () { finish('timeout', null); };
    xhr.onerror = function () { finish('network', null); };
    try {
      xhr.open(data ? 'POST' : 'GET', url, true);
      xhr.timeout = timeout;
      xhr.setRequestHeader('Content-Type', 'application/json');
      if (token) xhr.setRequestHeader('X-XK-Token', token);
      xhr.send(data ? JSON.stringify(data) : null);
    } catch (e) {
      finish('network', null);
    }
  }

  function message(err, res) {
    if (res && res.msg) return res.msg;
    var m = {
      disabled: '云同步未开启',
      network: '连不上服务器，进度已存在本机',
      timeout: '服务器响应超时，进度已存在本机',
      unauthorized: '登录已过期，请重新输入学习码',
      rate_limited: '今天尝试次数太多，明天再试',
      local_full: '本机档案已满 8 个，先删掉一个再登录',
      code_taken: '这个学习码已经有人用了，换一个',
      bad_credentials: '学习码不对，再检查一下',
      server: '服务端暂时没响应，进度已存在本机'
    };
    return m[err] || '同步没成功，进度已存在本机';
  }

  XK.sync = { enabled: enabled, endpoint: endpoint, call: call, message: message };
})();
