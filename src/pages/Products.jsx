// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page:1, limit:20, total:0 });

  const load = async (params = {}) => {
    try {
      const qs = new URLSearchParams(params).toString();
      const res = await API.get("/api/products" + (qs ? `?${qs}` : ""));
      // backend returns { items, total, page, limit }
      const data = res.data;
      setProducts(data.items || data);
      setMeta({ page: data.page || 1, limit: data.limit || 20, total: data.total || (data.items?data.items.length:0) });
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="products-container">
      <h2>Products</h2>
      <Filters onApply={load} />
      <div className="products-grid">
        {products.map(p => <ProductCard key={p._id} p={p} />)}
      </div>
    </div>
  );
}
