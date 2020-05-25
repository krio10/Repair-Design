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

  const projBulletsOffset = 22;
  projectsNext.css('left', projectsPrev.width() + projBulletsOffset + bullets.width() + projBulletsOffset);
  bullets.css('left', projectsPrev.width() + projBulletsOffset);

  var stepsNext = $('.steps-swiper-button-next');
  var stepsPrev = $('.steps-swiper-button-prev');
  var bullets = $('.steps-swiper-pagination');

  var stepBulletsOffset = 22;
  var buttonsWidth = 41;
  resizeBullets();
  $( window ).resize(function() {
    if ($(window).width() < 1276) {
      stepBulletsOffset = 3;
    }
    else {
      stepBulletsOffset = 22;
    }
    resizeBullets();
  });

  function resizeBullets() {
    stepsNext.css('left', stepsPrev.width() + stepBulletsOffset + bullets.width() + stepBulletsOffset);
    bullets.css('left', stepsPrev.width() + stepBulletsOffset);
  };

  var stepsLink = $('.steps__link');
  var stepLink = $('.step__link');
  var active = $('.active');
  var curStep = $('.cur-step');
  var index = 1;

  stepsLink.mouseenter(function() {
    $(this).toggleClass('pointer');
  });

  stepsLink.mouseleave(function() {
    $(this).toggleClass('pointer');
  });
  
  function setCountText(index) {
    curStep.text(index + '/6');
    if (stepsLink.hasClass('active')) { // Cleen active
      stepsLink.removeClass('active');
      stepsLink.children().removeClass('active');
    };
  };

  stepsLink.click(function() {
    index = $(this).attr('data-index');
    for (let i=0; i<2; i++) {
      stepsSwiper[i].slideTo(index, 400, false);
    }
    setCountText(index);
    $(this).addClass('active');
    $(this).children().addClass('active');
  });

  stepsNext.click(function() {
    if (index < 6) {
      index++;
    }
    else {
      index = 1
    }
    setCountText(index);
  });

  stepsPrev.click(function() {
    if (index > 1) {
      index--;
    }
    else {
      index = 6
    }
    setCountText(index);
  });  

  new WOW().init();
  var element = $('.card-pricetag');

    /* функция плавного появления кнопки возврата вначало при прокрутке страницы вниз и плавного скрывания этой кнопки при прокрутке страницы вверх и запуска анимации при появлении элемента на экране при прокручивании страницы */
    $(window).scroll(function (){
      if ($(this).scrollTop() > $(window).height()-150 && $(window).width() > 576) {
        backTop.fadeIn();
      } else {
        backTop.fadeOut();
      }

      var win = $(this);
      element.each(function (index, value) { 
        if ( win.scrollTop() >= $(this).offset().top-$(window).height()-150) {
        console.log('$(this).scrollTop()=' + win.scrollTop());
        console.log('$(this).offset().top=' + $(this).offset().top);
        $(this).css('animation-name', 'bouncing');
        $(this).css('animation-duration', '0.5s');
        $(this).css('animation-iteration-count', '3');
        $(this).css('animation-timing-function', 'linear');
        //$(this).css('animation-fill-mode', 'alternate-reverse');
      } else {
        $(this).css('animation-name', '');
        $(this).css('animation-duration', '');
        $(this).css('animation-iteration-count', '');
        $(this).css('animation-timing-function', '');
        //$(this).css('animation-fill-mode', '');
      }
    });
  });  
});
