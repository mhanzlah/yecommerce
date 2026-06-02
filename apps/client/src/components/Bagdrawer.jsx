import { Link } from "react-router-dom";
import clsx from "clsx";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useBag } from "../context/BagContext";

const BagDrawer = ({ isOpen, onClose }) => {
  const { bag, bagLength, removeFromBag, updateQuantity } = useBag();

  const isEmpty = !bagLength || bagLength === 0;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 px-4 transition-all duration-300",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        onClick={onClose}
        className={clsx(
          "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={clsx(
          "absolute right-0 top-0 h-full w-full sm:w-105 lg:w-95",
          "bg-white shadow-2xl flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-lg font-medium">Bag</h2>

          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isEmpty ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingBagIcon className="w-6 h-6" />
              </div>

              <h3 className="text-sm font-medium">Your bag is empty</h3>
              <p className="text-xs text-gray-500 mt-1">
                Add some products to continue shopping
              </p>

              <button
                onClick={onClose}
                className="mt-5 px-5 py-2 bg-black text-white text-xs uppercase rounded-lg"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {bag.map(({ product, size, quantity }) => (
                <div
                  key={`${product._id}-${size}`}
                  className="flex gap-4 pb-5 border-b"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded-lg bg-gray-100"
                  />

                  <div className="flex-1">
                    <Link
                      to={`/products/${product.slug}`}
                      className="block"
                      onClick={onClose}
                    >
                      <h1 className="text-sm font-medium hover:underline">
                        {product.name}
                      </h1>
                    </Link>

                    <p className="text-xs text-gray-500 mt-1">Size: {size}</p>

                    <p className="text-sm font-medium mt-2">
                      Rs. {(product.price * quantity).toLocaleString()}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        className="w-7 h-7 border rounded text-sm"
                        onClick={() =>
                          updateQuantity(product._id, size, quantity - 1)
                        }
                      >
                        -
                      </button>

                      <span className="text-sm w-6 text-center">
                        {quantity}
                      </span>

                      <button
                        className="w-7 h-7 border rounded text-sm"
                        onClick={() =>
                          updateQuantity(product._id, size, quantity + 1)
                        }
                      >
                        +
                      </button>

                      <button
                        className="ml-2 text-xs text-red-500 hover:underline"
                        onClick={() => removeFromBag(product._id, size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!isEmpty && (
          <div className="border-t p-6 bg-white">
            <button className="w-full h-12 bg-black text-white rounded-lg text-sm uppercase hover:opacity-90 transition">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BagDrawer;
