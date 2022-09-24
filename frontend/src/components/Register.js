import {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Register({onRegister}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function resetForm() {
    setEmail('');
    setPassword('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!email || !password) {
      return
    }
    onRegister(email, password)
      .then(() => {
        resetForm();
    })
  }

    return (
      <div className="access-form">
        <h2 className="access-form__title">Регистрация</h2>
        <form className='form' onSubmit={handleSubmit} name='sign-up' noValidate>

          <input className="form__access-input"
            onChange={handleChangeEmail}
            value={email}
            id="emailInput" type="email" name="email"
            placeholder="Email" required />

          <span className="form__text-error" id="emailInput-error"></span>

          <input className="form__access-input"
            onChange={handleChangePassword}
            value={password}
            id="password" type="password" name="password" minLength="2"
            maxLength="20" placeholder="Пароль" required />

          <span className="form__text-error" id="password-error"></span>

          <button className="form__access-btn-submit" type="submit">Зарегистрироваться</button>
        </form>
        <p className="form__text">
          Уже зарегистрированы?
          <Link className="form__link" to='/sign-in'> Войти</Link>
        </p>
      </div>
    )
}

