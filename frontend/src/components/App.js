import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
// import { auth } from '../utils/Auth';
import * as apiAuth from "../utils/ApiAuth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    description: "",
    avatar: "",
  });
  const [cards, setCards] = React.useState([]);
  const [isLogIn, setIsLogIn] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupState] =
    React.useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = React.useState(false);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = React.useState("");

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((items) => {
        setCards(items);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleUpdateAvatar(link) {
    api
      .newUserAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleCardDelete(card) {
    api
      .delCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleAddPlace(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopup(true);
  }
  const handleCheckToken = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      apiAuth
        .checkTokenValidity(token)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            setIsLogIn(true);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      handleCheckToken();
    }
  }/*, []*/);

  function handleRegistration(email, password) {
    apiAuth
      .registration(password, email)
      .then(() => {
        setIsLoginSuccess(true);
        navigate("/signin");
      })
      .catch((err) => {
        setIsLoginSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setInfoTooltipPopupState(true);
      });
  }

  function handleLogin(email, password) {
    apiAuth
      .authorization(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
        }
        setUserEmail(email);
        setIsLogIn(true);
        navigate("/");
        handleCheckToken();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setIsLogIn(false);
    navigate("/signin");
  }

  function closeAllPopups() {
    setSelectedCard({});
    setIsAddPlacePopup(false);
    setIsEditProfilePopup(false);
    setIsEditAvatarPopup(false);
    setInfoTooltipPopupState(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          <Header
            isLogIn={isLogIn}
            userEmail={userEmail}
            onSignOut={onSignOut}
          />
          <Routes>
            <Route
              path="/signup"
              element={<Register onRegistration={handleRegistration} />}
            />
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/"
              element={
                <ProtectedRoute isLogIn={isLogIn}>
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isLogIn={isLogIn}
            isLoginSuccess={isLoginSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
