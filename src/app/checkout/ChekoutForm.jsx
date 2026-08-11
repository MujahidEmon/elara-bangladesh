"use client";

import useLocalCart from "@/services/useLocalCart";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutForm() {
  const { cartProducts } = useLocalCart();

  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(null);

  const [upozilas, setUpozilas] = useState([]);
  const [upozila, setUpozila] = useState(null);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const distWithDhakaCity = [
    { id: 0, name: "Dhaka City" },
    ...districts,
  ];

  // ==========================================
  // Hydration
  // ==========================================

  useEffect(() => {
    setMounted(true);
  }, []);

  // ==========================================
  // Calculate subtotal
  // ==========================================

  const subtotal = cartProducts.reduce((total, item) => {
    const price = Number(item?.price || 0);
    const quantity = Number(item?.quantity || 1);

    return total + price * quantity;
  }, 0);

  // ==========================================
  // Shipping
  // ==========================================

  const shippingCharge =
    district?.name === "Dhaka City" ? 70 : 130;

  // ==========================================
  // Final total
  // ==========================================

  const totalPrice = subtotal + shippingCharge;

  // ==========================================
  // Fetch districts
  // ==========================================

  useEffect(() => {
    fetch("https://bdopenapi.vercel.app/api/geo/districts")
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data?.data || []);
      })
      .catch((error) => {
        console.error("District fetch error:", error);
        toast.error("Failed to load districts");
      });
  }, []);

  // ==========================================
  // Fetch upazilas
  // ==========================================

  useEffect(() => {
    if (district?.id === 0) {
      setUpozilas(
        DhakaCityPS.map((ps, index) => ({
          id: index + 1,
          name: ps,
        }))
      );

      return;
    }

    if (district?.id) {
      fetch(
        `https://bdopenapi.vercel.app/api/geo/upazilas/${district.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setUpozilas(data?.data || []);
        })
        .catch((error) => {
          console.error("Upazila fetch error:", error);
          toast.error("Failed to load Thana/Upozila");
        });
    } else {
      setUpozilas([]);
    }
  }, [district?.id]);

  // ==========================================
  // Place order
  // ==========================================

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!cartProducts?.length) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!district?.name) {
      toast.error("Please select your district.");
      return;
    }

    if (!upozila?.name) {
      toast.error("Please select your Thana/Upozila.");
      return;
    }

    const form = e.target;

    setIsPlacingOrder(true);

    const orderData = {
      name: form.name.value,
      phone: form.phone.value,
      address: form.address.value,
      note: form.note?.value || "",

      paymentMethod: "COD",

      district: district.name,
      thana: upozila.name,

      shippingCharge,

      totalPrice,

      // All cart products
      productDetails: cartProducts,
    };

    // console.log("ORDER DATA:", orderData);

    try {
      const { data } = await axios.post(
        "/api/orders",
        orderData
      );

      toast.success("Order placed successfully!");

      setCompletedOrder(data.order);

      form.reset();

      setDistrict(null);
      setUpozila(null);

      // Clear cart after successful order
      localStorage.removeItem("cartProducts");
    } catch (error) {
      console.error("Order error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to place order"
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // ==========================================
  // IMPORTANT:
  // Don't render different HTML before hydration
  // ==========================================

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">
          Loading checkout...
        </p>
      </div>
    );
  }

  // ==========================================
  // Empty cart
  // ==========================================

  if (!cartProducts?.length) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center ">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-950">
            Your cart is empty
          </h1>

          <p className="mt-3 text-slate-500">
            Add some products to your cart before checkout.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-lg bg-[#FCAB35] px-6 py-3 font-semibold text-white transition hover:bg-[#e89a2c]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // Checkout UI
  // ==========================================

  return (
    <div>
      <section>
        <form
          onSubmit={handlePlaceOrder}
          className="mx-auto max-w-7xl overflow-y-hidden py-6 sm:px-10"
        >
          <div className="rounded-2xl bg-[#c2ffe1] bg-opacity-70 md:p-8 p-4  shadow-lg backdrop-blur-md sm:p-12">
            {/* ==================================
                Heading
            ================================== */}

            <h1 className="mb-8 text-center text-2xl font-bold text-black md:text-4xl">
              Checkout
            </h1>

            <div className="flex flex-col gap-12 lg:flex-row">
              {/* ==================================
                  LEFT SIDE
              ================================== */}

              <div className="flex-1 space-y-8 text-gray-950">
                <div>
                  <h2 className="mb-6 text-2xl font-semibold">
                    Delivery Details
                  </h2>

                  <div className="space-y-4">
                    {/* Name */}

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Your Name*
                      </label>

                      <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        required
                        className="w-full rounded-lg bg-white px-4 py-2 text-sm text-gray-950 outline-none focus:ring-2 focus:ring-[#FCAB35]"
                      />
                    </div>

                    {/* Phone */}

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Phone Number*
                      </label>

                      <input
                        type="text"
                        name="phone"
                        pattern="[0-9]{11}"
                        placeholder="01700000000"
                        required
                        className="w-full rounded-lg bg-white px-4 py-2 text-sm text-gray-950 outline-none focus:ring-2 focus:ring-[#FCAB35]"
                      />
                    </div>

                    {/* Address */}

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Full Address*
                      </label>

                      <input
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        required
                        className="w-full rounded-lg bg-white px-4 py-2 text-sm text-gray-950 outline-none focus:ring-2 focus:ring-[#FCAB35]"
                      />
                    </div>

                    {/* District */}

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        District
                      </label>

                      <select
                        defaultValue=""
                        onChange={(e) => {
                          const selected =
                            distWithDhakaCity.find(
                              (d) =>
                                d.id == e.target.value
                            );

                          setDistrict(selected || null);

                          // Reset thana when district changes
                          setUpozila(null);
                        }}
                        className="w-full rounded-lg bg-white px-4 py-2 text-sm text-gray-950 outline-none focus:ring-2 focus:ring-[#FCAB35]"
                      >
                        <option value="">
                          Select your district
                        </option>

                        {distWithDhakaCity
                          .slice()
                          .sort((a, b) =>
                            a.name < b.name ? -1 : 1
                          )
                          .map((d) => (
                            <option
                              key={d.id}
                              value={d.id}
                            >
                              {d.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Thana / Upozila */}

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Thana/Upozila
                      </label>

                      <select
                        defaultValue=""
                        disabled={!district?.name}
                        onChange={(e) => {
                          const selected =
                            upozilas.find(
                              (u) =>
                                u.id == e.target.value
                            );

                          setUpozila(
                            selected || null
                          );
                        }}
                        className={`w-full rounded-lg bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#FCAB35] ${
                          district?.name
                            ? "text-gray-950"
                            : "text-gray-400"
                        }`}
                      >
                        <option value="">
                          Select your Thana/Upozila
                        </option>

                        {upozilas.map((u) => (
                          <option
                            key={u.id}
                            value={u.id}
                          >
                            {u.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Place Order */}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isPlacingOrder}
                        className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#FCAB35] px-6 py-3 text-lg font-semibold text-white transition hover:bg-[#fcac35dd] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isPlacingOrder
                          ? "Placing Order..."
                          : "Place Order"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ==================================
                  RIGHT SIDE - ORDER SUMMARY
              ================================== */}

              <div className="w-full max-w-md rounded-2xl bg-white bg-opacity-70 p-8 text-gray-950 shadow-lg">
                <h2 className="mb-6 text-2xl font-semibold">
                  Order Summary
                </h2>

                {/* ==================================
                    Cart Products
                ================================== */}

                <div className="mb-6 max-h-[400px] space-y-4 overflow-y-auto pr-1">
                  {cartProducts.map((item) => {
                    const price = Number(
                      item?.price || 0
                    );

                    const quantity = Number(
                      item?.quantity || 1
                    );

                    const itemTotal =
                      price * quantity;

                    return (
                      <div
                        key={item?._id}
                        className="flex gap-4 border-b border-gray-200 pb-4"
                      >
                        {/* Product Image */}

                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          {item?.image ? (
                            <img
                              src={item.image}
                              alt={
                                item?.productName ||
                                item?.name ||
                                "Product"
                              }
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>

                        {/* Product Info */}

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 font-semibold">
                            {item?.productName ||
                              item?.name ||
                              item?.title ||
                              "Product"}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            BDT {price} ×{" "}
                            {quantity}
                          </p>
                        </div>

                        {/* Item Total */}

                        <div className="whitespace-nowrap text-right font-semibold">
                          BDT {itemTotal}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ==================================
                    Price Breakdown
                ================================== */}

                <div className="space-y-3 text-sm">
                  {/* Product Price */}

                  <div className="flex justify-between font-semibold">
                    <span>
                      Product Price
                    </span>

                    <span>
                      BDT {subtotal}
                    </span>
                  </div>

                  {/* Shipping */}

                  <div className="flex justify-between font-semibold">
                    <span>
                      Shipping
                    </span>

                    <span>
                      BDT {shippingCharge}
                    </span>
                  </div>
                </div>

                {/* ==================================
                    Total
                ================================== */}

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-semibold">
                    <span>Total</span>

                    <span>
                      BDT {totalPrice}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-400">
                    Shipping costs are calculated during
                    checkout.
                  </p>
                </div>

                {/* ==================================
                    Payment Method
                ================================== */}

                <div>
                  <h3 className="mt-6 text-xl font-semibold">
                    Payment Method
                  </h3>

                  <label className="mt-2 flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="payment-method"
                      value="pay-on-delivery"
                      defaultChecked
                      className="h-5 w-5"
                    />

                    <span>
                      Cash on Delivery
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* ==========================================
          ORDER SUCCESS MODAL
      ========================================== */}

      {completedOrder && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 text-slate-900 shadow-2xl">
            {/* Header */}

            <div className="rounded-xl bg-[#fff7ea] p-4">
              <p className="text-sm font-bold uppercase tracking-wide text-[#FCAB35]">
                Order placed successfully
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Keep your order number safe
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                You will need this order number to
                track your delivery status later.
              </p>

              {/* Order Number */}

              <div className="mt-4 rounded-lg bg-white px-4 py-3 text-center text-2xl font-extrabold tracking-wide text-slate-950">
                {completedOrder.orderNumber}
              </div>
            </div>

            {/* Order Details */}

            <div className="mt-5 space-y-3 text-sm">
              {/* Customer */}

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Customer
                </span>

                <span className="text-right font-semibold">
                  {completedOrder.name}
                </span>
              </div>

              {/* Phone */}

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Phone
                </span>

                <span className="text-right font-semibold">
                  {completedOrder.phone}
                </span>
              </div>

              {/* Products */}

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Products
                </span>

                <span className="text-right font-semibold">
                  {Array.isArray(
                    completedOrder.productDetails
                  )
                    ? completedOrder.productDetails.length
                    : 1}{" "}
                  item
                  {Array.isArray(
                    completedOrder.productDetails
                  ) &&
                  completedOrder.productDetails
                    .length !== 1
                    ? "s"
                    : ""}
                </span>
              </div>

              {/* Payment */}

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Payment
                </span>

                <span className="text-right font-semibold">
                  {completedOrder.paymentMethod}
                </span>
              </div>

              {/* Total */}

              <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
                <span className="text-slate-500">
                  Total
                </span>

                <span className="text-right text-lg font-bold text-[#FCAB35]">
                  BDT{" "}
                  {completedOrder.totalPrice}
                </span>
              </div>
            </div>

            {/* Buttons */}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href={`/track/order/${completedOrder.orderNumber}`}
                className="inline-flex items-center justify-center rounded-lg bg-[#FCAB35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e89a2c]"
              >
                Track Order
              </Link>

              <button
                type="button"
                onClick={() =>
                  setCompletedOrder(null)
                }
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// Dhaka City Police Stations
// ==========================================

const DhakaCityPS = [
  "Adabor",
  "Airport",
  "Badda",
  "Banani",
  "Bangshal",
  "Bhashantek",
  "Cantonment",
  "Chackbazar",
  "Dakshin Khan",
  "Darus-Salam",
  "Demra",
  "Dhanmondi",
  "Gandaria",
  "Gulshan",
  "Hatirjheel",
  "Hazaribagh",
  "Jatrabari",
  "Kadamtoli",
  "Kafrul",
  "Kalabagan",
  "Kamrangirchar",
  "Khilgaon",
  "Khilkhet",
  "Kotwali",
  "Lalbagh",
  "Mirpur Model",
  "Mohammadpur",
  "Motijheel",
  "Mugda",
  "New Market",
  "Pallabi",
  "Paltan Model",
  "Ramna Model",
  "Rampura",
  "Rupnagar",
  "Sabujbag",
  "Shah Ali",
  "Shahbag",
  "Shahjahanpur",
  "Sher-e-Bangla Nagar",
  "Shyampur",
  "Sutrapur",
  "Tejgaon",
  "Tejgaon Industrial",
  "Turag",
  "Uttara East",
  "Uttara West",
  "Uttar Khan",
  "Vatara",
  "Wari",
  "Zone not Clear",
];