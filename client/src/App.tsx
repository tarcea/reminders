import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AllLists from './components/AllLists';
import Landing from './components/Landing';
import List from './components/List';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/lists' element={<AllLists />} />
      {/* <Route path='/:listName' element={<List />} /> */}
    </Routes>
  );
}

export default App;
