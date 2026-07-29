const ProductCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Image */}
      <div className="aspect-square bg-gray-50 rounded-b-2xl p-3">
        <div className="skeleton w-full h-full rounded-xl"></div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="skeleton h-4 w-5/6 mb-2"></div>
        <div className="skeleton h-4 w-3/5"></div>

        <div className="flex justify-between items-center mt-8">
          <div className="skeleton h-6 w-24"></div>

          <div className="skeleton w-11 h-11 rounded-full shrink-0"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;