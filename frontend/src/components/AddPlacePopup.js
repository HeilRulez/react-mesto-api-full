import {useState} from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [btnName, setBtnName]= useState('Создать');

function handleSubmit(e) {
  e.preventDefault();
  setBtnName('Создание...');
  onAddPlace({
    name: name,
    link: link
  }, setBtnName)
}

function handleName(e) {
  setName(e.target.value);
}

function handleLink(e) {
  setLink(e.target.value);
}

  return (
    <PopupWithForm
        title={'Новое место'}
        name={'addCard'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText={btnName}>
          <input className="form__name form__name_for_addCard form__input"
            id="place" type="text" name="name" placeholder="Название"
            volue={name} minLength="2" maxLength="30" onChange={handleName}
            required autoComplete="off" />
          <span className="form__text-error" id="place-error"></span>
          <input className="form__data form__data_for_addCard form__input"
            id="adress" type="url" name="link" placeholder="Ссылка на картинку"
            volue={link} onChange={handleLink} required autoComplete="off" />
          <span className="form__text-error" id="adress-error"></span>
      </PopupWithForm>

  )
}
