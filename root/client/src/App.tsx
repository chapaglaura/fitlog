import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { SidePanel } from './components/SidePanel/SidePanel';
import { MainPanel } from './components/MainPanel/MainPanel';
import { LoginPanel } from './components/LoginPanel/LoginPanel';
import { AuthGuard } from './contexts/AuthProvider/AuthGuard';
import { AuthProvider } from './contexts/AuthProvider/AuthProvider';

const App = () => {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    axios.get('/api/users/login').then(({ data: user }) => {
      console.log(user);
      if (user) {
        setUserSession(user);
      }
    });
  }, []);

  const handleButtonClick = () => {
    axios.post('/api/users', {
      username: 'hola',
      password: 'momomo',
    });
  };
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPanel />} />
            <Route element={<AuthGuard />}>
              <Route
                path="/dashboard"
                element={
                  <>
                    <SidePanel />
                    <MainPanel />
                  </>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
