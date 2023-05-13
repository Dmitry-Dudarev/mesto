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
const avatarLinkInput = document.querySelector('.edit-avatar__link');
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

const loadingInProgress = (button, isLoading, basicWord) => {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = basicWord;
  }
};

profileEditButton.addEventListener('click', () => {
  const newUserDataFromForm = userInformation.getUserInfo();
  userNameInput.value = newUserDataFromForm.name;
  userCareerInput.value = newUserDataFromForm.career;
  popupWithUserProfileInfo.open();
  profilePopupInputValidator.hideErrorMessagesAndCheckButtonState();
});

async function submitPopupWithUserProfileInfo(newUserDataFromForm) {
  loadingInProgress(profileFormSaveButton, true);
  try {
    const userDataAfterPatching = await api.setInformationAboutUser(newUserDataFromForm);
    userDataAfterPatching.profileName = userDataAfterPatching.name;
    userDataAfterPatching.profileCareer = userDataAfterPatching.about;
    userInformation.setUserInfo(userDataAfterPatching);
  } catch (err) {
    console.error(`Ошибка при редактировании данных пользователя: ${err}`)
  } finally {
    loadingInProgress(profileFormSaveButton, false, 'Сохранить')
  }
  popupWithUserProfileInfo.close();
};

addButton.addEventListener('click', () => {
  popupWithCardFormInfo.open();
  cardCreatorFormValidator.hideErrorMessagesAndCheckButtonState();
});

async function submitPopupWithCardFormInfo(cardData) {
  loadingInProgress(cardFormSaveButton, true);
  try {
    const newCardInfo = await api.createNewCardForServer(cardData);
    newCardElement.renderItems([newCardInfo]);
  } catch (err) {
    console.error(`Ошибка при рендеринге новой карточки: ${err}`)
  } finally {
    loadingInProgress(cardFormSaveButton, false, 'Создать')
  }
  popupWithCardFormInfo.close();
};

avatarEditButton.addEventListener('click', () => {
  avatarLinkInput.value = userInformation.getUserAvatar();
  popupWithUserAvatarInfo.open();
  popupWithUserProfileInfoValidator.hideErrorMessagesAndCheckButtonState();
});

async function submitPopupWithUserAvatarInfo(link) {
  loadingInProgress(avatarFormSaveButton, true);
  try {
    const newAvatarLink = await api.setNewUserAvatar(link.avatarLink);
    userInformation.setUserAvatar(newAvatarLink);
  } catch (err) {
    console.error(`Ошибка при обновлении аватара: ${err}`)
  } finally {
    loadingInProgress(avatarFormSaveButton, false, 'Сохранить')
  }
  popupWithUserAvatarInfo.close();
};

const handleDeletePopupClick = (data) => {
  popupConfirmationDelete.open(data);
};

async function submitPopupConfirmationDelete(cardId) {
  try {
    const isCardDeletedFromServer = await api.deleteCardById(cardId);
    if (isCardDeletedFromServer) {
      document.getElementById(cardId).remove();
    }
  } catch (err) {
    console.error(`Ошибка при удалении карточки: ${err}`)
  };
  popupConfirmationDelete.close();
};

const createCard = (item) => {
  const card = new Card(item, '.cardTemplate', handleCardClick, handleDeletePopupClick, getServerAnswerCardLikes, userId);
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

async function renderInitialCards() {
  try {
    const cards = await api.getInitialCards();
    newCardElement.renderItems(cards);
  } catch (err) {
    console.error(`При загрузке исходных карточек произошла ошибка: ${err}`)
  };
};

async function getInfoAboutUserFromServer() {
  try {
    const informationAboutUser = await api.getInformationAboutUser();
    informationAboutUser.profileName = informationAboutUser.name;
    informationAboutUser.profileCareer = informationAboutUser.about;
    return informationAboutUser
  } catch (err) {
    console.error(`При загрузке данных пользователя произошла ошибка: ${err}`);
  };
};

async function renderUserInformation() {
  const userData = await getInfoAboutUserFromServer();
  userInformation.setUserInfo(userData);
  userInformation.setUserAvatar(userData);
};

async function getServerAnswerCardLikes(cardId, typeOfMethod) {
  try {
    const serverAnswerCardLikes = await api.changeCardLikes(cardId, typeOfMethod);
    return serverAnswerCardLikes;
  } catch (err) {
    console.error(`Ошибка при получении данных о лайках ${err}`)
  };
};

document.addEventListener("DOMContentLoaded", () => {
  renderUserInformation();
});

(async () => {
  try {
    userId = await api.getUserId()
  } catch (err) {
    console.error(`При пролучении id рользователя произошла ошибка ${err}`)
  };
  renderInitialCards(userId);
})();