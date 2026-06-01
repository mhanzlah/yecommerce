import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

const Product = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  const load = async () => {
    try {
      const res = await api.get(`/products/${slug}`);
      setProduct(res.data);
    } catch {
      setProduct(null);
    }
  };

  useEffect(() => {
    load();
  }, [slug]);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const parseSize = (s) => {
    const sizes = {
      S: "Small",
      M: "Medium",
      L: "Large",
      XL: "X-Large",
      XXL: "2X-Large",
    };

    return sizes[s] || s;
  };

  if (!product) return <div>Not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16">
        {/* Image */}
        <div className="w-full lg:w-[60%] flex">
          <div className="bg-gray-100 rounded-2xl overflow-hidden h-full w-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-[40%] flex flex-col py-4">
          {/* Product Header */}
          <div>
            <h1 className="text-2xl md:text-4xl font-medium leading-none">
              {product.name}
            </h1>

            <p className="text-sm mt-2">Rs. {product.price.toLocaleString()}</p>
          </div>

          {/* Description */}
          <div className="py-6">
            <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line">
              {`This product is MADE TO ORDER. Please allow up to 2 weeks for production and shipping.

PRODUCT DESCRIPTION:
* Made to order
* Screen-printed graphics
* PRO CLUB Heavyweight T-Shirt

Please note: product images are digital mockups. Actual products may vary in color, brand, style and/or production materials due to reasons beyond our control.`}
            </p>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-sm font-medium mb-4">Size</h3>

            <div className="flex flex-wrap items-center gap-3">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={clsx(
                      "h-10 px-4 min-w-fit border rounded-lg text-sm transition duration-200",
                      isSelected
                        ? "bg-black text-white border-black"
                        : "border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-black",
                    )}
                  >
                    {parseSize(size)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity + Cart */}
          <div className="py-6 flex flex-col md:flex-row gap-5">
            {/* Quantity */}
            <div>
              <div className="inline-flex h-14 items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className={clsx(
                    "w-12 h-12 transition",
                    quantity === 1 ? "text-gray-400" : "text-black",
                  )}
                >
                  -
                </button>

                <span className="w-10 text-center text-sm">{quantity}</span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-12 h-12 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              disabled={!selectedSize}
              className={clsx(
                "w-full h-14 rounded-lg px-5 text-sm uppercase transition duration-200",
                selectedSize
                  ? "bg-black text-white hover:opacity-90"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed",
              )}
            >
              {selectedSize ? (
                <div className="flex items-center justify-between w-full">
                  <span>Add to Cart</span>

                  <span>Rs. {(product.price * quantity).toLocaleString()}</span>
                </div>
              ) : (
                "Select Size"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
