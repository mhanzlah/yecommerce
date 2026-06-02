import { Link } from "react-router-dom";

import { useCategories } from "../hooks/useCategories.js";

const Footer = () => {
  const { categories = [] } = useCategories();

  return (
    <footer className="px-8 py-6 bg-black text-white">
      <div className="flex flex-col gap-10 md:flex-row pt-6">
        <div className="md:w-1/2">
          <h1 className="text-2xl font-semibold">
            <Link to="/">Yecommerce</Link>
          </h1>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-300">
            Modern fashion, curated essentials, and timeless pieces designed for
            everyday living.
          </p>
        </div>

        <div className="grid flex-1 grid-cols-3 gap-8">
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-300">
              Company
            </h2>

            <ul className="space-y-2 text-sm">
              {/* <li>
                <Link
                  to="/contact"
                  className="border-b border-transparent hover:border-white"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/account"
                  className="border-b border-transparent hover:border-white"
                >
                  Account
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-300">
              Shop
            </h2>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="border-b border-transparent hover:border-white"
                >
                  All Products
                </Link>
              </li>

              {categories.map((cat, idx) => (
                <li key={idx}>
                  <Link
                    to={cat.slug}
                    className="capitalize border-b border-transparent hover:border-white"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-300">
              Legal
            </h2>

            <ul className="space-y-2 text-sm">
              {/* <li>
                <Link
                  to="/privacy-policy"
                  className="border-b border-transparent hover:border-white"
                >
                  Privacy Policy
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 text-xs uppercase text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Yecommerce. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
