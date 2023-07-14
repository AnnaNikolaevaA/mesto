class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._avatar = document.querySelector('.profile__avatar-pic');

  }
  
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(data => {
        if (data.ok) {
          return data.json()
        }
        return Promise.reject(`Ошибка: ${data.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }
  
  changeUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(data => {
      if (data.ok) {
        return data.json()
      }
      return Promise.reject(`Ошибка: ${data.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(data => {
      if (data.ok) {
        return data.json()
      }
      return Promise.reject(`Ошибка: ${data.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(data => {
      if (data.ok) {
        return data.json()
      }
      return Promise.reject(`Ошибка: ${data.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(data => {
      if (data.ok) {
        return data.json()
      }
      return Promise.reject(`Ошибка: ${data.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }  
}

export default Api;