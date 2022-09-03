import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ card, name, link, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  // const isOwn = card.owner._id === currentUser._id;
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__delete-btn ${
    isOwn ? "" : "element__delete-btn_disable"
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  console.log(isLiked)
  const cardLikeButtonClassName = `element__like-btn ${
    isLiked ? "element__like-btn_active" : ""
  }`;
  return (
    <article className="element">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      />
      <img
        src={link}
        alt={name}
        className="element__item"
        onClick={handleClick}
      />
      <div className="element__wrapper">
        <h2 className="element__title">{name}</h2>
        <div className="element__like">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          />
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
export default Card;
