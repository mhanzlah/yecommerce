import clsx from "clsx";
import { Link, useOutletContext } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import BagDrawer from "./Bagdrawer";
import { useState } from "react";
import SearchOverlay from "./SearchOverlay";
import { useBag } from "../context/BagContext";

const Header = ({ dark }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);

  const { bagLength } = useBag();

  return (
    <header>
      <nav
        className={clsx(
          "fixed top-0 z-50 w-full h-16 flex items-center justify-between px-8 py-4",
          dark ? "bg-black text-white" : "bg-white text-black",
        )}
      >
        <ul className="flex items-center gap-6">
          <li>
            <Link
              to="/"
              className="text-sm border-b border-transparent hover:border-black"
            >
              Home
            </Link>
          </li>
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
              className="text-sm flex items-center gap-2 border-b border-transparent hover:border-black relative"
              onClick={() => setIsBagOpen(true)}
            >
              <ShoppingBagIcon className="w-6 h-6" />
              {bagLength > 0 && (
                <span className="absolute -top-2 -right-2 min-w-4.5 h-4.5 px-1 flex items-center justify-center text-[10px] font-medium bg-black text-white rounded-full">
                  {bagLength}
                </span>
              )}
            </button>
          </li>
        </ul>
      </nav>

      <BagDrawer isOpen={isBagOpen} onClose={() => setIsBagOpen(false)} />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
};

export default Header;
