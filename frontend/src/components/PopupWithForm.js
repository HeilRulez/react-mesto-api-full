export default function PopupWithForm({name, isOpen, onClose, title, children, buttonText, onSubmit}) {
    return (
      <section className={`overlay overlay_for_${name} ${isOpen && 'overlay_visible'}`}>
      <div className="modal-form">
        <button className="modal-form__close" type="button" onClick={onClose}></button>
        <h2 className="modal-form__title">{title}</h2>
        <form className={`form form_for_${name}`} onSubmit={onSubmit} name={name} noValidate>
          {children}
          <button className="form__btn-submit" type="submit">{buttonText}</button>
        </form>
      </div>
    </section>
    )
}
