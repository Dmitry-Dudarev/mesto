const userName = document.querySelector('.profile__username');
const aboutUser = document.querySelector('.profile__aboutuser');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');
const savePopupButton = document.querySelector('.popup__save-button');
const formElement = document.querySelector('.popup__input-userdata');
const popupTitle = document.querySelector('.popup__title');
const popupDesignation = document.querySelector('.popup__input_designation');
const popupProperty = document.querySelector('.popup__input_property');
const profileEditButton = document.querySelector('.profile__editbutton');
const addButton = document.querySelector('.profile__addbutton');


const profile = {
    title: 'Редактировать профиль',
    designationPlaceholder: userName.textContentt,
    designationValue: userName.textContent,
    propertyPlaceholder: aboutUser.textContent,
    propertyValue: aboutUser.textContent,
    button: 'Сохранить',
};

const card = {
    title: 'Новое место',
    designationPlaceholder: 'Название',
    designationValue: '',
    propertyPlaceholder: 'Ссылка на картинку',
    propertyValue: '',
    button: 'Создать',
};


function popupCreator (elem) {
  togglePopup();
  popupTitle.textContent = elem.title;
  popupDesignation.placeholder = elem.designationPlaceholder;
  popupProperty.placeholder = elem.propertyPlaceholder;
  popupDesignation.value = elem.designationValue;
  popupProperty.value = elem.propertyValue;
  savePopupButton.textContent = elem.button;
};

profileEditButton.addEventListener('click', () => {
  popup.setAttribute('data-profile','');
  popupCreator(profile);
});

addButton.addEventListener ('click', () => {
  popupCreator(card);
});

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
};
