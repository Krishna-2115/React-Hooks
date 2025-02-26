import React, { createContext, useState, useContext } from 'react';
import { motion } from 'framer-motion'; // For animations

// 1. Define the roles and permissions for the app
const rolesPermissions = {
  admin: ['viewDashboard', 'editSettings', 'manageUsers'],
  user: ['viewDashboard', 'editSettings'],
  guest: ['viewDashboard'],
};

// 2. Create a context to manage user and permissions
const AppContext = createContext();

// 3. Create a provider to manage and provide the user role
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ role: 'guest' }); // Default role is guest

  const setRole = (role) => {
    setUser({ role });
  };

  // Function to check if the user has a specific permission
  const hasPermission = (permission) => {
    return rolesPermissions[user.role]?.includes(permission);
  };

  return (
    <AppContext.Provider value={{ user, setRole, hasPermission }}>
      {children}
    </AppContext.Provider>
  );
};

// 4. Custom hook to use app context
export const useAppContext = () => useContext(AppContext);

// 5. User Role Selector Component (for changing the user role)
const RoleSelector = () => {
  const { setRole } = useAppContext();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div style={{ marginBottom: '20px', fontSize: '16px' }}>
      <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Select User Role:</label>
      <select onChange={handleRoleChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
        <option value="guest">Guest</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

// 6. Dashboard Component (accessible by all roles)
const Dashboard = () => {
  const { user } = useAppContext();

  return (
    <motion.div
      style={{
        backgroundColor: '#fff',
        padding: '20px',
        marginTop: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '600px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 style={{ fontSize: '2em' }}>Dashboard</h1>
      <p style={{ fontSize: '1.2em' }}>Welcome, {user.role}!</p>
    </motion.div>
  );
};

// 7. Settings Component (only accessible by users with 'editSettings' permission)
const Settings = () => {
  const { hasPermission } = useAppContext();

  if (!hasPermission('editSettings')) {
    return <p style={{ fontSize: '1.1em', color: '#ff3d00' }}>You do not have permission to access settings.</p>;
  }

  return (
    <motion.div
      style={{
        backgroundColor: '#e3f2fd',
        padding: '20px',
        marginTop: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '600px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ fontSize: '1.8em' }}>Settings</h2>
      <p style={{ fontSize: '1.1em' }}>Here you can modify your settings.</p>
    </motion.div>
  );
};

// 8. Admin Panel Component (only accessible by admins)
const AdminPanel = () => {
  const { hasPermission } = useAppContext();

  if (!hasPermission('manageUsers')) {
    return <p style={{ fontSize: '1.1em', color: '#ff3d00' }}>You do not have permission to access the Admin Panel.</p>;
  }

  return (
    <motion.div
      style={{
        backgroundColor: '#fce4ec', // Pink background for admin panel
        padding: '20px',
        marginTop: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '600px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ fontSize: '1.8em' }}>Admin Panel</h2>
      <p style={{ fontSize: '1.1em' }}>Manage users and settings.</p>
    </motion.div>
  );
};

// 9. Main App Component to manage the layout and components
const App = () => {
  return (
    <AppProvider>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <RoleSelector />
        <Dashboard />
        <Settings />
        <AdminPanel />
      </div>
    </AppProvider>
  );
};

export default App;
