function ImagePopup(props) {
    return(
        <section className={props.card.link ? `popup popup_card popup_opened` : `popup popup_card`}>
          <div className="popup__foto-container">
            <button className="popup__close-btn" onClick={props.onClose}/>
            <figure className="popup__figure">
              <img className="popup__img" src={props.card.link} alt={props.card.name} />
              <figcaption className="popup__caption">{props.card.name}</figcaption>
            </figure>
          </div>
        </section>
    )
}
export default ImagePopup