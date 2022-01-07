import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './styles/Landing.css'

const About: FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <div>
      <div className="landing__container">
        <h4>Reminder App</h4>
        <p>This web application is built using NodeJS, Express, MongoDB and Mongoose for bac-kend and React for front-end. The whole project is using Typescript as well.The deployement is done with Heroku and Netlify. For styling I used BEM.</p>
        <p>With this app, you can create lists of tasks. When you click on a task, the status is toggled in done and the task it is automatically moved to the end of the list. You can edit your tasks, add cost for each of them or a description.</p>
        <div className="landing__link">
          <Link to='/login' className="landing__link_a">let's get started</Link>
        </div>
      </div>
      <a href='https://github.com/tarcea/reminders' target='_new' >Github</a>
      <h5>&copy; Gheorghe Tarcea {currentYear}</h5>
    </div>
  )
};

export default About;