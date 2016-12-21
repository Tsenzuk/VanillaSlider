function animate(dom, params, timeout) {
  if (typeof timeout != 'number') return;
  if (typeof params != 'object') return;
  if (!(dom instanceof Element)) return;
  var startTime = new Date();
  var state = Object.keys(params).reduce(function (o, key) {
    if (dom.style.hasOwnProperty(key)) {
      o[key] = dom.style[key];
    }
    return o;
  }, {});

  var intervals = {};
  Object.keys(state).reduce(function (intervals, key) {
    intervals[key] = setInterval((function (timeout) {
      var state = (new Date() - startTime) / timeout
      if (state >= 1) {
        state = 1;
        clearInterval(intervals[key]);
        delete intervals[key];
      }
      this.style[key] = params[key] * state;
    }).bind(dom, timeout), 1);
  }, intervals);
}
