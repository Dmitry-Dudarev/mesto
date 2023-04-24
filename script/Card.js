export class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardName = data.name;
    this._cardLink = data.link;
    this._handleCardClick = handleCardClick;
    this._data = data;
  }

  getCardElement() {
    this._cardElement = this._getCardTemplate();
    this._cardElementImage = this._cardElement.querySelector('.element__image');
    this._cardElementImage.src = this._cardLink;
    this._cardElementImage.alt = this._cardName;
    this._cardElement.querySelector('.element__text').textContent = this._cardName;
    this._setEventListeners(this._cardElement, this._cardElementImage);
    return this._cardElement
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._cardTemplateSelector)
      .content
      .cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners(cardElement, cardElementImage) {
    cardElement.querySelector('.element__trash').addEventListener('click', (evt) => {
      this._deleteCard(evt.target)
    });

    cardElement.querySelector('.element__reaction').addEventListener('click', (evt) => {
      this._toggleLike(evt.target)
    });

    cardElementImage.addEventListener('click', () => {
      this._handleCardClick(cardElementImage);
    });
  }

  _toggleLike(likeIcon) {
    likeIcon.classList.toggle('element__reaction_like');
  }

  _deleteCard(elem) {
    elem.closest('.element').remove();
  }
};