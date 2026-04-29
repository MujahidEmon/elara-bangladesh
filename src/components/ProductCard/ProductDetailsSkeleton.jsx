const ProductDetailsSkeleton = () => {
  return (
    <div className="p-4 bg-gray-100 animate-pulse">
      <div className="lg:max-w-7xl md:max-w-2xl max-w-sm mx-auto">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Left Image Section */}
          <div className="md:w-2/5 w-full">
            <div className="flex flex-col gap-4">
              
              {/* Main Image */}
              <div className="w-full aspect-square skeleton rounded-2xl"></div>

              {/* Gallery */}
              <div className="flex gap-3 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 skeleton rounded-md"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="md:w-3/5 w-full space-y-4">

            {/* Title */}
            <div className="h-8 w-3/4 skeleton"></div>

            {/* Rating */}
            <div className="h-4 w-1/3 skeleton"></div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full skeleton"></div>
              <div className="h-4 w-5/6 skeleton"></div>
              <div className="h-4 w-2/3 skeleton"></div>
            </div>

            {/* Price */}
            <div className="h-6 w-1/4 skeleton"></div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <div className="h-12 w-[45%] skeleton"></div>
              <div className="h-12 w-[45%] skeleton"></div>
            </div>

            {/* Bottom Icons */}
            <div className="flex justify-between mt-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full skeleton"></div>
                  <div className="h-3 w-20 skeleton"></div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;