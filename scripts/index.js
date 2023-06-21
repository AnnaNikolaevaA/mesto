import initialCards from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const personName = document.querySelector('.profile__name');
const personDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const buttonsClosePopup = document.querySelectorAll('.popup__cross');
const formEditProfile = document.querySelector('.popup__form_edit-profile');
const formAddCard = document.querySelector('.popup__form_add-card');
const inputPlaceName = document.querySelector('.popup__input_type_name-place');
const inputPictureLink = document.querySelector('.popup__input_type_link');
const buttonAddCard = document.querySelector('.profile__add-button');
const containerCards = document.querySelector('.cards');

const validationOptions = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const editProfileFormValidator = new FormValidator(validationOptions, formEditProfile);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationOptions, formAddCard);
addCardFormValidator.enableValidation();

class Popup {
    constructor(selector) {
        this._container = document.querySelector(selector);
        console.log(this._container)
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

class PopupWithForm extends Popup {

    constructor(selector) {
        super(selector)
    }

    close() {

    }

    setEventListeners() {

    }

    _getInputValues() {

    }
}

const popupWithImage = new PopupWithImage('.popup_view-card');
popupWithImage.setEventListeners();

class Section {
    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

// отображение начальных карточек
    renderedItems() {
        this._items.forEach(item => {
            this._renderer(item);
        })
    }
// отображение карточки добавленной пользователем
    addItem(element) {
        this._container.prepend(element);
    }
}

//создание и отрисовка карточки
function renderCard(card) {
    this._container.append(createCard(card));
}



function createCard(element) {
    const card = new Card(element, '.card', popupWithImage.open.bind(popupWithImage));
    const cardElement = card.generateCard();
    return cardElement;
}

const cardsSection = new Section({items: initialCards, renderer: renderCard}, '.cards');
cardsSection.renderedItems();

// клик по иконке edit
function editPopup() {
    editProfileFormValidator.resetValidation();
    inputName.value = personName.textContent;
    inputDescription.value = personDescription.textContent;

    editProfileFormValidator.toggleButtonState();
    openPopup(popupEditProfile);
}

buttonOpenPopupProfile.addEventListener('click', editPopup);

// отправка формы
formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();

    personName.textContent = inputName.value;
    personDescription.textContent = inputDescription.value;

    closePopup(popupEditProfile);
});

//клик по иконке add
buttonAddCard.addEventListener('click', () => { 
    addCardFormValidator.resetValidation();
    addCardFormValidator.toggleButtonState();
    openPopup(popupAddCard);
});

formAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const newCard = {
        name: inputPlaceName.value,
        link: inputPictureLink.value
    }

    cardsSection.addItem(createCard(newCard));
    // containerCards.prepend(createCard(newCard));

    closePopup(popupAddCard);
    formAddCard.reset();
});








