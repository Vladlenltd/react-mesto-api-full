import React from "react";
import { Link } from "react-router-dom";
import Sign from "./Sign";
function Register({ onRegistration }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegistration(email, password);
  }
  return (
    <>
      <Sign
        title="Регистрация"
        textButton="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <input
          className="popup__input popup__input_type_email form__input"
          id="email-input"
          type="email"
          name="email"
          placeholder="E-mail"
          value={email || ""}
          onChange={handleChangeEmail}
        />
        <span className="email-input-error" />
        <input
          className="popup__input popup__input_type_password form__input"
          id="password-input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={password || ""}
          onChange={handleChangePassword}
        />
        <span className="password-input-error" />
      </Sign>
      <div className="registration">
        <p className="registration__text">Уже зарегестрированы?</p>
        <Link to="/signin" className="registration__link">
          Войти
        </Link>
      </div>
    </>
  );
}
export default Register;
