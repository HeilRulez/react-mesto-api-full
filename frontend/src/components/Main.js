import {useContext} from 'react';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

    return (
      <main>
        <section className="profile">
          <button className="profile__avatar" style={{backgroundImage:`url(${currentUser.avatar})`}} onClick={onEditAvatar}>
            <div className="profile__avatar-edit"></div>
          </button>
          <div className="profile-info">
            <div className="profile-info__conteiner">
              <h1 className="profile-info__name">{currentUser.name}</h1>
              <button className="profile-info__btn" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile-info__description">{currentUser.about}</p>
          </div>
            <button className="profile__add-btn" type="button" onClick={onAddPlace}></button>
        </section>

        <section className="cards">{cards.map((card) => (
          <Card key={card._id}
            data={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}/>
        ))}</section>
    </main>
    )
};

