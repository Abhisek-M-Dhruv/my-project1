import Homecontaint from "../Components/homeContaint/Homecontaint";
import Cart from "../Components/cart/Cart";
import Navbar from "../Components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";

export const MainRoutes = () => {
  const [cart, setCart] = useState({});

  const addToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: { ...product, qty: 1 },
    }));
  };

  const updateQty = (id, change) => {
    setCart((prev) => {
      const current = prev[id];
      if (!current) return prev;
      const newQty = current.qty + change;
      if (newQty <= 0) {
        // remove from cart
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...current, qty: newQty } };
    });
  };

  const cartItemCount = Object.values(cart).reduce(
    (acc, item) => acc + item.qty,
    0
  );
  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <Routes>
        <Route
          path="/"
          element={
            <Homecontaint
              cart={cart}
              addToCart={addToCart}
              updateQty={updateQty}
            />
          }
        >
          Home page
        </Route>
        <Route
          path="/cart"
          element={<Cart cart={cart} updateQty={updateQty} setCart={setCart} />}
        ></Route>
      </Routes>
    </>
  );
};
