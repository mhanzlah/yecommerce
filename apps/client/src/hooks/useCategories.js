import { useEffect, useState } from "react";
import api from "../api/api";

export const useCategories = (parent = null) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = "/categories/parent";

        if (parent) {
          url = `/categories/subcategories/${parent}`;
        }

        const res = await api.get(url);
        setCategories(res.data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch categories");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [parent]);

  return { categories, loading, error };
};
