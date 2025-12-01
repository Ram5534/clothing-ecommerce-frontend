// src/pages/OrderSuccess.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

export default function OrderSuccess() {
  const { id } = useParams(); // route: /order-success/:id
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/api/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  if (!order) return <div style={{padding:20}}>Loading...</div>;

  return (
    <div style={{padding:20}}>
      <div className="success">
        <h2>Order Confirmed</h2>
        <p>Order ID: <strong>{order._id}</strong></p>
        <p>Total: ₹{order.total}</p>
        <p>We've sent a confirmation email to {order.email}</p>
        <Link to="/products" className="btn">Continue shopping</Link>
      </div>
    </div>
  );
}
