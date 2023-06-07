class Card {
    constructor(data, templateSelector, openPopup) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openPopup = openPopup;
    }

    _getTemplate() {
        const templateCard = document.querySelector('#card').content;
        const card = templateCard.querySelector(this._templateSelector).cloneNode(true);
        return card;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__title').alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;

        return this._element;
    }


    _changeLike() {
        this._element.querySelector('.card__like').classList.toggle('card__like_value_active');
    }

    _removeCard() {
        this._element.remove();
    }

    _openPopupViewCard() {
        const popupViewCard = document.querySelector('.popup_view-card');
        const imagePopup = popupViewCard.querySelector('.popup__image');
        const signPopup = popupViewCard.querySelector('.popup__sign');
        imagePopup.src = this._element.querySelector('.card__image').src;
        imagePopup.alt = this._element.querySelector('.card__title').textContent;
        signPopup.textContent = this._element.querySelector('.card__title').textContent;
    
        this._openPopup(popupViewCard);
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click',  () => {
            this._changeLike()
        });
        this._element.querySelector('.card__delete').addEventListener('click',  () => {
              this._removeCard()
        });
        this._element.querySelector('.card__image').addEventListener('click',  () => {
              this._openPopupViewCard()
        });
    }
}

export default Card;