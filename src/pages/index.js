import './index.css';

import { API } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupConfirmationDelete } from '../components/PopupConfirmationDelete.js';

const api = new API({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '3fb74f60-bbfb-49c0-b967-274e86ae365f',
    'Content-Type': 'application/json'
  }
});

const profileEditButton = document.querySelector('.profile__editbutton');
const cardCreatorForm = document.querySelector('.card-creator__input');
const profileForm = document.querySelector('.profile-form__input');
const avatarForm = document.querySelector('.edit-avatar__input');
const userNameInput = document.querySelector('.profile-form__name');
const userCareerInput = document.querySelector('.profile-form__career');
const addButton = document.querySelector('.profile__addbutton');
const avatarEditButton = document.querySelector('.profile__avatar');
const profileFormSaveButton = document.querySelector('.profile-form__save-button');
const cardFormSaveButton = document.querySelector('.card-creator__save-button');
const avatarFormSaveButton = document.querySelector('.edit-avatar__save-button');

let userId = '';

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
  userAvatarSelector: '.profile__avatar',
};

const cardCreatorFormValidator = new FormValidator(validationConfig, cardCreatorForm);
cardCreatorFormValidator.enableValidation();

const profilePopupInputValidator = new FormValidator(validationConfig, profileForm);
profilePopupInputValidator.enableValidation();

const popupWithUserProfileInfoValidator = new FormValidator(validationConfig, avatarForm);
popupWithUserProfileInfoValidator.enableValidation();

profileEditButton.addEventListener('click', () => {
  const newUserDataFromForm = userInformation.getUserInfo();
  userNameInput.value = newUserDataFromForm.name;
  userCareerInput.value = newUserDataFromForm.career;
  popupWithUserProfileInfo.open();
  profilePopupInputValidator.hideErrorMessagesAndCheckButtonState();
});

async function submitPopupWithUserProfileInfo(newUserDataFromForm) {
  popupWithUserProfileInfo.popupLoadingInProgress(profileFormSaveButton, true);
  try {
    const userDataAfterPatching = await api.setInformationAboutUser(newUserDataFromForm);
    userDataAfterPatching.profileName = userDataAfterPatching.name;
    userDataAfterPatching.profileCareer = userDataAfterPatching.about;
    userInformation.setUserInfo(userDataAfterPatching);
    popupWithUserProfileInfo.close();
  } catch (err) {
    console.error(`Ошибка при редактировании данных пользователя: ${err}`)
  } finally {
    popupWithUserProfileInfo.popupLoadingInProgress(profileFormSaveButton, false, 'Сохранить')
  };
};

addButton.addEventListener('click', () => {
  popupWithCardFormInfo.open();
  cardCreatorFormValidator.hideErrorMessagesAndCheckButtonState();
});

async function submitPopupWithCardFormInfo(cardData) {
  popupWithCardFormInfo.popupLoadingInProgress(cardFormSaveButton, true);
  try {
    const newCardInfo = await api.createNewCardForServer(cardData);
    newCardElement.renderItems([newCardInfo]);
    popupWithCardFormInfo.close();
  } catch (err) {
    console.error(`Ошибка при рендеринге новой карточки: ${err}`)
  } finally {
    popupWithCardFormInfo.popupLoadingInProgress(cardFormSaveButton, false, 'Создать')
  };
};

avatarEditButton.addEventListener('click', () => {
  popupWithUserAvatarInfo.open();
  popupWithUserProfileInfoValidator.hideErrorMessagesAndCheckButtonState();
});

async function submitPopupWithUserAvatarInfo(link) {
  popupWithUserAvatarInfo.popupLoadingInProgress(avatarFormSaveButton, true);
  try {
    const newAvatarLink = await api.setNewUserAvatar(link.avatarLink);
    userInformation.setUserAvatar(newAvatarLink);
    popupWithUserAvatarInfo.close();
  } catch (err) {
    console.error(`Ошибка при обновлении аватара: ${err}`)
  } finally {
    popupWithUserAvatarInfo.popupLoadingInProgress(avatarFormSaveButton, false, 'Сохранить')
  };
};

const handleDeletePopupClick = (data, card) => {
  popupConfirmationDelete.open(data, card);
};

async function submitPopupConfirmationDelete(cardId, card) {
  try {
    const isCardDeletedFromServer = await api.deleteCardById(cardId);
    if (isCardDeletedFromServer.message === "Пост удалён") {
      card.removeCard();
      popupConfirmationDelete.close();
    }
  } catch (err) {
    console.error(`Ошибка при удалении карточки: ${err}`)
  };
};

const createCard = (item) => {
  const card = new Card(item, '.cardTemplate', handleCardClick, handleDeletePopupClick, getServerAnswerCardLikes, handleLikeClick, userId, handleDeleteCard);
  const cardElement = card.getCardElement();
  return cardElement;
};

const newCardElement = new Section({
  renderer(item) {
    const cardElement = createCard(item);
    newCardElement.addItem(cardElement);
  }
}, '.elements');

const handleCardClick = (data) => {
  imagePopup.open(data);
};

const popupWithUserAvatarInfo = new PopupWithForm('.edit-avatar', submitPopupWithUserAvatarInfo);
popupWithUserAvatarInfo.setEventListeners();

const popupConfirmationDelete = new PopupConfirmationDelete('.card-delete', submitPopupConfirmationDelete);
popupConfirmationDelete.setEventListeners();

const popupWithCardFormInfo = new PopupWithForm('.card-creator', submitPopupWithCardFormInfo);
popupWithCardFormInfo.setEventListeners();

const popupWithUserProfileInfo = new PopupWithForm('.profile-form', submitPopupWithUserProfileInfo);
popupWithUserProfileInfo.setEventListeners();

const userInformation = new UserInfo(userInfoSelectors);

const imagePopup = new PopupWithImage('.popup_picture_opened');
imagePopup.setEventListeners();

async function getServerAnswerCardLikes(cardId, typeOfMethod) {
  try {
    const serverAnswerCardLikes = await api.changeCardLikes(cardId, typeOfMethod);
    return serverAnswerCardLikes;
  } catch (err) {
    console.error(`Ошибка при получении данных о лайках ${err}`)
  };
};

const renderInitialCards = (cards) => {
  newCardElement.renderItems(cards);
};

const renderUserInformation = (userData) => {
  userInformation.setUserInfo(userData);
  userInformation.setUserAvatar(userData);
};

async function handleLikeClick(card, hasUserLike) {
  try {
    const cardId = card.getId();
    let newCardData = {};
    if (hasUserLike) {
      newCardData = await this._getServerAnswerCardLikes(cardId, 'DELETE');
    } else {
      newCardData = await this._getServerAnswerCardLikes(cardId, 'PUT');
    };
    card.renderNewLikes(newCardData)
  } catch (err) {
    console.error(`Ошибка при обновлении информации о лайках: ${err}`)
  };
};

Promise.all([
  api.getInformationAboutUser(),
  api.getInitialCards()
])
  .then(([informationAboutUser, initialCards]) => {
    informationAboutUser.profileName = informationAboutUser.name;
    informationAboutUser.profileCareer = informationAboutUser.about;
    userId = informationAboutUser._id;
    renderUserInformation(informationAboutUser);
    renderInitialCards(initialCards);
  })
  .catch((err) => {
    console.error(`При загрузке исходных данных произошла ошибка: ${err}`)
  });

  function handleDeleteCard (card) {
    card.deleteCard()
  }