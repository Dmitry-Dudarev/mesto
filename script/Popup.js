export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }


  open() {
    this._popup.classList.add('popup_opened');
  };

  close() {
    this._popup.classList.remove('popup_opened');
    //чтобы слушатели гарантированно удалялись
    // this._removeEventListeners();
  };
//   ~~~ Эти методы вызывать вручную! при нажатии на кнопку?
// Но тогда как удалять слушатель события, который будет навешиваться
//на попап с картинкой?
  setEventListeners() {
    document.addEventListener('click', this._checkClickTarget);
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
  }

//мы слушатель один раз навесили, больше не навешиваем, так может и нет смысла их удалять?

  // _removeEventListeners() {
  //   document.removeEventListener('click', this._checkClickTarget);
  //   document.removeEventListener('keydown', this._handleEscClose.bind(this));
  // }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
    
      this.close();
    }
  }

  _checkClickTarget = (event) => {
    if (event.target.closest('.popup_opened')) {
      const popupContainer = event.target.closest('.popup__container');
      this._closeTargetPopup(popupContainer);
    };
  };
  
  _closeTargetPopup = (popupContainer) => {
    if (popupContainer === null) {
      this.close();
    };
  };



  //универсальный код закрытия попапа.
  //добавлено опционально, так как часто дублируется код закрытия попапа
  // не пойдет. Например ресет формы не получится добавить в дочерних классах

  // _closePopup(){
  //   this._popup.classList.remove('popup_opened');
  // }
}