import {useState} from 'react';
import PopupWithForm from './PopupWithForm';

export default function DeletePopup({isOpen, onClose, onDeleteCard, card}) {

  const [btnName, setBtnName]= useState('Да');

  function handleSubmit(e) {
    e.preventDefault();
    setBtnName('Удаление...');
    onDeleteCard(card, setBtnName);
  }

  return (
    <PopupWithForm
        title={'Вы уверены?'}
        name={'delCard'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText={btnName} />

  )
}
