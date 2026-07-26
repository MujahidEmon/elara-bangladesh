
import CategoryDropdown from "@/components/ProductPage/CategoryDropdown";
import ProductGrid from "@/components/ProductPage/ProductGrid";
import ProductSearch from "@/components/ProductPage/ProductSearch";
import AppLoader from "@/components/shared/AppLoader";
import { Suspense } from "react";


export const metadata = {
    title: 'All Products',
    description: 'Explore our extensive collection of electronics, mobile accessories, home appliances, and more at Elara Bangladesh. Find the perfect products to enhance your lifestyle.',
}

const AllProducts =  () => {

    return (
        <div className="mx-auto px-6 lg:max-w-7xl max-w-lg my-12 md:max-w-4xl">

            <div className="flex flex-row items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-base-400 my-6 sm:mb-8">
                    All Products
                </h2>

                <Suspense fallback={null}>
                    <CategoryDropdown />
                </Suspense>
            </div>

            <div>
                <Suspense fallback={null}>
                    <ProductSearch />
                </Suspense>
                <Suspense fallback={<AppLoader label="Loading products" />}>
                    <ProductGrid></ProductGrid>
                </Suspense>
            </div>
        </div>
    );
};

export default AllProducts;
