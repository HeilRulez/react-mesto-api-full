import * as cs from './constants.js';

class Api {
  constructor({baseUrl, authUrl, token, type, cohort}) {
    this._baseUrl = baseUrl;
    this._authUrl = authUrl;
    this._token = token;
    this._type = type;
    this._cohort = cohort;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return new Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  renderAllCards() {
    return fetch(`${this._baseUrl}${this._cohort}/cards`, {
        headers: {
          authorization: this._token
        }
      })
      .then(res => this._checkResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}${this._cohort}/users/me`, {
        headers: {
          authorization: this._token
        }
      })
      .then(res => this._checkResponse(res))
  }

  reqDelCard(idCard) {
    return fetch(`${this._baseUrl}${this._cohort}/cards/${idCard}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token
        }
      })
      .then(res => this._checkResponse(res))
  }

  getAllCards({name, link
  }) {
    return fetch(`${this._baseUrl}${this._cohort}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': this._type
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => this._checkResponse(res))
  }

  handleLike(id, isLiked) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}${this._cohort}/cards/${id}/likes`, {
          method: 'DELETE',
          headers: {
            authorization: this._token
          }
        })
        .then(res => this._checkResponse(res))
    } else {
      return fetch(`${this._baseUrl}${this._cohort}/cards/${id}/likes`, {
          method: 'PUT',
          headers: {
            authorization: this._token
          }
        })
        .then(res => this._checkResponse(res))
    }
  }

  sendData(name, about) {
    return fetch(`${this._baseUrl}${this._cohort}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': this._type
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(res => this._checkResponse(res))
  }

  selectionAvatar(link) {
    return fetch(`${this._baseUrl}${this._cohort}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': this._type
        },
        body: JSON.stringify({
          avatar: link
        })
      })
      .then(res => this._checkResponse(res))
  }

  access(email, password, url) {
    return fetch(`${this._authUrl}${url}`, {
        method: 'POST',
        headers: {
          "Content-Type": this._type,
        },
        body: JSON.stringify({
          "password": password,
          "email": email
        })
      })
      .then(res => this._checkResponse(res))
    }

    getCheckToken() {
      return fetch(`${this._authUrl}/users/me`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(res => this._checkResponse(res))
    }

}

export default new Api(cs.configApi);
