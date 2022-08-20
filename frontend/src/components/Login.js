import React from "react";
import Sign from "./Sign";
function Login({ onLogin }) {
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
    onLogin(email, password);
  }

  return (
    <Sign title="Вход" textButton="Войти" onSubmit={handleSubmit}>
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
        id="password-input "
        type="password"
        name="password"
        placeholder="Пароль"
        value={password || ""}
        onChange={handleChangePassword}
      />
      <span className="password-input-error" />
    </Sign>
  );
}
export default Login;
