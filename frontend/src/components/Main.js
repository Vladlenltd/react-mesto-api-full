import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <img
          // src={currentUser.avatar}
          src={currentUser?.avatar}
          alt="Аватар пользователя"
          className="profile__foto"
        />
        <button
          type="button"
          className="profile__edit-avatar"
          onClick={onEditAvatar}
        />
        <article className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__title">{currentUser?.name}</h1>
            {/* <h1 className="profile__title">{currentUser.name}</h1> */}
            <button className="profile__edit-btn" onClick={onEditProfile} />
          </div>
          {/* <p className="profile__subtitle">{currentUser.about}</p> */}
          <p className="profile__subtitle">{currentUser?.about}</p>
        </article>
        <button className="profile__add-btn" onClick={onAddPlace} />
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
            key={card._id}
            card={card}
            name={card.name}
            link={card.link}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
