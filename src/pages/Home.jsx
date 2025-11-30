// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Clothify</h1>
      <p>Simple MERN clothing e-commerce demo.</p>
      <Link to="/products" className="btn">Browse Products</Link>
    </div>
  );
}
