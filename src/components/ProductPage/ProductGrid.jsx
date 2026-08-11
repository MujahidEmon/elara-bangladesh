import NewProductCard from '../ProductCard/ProductCard';

const ProductGrid = ({ products = [], search = "" }) => {
    return (
        <div>
            {search && (
                <p className="mb-4 text-sm font-medium text-gray-600">
                    Showing results for <span className="text-[#FCAB35]">&quot;{search}&quot;</span>
                </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {products.length > 0 ? products.map((product) => (
                        <NewProductCard key={product._id} product={product} />
                    )) : (
                        <div className="col-span-2 md:col-span-4 rounded-lg border border-dashed border-gray-300 p-8 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">No products found</h3>
                            <p className="mt-2 text-sm text-gray-500">Try changing the category, brand, or price range.</p>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default ProductGrid;
