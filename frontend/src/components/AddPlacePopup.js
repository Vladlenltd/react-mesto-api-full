import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: place,
      link,
    });
  }

  function handlePlaceChange(evt) {
    setPlace(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  React.useEffect(() => {
    setPlace("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="picture"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      textButton="Создать"
      children={
        <>
          <input
            className="popup__input popup__input_type_name popup__input_type_title"
            id="title-input"
            type="text"
            name="title"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            value={place || ""}
            onChange={handlePlaceChange}
            required
          />
          <span className=" title-input-error" />
          <input
            className="popup__input popup__input_type_about popup__input_type_link"
            id="url-input"
            type="url"
            name="url"
            placeholder="Ссылка на картинку"
            value={link || ""}
            onChange={handleLinkChange}
            required
          />
          <span className="url-input-error" />
          {/* <button className="popup__button popup__image-add" type="submit">
            Создать
          </button> */}
        </>
      }
    />
  );
}
export default AddPlacePopup;
