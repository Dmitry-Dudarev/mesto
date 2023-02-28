let userName = document.querySelector('.profile__username');
let aboutUser = document.querySelector('.profile__aboutuser');
const profileEditButton = document.querySelector('.profile__editbutton');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');
const savePopupButton = document.querySelector('.popup__save-button');
const profileForm = document.querySelector('.profile-form__input');
const saveProfileForm = document.querySelector('.profile-form__save-button');


const inputUserName = document.querySelector('.profile-form__input_name');
const inputUserCareer = document.querySelector('.profile-form__input_career');
const userNameInput = document.querySelector('.profile-form__input_name');

const userCareerInput = document.querySelector('.profile-form__input_career');

const cardName = document.querySelector('.card-creator__input_name');
const cardLink = document.querySelector('.card-creator__input_link');



const addButton = document.querySelector('.profile__addbutton');
const elements = document.querySelector('.elements');
const picture = document.querySelector('.picture');

profileEditButton.addEventListener('click', () => {
  userNameInput.value = userName.textContent;
  userCareerInput.value = aboutUser.textContent;
  userNameInput.placeholder = userName.textContent;
  userCareerInput.placeholder = aboutUser.textContent;
  togglePopup()
});

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

closePopupButton.addEventListener('click', () => {
  togglePopup();
});

saveProfileForm.addEventListener('submit', handleFormSubmit);
function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  aboutUser.textContent = userCareerInput.value;
  togglePopup();
  evt.preventDefault();
};


const cards = [
  {
    name: 'Волга',
    link: 'images/element__volga_fedor-shlyapnikov.jpg',
    alt: 'Фото реки Волги с вершины холма',
  },
  {
    name: 'Карелия',
    link: 'images/element__karelia_egor-myznik.jpg',
    alt: 'Фото леса в Карелии',
  },
  {
    name: 'Байкал',
    link: 'images/element__baykal_kir-simakov.jpg',
    alt: 'Фото зимнего Байкала на закате',
  },
  {
    name: 'Домбай',
    link: 'images/element__dombay_kirill-pershin.png',
    alt: 'Фото вершины Домбая',
  },
  {
    name: 'Гора Эльбрус',
    link: 'images/element__elbrus_kirill-pershin.png',
    alt: 'Фото горы Эльбрус на рассвете',
  },
  {
    name: 'Карачаево-Черкессия',
    link: 'images/element__karachaevsk_kirill-pershin.jpg',
    alt: 'Фото страринного здания в Карачаево-Черкессии',
  },
];

// создается комплект первых 6-ти карточек
cards.forEach(function (elem) {
  const cardTemplate = document.querySelector('.cardTemplate').content.cloneNode(true);
  cardTemplate.querySelector('.element__text').textContent = elem.name;
  cardTemplate.querySelector('.element__image').src = elem.link;
  cardTemplate.querySelector('.element__image').alt = elem.alt;
  cardTemplate.querySelector('.element__image').addEventListener('click', openPicture);
  cardTemplate.querySelector('.element__trash').addEventListener('click', deleteCard);
  cardTemplate.querySelector('.element__reaction').addEventListener('click', reactToACard);
  elements.prepend(cardTemplate);
});

formElement.addEventListener('submit', handleFormSubmit);
function handleFormSubmit(evt) {
  evt.preventDefault();
  if (popup.hasAttribute('data-profile')) {
    changeProfileData();
  } else {
    refreshCardsList();
    addNewCard();
  }
  togglePopup();
};

function changeProfileData() {
  userName.textContent = popupDesignation.value;
  profile.designationValue = popupDesignation.value;
  aboutUser.textContent = popupProperty.value;
  profile.propertyValue = popupProperty.value;
  popup.removeAttribute('data-profile');
};

function refreshCardsList() {
  const newObject = { name: popupDesignation.value, link: popupProperty.value };
  cards.unshift(newObject);
};

function addNewCard() {
  const cardTemplate = document.querySelector('.cardTemplate').content.cloneNode(true);
  cardTemplate.querySelector('.element__text').textContent = cards[0].name;
  cardTemplate.querySelector('.element__image').src = cards[0].link;
  cardTemplate.querySelector('.element__image').addEventListener('click', openPicture);
  cardTemplate.querySelector('.element__trash').addEventListener('click', deleteCard);
  cardTemplate.querySelector('.element__reaction').addEventListener('click', reactToACard);
  elements.prepend(cardTemplate);
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
};

function openPicture(evt) {
  const elem = evt.target.closest('.element')
  picture.classList.add('picture_opened');
  // добавляет адрес ссылки на изображение
  // в форму для вывода полноразмерного изображения (по клику на его карточку)
  document.querySelector('.picture__image').src = evt.target.src;
  // добавляет подпись к изображению
  const pictureText = elem.querySelector('.element__text').textContent;
  document.querySelector('.picture__figcaption').textContent = pictureText;
};

document.querySelector('.picture__close-button').addEventListener('click', () => {
  picture.classList.remove('picture_opened');
});

function reactToACard(evt) {
  evt.target.src = 'images/element__reaction_full.svg';
};