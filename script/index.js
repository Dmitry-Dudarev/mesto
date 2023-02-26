const profileEditButton = document.querySelector('.profile__editbutton');
let userName = document.querySelector('.profile__username');
let aboutUser = document.querySelector('.profile__aboutuser');
const editPopup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');
const savePopupButton = document.querySelector('.popup__save-button');
let formElement = document.querySelector('.popup__input-userdata');
let editUserName = document.querySelector('.popup__input_type_name');
// editUserName.placeholder = userName.textContent;
let editUserJob = document.querySelector('.popup__input_type_job');
// editUserJob.placeholder = aboutUser.textContent;

profileEditButton.addEventListener('click', () => {
  editUserName.placeholder = userName.textContent;
  editUserJob.placeholder = aboutUser.textContent;
  editPopup.setAttribute('profile','');
  document.querySelector('.popup__title').textContent = 'Редактировать профиль';
  editUserName.value = userName.textContent;
  editUserJob.value = aboutUser.textContent;
  editPopup.classList.add('popup_opened');
  savePopupButton.textContent = 'Сохранить';
});

closePopupButton.addEventListener('click', () => {
  editPopup.removeAttribute('profile');
  editPopup.classList.remove('popup_opened');
});

formElement.addEventListener('submit', handleFormSubmit);
function handleFormSubmit (evt) {
  evt.preventDefault();
  if (editPopup.hasAttribute('profile')) {
    userName.textContent = editUserName.value;
    aboutUser.textContent = editUserJob.value;
    editPopup.classList.remove('popup_opened');
    editPopup.removeAttribute('profile')
    editUserName.textContent = '';
    editUserJob.textContent = '';
  } else {
    editPopup.classList.remove('popup_opened');
    alert(`название карточки: ${editUserName.value};
           Ссылка на картинку: "${editUserJob.value}"`);
  }
}









const addButton = document.querySelector('.profile__addbutton');

addButton.addEventListener ('click', openAddCardForm);
function openAddCardForm () {
  editUserName.placeholder = 'Название';
  editUserJob.placeholder = 'Ссылка на картинку';
  editPopup.classList.add('popup_opened');
  document.querySelector('.popup__title').textContent = 'Новое место';
  editUserName.value = '';
  editUserJob.value = '';
  savePopupButton.textContent = 'Создать';

}

// const popupModels = [
//   {
//     title: 'Редактировать профиль',
//     designation,
//     property,
//     button: 'Сохранить',
//   },
//   {
//     title: 'Новое место',
//     designation: 'Название',
//     property: 'Ссылка на картинку',
//     button: 'Сохранить',
//   }
// ]