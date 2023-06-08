class FormValidator {
    
    constructor(options, form) {
        this._options = options;
        this._formSelector = options.formSelector;
        this._inputSelector = options.inputSelector;
        this._submitButtonSelector = options.submitButtonSelector;
        this._inactiveButtonClass = options.inactiveButtonClass;
        this._inputErrorClass = options.inputErrorClass;
        this._errorClass = options.errorClass;
        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._button = this._form.querySelector(this._submitButtonSelector);
    }

    // добавление классов ошибки
    _showInputError = (input, error) => {
        input.classList.add(this._inputErrorClass);
        error.textContent = input.validationMessage;
        error.classList.add(this._errorClass);
    }

    // удаление класса ошибки
    _hideInputError = (input, error) => {
        input.classList.remove(this._inputErrorClass);
        error.textContent = '';
        error.classList.remove(this._errorClass);
    }

    // валидация инпутов
    _validateInput = (input, error) => {
        if (!input.validity.valid) {
            this._showInputError(input, error);
        } else {
            this._hideInputError(input, error);
        }
    }

    _isInvalidForm = () => {
        return this._inputs.some((input) => {
            return !input.validity.valid;
        })
    }

    toggleButtonState = () => {
        if (this._isInvalidForm()) {
            this._button.classList.add(this._inactiveButtonClass);
            this._button.disabled = true;
        } else {
            this._button.classList.remove(this._inactiveButtonClass);
            this._button.disabled = false;
        }
    }

    // добавление слушателей
    _setEventListeners = () => {
        this._inputs.forEach(input => {
            input.addEventListener('input', () => {
                const error = this._form.querySelector(`.${input.id}-error`);
                this._validateInput(input, error);
                this.toggleButtonState();
            });
        });
    }

    resetValidation() {
        this._inputs.forEach(input => {
            input.classList.remove('popup__input_type_error');
            // this._button.classList.remove('popup__button_disabled');
            const error = this._form.querySelector(`.${input.id}-error`);
            error.textContent = '';
        });
    
        this._form.reset();
    }

    enableValidation() {
        // добавление слушателей для каждой формы
        this._setEventListeners();
    }
}

export default FormValidator;
