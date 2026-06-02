import { createContext, useContext, useEffect, useState } from "react";

const BagContext = createContext();

export const useBag = () => useContext(BagContext);

export const BagProvider = ({ children }) => {
  const [bag, setBag] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedBag = localStorage.getItem("bag");

    if (storedBag) {
      setBag(JSON.parse(storedBag));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("bag", JSON.stringify(bag));
    }
  }, [bag, loading]);

  const addToBag = (product, size, quantity = 1) => {
    setBag((prev) => {
      const existing = prev.find(
        (item) => item.product._id === product._id && item.size === size,
      );

      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prev, { product, size, quantity }];
    });
  };

  const removeFromBag = (productId, size) => {
    setBag((prev) =>
      prev.filter(
        (item) => !(item.product._id === productId && item.size === size),
      ),
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    setBag((prev) =>
      prev.map((item) =>
        item.product._id === productId && item.size === size
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearBag = () => setBag([]);

  const bagLength = bag.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BagContext.Provider
      value={{
        bag,
        bagLength,
        loading,
        addToBag,
        removeFromBag,
        updateQuantity,
        clearBag,
      }}
    >
      {children}
    </BagContext.Provider>
  );
};
