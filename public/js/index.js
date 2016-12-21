onDocumentReady(function () {
  var onKeyPress = function (e) {
    // console.log(arguments);
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
        if (this.current - this.offset > 40) {
          //TODO: add new images; remove old images; animate all
        }
        break;
      }
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
