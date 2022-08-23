function Sign({ title, children, textButton, onSubmit }) {
    return (
        <form className="popup__content popup__form form__sign-in" onSubmit={onSubmit}>
            <h2 className="popup__title popup__title_dark">{title}</h2>
            {children}
            <button className="form__button popup__button">{textButton}</button>
        </form>
    )
}
export default Sign