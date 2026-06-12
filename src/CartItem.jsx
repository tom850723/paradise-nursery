import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h3>Total Cart Amount: ${totalAmount}</h3>
      
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', display: 'flex', gap: '20px' }}>
            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            <div>
              <h3>{item.name}</h3>
              <p>Unit Price: ${item.price}</p>
              <p>Total for Plant: ${item.price * item.quantity}</p>
              
              <button onClick={() => handleDecrement(item)}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
              <br /><br />
              <button onClick={() => dispatch(removeItem(item.name))}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-actions" style={{ marginTop: '20px' }}>
        <button onClick={() => alert("Coming Soon")}>Checkout</button>
        <button style={{ marginLeft: '10px' }}>Continue Shopping</button>
      </div>
    </div>
  );
}
export default CartItem;
