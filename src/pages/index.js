import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import UserAvatar from '../components/UserAvatar.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';

import {
    buttonOpenPopupProfile,
    buttonAddCard,
    validationOptions,
    avatar,
} from '../utils/constants.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
    headers: {
      authorization: '09a5bd99-7995-4299-9b24-6db782b9cca4',
      'Content-Type': 'application/json'
    }
  });

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

api.getUserInfo().then((user) => {
    const userInfo = new UserInfo('.profile__name', '.profile__description');
    const userAvatar = new UserAvatar('.profile__avatar-pic')

    userInfo.setUserInfo(user);
    userAvatar.changeUserAvatar(user);

    const popupEditProfile = new PopupWithForm('.popup_edit-profile', function(newProfile, close) {
        userInfo.setUserInfo(newProfile);
        api.changeUserInfo(newProfile).then(() => {
            close();
        })
    });
    popupEditProfile.setEventListeners();
    
    const popupChangeAvatar = new PopupWithForm('.popup_change-avatar', function(newAvatar, close) {
        userAvatar.changeUserAvatar(newAvatar);
        api.changeUserAvatar(newAvatar).then(() => {
            close();
        })
    });
    popupChangeAvatar.setEventListeners();

    // клик по иконке edit
    function editPopup() {
        const formValidator = formValidators['profile-form'];
        formValidator.resetValidation();
        popupEditProfile.setInputValues(userInfo.getUserInfo());

        formValidator.toggleButtonState();
        popupEditProfile.open();
    }

    
    buttonOpenPopupProfile.addEventListener('click', editPopup);

    //клик по аватарке
    avatar.addEventListener('click', () => {
        const formValidator = formValidators['avatar-form'];
        formValidator.resetValidation();
        formValidator.toggleButtonState();
        popupChangeAvatar.open();
    });
    return user;
}).then((user) => {
    api.getCards().then(initialCards => {
        //создание и отрисовка карточки
        function renderCard(card) {
            cardsSection.appendItem(createCard(card));
        }
    
        function createCard(element) {
            const card = new Card(element, '.card', popupWithImage.open.bind(popupWithImage), openConfirmationPopup, api, user._id);
            const cardElement = card.generateCard();
            return cardElement;
        }
    
        const cardsSection = new Section({items: initialCards, renderer: renderCard}, '.cards');
        cardsSection.renderedItems();
    
        const popupAddCard = new PopupWithForm('.popup_add-card', function(data, close) {
            api.addCard(data).then((newCard) => {
                cardsSection.addItem(createCard(newCard));
                close();
            })
        });
        popupAddCard.setEventListeners();
    
        //клик по иконке add
        buttonAddCard.addEventListener('click', () => { 
            const formValidator = formValidators['card-form'];
            formValidator.resetValidation();
            formValidator.toggleButtonState();
            popupAddCard.open();
        });
    })    
})


const popupDeleteCard = new PopupWithConfirmation('.popup_confirmation');
popupDeleteCard.setEventListeners();


const popupWithImage = new PopupWithImage('.popup_view-card');
popupWithImage.setEventListeners();

function openConfirmationPopup(card) {
    popupDeleteCard.open(card);
}

