import React, { FC, useState, FormEvent } from 'react';
import './styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Message from './Message';
import { signup } from '../Api';

const Signup: FC = () => {
  const initialState: Omit<IUser, '_id'> = { username: '', password: '', email: '' };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState('');
  const { username, password, email } = formData;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(username, password, email)
    setFormData(initialState);
    setMessage('account created');
    navigate('/lists');
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <div className="login-form__container">
      <div className="login-form__inner-container">
        <h2 className="login-form__header">
          Sign up
        </h2>
        {message && <Message message={message} setMessage={setMessage} />}
        <form onSubmit={handleSubmit}>
          <label style={{ display: "none" }}>username</label>
          <input
            type="text"
            required
            placeholder="username"
            id="username"
            value={formData.username}
            onChange={handleChange} />
          <label style={{ display: "none" }}>email</label>
          <input
            type="email"
            placeholder="email"
            id="email"
            value={formData.email}
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
            value="Sign Up" />
        </form>
        <div className="login-form__link">
          Already have an account?{' '}
          <Link to="/login">
            <strong>Log in!</strong>
          </Link>
        </div>
      </div>
    </div >
  );
};

export default Signup;