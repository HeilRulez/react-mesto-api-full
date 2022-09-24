import {useState, useContext, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const [name, setName] = useState('');
  const [description, setDescription]= useState('');
  const [btnName, setBtnName]= useState('Сохранить');
  const currentUser = useContext(CurrentUserContext);


  useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setBtnName('Сохранение...');
    onUpdateUser({
      name,
      about: description,
    }, setBtnName);
  }

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'profile'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={btnName}>
        <input className="form__name form__name_for_profile form__input"
          id="nameInput" type="text" name="name" minLength="2" maxLength="40"
          placeholder="Имя" onChange={handleName} value={name || ''} required autoComplete="off" />
        <span className="form__text-error" id="nameInput-error"></span>
        <input className="form__data form__data_for_profile form__input"
          id="description" type="text" name="about" minLength="2"
          maxLength="200" placeholder="Профиль" onChange={handleDescription}
          value={description || ''} required autoComplete="off" />
        <span className="form__text-error" id="description-error"></span>
    </PopupWithForm>
  )
}
