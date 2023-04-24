import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    // handleSubmitForm это должен быть колбэк сабмита формы
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  
  close() {
    super.close();
    this._popupForm.reset();
  }


  // собираем данные всех полей формы
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    //добавить обработчик сабмита формы

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._data = this._getInputValues();
      this._handleSubmitForm(this._data);

    })
  }
}