import { lazy, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import Category from "../components/Category";
import Product from "../components/Product";
import api from "../api/api";

import NotFound from "./NotFound";

const Shop = () => {
  const { parent, child } = useParams();

  const [filters, setFilters] = useState({
    price: null,
    sort: "relevance",
  });

  const { all, categories, loading: catLoading } = useCategories(parent);

  const slug = child || parent;

  const category = all?.find((c) => c.slug === slug);

  console.log(all);

  const { products, loading: prodLoading } = useProducts(parent, filters);

  const isHomePage = !parent && !child;
  const isParentPage = parent && !child;
  const isCategoryPage = parent && child;

  if (!catLoading && slug && !category) {
    return <NotFound />;
  }

  return (
    <div className="px-4 md:px-8 py-10 md:py-12">
      {isParentPage && (
        <Breadcrumbs
          items={[{ name: "Shop All", to: "/" }, { name: `Shop ${parent}` }]}
        />
      )}

      <div className="mb-12">
        <h1 className="font-druk text-2xl md:text-4xl leading-none">
          Shop{" "}
          <span className="capitalize">{child ? parent : "Yecommerce"}</span>
        </h1>

        {isHomePage && (
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mt-4">
            Modern fashion, curated essentials, and timeless pieces designed for
            everyday living.
          </p>
        )}
      </div>

      <div className="mb-10">
        {isHomePage && (
          <h2 className="text-2xl md:text-4xl font-medium mb-5">Categories</h2>
        )}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {isCategoryPage ? (
            <Breadcrumbs
              items={[
                { name: `Shop ${parent}`, to: `/category/${parent}` },
                { name: `Shop ${child}` },
              ]}
            />
          ) : (
            <ul className="flex flex-wrap items-center gap-2">
              {catLoading
                ? Array.from({ length: 3 }).map((_, idx) => (
                    <Category key={idx} skeleton={true} />
                  ))
                : categories.map((cat) => (
                    <li key={cat.name}>
                      <Category
                        category={cat}
                        prefix={
                          isHomePage ? "/category" : `/category/${parent}`
                        }
                      />
                    </li>
                  ))}
            </ul>
          )}

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
              {prodLoading ? (
                <span className="inline-block w-24 py-2 bg-gray-100 text-transparent rounded-full">
                  000 Products
                </span>
              ) : (
                <span>{products.length} Product(s)</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
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

        <main className="lg:col-span-4">
          <div className="border-l border-gray-50 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {prodLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <Product key={idx} skeleton={true} />
              ))
            ) : products.length < 1 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <h3 className="text-lg md:text-xl font-medium text-gray-900">
                  No products found
                </h3>
                <p className="text-sm text-gray-500 mt-2 max-w-md">
                  We couldn't find any products matching your filters. Try
                  adjusting your selection or explore other categories.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      price: null,
                      sort: "relevance",
                    })
                  }
                  className="mt-6 h-11 px-5 bg-black text-white text-sm rounded-lg hover:opacity-90 transition"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              products.map((product) => <Product product={product} />)
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
