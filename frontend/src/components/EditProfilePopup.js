import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  React.useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton="Сохранить"
      children={
        <>
          <input
            className="popup__input popup__input_type_name"
            id="name-input"
            type="text"
            name="name"
            placeholder="Имя"
            minLength={2}
            maxLength={40}
            required
            value={name || ""}
            onChange={handleNameChange}
          />
          <span className="name-input-error" />
          <input
            className="popup__input popup__input_type_about"
            id="about-input"
            type="text"
            name="about"
            placeholder="О себе"
            minLength={2}
            maxLength={200}
            required
            value={description || ""}
            onChange={handleDescription}
          />
          <span className="about-input-error" />
        </>
      }
    />
  );
}

export default EditProfilePopup;
