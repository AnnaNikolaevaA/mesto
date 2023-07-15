class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._avatar = document.querySelector('.profile__avatar-pic');

  }
  
  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(data => this._getResponseData(data))
  }

  changeUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(data => this._getResponseData(data))
  }
  
  changeUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(data => this._getResponseData(data))
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(data => this._getResponseData(data))
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(data => this._getResponseData(data))
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(data => this._getResponseData(data))
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(data => this._getResponseData(data))
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(data => this._getResponseData(data))
  }  
}

export default Api;