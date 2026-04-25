'use client'
import React, { use } from 'react';
import NewProductCard from '../ProductCard/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/getProducts';
import ProductCardSkeleton from '../ProductCard/ProductSekeleton';

const ProductGrid = () => {
    const { data: products = [], isLoading, isError} = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })
    console.log(products);

    return (
        <div>
            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {isLoading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))
                    : products.map((product) => (
                        <NewProductCard key={product._id} product={product} />
                    ))}
            </div>
        </div>
    );
};

export default ProductGrid;