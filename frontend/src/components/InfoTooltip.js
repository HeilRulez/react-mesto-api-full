import ok from '../images/ok.png';
import no from '../images/no.png';

export default function InfoTooltip({isOpen, onClose, infoMessage, infoState}) {

  return (
    <section className={`overlay overlay_for_info ${isOpen && 'overlay_visible'}`}>
      <div className="modal-form modal-form_for_info">
        <button className="modal-form__close" type="button" onClick={onClose}></button>
        <img className="modal-form__image" src={infoState ? ok : no} alt='' />
        <h2 className="modal-form__title modal-form__title_for_info">{infoMessage}</h2>
      </div>
    </section>
  )
}
