const profileEditButton = document.querySelector('.profile__editbutton');
let userName = document.querySelector('.profile__username');
let aboutUser = document.querySelector('.profile__aboutuser');
const editPopup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');
const savePopupButton = document.querySelector('.popup__save-button');
let formElement = document.querySelector('.popup__input-userdata');
let editUserName = document.querySelector('.popup__input_type_name');
editUserName.placeholder = userName.textContent
let editUserJob = document.querySelector('.popup__input_type_job');
editUserJob.placeholder = aboutUser.textContent

profileEditButton.addEventListener('click', () => {
  editUserName.value = userName.textContent;
  editUserJob.value = aboutUser.textContent;
  editPopup.classList.add('popup_opened');
});

closePopupButton.addEventListener('click', () => {
  editPopup.classList.remove('popup_opened');
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = editUserName.value;
  aboutUser.textContent = editUserJob.value;
  editPopup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit); 