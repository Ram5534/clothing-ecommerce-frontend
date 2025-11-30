// src/pages/ProductDetail.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  if (!product) return <div style={{padding:20}}>Loading...</div>;

  const img = product.image ? `${import.meta.env.VITE_API_URL?.replace('/api','')||'http://localhost:5000'}/${product.image}` : null;

  return (
    <div className="product-detail" >
      {img ? <img src={img} alt={product.title} /> : <div className="no-img" />}
      <div className="details">
        <h2>{product.title}</h2>
        <p className="price">₹{product.price}</p>
        <p>{product.description}</p>
        <div>
          <input type="number" min="1" value={qty} onChange={e=>setQty(Number(e.target.value)||1)} />
          <button className="btn" onClick={()=>addToCart(product._id, qty)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
