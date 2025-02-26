import React, { useState, useMemo } from 'react';

// Sample cart data
const initialCartItems = [
  { id: 1, name: 'Laptop', price: 1000, quantity: 1 },
  { id: 2, name: 'Phone', price: 500, quantity: 2 },
  { id: 3, name: 'Headphones', price: 150, quantity: 1 },
];

const taxRate = 0.1; // 10% tax
const discountRate = 0.15; // 15% discount on the total price

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Calculate totals, taxes, and discounts using useMemo for optimization
  const { totalPrice, totalTax, totalDiscount, finalPrice } = useMemo(() => {
    let totalPrice = 0;
    let totalQuantity = 0;
    
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    });

    const totalTax = totalPrice * taxRate;
    const totalDiscount = totalPrice >= 1000 ? totalPrice * discountRate : 0; // Apply discount for orders over $1000
    const finalPrice = totalPrice + totalTax - totalDiscount;

    return { totalPrice, totalTax, totalDiscount, finalPrice };
  }, [cartItems]);

  // Update item quantity
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Shopping Cart</h2>

      {/* Cart Items List */}
      <div style={styles.cartItemsList}>
        {cartItems.map(item => (
          <div key={item.id} style={styles.cartItem}>
            <div style={styles.itemDetails}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </div>
            <div style={styles.quantityContainer}>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                style={styles.quantityButton}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value, 10) || 1)
                }
                style={styles.quantityInput}
              />
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                style={styles.quantityButton}
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              style={styles.removeItemButton}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div style={styles.summaryContainer}>
        <div style={styles.summaryItem}>
          <span>Total Price: </span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div style={styles.summaryItem}>
          <span>Tax (10%): </span>
          <span>${totalTax.toFixed(2)}</span>
        </div>
        <div style={styles.summaryItem}>
          <span>Discount: </span>
          <span>-${totalDiscount.toFixed(2)}</span>
        </div>
        <div style={styles.summaryItem}>
          <h3 style={styles.finalPrice}>
            Final Price: ${finalPrice.toFixed(2)}
          </h3>
        </div>
      </div>

      {/* Checkout Button */}
      <button style={styles.checkoutButton}>Proceed to Checkout</button>
    </div>
  );
};

// Inline styles for a clean and modern UI
const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    fontSize: '2.5em',
    marginBottom: '20px',
  },
  cartItemsList: {
    marginBottom: '40px',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  },
  itemDetails: {
    flex: 2,
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  quantityButton: {
    padding: '8px 12px',
    fontSize: '1.2em',
    cursor: 'pointer',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  quantityInput: {
    width: '50px',
    textAlign: 'center',
    fontSize: '1.2em',
    padding: '5px',
    margin: '0 10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  removeItemButton: {
    padding: '8px 12px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  summaryContainer: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  finalPrice: {
    color: '#4caf50',
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
  checkoutButton: {
    display: 'block',
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1.2em',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '30px',
  },
};

export default ShoppingCart;
