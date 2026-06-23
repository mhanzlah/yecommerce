import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOverlay = ({ isOpen, onClose }) => {
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);

    onClose();
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 transition-all duration-300",
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
          "absolute top-0 left-0 w-full bg-white border-b transition-transform duration-300",
          isOpen ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <form onSubmit={handleSubmit}>
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-24 flex items-center gap-4">
            <input
              ref={inputRef}
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 h-12 border-b border-black outline-none text-lg placeholder:text-gray-400"
            />

            <button onClick={onClose} className="shrink-0">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchOverlay;
