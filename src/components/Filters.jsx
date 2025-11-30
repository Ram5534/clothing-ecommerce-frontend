// src/components/Filters.jsx
import React, { useState } from "react";

export default function Filters({ onApply }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const apply = (e) => {
    e.preventDefault();
    onApply({ search, category, brand, min, max });
  };

  return (
    <form className="filters" onSubmit={apply}>
      <input placeholder="Search..."  value={search} onChange={e => setSearch(e.target.value)} />
      <input placeholder="Category"  value={category} onChange={e => setCategory(e.target.value)} />
      <input placeholder="Brand"  value={brand} onChange={e => setBrand(e.target.value)} />
      <input placeholder="min"  value={min} onChange={e => setMin(e.target.value)}  />
      <input placeholder="max"  value={max} onChange={e => setMax(e.target.value)}  />
      <button className="btn" type="submit">Apply</button>
    </form>
  );
}
