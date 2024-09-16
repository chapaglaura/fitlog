import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('/api/users').then((res) => {
      console.log(res);
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
      <button onClick={handleButtonClick}>ADD USER</button>
      <input type="text" name="username" id="username" />
      <input type="text" name="password" id="password" />
    </div>
  );
}

export default App;
