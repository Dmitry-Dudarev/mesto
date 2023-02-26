const profileEditButton = document.querySelector('.profile__editbutton');
let userName = document.querySelector('.profile__username');
let aboutUser = document.querySelector('.profile__aboutuser');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');
const savePopupButton = document.querySelector('.popup__save-button');
let formElement = document.querySelector('.popup__input-userdata');
const popupTitle = document.querySelector('.popup__title');
const popupDesignation = document.querySelector('.popup__input_designation');
const popupProperty = document.querySelector('.popup__input_property');
const addButton = document.querySelector('.profile__addbutton');


const profile = {
    title: 'Редактировать профиль',
    button: 'Сохранить',
};

const card = {
    title: 'Новое место',
    designation: 'Название',
    property: 'Ссылка на картинку',
    button: 'Сохранить',
};

// profileEditButton.addEventListener('click', () => {
//   popup.setAttribute('data-profile',''); - 
//   popup.classList.add('popup_opened'); - 
//   popupDesignation.placeholder = userName.textContent;
//   popupProperty.placeholder = aboutUser.textContent;
//   document.querySelector('.popup__title').textContent = 'Редактировать профиль';
//   popupDesignation.value = userName.textContent;
//   editUserJob.value = aboutUser.textContent;
//   savePopupButton.textContent = 'Сохранить';
// });


profileEditButton.addEventListener('click', editProfile);

function editProfile () {
  popup.setAttribute('data-profile','');
  togglePopup();
  createProfileEditor();
}

function createProfileEditor () {
  popupDesignation.placeholder = userName.textContent;
  popupProperty.placeholder = aboutUser.textContent;
  popupTitle.textContent = profile.title;
  popupDesignation.value = userName.textContent;
  popupProperty.value = aboutUser.textContent;
  savePopupButton.textContent = profile.button;
}

function togglePopup () {
  popup.classList.toggle('popup_opened');
}

closePopupButton.addEventListener('click', () => {
  popup.removeAttribute('data-profile');
  togglePopup();
});

formElement.addEventListener('submit', handleFormSubmit);
function handleFormSubmit (evt) {
  evt.preventDefault();
  if (popup.hasAttribute('data-profile')) {
    userName.textContent = popupDesignation.value;
    aboutUser.textContent = popupProperty.value;
    popup.removeAttribute('data-profile');
    togglePopup();

  } else {
    popup.classList.remove('popup_opened');
    alert(`название карточки: ${popupDesignation.value};
           Ссылка на картинку: "${popupProperty.value}"`);
  }
}


addButton.addEventListener ('click', openAddCardForm);
function openAddCardForm () {
  popupDesignation.placeholder = 'Название';
  popupProperty.placeholder = 'Ссылка на картинку';
  popup.classList.add('popup_opened');
  document.querySelector('.popup__title').textContent = 'Новое место';
  popupDesignation.value = '';
  popupProperty.value = '';
  savePopupButton.textContent = 'Создать';

}

