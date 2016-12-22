window.ajax = (function () {
  var defaultParams = {
    method: 'GET',
    complete: function () { },
    success: function () { },
    error: function () { }
  }
  return {
    request: function (params) {
      if (!(params.url || typeof params == 'string')) return;
      if (typeof params == 'string') params = { url: params };
      params = Object.assign({}, defaultParams, params);
      var promise = new Promise(function (resolve, reject) {
        if (params.method == 'JSONP') {
          var script = document.createElement('script');
          var callbackName = 'callback' + Math.random().toString(36).substring(7);
          window[callbackName] = function(){
            document.head.removeChild(script);
            resolve();
          };
          params.url = params.url + (~params.url.indexOf('?') ? '&' : '?' ) + 'jsoncallback=' + callbackName;
          script.src = params.url;
          document.head.appendChild(script);
          return;
        }
        var xhr = new XMLHttpRequest();
        params.xhr = xhr;
        xhr.open(params.method, params.url, true);
        xhr.send(params.data);
        xhr.onreadystatechange = function () { // (3)
          if (xhr.readyState != 4) return;
          params.complete();
          if (xhr.status != 200) {
            params.error(xhr);
            reject(xhr);
          }
          params.success(xhr.responseText);
          resolve(xhr.responseText)
        }
      });
      return promise;
    },
    get: function (params) {
      if (typeof params == 'string') params = { url: params };
      return this.request(params);
    },
    jsonp: function (params) {
      if (typeof params == 'string') params = { url: params };
      params.method = 'JSONP';
      return this.request(params);
    },
    post: function (params) {
      if (typeof params == 'string') params = { url: params };
      params.method = 'POST';
      return this.request(params);
    }
  }
})()
