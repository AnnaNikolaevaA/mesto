const editProfile = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_edit-profile');
const addCardPopup = document.querySelector('.popup_add-card');
const personName = document.querySelector('.profile__name');
const personDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const closeIcons = document.querySelectorAll('.popup__cross');
const saveButton = document.querySelector('.popup__button');
const editProfileForm = document.querySelector('.popup__form_edit-profile');
const addCardForm = document.querySelector('.popup__form_add-card');
const placeNameInput = document.querySelector('.popup__input_type_name-place');
const linkInput = document.querySelector('.popup__input_type_link');
const addCard = document.querySelector('.profile__add-button');
const viewCardPopup = document.querySelector('.popup_view-card');
const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.cards');

// отображение начальных карточек
initialCards.forEach(initialCard => {
    cardsContainer.append(createCard(initialCard));
});

//функция создания карточки
function createCard (item) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const imageContainer = card.querySelector('.card__image');
    const titleContainer = card.querySelector('.card__title');
    const likeContainer = card.querySelector('.card__like');
    
    imageContainer.src = item.link;
    imageContainer.alt = item.name;
    titleContainer.textContent = item.name;

    likeContainer.addEventListener('click', () => {
        likeContainer.classList.toggle('card__like_value_active');
    });

    card.querySelector('.card__delete').addEventListener('click', () => {
        card.remove();
    });

    imageContainer.addEventListener('click', () => {
        viewCardPopup.querySelector('.popup__image').src = imageContainer.src;
        viewCardPopup.querySelector('.popup__image').alt = titleContainer.textContent;
        viewCardPopup.querySelector('.popup__sign').textContent = titleContainer.textContent;
    
        popupOpened(viewCardPopup);
    });

    return card;
}

function popupOpened (popup) {
    popup.classList.add('popup_opened');
}

function popupClosed (popup) {
    popup.classList.remove('popup_opened');
}

// клик по иконке edit
function editPopup () {
    nameInput.value = personName.textContent;
    descriptionInput.value = personDescription.textContent;

    popupOpened(editProfilePopup);
}

editProfile.addEventListener('click', editPopup);

// клик по крестику
for (const closeIcon of closeIcons) {
    closeIcon.addEventListener('click', (evt) => {
        popupClosed(evt.target.closest('.popup'));
    });
}

// отправка формы
editProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    personName.textContent = nameInput.value;
    personDescription.textContent = descriptionInput.value;
    
    popupClosed(editProfilePopup);
});

//клик по иконке add
addCard.addEventListener('click', () => {
    popupOpened(addCardPopup);
});

addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    cardsContainer.prepend(
        createCard({
            name: placeNameInput.value,
            link: linkInput.value
        })
    );

    popupClosed(addCardPopup);
    addCardForm.reset();
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
window.addEventListener('keydown', (evt) => {
    if (evt.key == 'Escape') {
        for (const overlay of overlays) {
            popupClosed(overlay);
        }
    }
});


const formElements = Array.from(document.querySelectorAll('.popup__form'));
const inputElements = Array.from(document.querySelectorAll('.popup__input'));

// добавление классов ошибки
const showInputError = (inputElement) => {
    inputElement.classList.add('popup__input_type_error');
    massageElement.classList.add('popup__error_visible'); //через id
}

// удаление класса ошибки
const hideInputError = (inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
    massageElement.classList.remove('popup__error_visible');
}

const isValid = (inputElement) => {
    if (!inputElement.validaty.valid) {
        showInputError(inputElement);
    } else {
       hideInputError(inputElement);
    }
}

const setEventListeners = () => {
    inputElements.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            isValid(inputElement);
        })
    })
}