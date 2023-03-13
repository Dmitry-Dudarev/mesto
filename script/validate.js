


// ~~ покажи ошибку ~~

const showInputError = (formElement, inputElement, errorMessage, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// ~~ скрой ошибку ~~

const hideInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// ~~~ проверка параиетра valid ~~~

const checkInputValidity = (formElement, inputElement, errorClassTemplate, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}${errorClassTemplate}`);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorElement, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);
  }
};


// ~~~~ навешиваем на инпут слушатель и отправляем его проверяться ~~~~

const setEventListeners = (formElement, inputSelector, errorClassTemplate, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  //тут код про кнопки
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, errorClassTemplate, inputErrorClass, errorClass);
    })
  });
};






function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config.inputSelector, config.errorClassTemplate, config.inputErrorClass, config.errorClass);
  });
};

//вызываем функцию с параметрами//
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassTemplate: '-error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}); 


  // submitButtonSelector: '.popup__button', --- у меня конкретизация save-button
  // inactiveButtonClass: 'popup__button_disabled', ---- у меня конкретизация save-button
