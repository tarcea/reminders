import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Landing.css';

const Landing = () => {
  return (
    <div className="landing__container">
      <h4>Reminder App</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <div className="landing__link">
        <Link to='/login' className="landing__link_a">let's get started</Link>
      </div>
    </div>
  );
};

export default Landing;