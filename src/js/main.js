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
    }, 1000);
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

  function setCountText(index) {
    curStep.text(index + '/6');
    if (stepsLink.hasClass('active')) { // Clean active
      stepsLink.removeClass('active');
      stepsLink.children().removeClass('active');
    };
    stepsLink.each(function () { 
      if (index == $(this).attr('data-index')) {
        $(this).addClass('active');
        $(this).children().addClass('active');        
      }
    });    
  };

  stepsLink.click(function() {
    index = $(this).attr('data-index');
    for (let i=0; i<2; i++) {
      stepsSwiper[i].slideTo(index, 400, false);
    }
    setCountText(index);
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
  var sectionTitle = $('.section-title__heading');

  /* функция плавного появления кнопки возврата вначало при прокрутке страницы вниз и плавного скрывания этой кнопки при прокрутке страницы вверх и запуска анимации при появлении элемента на экране при прокручивании страницы */
  $(window).scroll(function (){
    if ($(this).scrollTop() > $(window).height()-150 && $(window).width() > 576) {
      backTop.fadeIn();
    } else {
      backTop.fadeOut();
    }

    var win = $(this);
    element.each(function (index, value) { 
      if ( win.scrollTop() >= $(this).offset().top-$(window).height()-200) {
        $(this).css('animation-name', 'bouncing');
        $(this).css('animation-duration', '0.5s');
        $(this).css('animation-iteration-count', '3');
        $(this).css('animation-timing-function', 'linear');
      } else {
        $(this).css('animation-name', '');
        $(this).css('animation-duration', '');
        $(this).css('animation-iteration-count', '');
        $(this).css('animation-timing-function', '');
      }
    });
    sectionTitle.each(function (index, value) { 
      if ( win.scrollTop() >= $(this).offset().top - $(window).height() - 200) {
        //console.log('--->top for title' + win.offset().top);
        //console.log('--->top for title' + $(this).offset().top);
        $(this).css('animation-name', 'fadeIn');
        $(this).css('animation-duration', '1s');
        $(this).css('animation-delay', '1s');
        $(this).css('animation-iteration-count', '2');        
        $(this).css('animation-timing-function', 'linear');
        $(this).css('animation-fill-mode', 'alternate-reverse');
      } else {
        $(this).css('animation-name', '');
        $(this).css('animation-duration', '');
        $(this).css('animation-delay', '');        
        $(this).css('animation-iteration-count', '');        
        $(this).css('animation-timing-function', '');
        $(this).css('animation-fill-mode', '');
      }
    });
  });

  // Валидация формы
  $('.modal__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // simple rule, converted to {required:true} строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: "required",
      policyCheckbox: "required",
      // compound rule правило-объект
      userEmail: {
        required: true,
        email: true
      }
    }, // Сообщения
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя должно быть не короче двух букв",
        maxlength: "Имя должно быть не более 15 букв"        
      },
      userPhone: "Заполните поле",
      policyCheckbox: "Требуется ваше согласие",      
      userEmail: {
        required: "Введите корректный email",
        email: "Введите в формате: name@domain.com"
      }
    },
    submitHandler: function(form) {
      form.submit();
    },
    errorPlacement: function(error, element) {
      if (element.attr("type") == "checkbox") {
        return element.next('label').append(error);
      }
      error.insertAfter($(element));
    }    
  });

  $('.control__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // simple rule, converted to {required:true} строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: "required",
      policyCheckbox: "required",      
      // compound rule правило-объект
      userEmail: {
        required: true,
        email: true
      }
    }, // Сообщения
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв"        
      },
      userPhone: "Заполните поле",
      policyCheckbox: "Требуется ваше согласие",      
      userEmail: {
        required: "Введите корректный email",
        email: "Введите в формате: name@domain.com"
      }
    },
    errorPlacement: function(error, element) {
      if (element.attr("type") == "checkbox") {
        return element.next('label').append(error);
      }
      error.insertAfter($(element));
    }    
  });
  $('.footer__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // simple rule, converted to {required:true} строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userQuestion: "required",
      userPhone: "required",
      policyCheckbox: "required",      
      // compound rule правило-объект
      userEmail: {
        required: true,
        email: true
      }
    }, // Сообщения
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв"        
      },
      userQuestion: "Заполните поле",
      policyCheckbox: "Требуется ваше согласие",
      userPhone: "Заполните поле",
      userEmail: {
        required: "Введите корректный email",
        email: "Введите в формате: name@domain.com"
      }
    },
    errorPlacement: function(error, element) {
      if (element.attr("type") == "checkbox") {
        return element.next('label').append(error);
      }
      error.insertAfter($(element));
    }    
  });

  // маска для номера телефона
  $('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "+7 (___) ___-__-__"});
  
});
