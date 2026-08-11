const CheckoutSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-10">
      <div className="animate-pulse rounded-2xl bg-[#c2ffe1]/70 p-4 shadow-lg md:p-8 sm:p-12">
        {/* Heading */}
        <div className="mx-auto mb-8 h-9 w-40 rounded-md bg-gray-300 md:h-11 md:w-52" />

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* ================= LEFT SIDE ================= */}
          <div className="flex-1 space-y-8">
            {/* Delivery Details */}
            <div>
              <div className="mb-6 h-8 w-52 rounded-md bg-gray-300" />

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <div className="mb-2 h-4 w-24 rounded bg-gray-300" />
                  <div className="h-10 w-full rounded-lg bg-gray-200" />
                </div>

                {/* Phone */}
                <div>
                  <div className="mb-2 h-4 w-28 rounded bg-gray-300" />
                  <div className="h-10 w-full rounded-lg bg-gray-200" />
                </div>

                {/* Address */}
                <div>
                  <div className="mb-2 h-4 w-28 rounded bg-gray-300" />
                  <div className="h-10 w-full rounded-lg bg-gray-200" />
                </div>

                {/* District */}
                <div>
                  <div className="mb-2 h-4 w-20 rounded bg-gray-300" />
                  <div className="h-10 w-full rounded-lg bg-gray-200" />
                </div>

                {/* Thana */}
                <div>
                  <div className="mb-2 h-4 w-32 rounded bg-gray-300" />
                  <div className="h-10 w-full rounded-lg bg-gray-200" />
                </div>

                {/* Button */}
                <div className="pt-2">
                  <div className="h-12 w-full rounded-lg bg-gray-300" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="w-full max-w-md rounded-2xl bg-white/70 p-8 shadow-lg">
            {/* Order Summary */}
            <div className="mb-6 h-8 w-48 rounded-md bg-gray-300" />

            {/* Product skeletons */}
            <div className="mb-6 max-h-[400px] space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex gap-4 border-b border-gray-200 pb-4"
                >
                  {/* Image */}
                  <div className="h-16 w-16 shrink-0 rounded-lg bg-gray-200" />

                  {/* Product info */}
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </div>

                  {/* Price */}
                  <div className="h-4 w-16 rounded bg-gray-200" />
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="h-4 w-28 rounded bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>

              <div className="flex justify-between">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
              </div>
            </div>

            {/* Total */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <div className="h-6 w-20 rounded bg-gray-300" />
                <div className="h-6 w-28 rounded bg-gray-300" />
              </div>

              <div className="mt-3 h-3 w-64 rounded bg-gray-200" />
            </div>

            {/* Payment */}
            <div className="mt-6">
              <div className="h-7 w-44 rounded bg-gray-300" />

              <div className="mt-3 flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-gray-200" />
                <div className="h-4 w-32 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;