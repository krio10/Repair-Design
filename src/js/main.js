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
  var mySwiper = new Swiper ('.projects-swiper', {
    loop: true,
    pagination: {
      el: '.projects-swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.projects-swiper-button-next',
      prevEl: '.projects-swiper-button-prev',
    },
  });

  //initialize swiper when document ready
  var stepsSwiper = new Swiper ('.steps-swiper', {
    loop: true,
    pagination: {
      el: '.steps-swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.steps-swiper-button-next',
      prevEl: '.steps-swiper-button-prev',
    },
  });

  var projectsNext = $('.projects-swiper-button-next');
  var projectsPrev = $('.projects-swiper-button-prev');
  var bullets = $('.projects-swiper-pagination');

  const bulletsOffset = 24;
  projectsNext.css('left', projectsPrev.width() + bulletsOffset + bullets.width() + bulletsOffset);
  bullets.css('left', projectsPrev.width() + bulletsOffset);

  var stepsNext = $('.steps-swiper-button-next');
  var stepsPrev = $('.steps-swiper-button-prev');
  var bullets = $('.steps-swiper-pagination');

  stepsNext.css('left', stepsPrev.width() + bulletsOffset + bullets.width() + bulletsOffset);
  bullets.css('left', stepsPrev.width() + bulletsOffset);

  var stepsLink = $('.steps__link');
  var active = $('.active');
  var curStep = $('.cur-step');

  stepsLink.click(function() {
    index = $(this).attr('data-index');
    for (let i=0; i<2; i++) {
      stepsSwiper[i].slideTo(index, 400, false);
    }
    if (stepsLink.hasClass('active')) {
      stepsLink.removeClass('active');
      stepsLink.children().removeClass('active');
    }
    $(this).addClass('active');
    $(this).children().addClass('active');
    if (curStep.attr('data-current') == index) {
      curStep.text(index + '/6');
    }
  });
});
