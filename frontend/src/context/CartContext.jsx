import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    orderSummary: null,
    orderResult: null,
    customerInfo: null,
  });

  const addToCart = (product, variant, quantity) => {
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.id === product.id && item.variant.id === variant.id
    );

    let newItems;
    if (existingItemIndex > -1) {
      newItems = [...cart.items];
      newItems[existingItemIndex].quantity += quantity;
    } else {
      newItems = [...cart.items, { product, variant, quantity }];
    }

    const subtotal = calculateSubtotal(newItems);
    const totalItems = calculateTotalItems(newItems);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = 12.99;
    const total = subtotal + tax + shipping;

    setCart({
      ...cart,
      items: newItems,
      orderSummary: {
        totalItems,
        subtotal,
        tax,
        shipping,
        total,
      },
    });
  };

  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const calculateTotalItems = (items) => {
    return items.reduce((total, item) => total + (total + item.quantity), 0);
  };

  const removeFromCart = (productId, variantId) => {
    const newItems = cart.items.filter(
      (item) => !(item.product.id === productId && item.variant.id === variantId)
    );

    if (newItems.length === 0) {
      setCart({
        items: [],
        orderSummary: null,
        orderResult: null,
        customerInfo: null,
      });
      return;
    }

    const subtotal = calculateSubtotal(newItems);
    const tax = subtotal * 0.08;
    const shipping = 12.99;
    const total = subtotal + tax + shipping;

    setCart({
      ...cart,
      items: newItems,
      orderSummary: {
        subtotal,
        tax,
        shipping,
        total,
      },
    });
  };

  const updateQuantity = (productId, variantId, quantity) => {
    const newItems = cart.items.map((item) => {
      if (item.product.id === productId && item.variant.id === variantId) {
        return { ...item, quantity };
      }
      return item;
    });

    const subtotal = calculateSubtotal(newItems);
    const totalItems = calculateTotalItems(newItems);
    const tax = subtotal * 0.08;
    const shipping = 12.99;
    const total = subtotal + tax + shipping;

    setCart({
      ...cart,
      items: newItems,
      orderSummary: {
        totalItems,
        subtotal,
        tax,
        shipping,
        total,
      },
    });
  };

  const setOrderResult = (result) => {
    setCart((prevCart) => ({
      ...prevCart,
      orderResult: result,
    }));
  };

  const setCustomerInfo = (info) => {
    setCart((prevCart) => ({
      ...prevCart,
      customerInfo: info,
    }));
  };

  const clearCart = () => {
    setCart({
      items: [],
      orderSummary: null,
      orderResult: null,
      customerInfo: null,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        setOrderResult,
        setCustomerInfo,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
