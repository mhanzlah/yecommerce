import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import CartDrawer from "./CartDrawer";
import { useState } from "react";
import SearchOverlay from "./SearchOverlay";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-50 bg-white w-full h-16 flex items-center justify-between px-8 py-4">
        <ul className="flex items-center gap-6">
          <li>
            <Link
              to="/"
              className="text-sm border-b border-transparent hover:border-black"
            >
              Home
            </Link>
          </li>
          {/* 
                    <li className="md:hidden">
                        <button className="text-sm border-b border-transparent hover:border-black">Menu</button>
                    </li>
                    <li className="hidden md:block">
                        <Link to="/" className="text-sm border-b border-transparent hover:border-black">Home</Link>
                    </li>
                    <li className="hidden md:block">
                        <Link to="/contact" className="text-sm border-b border-transparent hover:border-black">Contact</Link>
                    </li>
                    <li className="hidden md:block">
                        <Link to="/account" className="text-sm border-b border-transparent hover:border-black">Account</Link>
                    </li> 
                    */}
        </ul>

        <h1 className="font-bold text-xl">
          <Link to="/">
            <span className="md:hidden">Y</span>
            <span className="hidden md:block">Yecommerce</span>
          </Link>
        </h1>

        <ul className="flex items-center gap-2 md:gap-6">
          <li>
            <button
              className="text-sm border-b border-transparent hover:border-black"
              onClick={() => setIsSearchOpen(true)}
            >
              Search
            </button>
          </li>

          <div className="md:hidden text-gray-300">|</div>

          <li>
            <button
              className="text-sm flex items-center gap-2 border-b border-transparent hover:border-black"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBagIcon className="w-6 h-6" />
              <span>0</span>
            </button>
          </li>
        </ul>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
