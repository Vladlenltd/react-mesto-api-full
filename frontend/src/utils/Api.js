class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
    }

    getUserInfo(token) {
        return fetch (`${this._baseUrl}/users/me`, {
            debugger: '',
            method: 'GET',
            headers: {
                authorization: "Bearer " + token,
                "Content-Type": 'application/json'
            }
        })
        .then(this._checkStatus)
    }

    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: "Bearer " + token,
                "Content-Type": 'application/json'
            }
        })
        .then((res => {
            return this._checkStatus(res)
        }))
    }

    getInitialInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkStatus)
    }

    newUserAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(this._checkStatus)
    }

    addNewCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
                // name: data.title,
                // link: data.url
            })
        })
        .then(this._checkStatus)
    }

    delCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkStatus)
    }
    
    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers
        })
        .then(this._checkStatus)
    }
}

export const api = new Api({
    baseUrl: 'https://api.mesto.vltd.nomoredomains.sbs',
    // baseUrl: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        authorization: "Bearer " + localStorage.getItem("jwt")
    }
})