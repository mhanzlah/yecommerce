import clsx from "clsx";
import { Link } from "react-router-dom";

const baseClass =
  "px-4 py-2 text-sm border border-gray-300 rounded-full capitalize w-max text-gray-500 hover:text-black transition flex items-center justify-center";

const Category = ({ category, prefix, skeleton = false }) => {
  if (skeleton) {
    return (
      <div className={clsx(baseClass, "animate-pulse")}>
        <div className="h-4 w-16 bg-gray-100 rounded-full" />
      </div>
    );
  }

  return (
    <Link to={`${prefix}/${category.slug}`} className={baseClass}>
      {category.name}
    </Link>
  );
};

export default Category;
