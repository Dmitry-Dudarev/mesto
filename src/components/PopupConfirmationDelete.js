import { Popup } from "./Popup.js";

export class PopupConfirmationDelete extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector('.popup__card-delete');
    this._idOfCardForDelete = '';
  }

  open(data) {
    super.open();
    this._idOfCardForDelete = data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._idOfCardForDelete);
    });
  }
};
