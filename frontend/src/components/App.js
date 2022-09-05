import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import * as apiAuth from "../utils/ApiAuth";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
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
  // const [token, setToken] = React.useState();

  React.useEffect(() => {
    if (isLogIn) {
      const token = localStorage.getItem('jwt');
      api.getUserInfo(token).then((user) => {
        setCurrentUser(user);
        setIsLogIn(true);
            })
                .catch((err) => {
                    console.log(err);
                });
            api.getInitialCards().then((cardInfo) => {
                setCards(cardInfo.reverse());
            })
                .catch((err) => {
                    console.log(err);
                });
        }
  }, [isLogIn])

  React.useEffect(() => {
    handleCheckToken();
  }, []);
  
    function handleLogin(email, password) {
    apiAuth
      .authorization(password, email)
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.token);
          // setToken(data.token)
          // handleCheckToken();
          setUserEmail(email);
          setIsLogIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsLogIn(false);
        setIsLoginSuccess(false)
        setInfoTooltipPopupState(true);
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    const token = localStorage.getItem('jwt');
    api
      .setUserInfo(data, token)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleUpdateAvatar(link) {
    const token = localStorage.getItem('jwt');
    api
      .newUserAvatar(link, token)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleCardLike(card) {
    const token = localStorage.getItem('jwt');
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, token)
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
    const token = localStorage.getItem('jwt');
    api
      .delCard(card._id, token)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleAddPlace(data) {
    const token = localStorage.getItem('jwt');
    api
      .addNewCard(data, token)
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
function handleCheckToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      apiAuth.checkTokenValidity()
      .then((res) => {
        console.log(res);
        if (res) {
          setUserEmail(res.email);
          setIsLogIn(true);
          navigate('/');
        }       
      })
      .catch((err) => console.log(err));
    }
  };

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

  function onSignOut() {
    localStorage.removeItem("jwt");
    // setToken('')
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
