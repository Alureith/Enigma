import React from 'react';

const Dashboard = () => {
  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Welcome to Enigma</h1>
        <button style={styles.button}>Create Game</button>
        <button style={styles.button}>Join Game</button>
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundImage: "url('/background.png')", // path to image in /public
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(79, 34, 98, 0.8)',
    padding: '2rem',
    borderRadius: '8px',
    width: '300px',
    color: '#fff',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  },
  heading: {
    marginBottom: '1.5rem',
  },
  button: {
    margin: '10px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#fff',
    color: '#4f2262',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Dashboard;
