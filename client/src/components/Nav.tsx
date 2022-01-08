import React, { FC, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../Api';
import { UserContext } from '../contexts/UserContext';
import './styles/Nav.css';

const Nav: FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext)!;
  const { username } = currentUser;

  return (
    <header>
      <nav className='nav__container'>
        <div className="nav__logo">GT</div>
        <div className="nav__username">{username}</div>
        <ul className='nav__list'>
          {/* <li><Link to={'/'}>home</Link></li> */}
          {currentUser.token && <li><Link to={'/lists'}>lists</Link></li>}
          <li><Link to={'/about'}>about</Link></li>
          {currentUser.token ?
            <li
              onClick={() => logOut(setCurrentUser, navigate)}
            >
              logout
            </li> :
            <li
              onClick={() => navigate('/login')}
            >
              login
            </li>
          }
        </ul>
      </nav>
    </header>
  );
}

export default Nav;