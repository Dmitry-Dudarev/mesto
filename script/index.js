import { cards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";


// const userName = document.querySelector('.profile__username');
// const aboutUser = document.querySelector('.profile__aboutuser');
const profileEditButton = document.querySelector('.profile__editbutton');
// const profilePopup = document.querySelector('.profile-form');
// const cardCreator = document.querySelector('.card-creator');
const cardCreatorForm = document.querySelector('.card-creator__input');
// не все так просто! попап с формой один а формы две!
const profileForm = document.querySelector('.profile-form__input');
const userNameInput = document.querySelector('.profile-form__name');
const userCareerInput = document.querySelector('.profile-form__career');
//кнопка тут наверно не нужна будет, она в Popup
// const profilePopupCloseButton = document.querySelector('.profile-form__close-button');
// const cardCreatorCloseButton = document.querySelector('.card-creator__close-button');
// const cardName = document.querySelector('.card-creator__name');
// const cardLink = document.querySelector('.card-creator__link');
const addButton = document.querySelector('.profile__addbutton');
// ищется при создании карточек
// const elements = document.querySelector('.elements');
// const picture = document.querySelector('.popup_picture_opened');
// ищем в методе open PopupWithImage
// const pictureImage = document.querySelector('.popup__image');
// ищем в методе open PopupWithImage
// const pictureFigcaption = document.querySelector('.popup__figcaption');
// const pictureCloseButton = document.querySelector('.popup__close-button_picture_close');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassTemplate: '-error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
};

const userInfoSelectors = {
  userNameSelector: '.profile__username',
  userCareerSelector: '.profile__aboutuser',
};

const cardCreatorFormValidator = new FormValidator(validationConfig, cardCreatorForm);
cardCreatorFormValidator.enableValidation();

const profilePopupInputValidator = new FormValidator(validationConfig, profileForm);
profilePopupInputValidator.enableValidation();

profileEditButton.addEventListener('click', () => {
  const userData = UserInformation.getUserInfo();
  userNameInput.value = userData.name;
  userCareerInput.value = userData.career;
  PopupWithUserProfileInfo.open();
  profilePopupInputValidator.hideErrorMessagesAndCheckButtonState();
});

const submitPopupWithUserProfileInfo = (userData) => {
  UserInformation.setUserInfo(userData);
  PopupWithUserProfileInfo.close();
};

addButton.addEventListener('click', () => {
  PopupWithCardFormInfo.open();
  cardCreatorFormValidator.hideErrorMessagesAndCheckButtonState();
});

const submitPopupWithCardFormInfo = (cardData) => {
  const newCardInfo = {};
  newCardInfo.link = cardData.cardLink;
  newCardInfo.name = cardData.cardName;
  const newCard = addNewCard([newCardInfo]);
  newCard.renderItems();
  PopupWithCardFormInfo.close();
};

const addNewCard = (items) => {
  const newCardElement = new Section({
    items,
    renderer(item) {
      const card = new Card(item, '.cardTemplate', handleCardClick);
      const cardElement = card.getCardElement();
      cardList.addItem(cardElement);
    }
  }, '.elements');

  return newCardElement;
};

const handleCardClick = (data) => {
  imagePopup.open(data);
};

const PopupWithCardFormInfo = new PopupWithForm('.card-creator', submitPopupWithCardFormInfo);
PopupWithCardFormInfo.setEventListeners();

const PopupWithUserProfileInfo = new PopupWithForm('.profile-form', submitPopupWithUserProfileInfo);
PopupWithUserProfileInfo.setEventListeners();

const UserInformation = new UserInfo(userInfoSelectors);

const imagePopup = new PopupWithImage('.popup_picture_opened');
imagePopup.setEventListeners();

const cardList = addNewCard(cards);
cardList.renderItems();