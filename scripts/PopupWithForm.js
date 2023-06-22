import Popup from './Popup.js';

class PopupWithForm extends Popup {

    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._container.querySelector('.popup__form');
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

    _getInputValues() {
        this._inputs = this._container.querySelectorAll('.popup__input');

        this._inputsValues = {};

        this._inputs.forEach((input) => {
            this._inputsValues[input.name] = input.value;
        })

        return this._inputsValues;
    }
}

export default PopupWithForm;