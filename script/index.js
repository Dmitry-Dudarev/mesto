import { cards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const userName = document.querySelector('.profile__username');
const aboutUser = document.querySelector('.profile__aboutuser');
const profileEditButton = document.querySelector('.profile__editbutton');
const profilePopup = document.querySelector('.profile-form');
const cardCreator = document.querySelector('.card-creator');
const cardCreatorForm = document.querySelector('.card-creator__input');
const profileForm = document.querySelector('.profile-form__input');
const userNameInput = document.querySelector('.profile-form__name');
const userCareerInput = document.querySelector('.profile-form__career');
const profilePopupCloseButton = document.querySelector('.profile-form__close-button');
const cardCreatorCloseButton = document.querySelector('.card-creator__close-button');
const cardName = document.querySelector('.card-creator__name');
const cardLink = document.querySelector('.card-creator__link');
const addButton = document.querySelector('.profile__addbutton');
const elements = document.querySelector('.elements');
const picture = document.querySelector('.popup_picture_opened');
const pictureImage = document.querySelector('.popup__image');
const pictureFigcaption = document.querySelector('.popup__figcaption');
const pictureCloseButton = document.querySelector('.popup__close-button_picture_close');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassTemplate: '-error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputEventListenerAddedClass: 'popup__input_event-listener-added',
};

const cardCreatorFormValidator = new FormValidator(validationConfig, cardCreatorForm);
cardCreatorFormValidator.enableValidation();

const profilePopupInputValidator = new FormValidator(validationConfig, profileForm);
profilePopupInputValidator.enableValidation();

const checkEscape = (event) => {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};

const checkClickTarget = (event) => {
  if (event.target.closest('.popup_opened')) {
    const activePopup = event.target.closest('.popup_opened');
    const popupContainer = event.target.closest('.popup__container');
    closeTargetPopup(popupContainer, activePopup);
  };
};

const closeTargetPopup = (popupContainer, activePopup) => {
  if (popupContainer === null) {
    closePopup(activePopup);
  };
};

function openPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('click', checkClickTarget);
  document.addEventListener('keydown', checkEscape);
};

function closePopup(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('click', checkClickTarget);
  document.removeEventListener('keydown', checkEscape);
};

function addCard(data) {
  elements.prepend(new Card(data, '.cardTemplate', openPicture).getCardElement());
};

function openPicture(data) {
  openPopup(picture);
  pictureImage.src = data.src;
  pictureFigcaption.textContent = data.alt;
  pictureImage.alt = `На фото: ${data.alt}`;
};

cards.forEach((data) => {
  addCard(data);
});

profileEditButton.addEventListener('click', () => {
  userNameInput.value = userName.textContent;
  userCareerInput.value = aboutUser.textContent;
  openPopup(profilePopup);
  profilePopupInputValidator.enableValidation();
});

profilePopupCloseButton.addEventListener('click', () => {
  closePopup(profilePopup);
});

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  aboutUser.textContent = userCareerInput.value;
  closePopup(profilePopup);
});

addButton.addEventListener('click', () => {
  openPopup(cardCreator);
  cardCreatorForm.reset();
  cardCreatorFormValidator.enableValidation()
});

cardCreatorCloseButton.addEventListener('click', () => {
  closePopup(cardCreator);
});

cardCreatorForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = {};
  data.name = cardName.value;
  data.link = cardLink.value;
  addCard(data);
  closePopup(cardCreator);
});

pictureCloseButton.addEventListener('click', () => {
  closePopup(picture);
});