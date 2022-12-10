const  profileEditButton = document.querySelector('.profile__editbutton');
console.log (typeof profileEditButton);

const  editPopup = document.querySelector('.edit_popup');
console.log (typeof editPopup);

// function openPopup () {
//   editPopup.classList.add('popup_opened');
// }

profileEditButton.addEventListener('click', (event) => {
  event.preventDefault();
  editPopup.classList.add('popup_opened');
});