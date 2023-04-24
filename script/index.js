import { cards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";



const userName = document.querySelector('.profile__username');
const aboutUser = document.querySelector('.profile__aboutuser');
const profileEditButton = document.querySelector('.profile__editbutton');
const profilePopup = document.querySelector('.profile-form');
const cardCreator = document.querySelector('.card-creator');
const cardCreatorForm = document.querySelector('.card-creator__input');
// не все так просто! попап с формой один а формы две!
const profileForm = document.querySelector('.profile-form__input');
const userNameInput = document.querySelector('.profile-form__name');
const userCareerInput = document.querySelector('.profile-form__career');
//кнопка тут наверно не нужна будет, она в Popup
const profilePopupCloseButton = document.querySelector('.profile-form__close-button');
const cardCreatorCloseButton = document.querySelector('.card-creator__close-button');
const cardName = document.querySelector('.card-creator__name');
const cardLink = document.querySelector('.card-creator__link');
const addButton = document.querySelector('.profile__addbutton');
// ищется при создании карточек
const elements = document.querySelector('.elements');
const picture = document.querySelector('.popup_picture_opened');
// ищем в методе open PopupWithImage
const pictureImage = document.querySelector('.popup__image');
// ищем в методе open PopupWithImage
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
};

const userInfoSelectors = {
  userNameSelector: '.profile__username',
  userCareerSelector: '.profile__aboutuser',
};


// let a = new PopupWithForm('.profile-form', 'f');





const cardCreatorFormValidator = new FormValidator(validationConfig, cardCreatorForm);
cardCreatorFormValidator.enableValidation();

const profilePopupInputValidator = new FormValidator(validationConfig, profileForm);
profilePopupInputValidator.enableValidation();

// const checkEscape = (event) => {
//   if (event.key === 'Escape') {
//     closePopup(document.querySelector('.popup_opened'));
//   };
// };

// const checkClickTarget = (event) => {
//   if (event.target.closest('.popup_opened')) {
//     const activePopup = event.target.closest('.popup_opened');
//     const popupContainer = event.target.closest('.popup__container');
//     closeTargetPopup(popupContainer, activePopup);
//   };
// };

// const closeTargetPopup = (popupContainer, activePopup) => {
//   if (popupContainer === null) {
//     closePopup(activePopup);
//   };
// };

// function openPopup(elem) {
//   elem.classList.add('popup_opened');
//   document.addEventListener('click', checkClickTarget);
//   document.addEventListener('keydown', checkEscape);
// };

// function closePopup(elem) {
//   elem.classList.remove('popup_opened');
//   document.removeEventListener('click', checkClickTarget);
//   document.removeEventListener('keydown', checkEscape);
// };

//работает в секции Section
// function addCard(data) {
//   elements.prepend(new Card(data, '.cardTemplate', openPicture).getCardElement());
// };

// можно добавить в Cards??
//Нет, эта функция нужна для открытия большой картинки. 
//У нас для этого будет отдельный подкласс попапа

//handleCardClick - эту функцию надо добавить в card
//а мы уже и передаем такую функцию!
// function openPicture(data) {
//   openPopup(picture);
//   pictureImage.src = data.src;
//   pictureFigcaption.textContent = data.alt;
//   pictureImage.alt = `На фото: ${data.alt}`;
// };

// работает в секции Section
// cards.forEach((data) => {
//   addCard(data);
// });

profileEditButton.addEventListener('click', () => {
  const userData = UserInformation.getUserInfo();
  // PopupWithUserProfileInfo.open();
  userNameInput.value = userData.name;
  userCareerInput.value = userData.career;
  PopupWithUserProfileInfo.open();

  // userNameInput.value = userName.textContent;
  // userCareerInput.value = aboutUser.textContent;
  // openPopup(profilePopup);
  profilePopupInputValidator.hideErrorMessagesAndCheckButtonState();
});

// profilePopupCloseButton.addEventListener('click', () => {
//   closePopup(profilePopup);
// });

// profileForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   userName.textContent = userNameInput.value;
//   aboutUser.textContent = userCareerInput.value;
//   closePopup(profilePopup);
// });


const submitPopupWithUserProfileInfo = (userData) => {



  UserInformation.setUserInfo(userData);


  PopupWithUserProfileInfo.close();
};





addButton.addEventListener('click', () => {
  PopupWithCardFormInfo.open();
  // openPopup(cardCreator);

  // cardCreatorForm.reset();
  cardCreatorFormValidator.hideErrorMessagesAndCheckButtonState();
});

// cardCreatorCloseButton.addEventListener('click', () => {
//   closePopup(cardCreator);
// });

// cardCreatorForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const data = {};
//   data.name = cardName.value;
//   data.link = cardLink.value;
//   addCard(data);
//   closePopup(cardCreator);
// });

// pictureCloseButton.addEventListener('click', () => {
//   closePopup(picture);
// });


// nuvo

// const cardList = new Section({
//   items: cards,
//   renderer(item){
//     const card = new Card(item, '.cardTemplate', openPicture);
//     const cardElement = card.getCardElement();
//     cardList.addItem(cardElement);
//   } 
// }, '.elements');
// cardList.renderItems()


const handleCardClick = (data) => {
  imagePopup.open(data);

  //а этот код мы описали в методе open подкласса pwimage
  // pictureImage.src = data.src;
  // pictureFigcaption.textContent = data.alt;
  // pictureImage.alt = `На фото: ${data.alt}`;
}



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

const cardList = addNewCard(cards);
cardList.renderItems();


const submitPopupWithCardFormInfo = (cardData) => {
  const newCardInfo = {};
  newCardInfo.link = cardData.cardLink;
  newCardInfo.name = cardData.cardName;
  const newCard = addNewCard([newCardInfo]);
  newCard.renderItems();
  PopupWithCardFormInfo.close();
}



const PopupWithCardFormInfo = new PopupWithForm('.card-creator', submitPopupWithCardFormInfo);
PopupWithCardFormInfo.setEventListeners();

const PopupWithUserProfileInfo = new PopupWithForm('.profile-form', submitPopupWithUserProfileInfo);
PopupWithUserProfileInfo.setEventListeners();

const UserInformation = new UserInfo(userInfoSelectors);

const imagePopup = new PopupWithImage('.popup_picture_opened');
imagePopup.setEventListeners();

