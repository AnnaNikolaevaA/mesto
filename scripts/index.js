import initialCards from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Section from './Section.js';

const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const formEditProfile = document.querySelector('.popup__form_edit-profile');
const formAddCard = document.querySelector('.popup__form_add-card');
const buttonAddCard = document.querySelector('.profile__add-button');

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

const userInfo = new UserInfo('.profile__name', '.profile__description');

const popupAddCard = new PopupWithForm('.popup_add-card', function(newCard) {
    cardsSection.addItem(createCard(newCard));
});
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_edit-profile', function(newProfile) {
    userInfo.setUserInfo(newProfile);
});
popupEditProfile.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_view-card');
popupWithImage.setEventListeners();

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
    inputName.value = userInfo.getUserInfo().name;
    inputDescription.value = userInfo.getUserInfo().description;

    editProfileFormValidator.toggleButtonState();
    popupEditProfile.open();
}

buttonOpenPopupProfile.addEventListener('click', editPopup);

//клик по иконке add
buttonAddCard.addEventListener('click', () => { 
    addCardFormValidator.resetValidation();
    addCardFormValidator.toggleButtonState();
    popupAddCard.open();
});