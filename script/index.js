const userName = document.querySelector('.profile__username');
const aboutUser = document.querySelector('.profile__aboutuser');
const profileEditButton = document.querySelector('.profile__editbutton');
const popup = document.querySelector('.popup');
const cardTemplate = document.querySelector('.cardTemplate').content;
const savePopupButton = document.querySelector('.popup__save-button');
const profileForm = document.querySelector('.profile-form');
const cardCreator = document.querySelector('.card-creator');
const profileFormInput = document.querySelector('.profile-form__input');
const cardFormInput = document.querySelector('.card-creator__input');
const saveProfileForm = document.querySelector('.profile-form__save-button');
const userNameInput = document.querySelector('.profile-form__name');
const userCareerInput = document.querySelector('.profile-form__career');
const profileFormCloseButton = document.querySelector('.profile-form__close-button');
const cardCreatorCloseButton = document.querySelector('.card-creator__close-button');
const cardName = document.querySelector('.card-creator__name');
const cardLink = document.querySelector('.card-creator__link');
const addButton = document.querySelector('.profile__addbutton');
const elements = document.querySelector('.elements');
const picture = document.querySelector('.popup__picture');
const pictureImage = document.querySelector('.popup__image');
const pictureFigcaption = document.querySelector('.popup__figcaption');
const pictureCloseButton = document.querySelector('.picture__close-button');
const card = {};
let newCard;

function openPopup(elem) {
  elem.classList.add('popup_opened');
};

function closePopup(elem) {
  elem.classList.remove('popup_opened');
};

profileEditButton.addEventListener('click', () => {
  userNameInput.value = userName.textContent;
  userCareerInput.value = aboutUser.textContent;
  openPopup(profileForm);
});

profileFormCloseButton.addEventListener('click', () => {
  closePopup(profileForm);
});

profileFormInput.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  aboutUser.textContent = userCareerInput.value;
  closePopup(profileForm);
});

addButton.addEventListener('click', () => {
  openPopup(cardCreator);
});

cardCreatorCloseButton.addEventListener('click', () => {
  closePopup(cardCreator);
});

cardFormInput.addEventListener('submit', (evt) => {
  evt.preventDefault();
  card.name = cardName.value;
  card.link = cardLink.value;
  createCard(card);
  addCard ();
  closePopup(cardCreator);
});

cards.forEach(function (elem) {
  card.name = elem.name;
  card.link = elem.link;
  createCard(card);
  addCard ();
});

function createCard(elem) {
  const preCard = cardTemplate.cloneNode(true);
  preCard.querySelector('.element__text').textContent = elem.name;
  preCard.querySelector('.element__image').src = elem.link;
  preCard.querySelector('.element__image').alt = elem.name;
  preCard.querySelector('.element__image').addEventListener('click', (evt) => openPicture(evt.target));
  preCard.querySelector('.element__trash').addEventListener('click', deleteCard);
  preCard.querySelector('.element__reaction').addEventListener('click', (evt) => reactToACard(evt.target));
  newCard = preCard;
};

function addCard () {
  elements.prepend(newCard);
};

function deleteCard(evt) {
  evt.target.closest('.element').remove();
};

function openPicture(data) {
  openPopup(picture);
  pictureImage.src = data.src;
  pictureFigcaption.textContent = data.alt;
  pictureImage.alt = `На фото: ${data.alt}`;
};

pictureCloseButton.addEventListener('click', () => {
  closePopup(picture);
});

function reactToACard(reactionIcon) {
  reactionIcon.classList.toggle('element__reaction_like');
};