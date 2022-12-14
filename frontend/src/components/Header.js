import logo from "../image/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ isLogIn, userEmail, onSignOut }) {
  const location = useLocation();
  return (
    <header className="header">
      <img src={logo} alt="логотип Mesto Russia" className="header__logo" />
      <div className="header__login">
        {isLogIn && (
          <>
            <p className="registration__link">{userEmail}</p>
            <p className="registration__link" onClick={onSignOut}>
              Выйти
            </p>
          </>
        )}
        {!isLogIn && location.pathname === "/signin" && (
          <Link to="/signup" className="registration__link">
            Регистрация
          </Link>
        )}
        {!isLogIn && location.pathname === "/signup" && (
          <Link to="/signin" className="registration__link">
            Вoйти
          </Link>
        )}
      </div>
    </header>
  );
}
export default Header;
