import {useEffect, useState, useRef} from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatar = useRef();
  const [btnName, setBtnName]= useState('Сохранить');

  useEffect(() => {
      avatar.current.value = '';
  });

  function handleSubmit(e) {
    e.preventDefault();
    setBtnName('Сохранение...');
    onUpdateAvatar({
      avatar: avatar.current.value,
    }, setBtnName);
  }

  return (
    <PopupWithForm
        title={'Обновить аватар'}
        name={'avatar'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText={btnName}>
          <input className="form__name form__name_for_avatar form__input"
            id="avatar" type="url" name="link"
            ref={avatar} placeholder="Ссылка на картинку"
            required autoComplete="off" />
          <span className="form__text-error" id="avatar-error"></span>
      </PopupWithForm>
  )
}

