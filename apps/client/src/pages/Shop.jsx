import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { useEffect, useState } from "react";

import api from "../api/api";

const Shop = () => {
  const { parent, category } = useParams();

  const isHomePage = !parent && !category;
  const isParentPage = parent && !category;
  const isCategoryPage = !parent && category;

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [filters, setFilters] = useState({
    price: null,
    sort: "relevance",
  });

  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    try {
      setIsLoading(true);

      if (isHomePage) {
        const { data: cats } = await api.get("/categories/parent");
        setCategories(cats);

        const { data: prods } = await api.get(
          `/products?price=${filters.price}&sort=${filters.sort}`,
        );
        setProducts(prods);
      } else if (isParentPage) {
        const { data: cats } = await api.get(
          `/categories/subcategories/${parent}`,
        );
        setCategories(cats);

        const { data: prods } = await api.get(
          `/products?category=${parent}&price=${filters.price}&sort=${filters.sort}`,
        );
        setProducts(prods);
      } else {
        setCategories([]);
        const { data: prods } = await api.get(
          `/products?category=${category}&price=${filters.price}&sort=${filters.sort}`,
        );
        setProducts(prods);
      }
    } catch (error) {
      setCategories([]);
      setProducts([]);
      console.error(error.message || "Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [parent, category, filters]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="px-4 md:px-8 py-10 md:py-12">
      {isParentPage && (
        <Breadcrumbs
          items={[{ name: "Shop All", to: "/" }, { name: `Shop ${parent}` }]}
        />
      )}

      {/* Header */}
      <div className="mb-12">
        <h1 className="font-druk text-2xl md:text-4xl leading-none">
          Shop{" "}
          <span className="capitalize">
            {category ? category : "Yecommerce"}
          </span>
        </h1>

        {isHomePage && (
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mt-4">
            Modern fashion, curated essentials, and timeless pieces designed for
            everyday living.
          </p>
        )}
      </div>

      {/* Categories + Sort */}
      <div className="mb-10">
        {isHomePage && (
          <h2 className="text-2xl md:text-4xl font-medium mb-5">Categories</h2>
        )}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Categories */}
          {isCategoryPage ? (
            <Breadcrumbs
              items={[
                { name: "Shop clothing", to: "/clothing" },
                { name: `Shop ${category}` },
              ]}
            />
          ) : (
            <ul className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={isHomePage ? cat.name : `/category/${cat.name}`}
                    className="px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-full hover:text-black hover:border-black transition capitalize"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Sort */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 text-sm rounded-full hover:bg-gray-100 transition w-max">
              <select
                id="sort"
                className="bg-transparent outline-none cursor-pointer w-max"
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sort: e.target.value }))
                }
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="az">Sort by A-Z</option>
                <option value="za">Sort by Z-A</option>
                <option value="price_low">Price (Lowest)</option>
                <option value="price_high">Price (Highest)</option>
              </select>
            </div>

            <p className="text-sm text-gray-500 whitespace-nowrap">
              {products.length} Product(s)
            </p>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Filters */}
        <aside className="lg:col-span-1 lg:sticky lg:top-24 h-max">
          <h3 className="text-lg font-medium mb-5">Filters</h3>

          <div className="space-y-8 text-sm">
            <div>
              <p className="font-medium mb-3">Price</p>

              <ul className="space-y-2 text-gray-600">
                <li>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.price === "under_1000"}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          price:
                            prev.price === "under_1000" ? null : "under_1000",
                        }))
                      }
                    />
                    <span>Under 1k</span>
                  </label>
                </li>

                <li>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.price === "under_10000"}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          price:
                            prev.price === "under_10000" ? null : "under_10000",
                        }))
                      }
                    />
                    <span>Under 10k</span>
                  </label>
                </li>

                <li>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.price === "under_20000"}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          price:
                            prev.price === "under_20000" ? null : "under_20000",
                        }))
                      }
                    />
                    <span>Under 20k</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Products */}
        <main className="lg:col-span-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {products.length < 1 ? (
              <div>No products found</div>
            ) : (
              products.map((product) => (
                <Link
                  key={product.name}
                  to={`/product/${product.slug}`}
                  className="block group"
                >
                  <div className="bg-gray-100 rounded-2xl overflow-hidden relative aspect-square mb-3">
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2 text-[11px] uppercase">
                      <span className="bg-black text-white rounded-full px-2.5 py-1 transition duration-300 group-hover:text-transparent group-hover:bg-transparent">
                        {product.type}
                      </span>

                      {product.isPreOrder && (
                        <span className="bg-white text-black rounded-full px-2.5 py-1 transition duration-300 group-hover:text-transparent group-hover:bg-transparent">
                          Pre-Order
                        </span>
                      )}
                    </div>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div>
                    <h2 className="text-sm font-medium">{product.name}</h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Rs. {product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
