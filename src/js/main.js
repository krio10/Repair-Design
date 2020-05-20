$(document).ready(function () {
  var modal = $('.modal'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close'),
      backTop = $('.back-top')
  
  modal.hide();
  backTop.hide();

  modalBtn.on('click', function () {
    modal.show();
  });

  closeBtn.on('click', function () {
    modal.hide();
  });

  // функция закрытия модального окна по клику мышью за его пределами
  $(document).mouseup(function (e){ // событие клика по веб-документу
		if (modal.is(e.target) && modal.has(e.target).length === 0) {
      modal.hide();
		}
	});

  // функция закрытия модального окна по нажатию на клавишу Escape
  $(document).on('keydown', function(event) {
    event = event || window.event;
    var isEscape = false;
    if ("key" in event) {
        isEscape = (event.key === "Escape" || event.key === "Esc");
    } else {
        isEscape = (event.keyCode === 27);
    }
    if (isEscape) {
      modal.hide();
    }
  }); 

  /* функция плавного появления кнопки возврата вначало при прокрутке страницы вниз и плавного скрывания этой кнопки при прокрутке страницы вверх */
  $(window).scroll(function (){
    if ($(this).scrollTop() > $(window).height()-150 && $(window).width() > 576) {
      backTop.fadeIn();
    } else {
      backTop.fadeOut();
    }
  });

  // Функция плавной прокрутки страницы вверх при нажатии кнопки со стрелкой вверх
  backTop.click(function (){
    $("body,html").animate({
      scrollTop:0
    }, 2000);
    return false;
  });

  //initialize swiper when document ready
  var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');
  const bulletsOffset = 25;
  next.css('left', prev.width() + bulletsOffset + bullets.width() + bulletsOffset);
  bullets.css('left', prev.width() + bulletsOffset);
});
