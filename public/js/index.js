onDocumentReady(function () {
  var onKeyPress = function (e) {
    var that = this;
    this.images.map(function (image) {
      image.classList.remove('active');
      image.classList.remove('left');
      image.classList.remove('top');
      image.classList.remove('right');
      image.classList.remove('bottom');
    });
    var additionalClass = '';
    switch (e.keyCode) {
      case 37: {
        console.log('Arrow Left')
        this.current--;
        additionalClass = 'left';
        break;
      }
      case 38: {
        console.log('Arrow Up')
        this.current -= 5;
        additionalClass = 'top';
        break;
      }
      case 39: {
        console.log('Arrow Right')
        this.current++;
        additionalClass = 'right';
        break;
      }
      case 40: {
        console.log('Arrow Down')
        this.current += 5;
        additionalClass = 'bottom';
        break;
      }
    }
    if (this.current - this.offset >= 40) {
      var animatableArray = Array.prototype.slice.call(this.root.querySelectorAll('img')).reverse().filter(function (img, i) {
        return (i >= 20);
      });
      animate(animatableArray, { height: 0 }, 1000).then(function (animatableArray) {
        animatableArray.forEach(function (img) {
          img.parentNode.removeChild(img);
        });
        that.offset += 30;
      }).then(function () {
        for (var i = 0; i < 30; i++) {
          var img = document.createElement('img');
          img.classList.add('slider-image');
          that.root.appendChild(img);
        }
        that.images = Array.prototype.slice.call(that.root.querySelectorAll('.slider-image'))
      });
    }
    if (this.current > 10 && this.current - this.offset <= 10) {
      var animatableArray = Array.prototype.slice.call(this.root.querySelectorAll('img')).filter(function (img, i) {
        return (i >= 20);
      });
      animate(animatableArray, { height: 0 }, 1000).then(function (animatableArray) {
        animatableArray.forEach(function (img) {
          img.parentNode.removeChild(img);
        });
        that.offset -= 30;
      }).then(function () {
        for (var i = 0; i < 30; i++) {
          var img = document.createElement('img');
          img.classList.add('slider-image');
          that.root.insertBefore(img, that.root.firstChild);
        }
        that.images = Array.prototype.slice.call(that.root.querySelectorAll('.slider-image'))
      });
    }
    if (this.current < 0) {
      this.current = 0;
    }
    var activeImage = this.images[this.current - this.offset];
    activeImage.classList.add('active');
    activeImage.classList.add(additionalClass);
    window.scrollTo({ top: activeImage.offsetTop });
  }
  var sliderRoot = document.querySelector('#slider');
  var slider = {
    offset: 0,
    current: 0,
    root: sliderRoot,
    images: Array.prototype.slice.call(sliderRoot.querySelectorAll('.slider-image')),
  };
  document.addEventListener('keyup', onKeyPress.bind(slider));
});
