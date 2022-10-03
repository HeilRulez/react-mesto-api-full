import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Card({data, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = data.owner === currentUser._id;
  const cardDelBtnClassName = (`card__del ${!isOwn && 'card__del_hidden'}`);
  const isLiked = data.likes.some(item => item === currentUser._id);
  const cardLikeBtnClassName = (`card__like ${isLiked && 'card__like_active'}`);

  function handleClick() {
    onCardClick(data);
  }

  function handleLikeClick() {
    onCardLike(data);
  }

  function handleDeleteClick() {
    onCardDelete(data);
  }

  return (
    <div className="card">
      <button className={cardDelBtnClassName} onClick={handleDeleteClick}type="button"></button>
      <img className="card__img" onClick={handleClick} src={data.link} alt={data.name} />
      <div className="card__description">
        <h2 className="card__title">{data.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeBtnClassName} onClick={handleLikeClick} type="button"></button>
          <span className="card__like-count">{data.likes.length}</span>
        </div>
      </div>
    </div>)
}
