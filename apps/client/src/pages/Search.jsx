import { useSearchParams } from "react-router-dom";
import Product from "../components/Product";
import { useProducts } from "../hooks/useProducts";
import Breadcrumbs from "../components/Breadcrumbs";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const { products, loading } = useProducts(null, null, query);

  return (
    <div className="px-4 md:px-8 py-10 md:py-12">
      <Breadcrumbs
        items={[{ name: "Shop All", to: "/" }, { name: "Search" }]}
      />
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-10">
        <h1 className="font-druk text-2xl md:text-4xl leading-none">
          Search Results for "{query}"
        </h1>

        <p className="text-sm text-gray-500">
          {loading ? (
            <span className="inline-block w-24 py-2 bg-gray-100 text-transparent rounded-full">
              000 Products
            </span>
          ) : (
            <span>{products.length} Product(s)</span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <Product key={idx} skeleton />
          ))
        ) : products.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-lg md:text-xl font-medium text-gray-900">
              No products found
            </h3>

            <p className="text-sm text-gray-500 mt-2 max-w-md">
              We couldn't find any products matching "{query}". Try a different
              search term or browse our collection.
            </p>

            <Link
              to="/"
              className="mt-6 h-11 px-5 inline-flex items-center justify-center bg-black text-white text-sm rounded-lg hover:opacity-90 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
