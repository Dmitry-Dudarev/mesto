import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  // в конструктор надо передать элемент изображения 
  //данные которого будут в методе open заполняться в 
  //формы попапа
  constructor(selector) {
    super(selector);
    
  }

  open(data){
    super.open();
    // теперь нужны селекторы полей попапа с картинкой
    //чтобы по ним найти поля, а в эти поля вставить данные 
    //переданной картинки

    //вместо дата нужно имя переменной с фоткой
    const popupImage = this._popup.querySelector('.popup__image');
    popupImage.src = data.src;
    popupImage.alt = `На фото: ${data.alt}`;
    this._popup.querySelector('.popup__figcaption').textContent = data.alt; 
  }
  
}