import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(name, src) {
        const imagePopup = this._container.querySelector('.popup__image');
        const signPopup = this._container.querySelector('.popup__sign');
        imagePopup.src = src;
        imagePopup.alt = name;
        signPopup.textContent = name;
    
        super.open();
    }
}

export default PopupWithImage;