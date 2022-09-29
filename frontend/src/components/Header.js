import {useContext} from 'react';
import {useHistory, Switch, Route, Link} from 'react-router-dom';
import {DataUserContext} from '../contexts/CurrentUserContext';

export default function Header ({loggedIn, logOut}) {

  const dataUser = useContext(DataUserContext);
  const history = useHistory();

  function onSignOut() {
    logOut();
    history.push('/signin');
  }

    return (
      <header className="header">
        <div className="header__logo"></div>
        <p className="header__text">{loggedIn ? dataUser.email : ''}</p>
        {loggedIn ? (<button className="header__btn" onClick={onSignOut}>Выйти</button>) : (
          <Switch>
            <Route path='/signup'>
              <Link className="header__link" to='/signin'>Войти</Link>
            </Route>
            <Route path='/signin'>
              <Link className="header__link" to='/signup'>Регистрация</Link>
            </Route>
          </Switch>
          )}
      </header>
    )
}
