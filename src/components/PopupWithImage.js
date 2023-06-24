import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._imagePopup = this._container.querySelector('.popup__image');
        this._signPopup = this._container.querySelector('.popup__sign');
    }

    open(name, src) {
        this._imagePopup.src = src;
        this._imagePopup.alt = name;
        this._signPopup.textContent = name;
    
        super.open();
    }
}

export default PopupWithImage;