import React, { useState } from 'react';

function Auth() {
  // Toggle state: true = login, false = register.
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const url = isLogin
      ? 'http://localhost:4000/user/login'
      : 'http://localhost:4000/user/register';

    // For login: { username, password }
    // For register: { username, email, password }
    const payload = isLogin
      ? { username, password }
      : { username, email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || 'Operation failed');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Enigma<br />The trivia game</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              {isLogin ? 'Username' : 'Username'}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          {/* Only show email field if registering */}
          {!isLogin && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
          )}
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
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
        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={toggleForm} style={styles.toggleButton}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
        {message && <p style={styles.message}>{message}</p>}
      </div>
      {/* You can place an image or additional content on the right if desired */}
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: "url('/background.png')", // Put your image in public folder as background.jpg
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    // Justify content left so the container is on the left
    // If you want it strictly pinned to left, set `justifyContent: 'flex-start'`
    justifyContent: 'flex-start',
  },
  container: {
    // Purple with some translucency
    backgroundColor: 'rgba(79, 34, 98, 0.8)', // #4f2262 at 80% opacity
    padding: '2rem',
    borderRadius: '8px',
    width: '300px',
    marginLeft: '3rem',
    color: '#fff', // White text for contrast
    // Optional: box shadow or border for styling
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  },
  heading: {
    margin: 0,
    marginBottom: '1rem',
    fontSize: '1.5rem',
    textAlign: 'center',
    lineHeight: '1.2',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.25rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  submitButton: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#fff',
    color: '#4f2262',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  toggleText: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  toggleButton: {
    marginLeft: '0.5rem',
    padding: '0.25rem 0.5rem',
    backgroundColor: 'transparent',
    border: '1px solid #fff',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
};

export default Auth;
