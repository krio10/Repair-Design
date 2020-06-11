$(document).ready(function () {
  var modal = $('.modal'),
      modalMsg = $('.modal-msg'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close'),
      closeMsgBtn = $('.modal-msg__close'),
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

  modalMsg.hide();
  closeMsgBtn.on('click', function () {
    modalMsg.hide();
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
  var rules = {
    // simple rule, converted to {required:true} строчное правило
    userName: {
      required: true,
      minlength: 2,
      maxlength: 15
    },
    userPhone: {
      required: true,
      minlength: 17,
      maxlength: 17
    },
    policyCheckbox: "required",
    controlPolicyCheckbox: "required",
    footerPolicyCheckbox: "required",
    userQuestion: "required",
    // compound rule правило-объект
    userEmail: {
      required: true,
      email: true
    }
  };
   // Сообщения
  var messages = {
    userName: {
      required: "Заполните поле",
      minlength: "Имя должно быть не короче 2 букв",
      maxlength: "Имя должно быть не более 15 букв"        
    },
    userPhone: {
      required: "Заполните поле",
      minlength: "Введите полный номер телефона",
      maxlength: "Введите полный номер телефона"        
    },
    policyCheckbox: "Требуется ваше согласие",
    controlPolicyCheckbox: "Требуется ваше согласие",
    footerPolicyCheckbox: "Требуется ваше согласие",    
    userQuestion: "Заполните поле",      
    userEmail: {
      required: "Заполните поле",
      email: "Введите корректный email"
    }
  },
  /*
  errorPlacement: function(error, element) {
    if (element.attr("type") == "checkbox") {
      return element.next('label').append(error);
    }
    error.insertAfter($(element));
  },*/ 
 submitHandler = function (form) {
    $.ajax({
      type: "POST",
      url: "send.php",
      data: $(form).serialize(),
      success: function (response) {
       // console.log('Ajax сработал. Ответ сервера ' + response);
       // alert('Форма отправлена. Мы свяжемся с вами через 10 минут.');
        $(form)[0].reset();
        modal.hide();
        modalMsg.show()
      }
    });
  };

  var validateObject = {
    errorClass: "invalid",
    errorElement: "div",
    rules,
    messages,
    submitHandler
  };

  $('.modal__form').validate(validateObject);
  $('.control__form').validate(validateObject);
  $('.footer__form').validate(validateObject);

  // маска для номера телефона
  $('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "Ваш номер телефона:"});
  
  // создание карты
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
          center: [47.259879, 39.720168],
          zoom: 9
        },
        {
          searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Офис №345',
          balloonContent: 'Вход со двора'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/pin.svg',
            // Размеры метки.
            iconImageSize: [32, 32],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        });
    myMap.geoObjects
        .add(myPlacemark);
  });
});
