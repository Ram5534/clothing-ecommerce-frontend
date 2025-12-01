// src/pages/Checkout.jsx
import React, { useContext, useState } from "react";
import API from "../services/api";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, guestId, clearCartLocal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const navigate = useNavigate();

  const total = (cart.items || []).reduce((s, it) => {
    const price = it.productId?.price ?? it.price ?? 0;
    return s + (price * it.quantity);
  }, 0);

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place the order");
      navigate("/login");
      return;
    }

    try {
      const items = (cart.items || []).map(it => ({
        productId: it.productId._id || it.productId,
        quantity: it.quantity
      }));

      // FIXED URL
      const res = await API.post("/api/orders", {
        items,
        total,
        name,
        email,
        guestId
      });

      clearCartLocal();
      navigate(`/order-success/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-box">
        <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <h3>Total: ₹{total}</h3>
        <button className="btn" onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
}
