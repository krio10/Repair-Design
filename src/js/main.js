/*document.addEventListener("DOMContentLoaded", function(event) { 
  const modal = document.querySelector('.modal');
  const modalBtn = document.querySelectorAll('[data-toggle=modal]');
  const closeBtn = document.querySelector('.modal__close');
  const switchModal = () => {
    modal.classList.toggle('modal--visible');
  };

  modalBtn.forEach(element => {
    element.addEventListener('click', switchModal);
  });
  closeBtn.addEventListener('click', switchModal);

  // функция закрытия модального окна по клику мышью за его пределами
  window.onclick = function(event) {
    if (event.target == modal) {
      switchModal();
    }
  }

  // функция закрытия модального окна по нажатию на клавишу Escape
  document.onkeydown = function(event) {
    event = event || window.event;
    var isEscape = false;
    if ("key" in event) {
        isEscape = (event.key === "Escape" || event.key === "Esc");
    } else {
        isEscape = (event.keyCode === 27);
    }
    if (isEscape) {
      switchModal();
    }
  }
});
*/

$(document).ready(function () {
  var modal = $('.modal'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close'),
      backTop = $('.back-top')
      scrollUp = $('back-top__scroll-up');
  
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

  // функция плавного появления кнопки возврата вначало при прокрутке страницы вниз
// и плавного скрывания этой кнопки при прокрутке страницы вверх
  $(window).scroll(function (){
    if ($(this).scrollTop() > $(window).height()-150){
      backTop.fadeIn();
    } else {
      backTop.fadeOut();
    }
  });


  // Функция плавногй прокрутки страницы вверх при нажатии кнопки со стрелкой вверх
  scrollUp.click(function (){
    $("body,html").animate({
      scrollTop:0
    }, 5000);
    return false;
  });  
});
