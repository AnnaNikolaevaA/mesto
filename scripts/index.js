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


// отображение начальных карточек
initialCards.forEach(initialCard => {
    containerCards.append(createCard(initialCard));
});

function createCard(element) {
    const card = new Card(element, '.card', openPopup);
    const cardElement = card.generateCard();
    return cardElement;
}

function openPopup(popup) {
    window.addEventListener('keydown', closePopupByEsc)
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    window.removeEventListener('keydown', closePopupByEsc);
    popup.classList.remove('popup_opened');
}

// клик по иконке edit
function editPopup() {
    editProfileFormValidator.resetValidation();
    inputName.value = personName.textContent;
    inputDescription.value = personDescription.textContent;

    editProfileFormValidator.toggleButtonState();
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

    containerCards.prepend(createCard(newCard));

    closePopup(popupAddCard);
    formAddCard.reset();
});

const overlays = document.querySelectorAll('.popup');

// клик по оверлею
for (const overlay of overlays) {
    overlay.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
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







