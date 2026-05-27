import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const CartDrawer = ({ isOpen, onClose }) => {
    return (
        <div
            className={clsx(
                "px-4 fixed inset-0 z-50 transition-all duration-300",
                isOpen
                    ? "pointer-events-auto"
                    : "pointer-events-none"
            )}
        >

            {/* Backdrop */}
            <div
                onClick={onClose}
                className={clsx(
                    "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
                    isOpen
                        ? "opacity-100"
                        : "opacity-0"
                )}
            />

            {/* Drawer */}
            <div
                className={clsx(
                    "absolute right-0 top-0 h-full w-full sm:w-105 lg:w-[25%] bg-white shadow-2xl flex flex-col transition-transform duration-300",
                    isOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                )}
            >

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b">

                    <h2 className="text-lg font-medium">
                        Cart
                    </h2>

                    <button onClick={onClose}>
                        <XMarkIcon className="w-6 h-6" />
                    </button>

                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">

                    <p className="text-sm text-gray-500">
                        Your cart is empty.
                    </p>

                </div>

                {/* Footer */}
                <div className="border-t p-6">

                    <button className="w-full h-12 bg-black text-white rounded-lg text-sm uppercase">
                        Checkout
                    </button>

                </div>

            </div>

        </div>
    );
};

export default CartDrawer;