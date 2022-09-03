// export const BASE_URL = "https://api.mesto.vltd.nomoredomains.sbs";
export const BASE_URL = "http://localhost:3000";

const checkServerStatus = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const registration = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then(checkServerStatus);
};

export const authorization = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkServerStatus);
};

export const checkTokenValidity = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: 'Bearer ' + localStorage.getItem("jwt"),
      },

  }).then(checkServerStatus);
};
