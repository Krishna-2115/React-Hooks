import React, { useState, useEffect, createContext, useContext } from 'react';

// Step 1: Create the AuthContext
const AuthContext = createContext();

// Step 2: Create the AuthProvider to manage authentication state
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Mock API for login (replace with actual API in production)
  const login = (username, password) => {
    if (username === 'admin' && password === 'password') {
      setUser({ username: 'admin', role: 'admin' });
      localStorage.setItem('user', JSON.stringify({ username: 'admin', role: 'admin' }));
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore the user on page reload
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Step 3: Create a custom hook to access authentication state and functions
const useAuth = () => {
  return useContext(AuthContext);
};

// Step 4: Create components for Login and Profile UI

// Login Component
const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    setUsername(''); // Reset username field
    setPassword(''); // Reset password field
  };

  return (
    <div style={styles.authContainer}>
      <h2 style={styles.authHeader}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={styles.inputField}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={styles.inputField}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

// Profile Component (Only accessible when logged in)
const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div style={styles.profileContainer}>
      {user ? (
        <>
          <h2 style={styles.profileHeader}>Welcome, {user.username}!</h2>
          <p style={styles.roleText}>Role: {user.role}</p>
          <button onClick={logout} style={styles.button}>
            Logout
          </button>
        </>
      ) : (
        <h2 style={styles.profileHeader}>Please log in to view your profile.</h2>
      )}
    </div>
  );
};

// Step 5: Wrap the entire app with the AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <div style={styles.appContainer}>
        <Login />
        <Profile />
      </div>
    </AuthProvider>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(45deg, #3b5998, #8b9dc3)',
    fontFamily: 'Poppins, sans-serif',
    padding: '20px',
    transition: 'background 0.3s ease',
  },
  authContainer: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '400px',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
  },
  authHeader: {
    textAlign: 'center',
    fontSize: '28px',
    color: '#333',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputField: {
    padding: '12px 18px',
    fontSize: '16px',
    border: '2px solid #ccc',
    borderRadius: '8px',
    marginBottom: '15px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  inputFieldFocus: {
    borderColor: '#3498db',
  },
  button: {
    padding: '12px',
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    marginTop: '20px',
  },
  profileHeader: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  roleText: {
    textAlign: 'center',
    color: '#888',
    fontSize: '18px',
  },
};

export default App;
