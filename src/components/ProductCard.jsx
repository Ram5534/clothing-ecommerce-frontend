// src/components/ProductCard.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ p }) {
  const { addToCart, guestId } = useContext(CartContext);
  const base = import.meta.env.VITE_API_URL;
  const img = p.image ? `${base}/${p.image}` : null;


  const handleAdd = async () => {
    try {
      await addToCart(p._id, 1);
      alert("Added to cart");
    } catch {
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="product-card">
      {img ? <img src={img} alt={p.title} /> : <div className="no-img" />}
      <div className="info">
        <h3>{p.title}</h3>
        <p className="brand">{p.brand}</p>
        <p className="price">₹{p.price}</p>
        <div className="card-actions">
          <Link to={`/products/${p._id}`} className="btn">View</Link>
          <button onClick={handleAdd} className="btn">Add</button>
        </div>
      </div>
    </div>
  );
}
