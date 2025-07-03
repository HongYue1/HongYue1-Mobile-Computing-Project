import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useUser } from "./UserContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useUser();
  const prevUserId = useRef();

  // Load cart from Firestore on login
  useEffect(() => {
    const fetchCart = async () => {
      if (user && user.isAuthenticated && user.uid) {
        try {
          const cartRef = doc(db, "carts", user.uid);
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            setCartItems(cartSnap.data().items || []);
          } else {
            setCartItems([]);
          }
        } catch (e) {
          console.warn("Failed to load cart from Firestore:", e);
        }
      } else if (prevUserId.current && !user) {
        // Only clear cart if we had a previous user and are now logged out
        setCartItems([]);
      }
    };
    fetchCart();
    prevUserId.current = user?.uid;
  }, [user?.uid]);

  // Save cart to Firestore on change (if logged in and not just logged out)
  useEffect(() => {
    if (!user || !user.isAuthenticated || !user.uid) return;
    if (prevUserId.current !== user.uid && prevUserId.current !== undefined) return;
    const saveCart = async () => {
      try {
        const cartRef = doc(db, "carts", user.uid);
        await setDoc(cartRef, { items: cartItems });
      } catch (e) {
        console.warn("Failed to save cart to Firestore:", e);
      }
    };
    saveCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, user?.uid, user?.isAuthenticated]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const cartItemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartItemCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
