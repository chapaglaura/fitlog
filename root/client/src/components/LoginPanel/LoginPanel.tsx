import { useState } from 'react';
import axios from 'axios';
import styles from './LoginPanel.module.scss';

export const LoginPanel = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitLogin = () => {
    axios.post('/api/users/login').then(({ data: user }) => {});
  };

  return (
    <div className={styles.login}>
      <h1>User Login</h1>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="text"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
      <p>
        <span>Don't have an account yet? Create one.</span>
      </p>
    </div>
  );
};
