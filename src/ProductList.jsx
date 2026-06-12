import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedItems, setAddedItems] = useState([]);

  // Example plants to meet the 6 plants / 3 categories requirement
  const plantsArray = [
    { category: "Air Purifying", name: "Snake Plant", price: 15, image: "https://images.unsplash.com/photo-1604762512526-b7ce049b576e?w=500" },
    { category: "Air Purifying", name: "Spider Plant", price: 12, image: "https://images.unsplash.com/photo-1602066477587-9bc4b1f478a3?w=500" },
    { category: "Low Light", name: "ZZ Plant", price: 18, image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=500" },
    { category: "Low Light", name: "Peace Lily", price: 14, image: "https://images.unsplash.com/photo-1593691509543-c20fb5140fc0?w=500" },
    { category: "Pet Friendly", name: "Boston Fern", price: 10, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500" },
    { category: "Pet Friendly", name: "Parlor Palm", price: 16, image: "https://images.unsplash.com/photo-1597055181300-e3633a017488?w=500" }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems((prev) => [...prev, plant.name]);
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div>
          <a href="/">Home</a> | <a href="/plants">Plants</a> | <a href="/cart">Cart ({totalCartItems})</a>
        </div>
      </nav>
      
      <div className="product-grid">
        {plantsArray.map((plant, index) => (
          <div key={index} className="product-card" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', textAlign: 'center' }}>
            <img src={plant.image} alt={plant.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            <h3>{plant.name}</h3>
            <p>${plant.price}</p>
            <button 
              disabled={addedItems.includes(plant.name)} 
              onClick={() => handleAddToCart(plant)}
            >
              {addedItems.includes(plant.name) ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProductList;
