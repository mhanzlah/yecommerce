import {
    useState,
    useMemo,
    useEffect,
    useRef,
} from "react";

import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";

import { XMarkIcon } from "@heroicons/react/24/outline";

/* ================= MAIN ADMIN ================= */
const Admin = () => {
    const [tab, setTab] = useState("products");

    const [products, setProducts] = useState([
        { id: 1, name: "Product A", price: 1000, category: "Tops", image: "" },
        { id: 2, name: "Product B", price: 2000, category: "Bottoms", image: "" },
        { id: 3, name: "Product C", price: 1500, category: "Tops", image: "" },
    ]);

    const [categories, setCategories] = useState([
        { id: 1, name: "Clothing" },
        { id: 2, name: "Music" },
        { id: 3, name: "Accessories" },
    ]);

    /* ================= MODALS ================= */
    const [showDelete, setShowDelete] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleteType, setDeleteType] = useState(null);

    const [showProductModal, setShowProductModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [editCategory, setEditCategory] = useState(null);

    /* ================= ACTIONS ================= */
    const openDelete = (type, item) => {
        setDeleteType(type);
        setDeleteTarget(item);
        setShowDelete(true);
    };

    const confirmDelete = () => {
        if (deleteType === "product") {
            setProducts(products.filter(p => p.id !== deleteTarget.id));
        } else {
            setCategories(categories.filter(c => c.id !== deleteTarget.id));
        }
        setShowDelete(false);
    };

    /* ================= PRODUCT ACTIONS ================= */
    const openCreateProduct = () => {
        setEditProduct(null);
        setShowProductModal(true);
    };

    const openEditProduct = (p) => {
        setEditProduct(p);
        setShowProductModal(true);
    };

    const saveProduct = (data) => {
        if (editProduct) {
            setProducts(products.map(p =>
                p.id === editProduct.id ? { ...data, id: p.id } : p
            ));
        } else {
            setProducts([...products, { ...data, id: Date.now() }]);
        }
        setShowProductModal(false);
    };

    /* ================= CATEGORY ACTIONS ================= */
    const openCreateCategory = () => {
        setEditCategory(null);
        setShowCategoryModal(true);
    };

    const openEditCategory = (c) => {
        setEditCategory(c);
        setShowCategoryModal(true);
    };

    const saveCategory = (data) => {
        if (editCategory) {
            setCategories(categories.map(c =>
                c.id === editCategory.id ? { ...data, id: c.id } : c
            ));
        } else {
            setCategories([...categories, { ...data, id: Date.now() }]);
        }
        setShowCategoryModal(false);
    };

    /* ================= ESC CLOSE ================= */
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setShowDelete(false);
                setShowProductModal(false);
                setShowCategoryModal(false);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div className="px-4 md:px-8 py-10">

            {/* HEADER */}
            <div className="mb-10">
                <h1 className="font-druk text-3xl md:text-4xl">Admin Panel</h1>
                <p className="text-sm text-gray-500 mt-2">
                    Manage products and categories.
                </p>
            </div>

            {/* TABS */}
            <div className="flex gap-2 mb-8">
                {["products", "categories"].map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-4 py-2 rounded-full border text-sm ${tab === t ? "bg-black text-white" : "text-gray-500"
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* PRODUCTS */}
            {tab === "products" && (
                <ProductsTable
                    data={products}
                    onEdit={openEditProduct}
                    onDelete={(p) => openDelete("product", p)}
                    onAdd={openCreateProduct}
                />
            )}

            {/* CATEGORIES */}
            {tab === "categories" && (
                <CategoriesTable
                    data={categories}
                    onEdit={openEditCategory}
                    onDelete={(c) => openDelete("category", c)}
                    onAdd={openCreateCategory}
                />
            )}

            {/* DELETE MODAL */}
            {showDelete && (
                <Modal onClose={() => setShowDelete(false)}>
                    <h2 className="text-lg font-medium mb-4">Confirm Delete</h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Are you sure you want to delete this {deleteType}?
                    </p>

                    <div className="flex justify-end gap-3">
                        <button onClick={() => setShowDelete(false)}>Cancel</button>
                        <button onClick={confirmDelete} className="text-red-500">
                            Delete
                        </button>
                    </div>
                </Modal>
            )}

            {/* PRODUCT MODAL */}
            {showProductModal && (
                <Modal onClose={() => setShowProductModal(false)}>
                    <ProductForm
                        product={editProduct}
                        onSave={saveProduct}
                        onClose={() => setShowProductModal(false)}
                    />
                </Modal>
            )}

            {/* CATEGORY MODAL */}
            {showCategoryModal && (
                <Modal onClose={() => setShowCategoryModal(false)}>
                    <CategoryForm
                        category={editCategory}
                        onSave={saveCategory}
                        onClose={() => setShowCategoryModal(false)}
                    />
                </Modal>
            )}
        </div>
    );
};

/* =========================================================
   PRODUCTS TABLE
========================================================= */
const ProductsTable = ({ data, onEdit, onDelete, onAdd }) => {
    const columns = useMemo(() => [
        {
            accessorKey: "image",
            header: "Image",
            cell: info =>
                info.getValue() ? (
                    <img src={info.getValue()} className="w-10 h-10 rounded object-cover" />
                ) : "-"
        },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "category", header: "Category" },
        { accessorKey: "price", header: "Price" },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-3">
                    <button onClick={() => onEdit(row.original)}>Edit</button>
                    <button onClick={() => onDelete(row.original)} className="text-red-500">
                        Delete
                    </button>
                </div>
            )
        }
    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 5 } }
    });

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-medium">Products</h2>
                <button onClick={onAdd} className="px-4 py-2 bg-black text-white rounded-lg">
                    + Add Product
                </button>
            </div>

            <TableUI table={table} />

        </div>
    );
};

/* =========================================================
   CATEGORIES TABLE (NOW FULL CRUD LIKE PRODUCTS)
========================================================= */
const CategoriesTable = ({ data, onEdit, onDelete, onAdd }) => {
    const columns = useMemo(() => [
        { accessorKey: "name", header: "Category" },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-3">
                    <button onClick={() => onEdit(row.original)}>Edit</button>
                    <button onClick={() => onDelete(row.original)} className="text-red-500">
                        Delete
                    </button>
                </div>
            )
        }
    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 5 } }
    });

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-medium">Categories</h2>
                <button onClick={onAdd} className="px-4 py-2 bg-black text-white rounded-lg">
                    + Add Category
                </button>
            </div>

            <TableUI table={table} />
        </div>
    );
};

/* =========================================================
   REUSABLE TABLE UI
========================================================= */
const TableUI = ({ table }) => (
    <div className="border rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
            <thead className="bg-gray-100">
                {table.getHeaderGroups().map(hg => (
                    <tr key={hg.id}>
                        {hg.headers.map(h => (
                            <th key={h.id} className="p-3 text-left">
                                {flexRender(h.column.columnDef.header, h.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="border-t">
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="p-3">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Pagination */}
        <div className="flex gap-2 p-3">
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Prev
            </button>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
            </button>
        </div>
    </div>
);

/* ================= MODAL ================= */
const Modal = ({ children, onClose }) => {
    const ref = useRef();

    return (
        <div
            onClick={(e) => ref.current && !ref.current.contains(e.target) && onClose()}
            className="fixed inset-0 bg-black/40 flex items-center justify-center"
        >
            <div ref={ref} className="bg-white p-6 rounded-xl w-[420px] relative">
                <button onClick={onClose} className="absolute top-3 right-3">
                    <XMarkIcon className="w-5 h-5" />
                </button>
                {children}
            </div>
        </div>
    );
};

/* ================= PRODUCT FORM ================= */
const ProductForm = ({ product, onSave, onClose }) => {
    const [form, setForm] = useState(product || {
        name: "", price: "", category: "", image: ""
    });

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) setForm({ ...form, image: URL.createObjectURL(file) });
    };

    return (
        <div>
            <h2 className="mb-4 text-lg font-medium">
                {product ? "Edit Product" : "Add Product"}
            </h2>

            <input className="border p-2 w-full mb-2" placeholder="Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <input className="border p-2 w-full mb-2" placeholder="Price"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
            />

            <input className="border p-2 w-full mb-2" placeholder="Category"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
            />

            <input type="file" onChange={handleImage} className="mb-2" />

            {form.image && (
                <img src={form.image} className="w-20 h-20 mb-3 rounded object-cover" />
            )}

            <div className="flex justify-end gap-3">
                <button onClick={onClose}>Cancel</button>
                <button
                    onClick={() => onSave(form)}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

/* ================= CATEGORY FORM ================= */
const CategoryForm = ({ category, onSave, onClose }) => {
    const [name, setName] = useState(category?.name || "");

    return (
        <div>
            <h2 className="mb-4 text-lg font-medium">
                {category ? "Edit Category" : "Add Category"}
            </h2>

            <input
                className="border p-2 w-full mb-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category name"
            />

            <div className="flex justify-end gap-3">
                <button onClick={onClose}>Cancel</button>
                <button
                    onClick={() => onSave({ name })}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default Admin;