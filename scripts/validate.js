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

    static isInvalidForm = (inputs) => {
        return inputs.some((input) => {
            return !input.validity.valid;
        })
    }

    static toggleButtonState = (options, inputs, button) => {
        if (FormValidator.isInvalidForm(inputs)) {
            button.classList.add(options.inactiveButtonClass);
            button.disabled = true;
        } else {
            button.classList.remove(options.inactiveButtonClass);
            button.disabled = false;
        }
    }

    // добавление слушателей
    _setEventListeners = () => {
        const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
        const button = this._form.querySelector(this._submitButtonSelector);
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const error = this._form.querySelector(`.${input.id}-error`);
                this._validateInput(input, error);
                FormValidator.toggleButtonState(this._options, inputs, button);
            });
        });
    }

    static resetValidation(form) {
        const inputs = Array.from(form.querySelectorAll('.popup__input'));
        const button = form.querySelector('.popup__button');
    
        inputs.forEach(input => {
            input.classList.remove('popup__input_type_error');
            button.classList.remove('popup__button_disabled');
            const error = form.querySelector(`.${input.id}-error`);
            error.textContent = '';
        });
    
        form.reset();
    }

    enableValidation() {
        // const forms = Array.from(document.querySelectorAll(this._formSelector));
    
        // добавление слушателей для каждой формы
        this._setEventListeners();
    }
}

export default FormValidator;
