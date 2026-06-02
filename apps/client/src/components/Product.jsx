import { Link } from "react-router-dom";

const Product = ({ product, skeleton = false }) => {
  if (skeleton) {
    return (
      <div className="block">
        <div className="bg-gray-100 rounded-2xl overflow-hidden relative aspect-square mb-3 animate-pulse" />

        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
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

      <div className="mt-1">
        <h2 className="text-sm font-medium">{product.name}</h2>

        <p className="text-sm text-gray-500">
          Rs. {product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default Product;
