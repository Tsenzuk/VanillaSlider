function onDocumentReady (callback){
  document.addEventListener('readystatechange', function(e){
    if (this.readyState == 'complete') {
      callback.apply(this, e);
    }
  })
}
