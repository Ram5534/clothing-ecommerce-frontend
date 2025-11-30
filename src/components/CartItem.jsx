// src/components/CartItem.jsx
import React from "react";

export default function CartItem({ item, onUpdateQty, onRemove }) {
  // item.productId may be an object (populated) or just id
  const product = item.productId || item.product;
  const img = product?.image ? `${import.meta.env.VITE_API_URL?.replace('/api','')||'http://localhost:5000/api'}/${product.image}` : null;

  return (
    <div className="cart-item">
      {img ? <img src={img} alt={product?.title} /> : <div className="no-img" />}
      <div className="cart-item-info">
        <h4>{product?.title || "Product"}</h4>
        <p>Price: ₹{product?.price ?? "-"}</p>
        <div className="cart-actions">
          <button onClick={() => onUpdateQty(item._id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdateQty(item._id, item.quantity + 1)}>+</button>
        </div>
        <button className="remove-btn" onClick={() => onRemove(item._id)}>Remove</button>
      </div>
    </div>
  );
}
