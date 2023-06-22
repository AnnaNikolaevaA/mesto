class Popup {
    constructor(selector) {
        this._container = document.querySelector(selector);
    }

    open() {
        window.addEventListener('keydown', this._handleEscClose.bind(this));
        this._container.classList.add('popup_opened');
    }

    close() {
        window.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._container.classList.remove('popup_opened');
    }

    // нажатие esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }

    setEventListeners() {
        // клик по оверлею
        this._container.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
        // клик по крестику
        this._container.querySelector('.popup__cross').addEventListener('click', this.close.bind(this));
    }
}

export default Popup;