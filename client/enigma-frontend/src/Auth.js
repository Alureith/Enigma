import React, { useState } from 'react';

const Auth = () => {
  // State to determine whether to show the login or registration form
  const [isLogin, setIsLogin] = useState(true);

  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Field specific to registration (and also used in login now) for username
  const [username, setUsername] = useState('');

  // States for messages and errors
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Toggle between login and registration forms
  const handleToggle = () => {
    setIsLogin(!isLogin);
    setMessage('');
    setError('');
  };

  // Handle form submission for login or registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Determine the correct endpoint URL and payload based on form type
    const url = isLogin
      ? 'http://localhost:4000/user/login'
      : 'http://localhost:4000/user/register';

    // For both login and registration, we're sending username, email, and password.
    // (You may decide to only require username and password for login.)
    const payload = isLogin
      ? { username, password }  // For login, we're using username for identification
      : { username, email, password };

    try {
      // Send a POST request with the payload as JSON
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      // Update the message or error state based on response
      if (response.ok) {
        setMessage(data.message);
        // Optionally, store the token: localStorage.setItem('token', data.token);
      } else {
        setError(data.error || 'Operation failed');
      }
    } catch (err) {
      setError('An error occurred: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      {/* Toggle button */}
      <button onClick={handleToggle} style={styles.toggleButton}>
        {isLogin ? 'Switch to Registration' : 'Switch to Login'}
      </button>
      
      {/* Display error or success messages */}
      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.success}>{message}</p>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Always show username field */}
        <div style={styles.formGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        
        {/* Registration-only field: email */}
        {!isLogin && (
          <div style={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
        )}
        
        {/* Common field: password */}
        <div style={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        
        <button type="submit" style={styles.submitButton}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '1rem',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  toggleButton: {
    marginBottom: '1rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
  form: {
    textAlign: 'left',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  submitButton: {
    padding: '0.5rem 1rem',
    width: '100%',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
};

export default Auth;
