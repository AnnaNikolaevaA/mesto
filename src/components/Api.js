class Api {
  constructor(options) {
    this._options = options;
    // this._baseUrl = options.baseUrl;
    // this._headers = options.headers;
    this._avatar = document.querySelector('.profile__avatar-pic');

  }
  
  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-70/users/me', {
      headers: {
        authorization: '09a5bd99-7995-4299-9b24-6db782b9cca4'
      }
    })
      .then(data => data.json())
      .then(user => user)
  }

  changeUserInfo(data) {
    fetch('https://nomoreparties.co/v1/cohort-70/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '09a5bd99-7995-4299-9b24-6db782b9cca4',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  getCards() {
    return fetch('https://nomoreparties.co/v1/cohort-70/cards', {
      headers: {
        authorization: '09a5bd99-7995-4299-9b24-6db782b9cca4'
      }
    })
    .then(data => data.json())
    .then(cards => cards)
  }

  addCard(data) {
    fetch('https://nomoreparties.co/v1/cohort-70/users/me', {
      method: 'POST',
      headers: {
        authorization: '09a5bd99-7995-4299-9b24-6db782b9cca4',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }


  
}

export default Api;




// fetch('https://mesto.nomoreparties.co/v1/cohort-70/cards', {
//   headers: {
//     authorization: '09a5bd99-7995-4299-9b24-6db782b9cca4'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 

//   GET https://nomoreparties.co/v1/cohort-70/users/me 