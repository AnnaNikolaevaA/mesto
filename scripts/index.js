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
const popupViewCard = document.querySelector('.popup_view-card');
const templateCard = document.querySelector('#card').content;
const containerCards = document.querySelector('.cards');
const imagePopup = popupViewCard.querySelector('.popup__image');
const signPopup = popupViewCard.querySelector('.popup__sign');

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
    containerCards.append(createCard(initialCard));
});

function changeLike(evt) {
    evt.target.classList.toggle('card__like_value_active');
}

function removeCard(evt) {
    evt.target.closest('.card').remove();
}

function openPopupViewCard(evt) {
    imagePopup.src = evt.target.src;
    imagePopup.alt = evt.target.closest('.card').querySelector('.card__title').textContent;
    signPopup.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;

    openPopup(popupViewCard);
}

//функция создания карточки
function createCard(item) {
    const card = templateCard.querySelector('.card').cloneNode(true);
    const imageContainer = card.querySelector('.card__image');
    const titleContainer = card.querySelector('.card__title');
    const likeContainer = card.querySelector('.card__like');

    imageContainer.src = item.link;
    imageContainer.alt = item.name;
    titleContainer.textContent = item.name;

    likeContainer.addEventListener('click', changeLike);
    card.querySelector('.card__delete').addEventListener('click', removeCard);
    imageContainer.addEventListener('click', openPopupViewCard);

    return card;
}

function openPopup(popup) {
    window.addEventListener('keydown', closePopupByEsc)
    popup.classList.add('popup_opened');
}

function toggleButtonStateForPopup(options, popup) {
    const inputs = Array.from(popup.querySelectorAll(options.inputSelector));
    const button = popup.querySelector(options.submitButtonSelector);
    toggleButtonState(options, inputs, button);
}

function popupClosed(popup) {
    if (popup.querySelector('.popup__form')) {
        const form = popup.querySelector('.popup__form');
        resetValidation(form);
    }
    
    window.removeEventListener('keydown', closePopupByEsc)
    popup.classList.remove('popup_opened');
}

// клик по иконке edit
function editPopup() {
    inputName.value = personName.textContent;
    inputDescription.value = personDescription.textContent;

    toggleButtonStateForPopup(validationOptions, popupEditProfile);
    openPopup(popupEditProfile);
}

buttonOpenPopupProfile.addEventListener('click', editPopup);

// клик по крестику
for (const closeIcon of buttonsClosePopup) {
    closeIcon.addEventListener('click', (evt) => {
        popupClosed(evt.target.closest('.popup'));
    });
}

// отправка формы
formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();

    personName.textContent = inputName.value;
    personDescription.textContent = inputDescription.value;

    popupClosed(popupEditProfile);
});

//клик по иконке add
buttonAddCard.addEventListener('click', () => { 
    toggleButtonStateForPopup(validationOptions, popupAddCard);
    openPopup(popupAddCard);
});

formAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();

    containerCards.prepend(
        createCard({
            name: inputPlaceName.value,
            link: inputPictureLink.value
        })
    );

    popupClosed(popupAddCard);
    formAddCard.reset();
});

const overlays = document.querySelectorAll('.popup');

// клик по оверлею
for (const overlay of overlays) {
    overlay.addEventListener('click', (evt) => {
        if (!evt.target.closest('.popup__container')) {
            popupClosed(evt.target.closest('.popup'));
        }
    });
}

// нажатие esc
const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const overlay = document.querySelector('.popup_opened');
        popupClosed(overlay);
    };
} 

enableValidation(validationOptions);

