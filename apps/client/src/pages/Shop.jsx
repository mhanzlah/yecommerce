import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const Shop = () => {
    const { parent, category } = useParams();

    const isHomePage = !parent && !category;
    const isParentPage = parent && !category;
    const isCategoryPage = !parent && category;

    const categories = isHomePage
        ? [
            { name: "Clothing", to: "/clothing" },
            { name: "Music", to: "/music" },
            { name: "Accessories", to: "/accessories" },
            { name: "Home and Lifestyle", to: "/home-and-lifestyle" },
        ]
        : isParentPage
            ? [
                { name: "Headwear", to: "/category/head-wear" },
                { name: "Tops", to: "/category/tops" },
                { name: "Bottoms", to: "/category/bottoms" },
            ]
            : [];

    const baseProduct = {
        to: "/product/product-a",
        price: 1000,
        image:
            "https://framerusercontent.com/images/DzD9HaR1A8Y6bu5XHKQ2TgfrQE.png?scale-down-to=1024&width=3000&height=3000",
        type: "T-Shirt",
    };

    const products = [
        { ...baseProduct, name: "Product A", isPreOrder: true },
        { ...baseProduct, name: "Product B" },
        { ...baseProduct, name: "Product C" },
        { ...baseProduct, name: "Product D" },
        { ...baseProduct, name: "Product E" },
        { ...baseProduct, name: "Product F" },
        { ...baseProduct, name: "Product G" },
        { ...baseProduct, name: "Product H" },
    ];

    return (
        <div className="px-4 md:px-8 py-10 md:py-12">

            {isParentPage && <Breadcrumbs items={[
                { name: "Shop All", to: "/" },
                { name: "Clothing", to: "/clothing" },
            ]} />}

            {/* Header */}
            <div className="mb-12">
                <h1 className="font-druk text-2xl md:text-4xl leading-none">
                    Shop{" "}
                    <span className="capitalize">
                        {category ? category : "Yecommerce"}
                    </span>
                </h1>

                {isHomePage && (
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mt-4">
                        Modern fashion, curated essentials, and timeless pieces designed for everyday living.
                    </p>
                )}
            </div>

            {/* Categories + Sort */}
            <div className="mb-10">
                {isHomePage && (
                    <h2 className="text-2xl md:text-4xl font-medium mb-5">
                        Categories
                    </h2>
                )}

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* Categories */}
                    {isCategoryPage ? (
                        <Breadcrumbs items={[
                            { name: "clothing", to: "/clothing" },
                            { name: "headwear" }
                        ]} />
                    ) : (
                        <ul className="flex flex-wrap items-center gap-2">
                            {categories.map((cat) => (
                                <li key={cat.name}>
                                    <Link
                                        to={cat.to}
                                        className="px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-full hover:text-black hover:border-black transition"
                                    >
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Sort */}
                    <div className="flex flex-wrap items-center gap-3">

                        <div className="px-4 py-2 text-sm rounded-full hover:bg-gray-100 transition w-max">
                            <select
                                id="sort"
                                className="bg-transparent outline-none cursor-pointer w-max"
                            >
                                <option>Sort by Relevance</option>
                                <option>Sort by A-Z</option>
                                <option>Sort by Z-A</option>
                                <option>Price (Lowest)</option>
                                <option>Price (Highest)</option>
                            </select>
                        </div>

                        <p className="text-sm text-gray-500 whitespace-nowrap">
                            {products.length} Product(s)
                        </p>
                    </div>
                </div>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                {/* Filters */}
                <aside className="lg:col-span-1 lg:sticky lg:top-24 h-max">
                    <h3 className="text-lg font-medium mb-5">Filters</h3>

                    <div className="space-y-8 text-sm">

                        <div>
                            <p className="font-medium mb-3">Price</p>

                            <ul className="space-y-2 text-gray-600">

                                <li>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" />
                                        <span>Under 1k</span>
                                    </label>
                                </li>

                                <li>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" />
                                        <span>Under 5k</span>
                                    </label>
                                </li>

                                <li>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" />
                                        <span>Under 10k</span>
                                    </label>
                                </li>

                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Products */}
                <main className="lg:col-span-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">

                        {products.map((product) => (
                            <Link
                                key={product.name}
                                to={product.to}
                                className="block group"
                            >
                                <div className="bg-gray-100 rounded-2xl overflow-hidden relative aspect-square mb-3">

                                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2 text-[11px] uppercase">

                                        <span className="bg-black text-white rounded-full px-2.5 py-1 transition duration-300 group-hover:text-transparent group-hover:bg-transparent">
                                            {product.type}
                                        </span>

                                        {product.isPreOrder && (
                                            <span className="bg-white text-black rounded-full px-2.5 py-1 transition duration-300 group-hover:text-transparent group-hover:bg-transparent">
                                                Pre-Order
                                            </span>
                                        )}

                                    </div>

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                </div>

                                <div>
                                    <h2 className="text-sm font-medium">
                                        {product.name}
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Rs. {product.price.toLocaleString()}
                                    </p>
                                </div>
                            </Link>
                        ))}

                    </div>
                </main>

            </div>
        </div>
    );
};

export default Shop;