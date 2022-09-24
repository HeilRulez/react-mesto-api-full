import {useContext} from 'react';
import {useHistory, Switch, Route, Link} from 'react-router-dom';
import {DataUserContext} from '../contexts/CurrentUserContext';

export default function Header ({loggedIn, setLoggedIn}) {

  const dataUser = useContext(DataUserContext);
  const history = useHistory();

  function onSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

    return (
      <header className="header">
        <div className="header__logo"></div>
        <p className="header__text">{loggedIn ? dataUser.email : ''}</p>
        {loggedIn ? (<button className="header__btn" onClick={onSignOut}>Выйти</button>) : (
          <Switch>
            <Route path='/sign-up'>
              <Link className="header__link" to='/sign-in'>Войти</Link>
            </Route>
            <Route path='/sign-in'>
              <Link className="header__link" to='/sign-up'>Регистрация</Link>
            </Route>
          </Switch>
          )}
      </header>
    )
}
