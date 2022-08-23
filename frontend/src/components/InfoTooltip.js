import regOk from "../image/reg-ok.svg";
import regFail from "../image/reg-fail.svg";

function InfoTooltip({ isOpen, onClose, isLoginSuccess }) {
  return (
    <section
      className={isOpen ? `popup_infotooltip popup popup_opened` : `popup`}
    >
      <div className="popup__container popup__container_infotooltip">
        <button className="popup__close-btn" onClick={onClose} />
        <img
          src={isLoginSuccess ? regOk : regFail}
          alt={isLoginSuccess ? "Успешно" : "Провал"}
          className="popup__img_infotooltip"
        />
        <p className="popup__text_infotooltip">
          {isLoginSuccess
            ? "Вы успешно зарегистрировались"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </p>
      </div>
    </section>
  );
}
export default InfoTooltip;
