let likes = document.querySelectorAll('.card__like');
let editProfile = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let personName = document.querySelector('.profile__name');
let personDescription = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__input_type_name');
let descriptionInput = document.querySelector('.popup__input_type_description');
let closeProfile = document.querySelector('.popup__cross');
let saveButton = document.querySelector('.popup__button');
let formElement = document.querySelector('.popup__container');

//слушатель лайков
for (let i = 0; i < likes.length; i++) {
    likes[i].addEventListener('click', function (event) {
        let like = event.target;
        if (like.classList.contains('card__like_value_active')) {
            like.classList.remove('card__like_value_active');
        } else {
            like.classList.add('card__like_value_active');
        }
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

