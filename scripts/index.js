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

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

// отображение начальных карточк
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');

for (let i = 0; i < initialCards.length; i++) {
        const card = cardTemplate.querySelector('.card').cloneNode(true);
    
        card.querySelector('.card__image').src = initialCards[i].link;
        card.querySelector('.card__title').textContent = initialCards[i].name;
        
        cards.append(card);
}

// слушатель лайков
const likes = document.querySelectorAll('.card__like');
for (let i = 0; i < likes.length; i++) {
    likes[i].addEventListener('click', function (evt) {
        let like = evt.target;
        like.classList.toggle('card__like_value_active');
    });
}

// удаление карточек
const deleteButtons = document.querySelectorAll('.card__delete');
for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', function (evt) {
        let deleteButton = evt.target;
        deleteButton.closest('.card').remove();
    });
}

// клик по иконке edit
editProfile.addEventListener('click', function () {
    nameInput.value = personName.textContent;
    descriptionInput.value = personDescription.textContent;

    editProfilePopup.classList.add('popup_opened');
});

// клик по крестику
for (const closeIcon of closeIcons) {
    closeIcon.addEventListener('click', function (evt) {
        evt.target.closest('.popup').classList.remove('popup_opened');
    });
}

// отправка формы
editProfileForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    
    personName.textContent = nameInput.value;
    personDescription.textContent = descriptionInput.value;
    
    editProfilePopup.classList.remove('popup_opened');
});

//клик по иконке add
addCard.addEventListener('click', function () {
    addCardPopup.classList.add('popup_opened');
});


addCardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    
    card.querySelector('.card__image').src = linkInput.value;
    card.querySelector('.card__title').textContent = placeNameInput.value;
    
    cards.prepend(card);

    card.querySelector('.card__like').addEventListener('click', function (evt) {
        let like = evt.target;
        like.classList.toggle('card__like_value_active');
    });

    card.querySelector('.card__delete').addEventListener('click', function (evt) {
        let deleteButton = evt.target;
        deleteButton.closest('.card').remove();
    });
    
    addCardPopup.classList.remove('popup_opened');

    linkInput.value = '';
    placeNameInput.value = '';
});


// клик по карточке
const cardImages = document.querySelectorAll('.card__image');
for (let i = 0; i < cardImages.length; i++) {
    cardImages[i].addEventListener('click', function (evt) {
        const card = evt.target.closest('.card');

        viewCardPopup.querySelector('.popup__image').src = evt.target.src;
        viewCardPopup.querySelector('.popup__sign').textContent = card.querySelector('.card__title').textContent;
    
        viewCardPopup.classList.add('popup_opened');
    });
}
