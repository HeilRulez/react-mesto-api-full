export default function ImagePopup({card, onClose}) {

    return (
      <section className={`overlay overlay_for_view ${card.link && 'overlay_visible'}`}>
      <div className="modal-form modal-form_for_view">
        <div>
          <button className="modal-form__close" onClick={onClose} type="button"></button>
      <img className="modal-form__view-img" src={card.link} alt={card.name} />
        </div>
        <h2 className="modal-form__title modal-form__title_for_view">{card.name || ''}</h2>
      </div>
    </section>
    )
}

