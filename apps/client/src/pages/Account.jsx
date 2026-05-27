import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../hooks/useAuth";
import { getCart } from "../api/cart";

const Account = () => {
    const { user } = useAuth();

    // mock cart
    const [cart, setCart] = useState([
        { id: 1, name: "Product A", price: 1000, qty: 1 },
        { id: 2, name: "Product B", price: 2000, qty: 2 },
    ]);

    // remove item
    const removeItem = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    // total price
    const total = cart.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    return (
        <div className="px-4 md:px-10 py-10 space-y-10 max-w-6xl mx-auto">

            {/* USER INFO */}
            <div className="border rounded-2xl p-6 bg-white">
                <h2 className="text-xl font-medium mb-4">
                    Account Details
                </h2>

                <div className="space-y-2 text-sm text-gray-700">
                    <img src={user.avatar} alt='avatar' className="w-8 h-8" />
                    <p>
                        <span className="text-gray-500">Name:</span>{" "}
                        {user.name}
                    </p>
                    <p>
                        <span className="text-gray-500">Email:</span>{" "}
                        {user.email}
                    </p>
                </div>
            </div>

            {/* CART */}
            <div className="border rounded-2xl p-6 bg-white">
                <h2 className="text-xl font-medium mb-6">
                    Your Cart
                </h2>

                {cart.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        Your cart is empty.
                    </p>
                ) : (
                    <>
                        <div className="space-y-4">

                            {cart.map((item) => (
                                <CartRow
                                    key={item.id}
                                    item={item}
                                    onRemove={removeItem}
                                />
                            ))}

                        </div>

                        {/* TOTAL */}
                        <div className="mt-6 border-t pt-4 flex justify-between text-sm">
                            <span className="text-gray-500">
                                Total
                            </span>
                            <span className="font-medium">
                                Rs. {total}
                            </span>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
};

export default Account;

/* -----------------------------
   Reusable Cart Row Component
------------------------------*/
const CartRow = ({ item, onRemove }) => {
    return (
        <div className="flex items-center justify-between border rounded-xl p-4">

            <div>
                <h3 className="text-sm font-medium">
                    {item.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                    Qty: {item.qty} × Rs. {item.price}
                </p>
            </div>

            <div className="flex items-center gap-4">

                <span className="text-sm font-medium">
                    Rs. {item.qty * item.price}
                </span>

                <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>

            </div>
        </div>
    );
};