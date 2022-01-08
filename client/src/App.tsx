import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AllLists from './components/AllLists';
import List from './components/List';
import About from './components/About';
import FourOFour from './components/FourOFour';
import Footer from './components/Footer';
import Login from './components/Login';
import Nav from './components/Nav';
import Signup from './components/Signup';
import { UserContext } from './contexts/UserContext';

const App = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({ token: '', userId: '', username: '' });

  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser, setCurrentUser])

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')!);
    const userId = JSON.parse(localStorage.getItem('userId')!)
    const username = JSON.parse(localStorage.getItem('username')!)
    setCurrentUser({ token, userId, username });
  }, []);

  return (
    <>
      <UserContext.Provider value={value}>
        <Nav />
        <main className="app__body">
          <Routes>
            <Route path='/' element={<Login />} />
            <Route
              path='/lists'
              element={
                localStorage.token
                  ? <AllLists />
                  : <Login />
              }
            />
            <Route
              path='/lists/:listId'
              element={<List />}
            />
            <Route
              path='/about'
              element={<About />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/signup'
              element={<Signup />}
            />
            <Route
              path="*"
              element={<FourOFour />}
            />
          </Routes>
        </main>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
