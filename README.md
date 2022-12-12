# Проект: Место
*Проектная работа в рамках прохождения обучения на курсе "Яндекс.Практикум"*

## Верстка проекта позволяет сделать страницу более адаптивной. Используются элементарные функции на JavaScript для редактирования данных.

* Изображения, текст, данные о цвете и шрифт взяты из проекта на базе Figma.
* Часть изображений взята с сайта https://unsplash.com 

## JavaScript

*Реализована кнопка, нажатие на которую позволяет вызвать форму редактирования данных пользователя. 

  ```JavaScript
      profileEditButton.addEventListener('click', () => {
  	editUserName.value = userName.textContent;
  	editUserJob.value = aboutUser.textContent;
  	editPopup.classList.add('popup_opened');
  });
  ```
*Введенные в форму данные сохраняются на странице нажатием на соответствующую кнопку, заменяя собой предществующую информацию.

  ```JavaScript
      function handleFormSubmit (evt) {
  	evt.preventDefault();
  	userName.textContent = editUserName.value;
  	aboutUser.textContent = editUserJob.value;
  	editPopup.classList.remove('popup_opened');
  }
  formElement.addEventListener('submit', handleFormSubmit);
  ```
*Реализована кнопка закрытия формы редактирования без внесения изменений в данные.
  ```JavaScript
     closePopupButton.addEventListener('click', () => {
  	editPopup.classList.remove('popup_opened');
  });
  ```

Ссылка на проект:
  https://dmitry-dudarev.github.io/mesto/
