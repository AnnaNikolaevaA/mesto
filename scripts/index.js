import initialCards from './initial-cards.js';
import Card from './card.js';
import FormValidator from './validate.js';

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

// отображение начальных карточек
initialCards.forEach(initialCard => {
    const card = new Card(initialCard, '.card', openPopup);
    const cardElement = card.generateCard();

    containerCards.append(cardElement);
});

function openPopup(popup) {
    window.addEventListener('keydown', closePopupByEsc)
    popup.classList.add('popup_opened');
}

function toggleButtonStateForPopup(options, popup) {
    const inputs = Array.from(popup.querySelectorAll(options.inputSelector));
    const button = popup.querySelector(options.submitButtonSelector);
    FormValidator.toggleButtonState(options, inputs, button);
}

function closePopup(popup) {
    window.removeEventListener('keydown', closePopupByEsc);
    popup.classList.remove('popup_opened');
}

function resetPopupFormValidation(popup) {
    const form = popup.querySelector('.popup__form');
    FormValidator.resetValidation(form);
}

// клик по иконке edit
function editPopup() {
    resetPopupFormValidation(popupEditProfile);
    inputName.value = personName.textContent;
    inputDescription.value = personDescription.textContent;

    toggleButtonStateForPopup(validationOptions, popupEditProfile);
    openPopup(popupEditProfile);
}

buttonOpenPopupProfile.addEventListener('click', editPopup);

// клик по крестику
for (const closeIcon of buttonsClosePopup) {
    closeIcon.addEventListener('click', (evt) => {
        const popup = evt.target.closest('.popup');
        closePopup(popup);
    });
}

// отправка формы
formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();

    personName.textContent = inputName.value;
    personDescription.textContent = inputDescription.value;

    closePopup(popupEditProfile);
});

//клик по иконке add
buttonAddCard.addEventListener('click', () => { 
    resetPopupFormValidation(popupAddCard);
    toggleButtonStateForPopup(validationOptions, popupAddCard);
    openPopup(popupAddCard);
});

formAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const newCard = {
        name: inputPlaceName.value,
        link: inputPictureLink.value
    }

    const card = new Card(newCard, '.card', openPopup);
    const cardElement = card.generateCard();

    containerCards.prepend(cardElement);

    closePopup(popupAddCard);
    formAddCard.reset();
});

const overlays = document.querySelectorAll('.popup');

// клик по оверлею
for (const overlay of overlays) {
    overlay.addEventListener('click', (evt) => {
        if (!evt.target.closest('.popup__container')) {
            const popup = evt.target.closest('.popup');
            closePopup(popup);
        }
    });
}

// нажатие esc
const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const overlay = document.querySelector('.popup_opened');
        closePopup(overlay);
    };
} 


document.querySelectorAll('.popup__form').forEach(form => {
    const formValidator = new FormValidator(validationOptions, form);
    formValidator.enableValidation();
})





