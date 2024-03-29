import Popup from './Popup.js';

class PopupWithConfirmation extends Popup {
    constructor(selector) {
        super(selector);
        this._form = this._container.querySelector('.popup__form');
        this._button = this._container.querySelector('.popup__button');
    }
    
    open(handleDeleteCard) {
        super.open();
        const deleteCard = () => {
            handleDeleteCard().then(() => {
                super.close();
                this._button.removeEventListener('click', deleteCard)
            })
        }
        this._button.addEventListener('click', deleteCard)
    }
}

export default PopupWithConfirmation;