import './index.css';
import { cards } from "../components/cards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const profileEditButton = document.querySelector('.profile__editbutton');
const cardCreatorForm = document.querySelector('.card-creator__input');
const profileForm = document.querySelector('.profile-form__input');
const userNameInput = document.querySelector('.profile-form__name');
const userCareerInput = document.querySelector('.profile-form__career');
const addButton = document.querySelector('.profile__addbutton');

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
  const userData = userInformation.getUserInfo();
  userNameInput.value = userData.name;
  userCareerInput.value = userData.career;
  popupWithUserProfileInfo.open();
  profilePopupInputValidator.hideErrorMessagesAndCheckButtonState();
});

const submitPopupWithUserProfileInfo = (userData) => {
  userInformation.setUserInfo(userData);
  popupWithUserProfileInfo.close();
};

addButton.addEventListener('click', () => {
  popupWithCardFormInfo.open();
  cardCreatorFormValidator.hideErrorMessagesAndCheckButtonState();
});

const submitPopupWithCardFormInfo = (cardData) => {
  const newCardInfo = {};
  newCardInfo.link = cardData.cardLink;
  newCardInfo.name = cardData.cardName;
  const newCard = addNewCard([newCardInfo]);
  newCard.renderItems();
  popupWithCardFormInfo.close();
};

const createCard = (item) => {
  const card = new Card(item, '.cardTemplate', handleCardClick);
  const cardElement = card.getCardElement();
  return cardElement;
};

const addNewCard = (items) => {
  const newCardElement = new Section({
    items,
    renderer(item) {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    }
  }, '.elements');

  return newCardElement;
};

const handleCardClick = (data) => {
  imagePopup.open(data);
};

const popupWithCardFormInfo = new PopupWithForm('.card-creator', submitPopupWithCardFormInfo);
popupWithCardFormInfo.setEventListeners();

const popupWithUserProfileInfo = new PopupWithForm('.profile-form', submitPopupWithUserProfileInfo);
popupWithUserProfileInfo.setEventListeners();

const userInformation = new UserInfo(userInfoSelectors);

const imagePopup = new PopupWithImage('.popup_picture_opened');
imagePopup.setEventListeners();

const cardList = addNewCard(cards);
cardList.renderItems();