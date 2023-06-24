import Popup from './Popup.js';

class PopupWithForm extends Popup {

    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._container.querySelector('.popup__form');
        this._inputs = this._container.querySelectorAll('.popup__input');
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            
            this._handleFormSubmit(this._getInputValues());
        
            this.close();
        });
    }

    setInputValues(data) {
        this._inputs.forEach((input) => {
            input.value = data[input.name];
        });
    }

    _getInputValues() {
        this._inputsValues = {};

        this._inputs.forEach((input) => {
            this._inputsValues[input.name] = input.value;
        })

        return this._inputsValues;
    }
}

export default PopupWithForm;