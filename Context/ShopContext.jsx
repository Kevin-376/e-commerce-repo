import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log("Fetching products from API...");
        const response = await fetch(`${API_BASE_URL}/api/products`);
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Products fetched:", data.length);
        // Map API data to match frontend expectations: use id_num as id
        const mappedData = data.map(product => ({ ...product, id: product.id_num }));
        setAllProduct(mappedData);
        // Initialize cart with product ids
        let cart = {};
        for (let product of mappedData) {
          cart[product.id] = 0;
        }
        setCartItems(cart);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Check authentication status
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsLoggedIn(true);
      // You could decode the token to get user info, but for now just set logged in status
    }

    fetchProducts();
  }, [API_BASE_URL]);

  const addToCart = (itemId, quantity = 1) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + quantity }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const currentQty = prev[itemId] || 0;
      if (currentQty <= 0) return prev;
      return { ...prev, [itemId]: currentQty - 1 };
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        setIsLoggedIn(true);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        setIsLoggedIn(true);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Signup failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setIsLoggedIn(false);
    setUser(null);
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    loading,
    error,
    isLoggedIn,
    user,
    login,
    signup,
    logout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
