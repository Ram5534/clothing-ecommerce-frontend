// src/pages/Register.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const { guestId } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register({ name: form.name, email: form.email, password: form.password, guestId });
      navigate("/products");
    } catch (err) {
      alert(err?.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="auth-container">
      
      <form onSubmit={submit}>
        <h2>Register</h2>
        <input name="name" placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input name="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        <button className="btn" type="submit">Register</button>
        <p>Already have account? <Link to="/login" className="login-link">Login</Link></p>
      </form>
      
    </div>
  );
}
