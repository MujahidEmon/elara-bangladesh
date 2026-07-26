'use client'
import NewProductCard from '../ProductCard/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/getProducts';
import { useSearchParams } from 'next/navigation';
import ProductCardSkeleton from '../ProductCard/ProductSekeleton';

const ProductGrid = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";

    const { data: products = [], isLoading, isError} = useQuery({
        queryKey: ['products', search],
        queryFn: () => getProducts(search)
    })

    return (
        <div>
            {search && (
                <p className="mb-4 text-sm font-medium text-gray-600">
                    Showing results for <span className="text-[#FCAB35]">&quot;{search}&quot;</span>
                </p>
            )}

            {isError && (
                <div className="alert alert-error mb-6">
                    <span>Failed to load products. Please try again.</span>
                </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {isLoading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))
                    : products.length > 0 ? products.map((product) => (
                        <NewProductCard key={product._id} product={product} />
                    )) : (
                        <div className="col-span-2 md:col-span-4 rounded-lg border border-dashed border-gray-300 p-8 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">No products found</h3>
                            <p className="mt-2 text-sm text-gray-500">Try searching with a different keyword.</p>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default ProductGrid;
