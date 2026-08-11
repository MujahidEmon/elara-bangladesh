
import ProductFilters from "@/components/ProductPage/ProductFilters";
import ProductGrid from "@/components/ProductPage/ProductGrid";
import { getProductFilters, getProducts } from "@/actions/server/products";


export const metadata = {
  title: "Products",
  description:
    "Shop Elara Bangladesh products by category, brand, price range, and best-selling picks.",
};

const AllProducts = async ({ searchParams }) => {
  const params = await searchParams;
  const productQuery = {
    search: params?.search || "",
    category: params?.category || "",
    brand: params?.brand || "",
    minPrice: params?.minPrice || "",
    maxPrice: params?.maxPrice || "",
    sort: params?.sort || "",
  };

  const [products, filters] = await Promise.all([
    getProducts(productQuery),
    getProductFilters(),
  ]);


  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#FCAB35]">Elara Shop</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Products</h1>
        </div>

        <p className="text-sm font-medium text-slate-500">
          Showing {products.length} product{products.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <ProductFilters filters={filters} />
        <ProductGrid products={products} search={productQuery.search} />
      </div>
    </main>
  );
};

export default AllProducts;
