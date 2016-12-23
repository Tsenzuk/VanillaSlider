function animate(dom, params, timeout) {
  if (typeof timeout != 'number') return;
  if (typeof params != 'object') return;
  if (!(dom instanceof Element || dom instanceof Array)) return;
  if (!(dom instanceof Array)) dom = [dom];
  var startTime = new Date();

  var before = {};
  dom.forEach(function (element) {
    var style = getComputedStyle(element);
    Object.keys(params).forEach(function (key) {
      if (style[key] != undefined) {
        if (!before[key]) before[key] = [];
        if (~style[key].indexOf('px')) {
          before[key].push(parseFloat(style[key].replace('px', '')));
        } else {
          throw 'animate function currently support only px values';
        }
      }
    });
  })


  var intervals = {};
  var promises = []
  Object.keys(before).reduce(function (intervals, key) {
    promises.push(new Promise(function (resolve, reject) {
      intervals[key] = setInterval((function (timeout) {
        var state = (new Date() - startTime) / timeout;
        if (state >= 1) {
          state = 1;
          clearInterval(intervals[key]);
          delete intervals[key];
          resolve();
        }
        this.forEach(function(element, i, dom){
          dom[i].style[key] = before[key][i] + (params[key] - before[key][i]) * state + 'px';
        });
      }).bind(dom, timeout), 1);
    }));
  }, intervals);
  return Promise.all(promises).then(function(){return dom});
}
