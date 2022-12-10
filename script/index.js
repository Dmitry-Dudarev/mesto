const profileEditButton = document.querySelector('.profile__editbutton');
console.log (typeof profileEditButton);

const editPopup = document.querySelector('.edit_popup');
console.log (typeof editPopup);

let userName = document.querySelector('.profile__username');
console.log (typeof userName);

let aboutUser = document.querySelector('.profile__aboutuser');
console.log (typeof aboutUser);

let editUserName = document.querySelector('.popup__input-name');
editUserName.placeholder = userName.textContent
let editUserJob = document.querySelector('.popup__input-job');
editUserJob.placeholder = aboutUser.textContent



// function openPopup () {
//   editPopup.classList.add('popup_opened');
// }

profileEditButton.addEventListener('click', (event) => {
  event.preventDefault();
  editPopup.classList.add('popup_opened');
});