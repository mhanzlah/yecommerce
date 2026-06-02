import { useEffect, useState } from "react";
import api from "../api/api";

export const useCategories = (parent = null) => {
  const [all, setAll] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/categories");
        setAll(res.data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch all categories");
        setAll([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

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

  return { all, categories, loading, error };
};
