export class Card {
  constructor(data, cardTemplateSelector, openPicture) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardName = data.name;
    this._cardLink = data.link;
    this._openPicture = openPicture;
    this._data = data;
  }

  _getCardTemplate(){
    const cardTemplate = document
    .querySelector(this._cardTemplateSelector)
    .content
    .cloneNode(true);
    return cardTemplate;
  }

  getCardElement(){
    this._cardElement = this._getCardTemplate();
    this._cardElementImage = this._cardElement.querySelector('.element__image');
    // this._cardElementImage.addEventListener('click', () =>{
    //   this._openPicture(this._cardElementImage)});
    this._cardElementImage.src = this._cardLink;
    this._cardElementImage.alt = this._cardName;
    this._cardElement.querySelector('.element__text').textContent = this._cardName;
    // this._cardElement.querySelector('.element__trash').addEventListener('click', (evt) => {
    //   this._deleteCard(evt.target)});
    // this._cardElement.querySelector('.element__reaction').addEventListener('click', (evt) => {
    //   this._toggleLike(evt.target)});


      this._setEventListeners(this._cardElement, this._cardElementImage);



    return this._cardElement
  }
  
  _toggleLike(likeIcon) {
    likeIcon.classList.toggle('element__reaction_like');
  }

  _deleteCard(elem){
    elem.closest('.element').remove();
  }



  _setEventListeners(cardElement, cardElementImage) {
    cardElement.querySelector('.element__trash').addEventListener('click', (evt) => {
      this._deleteCard(evt.target)});

    cardElement.querySelector('.element__reaction').addEventListener('click', (evt) => {
      this._toggleLike(evt.target)});

    cardElementImage.addEventListener('click', () =>{
      this._openPicture(cardElementImage)});


  }



};