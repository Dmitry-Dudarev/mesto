export class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleDeletePopupClick, getServerAnswerCardLikes, handleLikeClick, userId, handleDeleteCard) {
    this._handleDeleteCard = handleDeleteCard;
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardName = data.name;
    this._cardLink = data.link;
    this._handleCardClick = handleCardClick;
    this._handleDeletePopupClick = handleDeletePopupClick;
    this._userId = userId;
    this._cardId = data._id;
    this._data = data;
    this._getServerAnswerCardLikes = getServerAnswerCardLikes;
    this._handleLikeClick = handleLikeClick;
  }

  getCardElement() {
    this._cardElement = this._getCardTemplate();
    this._cardElementImage = this._cardElement.querySelector('.element__image');
    this._cardElementImage.src = this._cardLink;
    this._cardElementImage.alt = this._cardName;
    this._cardElement.querySelector('.element__text').textContent = this._cardName;
    this._checkOwner();
    this._setEventListeners(this._cardElement, this._cardElementImage);
    this._showLikes(this._cardElement);
    return this._cardElement;
  }

  _checkOwner() {
    if (this._userId === this._data.owner._id) {
      this._showDeleteIcon();
    } else {
      this._hideDeleteIcon();
    }
  }

  _hideDeleteIcon() {
    this._cardElement.querySelector('.element__trash').hidden = true;
  }

  _showDeleteIcon() {
    this._cardElement.querySelector('.element__trash').hidden = false;
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)
    return cardTemplate;
  }

  _setEventListeners(cardElement, cardElementImage) {
    cardElement.querySelector('.element__trash').addEventListener('click', (evt) => {
      this._confirmCardDeletion();
    });

    cardElement.querySelector('.element__reaction').addEventListener('click', (evt) => {
      this._clickOnReactionElement();
    });

    cardElementImage.addEventListener('click', () => {
      this._handleCardClick(cardElementImage);
    });
  }

  _confirmCardDeletion() {
    this._handleDeletePopupClick(this._cardId, this);
  }

  removeCard() {
    this._cardElement.remove();
  }

  getId() {
    return this._cardId
  }

  _showLikes() {
    const likesNumber = this._checkLikesNumber();
    const hasUserLike = this._checkUserLike();
    this._renderLikes(likesNumber, hasUserLike);
  }

  _checkLikesNumber() {
    return this._data.likes.length;
  }

  _checkUserLike() {
    return this._data.likes.some((element) => {
      return element._id === this._userId
    });
  }

  _renderLikes(likesNumber, hasUserLike) {
    this._cardElement.querySelector('.element__counter').textContent = likesNumber;
    if (hasUserLike) {
      this._cardElement.querySelector('.element__reaction').classList.add('element__reaction_like');
    } else {
      this._cardElement.querySelector('.element__reaction').classList.remove('element__reaction_like');
    }
  }

  _clickOnReactionElement(cardElement) {
    const hasUserLike = this._checkUserLike();
    this._handleLikeClick(this, hasUserLike, cardElement);
  }

  renderNewLikes(newCardData) {
    this._data = newCardData
    this._showLikes();
  }
};