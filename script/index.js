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
const picture = document.querySelector('.popup_picture_opened');
const pictureImage = document.querySelector('.popup__image');
const pictureFigcaption = document.querySelector('.popup__figcaption');
const pictureCloseButton = document.querySelector('.popup__close-button_picture_close');

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
  const data = {};
  data.name = cardName.value;
  data.link = cardLink.value;
  addCard(data);
  closePopup(cardCreator);
});

cards.forEach(function (data) {
  addCard(data);
});

function createCard(data) {
  const preCard = cardTemplate.cloneNode(true);
  const cardImage = preCard.querySelector('.element__image');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  preCard.querySelector('.element__text').textContent = data.name;
  preCard.querySelector('.element__trash').addEventListener('click', deleteCard);
  preCard.querySelector('.element__reaction').addEventListener('click', (evt) => reactToACard(evt.target));
  cardImage.addEventListener('click', (data) => openPicture(data.target));
  return preCard;
};

function addCard(data) {
  elements.prepend(createCard(data));
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


document.addEventListener('click', (evt) => {
  if (evt.target.closest('.popup_opened')) {
    const activePopup = evt.target.closest('.popup_opened');
    const popupContainer = evt.target.closest('.popup__container');
    checkClickTarget(popupContainer, activePopup);
  };
});

const checkClickTarget = (popupContainer, activePopup) => {
  if (popupContainer == null) {
    closePopup(activePopup);
  };
};