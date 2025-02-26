import React, { createContext, useContext, useState } from 'react';
import { motion } from 'framer-motion';

// Role-based access context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ role: 'guest' });

  const loginAsAdmin = () => setUser({ role: 'admin' });
  const loginAsUser = () => setUser({ role: 'user' });
  const logout = () => setUser({ role: 'guest' });

  return (
    <AuthContext.Provider value={{ user, loginAsAdmin, loginAsUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// Components with role-based rendering
const Dashboard = () => {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="dashboard"
      style={styles.dashboard}
    >
      <h1>Welcome, {user.role.toUpperCase()}</h1>
      {user.role === 'admin' && <AdminPanel />}
      {user.role === 'user' && <UserPanel />}
      {user.role === 'guest' && <GuestPanel />}
    </motion.div>
  );
};

const AdminPanel = () => <div style={styles.panel}>Admin Panel: Manage Users</div>;
const UserPanel = () => <div style={styles.panel}>User Panel: View Reports</div>;
const GuestPanel = () => <div style={styles.panel}>Guest Access: Limited Features</div>;

const Controls = () => {
  const { loginAsAdmin, loginAsUser, logout } = useAuth();

  return (
    <div style={styles.controls}>
      <button onClick={loginAsAdmin} style={styles.button}>Login as Admin</button>
      <button onClick={loginAsUser} style={styles.button}>Login as User</button>
      <button onClick={logout} style={styles.button}>Logout</button>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <div style={styles.app}>
      <Controls />
      <Dashboard />
    </div>
  </AuthProvider>
);

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    background: '#f4f4f4',
  },
  dashboard: {
    marginTop: '20px',
    padding: '20px',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  panel: {
    marginTop: '15px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  controls: {
    marginBottom: '20px',
  },
  button: {
    margin: '5px',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: 'white',
    fontSize: '16px',
  },
};

export default App;
