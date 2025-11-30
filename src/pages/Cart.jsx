// src/pages/Cart.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function CartPage() {
  const { cart, updateItem, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  const onUpdateQty = (itemId, qty) => {
    if (qty < 1) return;
    updateItem(itemId, qty);
  };

  const onRemove = (itemId) => {
    removeItem(itemId);
  };

  const total = (cart.items || []).reduce((s, it) => {
    const price = it.productId?.price ?? it.price ?? 0;
    return s + (price * it.quantity);
  }, 0);

  return (
    <div className="cart-page" >
      <h2>Your Cart</h2>
      {(cart.items || []).length === 0 ? (
        <div className="empty-cart">Cart is empty</div>
      ) : (
        <>
          {(cart.items || []).map(it => (
            <CartItem key={it._id} item={it} onUpdateQty={onUpdateQty} onRemove={onRemove} />
          ))}
          <div >
            <h3>Total: ₹{total}</h3>
            <button className="btn" onClick={()=>navigate("/checkout")}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
