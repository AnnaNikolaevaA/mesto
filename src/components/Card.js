class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const templateCard = document.querySelector('#card').content;
        const card = templateCard.querySelector(this._templateSelector).cloneNode(true);
        return card;
    }

    generateCard() {
        this._element = this._getTemplate();
        
        this._like = this._element.querySelector('.card__like');
        this._delete = this._element.querySelector('.card__delete');
        this._image = this._element.querySelector('.card__image');

        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;

        this._setEventListeners();

        return this._element;
    }

    _changeLike() {
        this._like.classList.toggle('card__like_value_active');
    }

    _removeCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._like.addEventListener('click',  () => {
            this._changeLike()
        });
        this._delete.addEventListener('click',  () => {
              this._removeCard()
        });
        this._image.addEventListener('click',  () => {
              this._handleCardClick(this._name, this._link)
        });
    }
}

export default Card;