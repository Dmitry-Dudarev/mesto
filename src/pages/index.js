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