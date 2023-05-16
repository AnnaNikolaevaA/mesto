// добавление классов ошибки
const showInputError = (options, input, error) => {
    input.classList.add(options.inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(options.errorClass);
}

// удаление класса ошибки
const hideInputError = (options, input, error) => {
    input.classList.remove(options.inputErrorClass);
    error.textContent = '';
    error.classList.remove(options.errorClass);
}

// валидация инпутов
const validateInput = (options, input, error) => {
    if (!input.validity.valid) {
        showInputError(options, input, error);
    } else {
        hideInputError(options, input, error);
    }
}

const isInvalidForm = (inputs) => {
    return inputs.some((input) => {
        return !input.validity.valid;
    })
}

const toggleButtonState = (options, inputs, button) => {
    if (isInvalidForm(inputs)) {
        button.classList.add(options.inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(options.inactiveButtonClass);
        button.disabled = false;
    }
}

// добавление слушателей
const setEventListeners = (options, form) => {
    const inputs = Array.from(form.querySelectorAll(options.inputSelector));
    const button = form.querySelector(options.submitButtonSelector);
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const error = form.querySelector(`.${input.id}-error`);
            validateInput(options, input, error);
            toggleButtonState(options, inputs, button);
        });
    });
}

function resetValidation(form) {
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

function enableValidation(options) {
    const forms = Array.from(document.querySelectorAll(options.formSelector));

    // добавление слушателей для каждой формы
    forms.forEach(form => {
        setEventListeners(options, form);
    });
}