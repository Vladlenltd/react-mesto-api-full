function PopupWithForm({
  isOpen,
  name,
  title,
  onClose,
  children,
  onSubmit,
  textButton,
}) {
  return (
    <section
      className={
        isOpen ? `popup popup_opened popup_${name}` : `popup_${name} popup`
      }
    >
      <div className="popup__container">
        <button className="popup__close-btn" onClick={onClose} />
        <form
          className={`popup__form-${name} popup__form popup__content`}
          onSubmit={onSubmit}
        >
          <h2 className={`${name}__heading`}>{title}</h2>
          {children}
          <button className="popup__button" type="submit">
            {textButton}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
