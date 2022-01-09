import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './styles/Landing.css'

const About: FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <div>
      <div className="landing__container">
        <h4>Reminder App</h4>
        <p> With this app, you can create lists of tasks.<br /><br />
          In order to create your own lists, you have to login, if you already have an account, or sign up if not.<br />
          If you just want to see a demo, you can use the demo account: username: <b>petrus</b>, password: <b>123456</b><br /><br />
          After authentication, you can create your own lists and add tasks on those.<br />
          On each list you can see when it was created or updated.<br />
          If you click edit on the list, you can add/edit/delete tasks, inside that particular list.<br />
          The status of a task can be toggled by clicking on it. When a task is marked as done, it moves to the end of the list.<br />
          The list editing can be done in parallel by different users by sharing the list url.<br />
          You can see every time how many tasks do you have in a certain list, in the bottom-right corner of the screen, in a total/done type of report.</p>
        <a href='https://github.com/tarcea' target='_new' >Github</a>
        <div className="landing__link">
          <Link to='/login' className="landing__link_a">let's get started</Link>
        </div>
      </div>
      {/* <h5>&copy; Gheorghe Tarcea {currentYear}</h5> */}
    </div>
  )
};

export default About;