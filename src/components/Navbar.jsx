// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const count = (cart.items || []).reduce((s, it) => s + (it.quantity || 0), 0);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div><Link to="/" className="logo">Clothify</Link></div>
      <div className="nav-links">
        <Link to="/products" className="links">Products</Link>
        <Link to="/cart" className="links">Cart ({count})</Link>
        {user ? (
          <>
            <span className="nav-user">Hi, {user.name || user.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="links">Login</Link>
            <Link to="/register" className="links">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
