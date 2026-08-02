"use client";
import NewProductCard from '@/components/ProductCard/ProductCard';
import ProductCardSkeleton from '@/components/ProductCard/ProductSekeleton';
import React, { useState } from 'react';

const NewArrivalSection = ({ products }) => {
    const matchesProductTab = (product, tab) => {
        const query = tab.toLowerCase();
        const searchableText = [
            product.productName,
            product.name,
            product.title,
            product.category,
            product.brand,
            product.description,
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchableText.includes(query);
    };
    const newArrivalTabs = ["Desk Lamp", "Mini Blender", "Grinder", "Electric Cooker"];
    const [activeNewArrivalTab, setActiveNewArrivalTab] = useState(newArrivalTabs[0]);



    const filteredNewArrivals = products.filter((product) => matchesProductTab(product, activeNewArrivalTab));
    const newArrivalProducts = (filteredNewArrivals.length ? filteredNewArrivals : products).slice(0, 4);
    return (
        <div>
            {/* New Arrival Section */}
            <section className=" lg:lg:my-16 md:my-12 my-10 ">
                <div className="flex items-center justify-between border-b border-gray-200 mb-8">
                    <h1 className="text-3xl md:text-4xl  md:w-1/3 w-full">New Arrival</h1>
                    <div className="hidden md:flex gap-4">
                        {newArrivalTabs.map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveNewArrivalTab(tab)}
                                className={`font-medium transition hover:text-[#fcab35] ${activeNewArrivalTab === tab ? "text-[#fcab35]" : "text-slate-900"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* DROPDOWN (Mobile) */}

                    <div className="md:hidden w-full">
                        <select
                            value={activeNewArrivalTab}
                            onChange={(event) => setActiveNewArrivalTab(event.target.value)}
                            className="dropdown dropdown-end border-gray-300 rounded-md px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-[#fcab35]"
                        >
                            {newArrivalTabs.map((tab) => (
                                <option key={tab}>{tab}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-6 md:mt-12">
                    {newArrivalProducts.map((product) => (
                        <NewProductCard product={product} key={product._id}></NewProductCard>
                    ))}
                </div>

            </section>
        </div>
    );
};

export default NewArrivalSection;