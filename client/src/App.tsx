import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AllLists from './components/AllLists';
import Landing from './components/Landing';
import List from './components/List';

const App = () => {
  const [currentId, setCurrentId] = useState<string>('');

  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/lists' element={<AllLists setCurrentId={setCurrentId} currentId={currentId} />} />
      <Route path='/lists/:listId' element={<List currentId={currentId} />} />
    </Routes>
  );
}

export default App;
