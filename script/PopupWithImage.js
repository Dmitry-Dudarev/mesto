import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(data) {
    super.open();
    const popupImage = this._popup.querySelector('.popup__image');
    popupImage.src = data.src;
    popupImage.alt = `На фото: ${data.alt}`;
    this._popup.querySelector('.popup__figcaption').textContent = data.alt;
  }
};