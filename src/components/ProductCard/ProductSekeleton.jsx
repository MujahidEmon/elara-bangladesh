const ProductCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 max-w-2xs rounded-2xl overflow-hidden">
      
      {/* Image Skeleton */}
      <div className="aspect-square skeleton w-full rounded-b-2xl"></div>

      {/* Content */}
      <div className="p-4 space-y-3">
        
        {/* Title */}
        <div className="skeleton h-4 w-3/4"></div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-6">
          <div className="skeleton h-4 w-1/4"></div>

          <div className="skeleton h-10 w-10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;