const profileEditButton = document.querySelector('.profile__editbutton');
let userName = document.querySelector('.profile__username');
let aboutUser = document.querySelector('.profile__aboutuser');
const editPopup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');
const savePopupButton = document.querySelector('.popup__button');

let editUserName = document.querySelector('.popup__input-name');
editUserName.placeholder = userName.textContent
let editUserJob = document.querySelector('.popup__input-job');
editUserJob.placeholder = aboutUser.textContent

profileEditButton.addEventListener('click', (event) => {
  event.preventDefault();
  editPopup.classList.add('popup_opened');
});

closePopupButton.addEventListener('click', (event) => {
  event.preventDefault();
  editUserName.value = userName.textContent;
  editUserJob.value = aboutUser.textContent;
  editPopup.classList.remove('popup_opened');
});

savePopupButton.addEventListener('click', (event) => {
  event.preventDefault();
  userName.textContent = editUserName.value;
  aboutUser.textContent = editUserJob.value;
  editPopup.classList.remove('popup_opened');
});

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input-name');
let jobInput = formElement.querySelector('.popup__input-job');

function handleFormSubmit (evt) {
  evt.preventDefault();
  let submitName = nameInput.value;
  let submitJob = jobInput.value;
}
formElement.addEventListener('submit', handleFormSubmit); 