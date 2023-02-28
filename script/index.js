let userName = document.querySelector('.profile__username');
let aboutUser = document.querySelector('.profile__aboutuser');
const profileEditButton = document.querySelector('.profile__editbutton');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');
const savePopupButton = document.querySelector('.popup__save-button');
const formElement = document.querySelector('.popup__input-userdata');
const popupTitle = document.querySelector('.popup__title');
const popupDesignation = document.querySelector('.popup__input_designation');
const popupProperty = document.querySelector('.popup__input_property');
const addButton = document.querySelector('.profile__addbutton');
const elements = document.querySelector('.elements');

// объекты, содержащие свойства, необходимые для создания 
// попапа редактирования профиля 
// или попапа добавленния новой карточки
const profile = {
    title: 'Редактировать профиль',
    designationPlaceholder: userName.textContent,
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

// функция заполнения текстовых узлов попапа 
// на основании данных объектов profile и card
function popupCreator (elem) {
  togglePopup();
  popupTitle.textContent = elem.title;
  popupDesignation.placeholder = elem.designationPlaceholder;
  popupProperty.placeholder = elem.propertyPlaceholder;
  popupDesignation.value = elem.designationValue;
  popupProperty.value = elem.propertyValue;
  savePopupButton.textContent = elem.button;
};

// функция срабатывает при клике 
// на кнопке редактирования данных профиля;
profileEditButton.addEventListener('click', () => {
    // добавляет пользовательский атрибут,
    // который укажет функции handleFormSubmit 
    // как поступить с введенными данными
  popup.setAttribute('data-profile','');
  popupCreator(profile);
});

// при вызове данной функции пользовательский атрибут не добавляется,
// так как в текущей версии страницы представлены
// всего два варианта попапа
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

const cards = [
  {
    name: 'Волга',
    link: 'images/element__volga_fedor-shlyapnikov.jpg',
    alt: 'Волга',
  },
  {
    name: 'Карелия',
    link: 'images/element__karelia_egor-myznik.jpg',
    alt: 'Карелия',
  },
  {
    name: 'Байкал',
    link: 'images/element__baykal_kir-simakov.jpg',
    alt: 'Байкал',
  },
  {
    name: 'Домбай',
    link: 'images/element__dombay_kirill-pershin.png',
    alt: 'Домбай',
  },
  {
    name: 'Гора Эльбрус',
    link: 'images/element__elbrus_kirill-pershin.png',
    alt: 'Гора Эльбрус',
  },
  {
    name: 'Карачаево-Черкесия',
    link: 'images/element__karachaevsk_kirill-pershin.jpg',
    alt: 'Карачаевск',
  },
];

// создается комплект первых 6-ти карточек
cards.forEach(function(elem) {
  const cardTemplate = document.querySelector('.cardTemplate').content.cloneNode(true);
  cardTemplate.querySelector('.element__text').textContent = elem.name;
  cardTemplate.querySelector('.element__image').src = elem.link;
  cardTemplate.querySelector('.element__image').alt = elem.alt;
  cardTemplate.querySelector('.element__trash').addEventListener('click', deleteCard);
  elements.prepend(cardTemplate);
});

// функция создания новой карточки
// шаблон берется из первого объекта массива cards
function addNewCard() {
  const cardTemplate = document.querySelector('.cardTemplate').content.cloneNode(true);
  cardTemplate.querySelector('.element__text').textContent = cards[0].name;
  cardTemplate.querySelector('.element__image').src = cards[0].link;
  cardTemplate.querySelector('.element__trash').addEventListener('click', deleteCard);
  elements.prepend(cardTemplate);
}

formElement.addEventListener('submit', handleFormSubmit);
function handleFormSubmit (evt) {
  evt.preventDefault();
  if (popup.hasAttribute('data-profile')) {
    userName.textContent = popupDesignation.value;
    profile.designationValue = popupDesignation.value;
    aboutUser.textContent = popupProperty.value;
    profile.propertyValue = popupProperty.value;
    popup.removeAttribute('data-profile');
  } else {
    const newObject = {name: popupDesignation.value, link: popupProperty.value};
    cards.unshift(newObject);
    addNewCard();
  }
  togglePopup();
};

function deleteCard (evt) {
  evt.target.closest('.element').remove();
}

