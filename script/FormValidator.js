export class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputSelector = config.inputSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClassTemplate = config.errorClassTemplate;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }


  enableValidation() {
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._toggleButtonState(inputList, submitButton);
      if(this._checkInputHasEventListener(inputList)){
        console.log('lite check')
        this._hideErrorMessage(inputList)
      }else{
        console.log('full check')
        this._setEventListeners(inputList, submitButton);
      }
  }

  _checkInputHasEventListener(inputList){
    return inputList.some(inputElement => {
      return inputElement.classList.contains('popup__input_event-listener-added');
    })
  }

  _hideErrorMessage(inputList) {
    inputList.forEach((inputElement) => {
      const errorElement = this._form
      .querySelector(`.${inputElement.name}${this._errorClassTemplate}`);
      this._hideInputError(inputElement, errorElement);
    })
  }









  // enableValidation() {
  //   const submitButton = this._form.querySelector(this._submitButtonSelector);
  //   const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  //   this._toggleButtonState(inputList, submitButton);
  //   this._setEventListeners(inputList, submitButton);
  // }

  _setEventListeners(inputList, submitButton) {
    inputList.forEach((inputElement) => {

      //навестим маркер
      inputElement.classList.add('popup__input_event-listener-added');

      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, submitButton);
      });
    });
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._form
      .querySelector(`.${inputElement.name}${this._errorClassTemplate}`);

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    };
  }

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _toggleButtonState(inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(submitButton);
    } else {
      this._enableSubmitButton(submitButton);
    };
  }

  _hasInvalidInput(inputList) {
    return (inputList.some(inputElement => {
      return !inputElement.validity.valid;
    }))
  }

  _disableSubmitButton(submitButton) {
    submitButton.classList.add(this._inactiveButtonClass);
    submitButton.setAttribute('disabled', 'true');
  }

  _enableSubmitButton(submitButton) {
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.removeAttribute('disabled', 'true');
  }
};