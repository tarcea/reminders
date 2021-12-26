import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const About: FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <div>
      <h1>About</h1>
      <a href='https://github.com/tarcea/reminders' target='_new' >Github</a>
      <h5>&copy; Gheorghe Tarcea {currentYear}</h5>
    </div>
  )
};

export default About;