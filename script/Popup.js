export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    document.addEventListener('click', this._checkClickTarget);
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
  }

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
  }

  _closeTargetPopup = (popupContainer) => {
    if (popupContainer === null) {
      this.close();
    };
  }
};