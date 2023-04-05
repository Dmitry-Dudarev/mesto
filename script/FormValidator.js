export class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._submitButton = this._form.querySelector(config.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(config.inputSelector));
    this._inputSelector = config.inputSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClassTemplate = config.errorClassTemplate;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputEventListenerAddedClass = config.inputEventListenerAddedClass;
  }

  enableValidation() {
    this._toggleButtonState();
    if (this._checkInputHasEventListener()) {
      this._hideErrorMessages();
    } else {
      this._setEventListeners();
    };
  }

  _checkInputHasEventListener() {
    return this._inputList.some(inputElement => {
      return inputElement.classList.contains(this._inputEventListenerAddedClass);
    });
  }

  _hideErrorMessages() {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._form.querySelector(`.${inputElement.name}${this._errorClassTemplate}`);
      this._hideInputError(inputElement, errorElement);
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.classList.add(this._inputEventListenerAddedClass);
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.name}${this._errorClassTemplate}`);
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

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    };
  }

  _hasInvalidInput() {
    return (this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    }));
  }

  _disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', 'true');
  }

  _enableSubmitButton(submitButton) {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled', 'true');
  }
};