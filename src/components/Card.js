class Card {
    constructor(data, templateSelector, handleCardClick, handleDeleteButtonClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
    }

    _getTemplate() {
        const templateCard = document.querySelector('#card').content;
        const card = templateCard.querySelector(this._templateSelector).cloneNode(true);
        return card;
    }

    generateCard() {
        this._element = this._getTemplate();
        
        this._likeButton = this._element.querySelector('.card__like');
        this._delete = this._element.querySelector('.card__delete');
        this._image = this._element.querySelector('.card__image');
        this._likeCount = this._element.querySelector('.card__count');

        this._image.src = this._link;
        this._image.alt = this._name;
        this._likeCount.textContent = this._likes.length;
        this._element.querySelector('.card__title').textContent = this._name;

        this._setEventListeners();

        return this._element;
    }

    _changeLike() {
        this._likeButton.classList.toggle('card__like_value_active');

        if (this._likeButton.classList.contains('card__like_value_active')) {
            this._likes.push('Твт');
            this._likeCount.textContent = this._likes.length;
        } else {
            this._likes = this._likes.filter(val => val !== 'Твт');
            this._likeCount.textContent = this._likes.length;
        }
    }

    removeCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click',  () => {
            this._changeLike()
        });
        this._delete.addEventListener('click', () => {
            this._handleDeleteButtonClick(this)
        });
        this._image.addEventListener('click',  () => {
              this._handleCardClick(this._name, this._link)
        });
    }
}

export default Card;