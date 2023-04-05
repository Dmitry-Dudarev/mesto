// объект перенесен в index.js

// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   errorClassTemplate: '-error',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__input-error_active',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_disabled',
// };


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, submitButton, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(submitButton, inactiveButtonClass);
  } else {
    enableSubmitButton(submitButton, inactiveButtonClass);
  };
};

const checkFormValidity = (elem) => {
  const inputList = Array.from(elem.querySelectorAll(validationConfig.inputSelector));
  const submitButton = elem.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, submitButton, validationConfig.inactiveButtonClass);
};

const disableSubmitButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.setAttribute('disabled', 'true');
};

const enableSubmitButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.removeAttribute('disabled');
};

const showInputError = (formElement, inputElement, errorMessage, errorElement, inputErrorClass, errorClass, submitButton) => {
  inputElement.classList.add(inputErrorClass);
  
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass, submitButton) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const removeErrorMessage = (form) => {
  const errorInputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  errorInputList.forEach((inputElement) => {
    const errorElement = form.querySelector(`.${inputElement.name}${validationConfig.errorClassTemplate}`);
    hideInputError(form, inputElement, errorElement, validationConfig.inputErrorClass, validationConfig.errorClass);
  });
};

const checkInputValidity = (formElement, inputElement, errorClassTemplate, inputErrorClass, errorClass, submitButton) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}${errorClassTemplate}`);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorElement, inputErrorClass, errorClass, submitButton);
  } else {
    hideInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass, submitButton);
  };
};

const setEventListeners = (formElement, inputSelector, errorClassTemplate, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass) => {
  const submitButton = formElement.querySelector(submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  toggleButtonState(inputList, submitButton, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, errorClassTemplate, inputErrorClass, errorClass, submitButton);
      toggleButtonState(inputList, submitButton, inactiveButtonClass);
    });
  });
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config.inputSelector, config.errorClassTemplate, config.inputErrorClass, config.errorClass, config.submitButtonSelector, config.inactiveButtonClass);
  });
};

enableValidation(validationConfig);


//checker function
function с (data) {
  console.log(typeof(data));
  console.log(data)
}