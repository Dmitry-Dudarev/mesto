const userName = document.querySelector('.profile__username');
const aboutUser = document.querySelector('.profile__aboutuser');
const profileEditButton = document.querySelector('.profile__editbutton');
const popup = document.querySelector('.popup');
const savePopupButton = document.querySelector('.popup__save-button');
const profileForm = document.querySelector('.profile-form__input');
const cardForm = document.querySelector('.card-creator__input');
const saveProfileForm = document.querySelector('.profile-form__save-button');
const userNameInput = document.querySelector('.profile-form__name');
const userCareerInput = document.querySelector('.profile-form__career');
const profileFormCloseButton = document.querySelector('.profile-form__close-button');
const cardCreatorCloseButton = document.querySelector('.card-creator__close-button');
const cardName = document.querySelector('.card-creator__name');
const cardLink = document.querySelector('.card-creator__link');
const addButton = document.querySelector('.profile__addbutton');
const elements = document.querySelector('.elements');
const picture = document.querySelector('.picture');

profileEditButton.addEventListener('click', () => {
  userNameInput.value = userName.textContent;
  userCareerInput.value = aboutUser.textContent;
  userNameInput.placeholder = userName.textContent;
  userCareerInput.placeholder = aboutUser.textContent;
  document.querySelector('.profile-form').classList.add('popup_opened');
});

profileFormCloseButton.addEventListener('click', () => {
  document.querySelector('.profile-form').classList.remove('popup_opened');
});

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  aboutUser.textContent = userCareerInput.value;
  document.querySelector('.profile-form').classList.remove('popup_opened');
});

addButton.addEventListener('click', () => {
  document.querySelector('.card-creator').classList.add('popup_opened');
});

cardCreatorCloseButton.addEventListener('click', () => {
  document.querySelector('.card-creator').classList.remove('popup_opened');
});

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  refreshCardsList();
  addNewCard();
  document.querySelector('.card-creator').classList.remove('popup_opened');
});

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

function refreshCardsList() {
  const newObject = { name: cardName.value, link: cardLink.value };
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
};

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