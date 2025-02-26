import React, { createContext, useContext, useState } from 'react';

// Create Cart Context
const CartContext = createContext();

// Cart Provider to wrap the app and manage cart state
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addItem = (item) => {
    setCart([...cart, item]);
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// Product Component
const Product = ({ item }) => {
  const { addItem } = useContext(CartContext);

  return (
    <div style={styles.productCard}>
      <h3>{item.name}</h3>
      <p>₹{item.price}</p>
      <button onClick={() => addItem(item)} style={styles.addButton}>
        Add to Cart
      </button>
    </div>
  );
};

// Cart Component
const Cart = () => {
  const { cart, removeItem, totalPrice } = useContext(CartContext);

  return (
    <div style={styles.cartContainer}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} style={styles.cartItem}>
            <span>{item.name} - ₹{item.price}</span>
            <button onClick={() => removeItem(item.id)} style={styles.removeButton}>Remove</button>
          </div>
        ))
      )}
      <h3>Total: ₹{totalPrice}</h3>
    </div>
  );
};

// Main App Component
const App = () => {
  const products = [
    { id: 1, name: "Laptop", price: 60000 },
    { id: 2, name: "Smartphone", price: 25000 },
    { id: 3, name: "Headphones", price: 3000 },
  ];

  return (
    <CartProvider>
      <div style={styles.container}>
        <h1 style={styles.title}>Shopping Cart</h1>
        <div style={styles.productList}>
          {products.map((product) => (
            <Product key={product.id} item={product} />
          ))}
        </div>
        <Cart />
      </div>
    </CartProvider>
  );
};

// Styles for UI
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "800px",
    margin: "50px auto",
    background: "#f9f9f9",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  productList: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  productCard: {
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  addButton: {
    padding: "10px 20px",
    background: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cartContainer: {
    marginTop: "30px",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  removeButton: {
    padding: "5px 15px",
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
