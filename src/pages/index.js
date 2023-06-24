import './index.css';

import initialCards from '../utils/initial-cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';

import {
    buttonOpenPopupProfile,
    buttonAddCard,
    validationOptions
} from '../utils/constants.js';

const formValidators = {}

const enableValidation = (options) => {
const formList = Array.from(document.querySelectorAll(options.formSelector))
formList.forEach((form) => {
    const validator = new FormValidator(options, form)
    const formName = form.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
});
};

enableValidation(validationOptions);

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
    cardsSection.appendItem(createCard(card));
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
    const formValidator = formValidators['profile-form'];
    formValidator.resetValidation();
    popupEditProfile.setInputValues(userInfo.getUserInfo());

    formValidator.toggleButtonState();
    popupEditProfile.open();
}

buttonOpenPopupProfile.addEventListener('click', editPopup);

//клик по иконке add
buttonAddCard.addEventListener('click', () => { 
    const formValidator = formValidators['card-form'];
    formValidator.resetValidation();
    formValidator.toggleButtonState();
    popupAddCard.open();
});