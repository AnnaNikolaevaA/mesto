class Api {
    constructor(options) {
      // тело конструктора
    }
  
    getInitialCards() {
      // ...
    }
  
    // другие методы работы с API
  }
  
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
    headers: {
      authorization: '09a5bd99-7995-4299-9b24-6db782b9cca4',
      'Content-Type': 'application/json'
    }
  });




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