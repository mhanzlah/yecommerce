import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

const NotFound = () => {
  const { setDarkHeader } = useOutletContext();

  useEffect(() => {
    setDarkHeader(true);

    return () => setDarkHeader(false);
  }, []);

  return (
    <section className="min-h-[calc(100vh-64px)] bg-black text-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-druk uppercase leading-none mb-4">
          Page Not Found
        </h1>

        <Link to="/" className="border-b border-transparent hover:border-white">
          Go home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
