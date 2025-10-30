import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { products } from "../assets/assets";

// context/ShopContext.jsx

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // ✅ Initialisation du panier depuis localStorage dès le premier rendu
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : {};
  });

  // ✅ Sauvegarde automatique du panier dans localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // 🔹 Ajouter un produit au panier
  const addToCart = (itemId, details) => {
    if (!details) {
      toast.error("Sélectionne les détails du produit");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][details] = (cartData[itemId][details] || 0) + 1;
    } else {
      cartData[itemId] = { [details]: 1 };
    }

    setCartItems(cartData);
    toast.success("Produit ajouté au panier 🛒");
  };

  // 🔹 Obtenir le nombre total de produits dans le panier
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, itemGroup) => {
      return total + Object.values(itemGroup).reduce((a, b) => a + b, 0);
    }, 0);
  };

  // 🔹 Mettre à jour la quantité d’un produit
  const updateQuantity = (itemId, details, quantity) => {
    const cartData = structuredClone(cartItems);
    if (quantity <= 0) {
      delete cartData[itemId][details];
      if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
    } else {
      cartData[itemId][details] = quantity;
    }
    setCartItems(cartData);
  };

  // 🔹 Obtenir le montant total du panier
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => p._id === itemId);
      if (!itemInfo) continue;

      for (const detail in cartItems[itemId]) {
        totalAmount += itemInfo.price * cartItems[itemId][detail];
      }
    }
    return totalAmount;
  };

  // 🔹 Vider le panier
  const clearCart = () => {
    setCartItems({});
    toast.info("Panier vidé 🗑️");
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    clearCart,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
