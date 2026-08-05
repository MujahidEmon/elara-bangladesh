'use client';

import ProductDetailsSkeleton from "@/components/ProductCard/ProductDetailsSkeleton";
import AppLoader from "@/components/shared/AppLoader";
import DefaultButton from "@/components/shared/DefaultButton/DefaultButton";
import { getProductById } from "@/services/getProducts";
import useLocalCart from "@/services/useLocalCart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaRegStar, FaStar, FaTruckFast } from "react-icons/fa6";
import { FiMinus, FiPlus, FiSearch, FiShield, FiShoppingCart } from "react-icons/fi";
import { MdOutlineAssignmentReturn, MdOutlinePayments } from "react-icons/md";

const sectionTitles = ["Key Features", "Specifications", "Benefits", "Why Choose"];

const formatPrice = (value) => {
  if (!value) return "Price unavailable";
  return `${Number(value).toLocaleString("en-BD")} Taka`;
};

const buildDescriptionSections = (description = "") => {
  const lines = description
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const intro = [];
  const sections = [];
  let activeSection = null;

  lines.forEach((line) => {
    const matchedTitle = sectionTitles.find((title) => line.startsWith(title));

    if (matchedTitle) {
      activeSection = {
        title: matchedTitle === "Why Choose" ? line.replace("?", "") : matchedTitle,
        items: [],
      };
      sections.push(activeSection);
      return;
    }

    if (activeSection) {
      activeSection.items.push(line);
      return;
    }

    intro.push(line);
  });

  return { intro, sections };
};

const ProductDetailsPage = () => {
  const { handleAddToCart } = useLocalCart();
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [reviewPhone, setReviewPhone] = useState("");
  const [verifiedOrder, setVerifiedOrder] = useState(null);
  const [isVerifyingOrder, setIsVerifyingOrder] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const {
    data: product = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", params?.id],
    queryFn: () => getProductById(params?.id),
    enabled: !!params?.id,
  });

  const {
    data: reviews = [],
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["reviews", params?.id],
    queryFn: async () => {
      const { data } = await axios.get("/api/reviews", {
        params: { productId: params?.id },
      });
      return data;
    },
    enabled: !!params?.id,
  });

  const {
    image,
    price,
    productName,
    category,
    description,
    _id,
    brand,
    gallery = [],
    offerPrice,
    regularPrice,
    salePrice,
    shortDescription,
    sku,
    stock,
    tags = [],
  } = product;

  const images = useMemo(() => {
    return [image, ...gallery].filter(Boolean);
  }, [image, gallery]);

  const currentImage = selectedImage || images[0];
  const { intro, sections } = useMemo(
    () => buildDescriptionSections(description),
    [description]
  );
  const displayPrice = offerPrice || salePrice || price;
  const hasDiscount = regularPrice && displayPrice && regularPrice > displayPrice;
  const discountPercent = hasDiscount
    ? Math.round(((regularPrice - displayPrice) / regularPrice) * 100)
    : 0;
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + Number(review.rating || 0), 0) / reviews.length
    : 0;
  const roundedAverageRating = averageRating.toFixed(1);

  const handleVerifyOrder = async (event) => {
    event.preventDefault();

    if (!reviewPhone.trim()) {
      toast.error("Please enter your order phone number");
      return;
    }

    try {
      setIsVerifyingOrder(true);
      const { data } = await axios.post("/api/orders/verify", {
        phone: reviewPhone,
        productId: params?.id,
      });

      if (!data.eligible) {
        setVerifiedOrder(null);
        toast.error(data.message || "No matching order found");
        return;
      }

      setVerifiedOrder(data);
      toast.success(data.message || "Order verified");
    } catch (error) {
      setVerifiedOrder(null);
      toast.error(error?.response?.data?.message || "Failed to verify order");
    } finally {
      setIsVerifyingOrder(false);
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    if (!verifiedOrder?.orderId) {
      toast.error("Please verify your order first");
      return;
    }

    const form = event.target;
    const reviewData = {
      productId: params?.id,
      orderId: verifiedOrder.orderId,
      phone: reviewPhone,
      name: form.name.value,
      rating: form.rating.value,
      comment: form.comment.value,
    };

    try {
      setIsSubmittingReview(true);
      await axios.post("/api/reviews", reviewData);
      toast.success("Review submitted successfully");
      form.reset();
      setReviewPhone("");
      setVerifiedOrder(null);
      refetchReviews();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (isLoading) return <ProductDetailsSkeleton></ProductDetailsSkeleton>

  if (isError) {
    return (
      <main className="bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-lg border border-red-100 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Product could not be loaded</h1>
          <p className="mt-3 text-sm text-slate-500">
            Please refresh the page or try again after a moment.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="grid gap-4 sm:grid-cols-[82px_1fr]">
            <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">
              {images.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedImage(item)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-gray-50 transition ${
                    currentImage === item ? "border-[#FCAB35]" : "border-gray-200 hover:border-gray-300"
                  }`}
                  aria-label={`View product image ${index + 1}`}
                >
                  <Image
                    src={item}
                    alt={`${productName || "Product"} thumbnail ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>

            <div className="order-1 overflow-hidden rounded-lg sm:order-2">
              <div className="relative aspect-square">
                {currentImage && (
                  <Image
                    src={currentImage}
                    alt={productName || "Product image"}
                    fill
                    priority
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-contain rounded-lg"
                  />
                )}
                
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#FCAB35]">
              {brand || category || "Elara Bangladesh"}
            </p>
            <h1 className="mt-2 max-w-2xl text-2xl font-bold leading-snug text-slate-950 md:text-3xl">
              {productName}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 border-y border-gray-200 py-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-[#FCAB35]" size={14} />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-700">{roundedAverageRating}</span>
              <span className="text-sm text-slate-400">|</span>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className="text-sm font-medium text-slate-600 hover:text-[#FCAB35]"
              >
                Reviews ({reviews.length})
              </button>
              {stock > 0 && (
                <>
                  <span className="text-sm text-slate-400">|</span>
                  <span className="text-sm font-medium text-emerald-600">{stock} in stock</span>
                </>
              )}
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600">
              {shortDescription || intro[1] || description}
            </p>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <p className="text-3xl font-bold text-slate-950">{formatPrice(displayPrice)}</p>
              {hasDiscount && (
                <>
                  <p className="pb-1 text-base text-slate-400 line-through">
                    {formatPrice(regularPrice)}
                  </p>
                  <span className="mb-1 rounded bg-[#FCAB35] px-2.5 py-1 text-xs font-bold text-white">
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex h-11 items-center overflow-hidden rounded border border-gray-300 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="flex h-full w-10 items-center justify-center text-slate-700 hover:bg-gray-50"
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={15} />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.min(stock || 99, current + 1))}
                  className="flex h-full w-10 items-center justify-center text-slate-700 hover:bg-gray-50"
                  aria-label="Increase quantity"
                >
                  <FiPlus size={15} />
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded border border-[#FCAB35] bg-white px-5 text-sm font-bold text-[#FCAB35] transition hover:bg-[#fff7ea]"
              >
                <FiShoppingCart size={17} />
                Add to Cart
              </button>

              <DefaultButton href={`/checkout/${_id}`} text="Buy Now" />
            </div>

            <div className="mt-6 grid gap-3 border-y border-gray-200 py-5 text-sm text-slate-600 sm:grid-cols-2">
              <p>
                <span className="font-semibold text-slate-900">Category:</span> {category || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-slate-900">SKU:</span> {sku || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Brand:</span> {brand || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Status:</span>{" "}
                {stock > 0 ? "Available" : "Out of stock"}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { icon: FaTruckFast, label: "Fast Delivery" },
                { icon: MdOutlinePayments, label: "COD Available" },
                { icon: MdOutlineAssignmentReturn, label: "Easy Return" },
                { icon: FiShield, label: "Quality Checked" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-center">
                  <item.icon className="mx-auto text-[#FCAB35]" size={22} />
                  <p className="mt-2 text-xs font-semibold text-slate-700">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex border-b border-gray-200">
            {[
              { id: "description", label: "Description" },
              { id: "reviews", label: `Reviews (${reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 px-5 py-3 text-xs font-bold uppercase transition ${
                  activeTab === tab.id
                    ? "border-[#FCAB35] text-[#FCAB35]"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "description" ? (
            <div className="py-7">
              <h2 className="text-lg font-bold text-slate-950">Description</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                {intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {sections.map((section) => (
                  <div key={section.title} className="rounded-lg border border-gray-100 bg-gray-50 p-5">
                    <h3 className="text-base font-bold text-slate-950">{section.title}</h3>
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FCAB35]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {tags.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-bold text-slate-950">Tags</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-8 py-7 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-6">
                <p className="text-4xl font-bold text-slate-950">{roundedAverageRating}</p>
                <div className="mt-3 flex gap-1 text-[#FCAB35]">
                  {[...Array(5)].map((_, index) => (
                    index < Math.round(averageRating)
                      ? <FaStar key={index} size={16} />
                      : <FaRegStar key={index} size={16} className="text-gray-300" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  {reviews.length ? `${reviews.length} verified customer review${reviews.length > 1 ? "s" : ""}.` : "No customer reviews yet."}
                </p>

                <div className="mt-6 space-y-4">
                  {reviews.map((review) => (
                    <article key={review._id} className="rounded-lg border border-gray-200 bg-white p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-bold text-slate-900">{review.name}</h3>
                        <div className="flex gap-1 text-[#FCAB35]">
                          {[...Array(5)].map((_, index) => (
                            index < Number(review.rating)
                              ? <FaStar key={index} size={13} />
                              : <FaRegStar key={index} size={13} className="text-gray-300" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{review.comment}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-gray-100 bg-white p-6">
                <h2 className="text-lg font-bold text-slate-950">Write a Review</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Enter the phone number used on your order. Reviews are only accepted after
                  this product is verified in your order history.
                </p>

                <form onSubmit={handleVerifyOrder} className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    <label className="sr-only" htmlFor="review-phone">Order phone number</label>
                    <input
                      id="review-phone"
                      type="tel"
                      value={reviewPhone}
                      onChange={(event) => {
                        setReviewPhone(event.target.value);
                        setVerifiedOrder(null);
                      }}
                      pattern="[0-9]{11}"
                      placeholder="01700000000"
                      className="input input-bordered w-full rounded-lg bg-white text-sm text-slate-900"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isVerifyingOrder}
                    className="rounded-lg bg-[#FCAB35] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#e89a2c] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isVerifyingOrder ? "Verifying..." : "Verify Order"}
                  </button>
                </form>

                {verifiedOrder?.eligible && (
                  <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="review-name" className="mb-2 block text-sm font-semibold text-slate-800">
                        Your Name
                      </label>
                      <input
                        id="review-name"
                        name="name"
                        type="text"
                        className="input input-bordered w-full rounded-lg bg-white text-sm text-slate-900"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="review-rating" className="mb-2 block text-sm font-semibold text-slate-800">
                        Rating
                      </label>
                      <select
                        id="review-rating"
                        name="rating"
                        defaultValue="5"
                        className="select select-bordered w-full rounded-lg bg-white text-sm text-slate-900"
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="review-comment" className="mb-2 block text-sm font-semibold text-slate-800">
                        Review
                      </label>
                      <textarea
                        id="review-comment"
                        name="comment"
                        rows={4}
                        className="textarea textarea-bordered w-full rounded-lg bg-white text-sm text-slate-900"
                        placeholder={`Share your experience with ${productName}`}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="rounded-lg bg-[#FCAB35] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#e89a2c] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductDetailsPage;
