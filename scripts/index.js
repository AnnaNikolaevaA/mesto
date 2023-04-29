const likes = document.querySelectorAll('.card__like');
const editProfile = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const personName = document.querySelector('.profile__name');
const personDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const closeProfile = document.querySelector('.popup__cross');
const saveButton = document.querySelector('.popup__button');
const formElement = document.querySelector('.popup__container');

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

//слушатель лайков
for (let i = 0; i < likes.length; i++) {
    likes[i].addEventListener('click', function (event) {
        let like = event.target;
        like.classList.toggle('card__like_value_active');
    });
}

//клик по иконке edit
editProfile.addEventListener('click', function () {
    nameInput.value = personName.textContent;
    descriptionInput.value = personDescription.textContent;

    popup.classList.add('popup_opened');
});

// клик по крестику
closeProfile.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});

// отправка формы
formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    personName.textContent = nameInput.value;
    personDescription.textContent = descriptionInput.value;
    popup.classList.remove('popup_opened');
});