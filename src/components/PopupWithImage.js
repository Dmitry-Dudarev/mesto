import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
  }

  open(data) {
    super.open();
    this._popupImage.src = data.src;
    this._popupImage.alt = `На фото: ${data.alt}`;
    this._popupFigcaption.textContent = data.alt;
  }
};