import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './LoginPanel.module.scss';
import { useAuth } from '../../contexts/AuthProvider/AuthProvider';

export const LoginPanel = () => {
  const { authenticateUser } = useAuth();

  const [hasAccount, setHasAccount] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authenticateUser) {
      return;
    }

    axios.get('/api/users/login').then(({ data: user }) => {
      if (user) {
        authenticateUser(true);
        return;
      }
      setLoading(true);
    });
  }, [authenticateUser]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (hasAccount) {
      axios
        .post('/api/users/login', { username, password })
        .then(({ data }) => {
          if (data.error) {
            // Handle error;
            setError(data.error.message);
            return;
          }
          setError('');
          authenticateUser(true);
        });
    } else {
      axios
        .post('/api/users/signup', { username, password })
        .then(({ data }) => {
          if (data.error) {
            // Handle error;
            setError(data.error.message);
            return;
          }
          setError('');
          setHasAccount(true);
        });
    }
  };

  const handleSwitch = () => {
    setHasAccount((prev) => !prev);
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <div className={styles.login}>
      {!loading && (
        <>
          <p className={styles.error}>{error}</p>
          <h1>{hasAccount ? 'User Login' : 'User Signup'}</h1>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={styles['submit-button']}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <p>
            {hasAccount
              ? "Don't have an account yet?"
              : 'Already have an account?'}
            &nbsp;
            <span onClick={handleSwitch}>
              {hasAccount ? 'Create one.' : 'Sign in.'}
            </span>
          </p>
        </>
      )}
    </div>
  );
};
