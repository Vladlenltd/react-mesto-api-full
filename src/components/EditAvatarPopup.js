import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, textButton }) {
  const avatarRef = React.useRef();
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name="profile-foto"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton="Сохранить"
      children={
        <>
          <input
            className="popup__input popup__input_type_avatar"
            id="avatar-input"
            name="avatar"
            type="url"
            placeholder="Ссылка на картинку"
            minLength={2}
            ref={avatarRef}
            required
          />
          <span className="avatar-input-error" />
        </>
      }
    />
  );
}

export default EditAvatarPopup;
