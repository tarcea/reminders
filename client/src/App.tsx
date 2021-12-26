import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AllLists from './components/AllLists';
import Landing from './components/Landing';
import List from './components/List';
import About from './components/About';

const App = () => {
  const [currentId, setCurrentId] = useState<string>('');

  return (
    <div>
      <nav>
        <ul>
          <li><Link to={'/'}>home</Link></li>
          <li><Link to={'/lists'}>lists</Link></li>
          <li><Link to={'/about'}>about</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/lists' element={<AllLists setCurrentId={setCurrentId} currentId={currentId} />} />
        <Route path='/lists/:listId' element={<List currentId={currentId} />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
