// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const GUEST_KEY = "guest_cart_id";

function makeGuestId() {
  const id = "guest_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
  localStorage.setItem(GUEST_KEY, id);
  return id;
}

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [] });
  const [guestId, setGuestId] = useState(localStorage.getItem(GUEST_KEY) || makeGuestId());

  // load cart
  const loadCart = async () => {
    try {
      const params = user ? {} : { guestId };
      const res = await API.get("/cart", { params });
      // backend returns cart or { items: [] }
      const c = res.data || { items: [] };
      setCart(c);
    } catch (err) {
      console.error("Load cart:", err?.response?.data || err.message);
      setCart({ items: [] });
    }
  };

  // when app starts
  useEffect(() => {
    loadCart();
    // eslint-disable-next-line
  }, []);

  // when user logs in, merge guest cart with user's cart on backend and reload
  useEffect(() => {
    const mergeAndLoad = async () => {
      if (user) {
        try {
          await API.post("/cart/merge", { guestId }); // requires cookie (user)
        } catch (err) {
          console.error("Merge cart failed", err?.response?.data || err.message);
        } finally {
          // new cart belongs to user now
          // create new guestId for future guests
          const newGuest = makeGuestId();
          setGuestId(newGuest);
          await loadCart();
        }
      } else {
        await loadCart();
      }
    };
    mergeAndLoad();
    // eslint-disable-next-line
  }, [user]);

  const addToCart = async (productId, qty = 1) => {
    try {
      const body = { productId, qty };
      if (!user) body.guestId = guestId;
      const res = await API.post("/cart/add", body);
      setCart(res.data);
      return res.data;
    } catch (err) {
      console.error("Add cart error", err?.response?.data || err.message);
      throw err;
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      const body = { itemId, quantity };
      if (!user) body.guestId = guestId;
      const res = await API.put("/cart/update", body);
      setCart(res.data);
      return res.data;
    } catch (err) {
      console.error("Update item error", err?.response?.data || err.message);
      throw err;
    }
  };

  const removeItem = async (itemId) => {
    try {
      const body = { itemId };
      if (!user) body.guestId = guestId;
      const res = await API.delete("/cart/remove", { data: body });
      setCart(res.data);
      return res.data;
    } catch (err) {
      console.error("Remove item error", err?.response?.data || err.message);
      throw err;
    }
  };

  const clearCartLocal = () => setCart({ items: [] });

  return (
    <CartContext.Provider value={{ cart, guestId, addToCart, updateItem, removeItem, loadCart, clearCartLocal }}>
      {children}
    </CartContext.Provider>
  );
};
