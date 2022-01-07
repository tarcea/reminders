import React, { FC } from 'react';
import './styles/Footer.css'
import './styles/Nav.css';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__container">
        <h5>&copy; Gheorghe Tarcea {currentYear}</h5>
      </div>
    </footer>
  );
}

export default Footer;