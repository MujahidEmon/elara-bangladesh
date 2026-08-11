"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiPackage, FiSearch, FiTruck } from "react-icons/fi";

const steps = [
  { key: "pending", label: "Order Placed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "On The Way" },
  { key: "delivered", label: "Delivered" },
];

const statusIndex = {
  pending: 0,
  confirmed: 1,
  processing: 1,
  shipped: 2,
  delivered: 3,
};

const normalizeStatus = (status = "") => status.toLowerCase().trim();

const getProductName = (order) =>
  order?.productDetails?.productName || order?.productDetails?.name || order?.productDetails?.title || "Product";

const OrderTracking = ({ initialOrderNumber = "" }) => {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const trackOrder = useCallback(async (value) => {
    const query = value.trim();

    if (!query) {
      setMessage("Please enter your order number.");
      setOrder(null);
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");
      const { data } = await axios.get(`/api/orders/track/${encodeURIComponent(query)}`);
      setOrder(data.order);
      router.replace(`/track/order/${encodeURIComponent(query)}`);
    } catch (error) {
      setOrder(null);
      setMessage(error?.response?.data?.message || "Order not found");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (initialOrderNumber) {
      trackOrder(initialOrderNumber);
    }
  }, [initialOrderNumber, trackOrder]);

  const orderStatus = normalizeStatus(order?.status);
  const currentStep = statusIndex[orderStatus] ?? 0;

  return (
    <main className="min-h-[70vh] bg-[#f6f8fb]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[1fr_520px] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#FCAB35]">Live Order Tracking</p>
            <h1 className="mt-6 text-4xl font-extrabold text-slate-950">Track Your Order</h1>
            <p className="mt-3 text-lg font-medium text-slate-500">Real-time updates on your shipment progress</p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              trackOrder(orderNumber);
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="order-number" className="sr-only">
              Order number
            </label>
            <input
              id="order-number"
              value={orderNumber}
              onChange={(event) => setOrderNumber(event.target.value)}
              placeholder="Enter order number..."
              className="h-14 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-5 text-base font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#FCAB35] focus:bg-white"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[#FCAB35] px-8 text-base font-bold text-white transition hover:bg-[#e89a2c] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FiSearch size={18} />
              {isLoading ? "Searching" : "Search"}
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        {order ? (
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Order Number</p>
                <h2 className="mt-1 text-2xl font-extrabold text-slate-950">{order.orderNumber}</h2>
              </div>
              <span className="rounded-full bg-[#fff7ea] px-4 py-2 text-sm font-bold capitalize text-[#FCAB35]">
                {orderStatus === "confirmed" ? "processing" : orderStatus}
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-slate-400">Customer</p>
                <p className="mt-1 font-semibold text-slate-900">{order.name}</p>
                <p className="mt-1 text-sm text-slate-500">{order.phone}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-slate-400">Product</p>
                <p className="mt-1 font-semibold text-slate-900">{getProductName(order)}</p>
                <p className="mt-1 text-sm text-slate-500">Total: BDT {order.totalPrice}</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="grid gap-4 sm:grid-cols-4">
                {steps.map((step, index) => {
                  const isDone = index <= currentStep;
                  return (
                    <div key={step.key} className="text-center">
                      <div
                        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                          isDone ? "bg-[#FCAB35] text-white" : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {index === 2 ? <FiTruck size={21} /> : isDone ? <FiCheckCircle size={21} /> : <FiPackage size={21} />}
                      </div>
                      <p className={`mt-3 text-sm font-bold ${isDone ? "text-slate-950" : "text-slate-400"}`}>{step.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff7ea] text-[#FCAB35]">
              <FiAlertCircle size={25} />
            </div>
            <h2 className="mt-6 text-2xl font-extrabold text-slate-950">{message ? "Order Not Found" : "Enter Your Order Number"}</h2>
            <p className="mt-3 text-base leading-7 text-slate-500">
              {message || "Use the order number you received after checkout to see your order status."}
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default OrderTracking;
