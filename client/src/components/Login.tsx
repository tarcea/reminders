import React, { FC, useState, FormEvent, useContext } from 'react';
import './styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Api';
import Message from './Message';
import { UserContext } from '../contexts/UserContext';

const Login: FC = () => {
  const initialState: Omit<IUser, '_id' | 'email'> = { username: '', password: '' };
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState('');
  const { setCurrentUser } = useContext(UserContext)!;

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const currentUser = await login(formData.username, formData.password);
      setCurrentUser(currentUser);
      setFormData(initialState);
      setMessage(`welcome ${currentUser.username}`)
      window.location.href = '/lists';
      navigate('/lists');
    } catch (err) {
      setMessage('invalid credentials')
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <div className="login-form__container">
      {message && <Message message={message} setMessage={setMessage} />}
      <div className="login-form__inner-container">
        <h2 className="login-form__header">
          Log in
        </h2>
        <form onSubmit={handleSubmit}>
          <label style={{ display: "none" }}>username</label>
          <input
            type="text"
            required
            placeholder="username"
            id="username"
            value={formData.username}
            onChange={handleChange} />
          <label style={{ display: "none" }}>password</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            value={formData.password}
            onChange={handleChange} />
          <input
            type="submit"
            value="Log in" />
        </form>
        <div className="login-form__link">
          Don't have an account?{' '}
          <Link to="/signup">
            <strong>Sign Up!</strong>
          </Link>
        </div>
      </div>
    </div >
  );
};

export default Login;