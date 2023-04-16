let likes = document.querySelectorAll('.like');
let editProfile = document.querySelector('.person__edit-button');
let popup = document.querySelector('.popup');
let personName = document.querySelector('.person__name');
let personDescription = document.querySelector('.person__description');
let nameInput = document.querySelector('.popup__name');
let descriptionInput = document.querySelector('.popup__description');
let closeProfile = document.querySelector('.popup__cross');
let saveButton = document.querySelector('.popup__button');

//слушатель лайков
for (let i = 0; i < likes.length; i++) {
    likes[i].addEventListener('click', function(event) {
        let like = event.target;
        if (like.classList.contains('like_value_active')) {
            like.classList.remove('like_value_active');
        } else {
            like.classList.add('like_value_active');
        }
    }
    );
}

//клик по иконке edit
editProfile.addEventListener('click', function() {
    nameInput.value = personName.innerText;
    descriptionInput.value = personDescription.innerText;

    popup.style.display = 'flex';
});

// клик по крестику
closeProfile.addEventListener('click', function() {
    popup.style.display = 'none';
});

// клик по кнопке сохранить
saveButton.addEventListener('click', function() {    
    personName.innerText = nameInput.value;
    personDescription.innerText = descriptionInput.value;
    popup.style.display = 'none';
});

