import { useEffect, useState } from "react";
import api from "../api/api";

export const useProducts = (category, filters) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const query = new URLSearchParams();

        if (category) query.append("category", category);
        if (filters?.price) query.append("price", filters.price);
        if (filters?.sort) query.append("sort", filters.sort);

        const res = await api.get(`/products?${query.toString()}`);

        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, filters]);

  return { products, loading, error };
};
