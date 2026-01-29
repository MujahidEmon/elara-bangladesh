"use client";
import { useEffect, useState } from "react";
import CartCard from "@/components/CartCard/CartCard";

export default function CheckoutPage({ product }) {
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState([]);
    const [upozilas, setUpozilas] = useState([]);
    const [upozila, setUpozila] = useState([]);
    console.log(['Dhaka City', ...districts]);
    const distWithDhakaCity = [{ id: 0, name: 'Dhaka City' }, ...districts];
    console.log(upozilas);
    console.log(district);
    console.log(DhakaCityPS);

    useEffect(() => {
        fetch("https://bdopenapi.vercel.app/api/geo/districts")
            .then((res) => res.json())
            .then((data) => setDistricts(data?.data || []));
    }, []);


    useEffect(() => {
        if (district?.id === 0) {
            setUpozilas(DhakaCityPS.map((ps, index) => ({ id: index + 1, name: ps })));
        }
        if (district?.id) {
            fetch(`https://bdopenapi.vercel.app/api/geo/upazilas/${district.id}`)
                .then(res => res.json())
                .then(data => setUpozilas(data?.data || []));
        }
    }, [district?.id]);

    const [cartProducts, setCartProducts] = useState([
        { id: 1, name: "Product 1", price: 500, quantity: 1 },
        { id: 2, name: "Product 2", price: 300, quantity: 2 },
    ]);

    //   const totalPrice = cartProducts.reduce(
    //     (acc, item) => acc + item.price * item.quantity,
    //     0
    //   );
    const shipping = 110;
    //   const grandTotal = totalPrice + shipping;
    // const districts = allDivision();
    console.log(districts);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        const form = e.target;

        const orderData = {
            name: form.name.value,
            phone: form.phone.value,
            address: form.address.value,
            note: form.note.value,
            paymentMethod: "pay-on-delivery",
            district: district?.name || '',
            thana: upozila?.name || '',
        };

        console.log("Order Data:", orderData);

        /*
            const res = await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(orderData),
            });
        
            const data = await res.json();
            */

        alert("Order placed successfully!");
        form.reset();
    };

    return (
        <div>
            <section className="">
                {/* Dark overlay */}
                <div className=""></div>

                <form
                    onSubmit={handlePlaceOrder}
                    className=" z-10 mx-auto max-w-7xl px-6 sm:px-10 py-16"
                >
                    <div className="rounded-2xl bg-[#c2ffe1] bg-opacity-70 backdrop-blur-md shadow-lg p-8 sm:p-12">
                        <h1 className="text-center text-black text-4xl font-bold mb-8">
                            Checkout
                        </h1>

                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Left side */}
                            <div className="flex-1 space-y-8 text-gray-950">
                                <div>
                                    <h2 className="text-2xl font-semibold mb-6">
                                        Delivery Details
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium">
                                                Your Name*
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Enter Your Name"
                                                required
                                                className="w-full rounded-lg  bg-white px-4 py-2 text-sm text-gray-950"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium">
                                                Phone Number*
                                            </label>
                                            <input
                                                type="text"
                                                name="phone"
                                                pattern="[0-9]{11}"
                                                placeholder="01700000000"
                                                required
                                                className="w-full rounded-lg  bg-white px-4 py-2 text-sm text-gray-950"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium">
                                                Full Address*
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                placeholder="Enter Address"
                                                required
                                                className="w-full rounded-lg  bg-white px-4 py-2 text-sm text-gray-950"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium">
                                                District
                                            </label>
                                            <select
                                                required
                                                // value={district?.id || ""}
                                                onChange={(e) => {
                                                    const selected = distWithDhakaCity.find(
                                                        (d) => d.id == e.target.value,
                                                    );
                                                    setDistrict(selected);
                                                }}
                                                className="w-full rounded-lg bg-white px-4 py-2 text-sm text-gray-950"
                                            >
                                                <option>Select your district</option>
                                                {distWithDhakaCity
                                                    .slice()
                                                    .sort((a, b) => (a.name < b.name ? -1 : 1))
                                                    .map((d) => (
                                                        <option key={d.id} value={d.id}>
                                                            {d.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium">
                                                Thana/Upozila
                                            </label>
                                            <select
                                                required
                                                disabled={!district?.name}
                                                // value={district?.id || ""}
                                                onChange={(e) => {
                                                    const selected = upozilas.find(
                                                        (u) => u.id == e.target.value,
                                                    );
                                                    setUpozila(selected);
                                                }}
                                                className={`w-full rounded-lg bg-white px-4 py-2 text-s ${district?.name ? 'text-gray-950' : 'text-gray-400'}`}
                                            >
                                                <option>Select your Thana/Upozila</option>
                                                {upozilas.map((u) => (
                                                    <option key={u.id} value={u.id}>
                                                        {u.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block mb-2 text-sm font-medium">
                                                Any Note?
                                            </label>
                                            <input
                                                type="text"
                                                name="note"
                                                placeholder="Leave a note"
                                                className="w-full rounded-lg  bg-white px-4 py-2 text-sm text-gray-950"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <button
                                                type="submit"
                                                className="w-full flex items-center justify-center gap-3 rounded-lg bg-[#FCAB35] px-6 py-3 text-white text-lg font-semibold hover:bg-[#fcac35dd] transition"
                                            >
                                                Place Order
                                            </button>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            {/* Right side */}
                            <div className="w-full max-w-md rounded-2xl p-8 shadow-lg bg-white bg-opacity-70 text-gray-950">
                                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                                {/* <ul className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                  <CartCard product={product}></CartCard>
                  <CartCard></CartCard>
                  <CartCard></CartCard>
                </ul> */}

                                <div className="space-y-3 text-base-content text-sm">
                                    <div className="flex font-semibold justify-between">
                                        <span>Product Price</span>
                                        <span>BDT 847</span>
                                    </div>
                                    <div className="flex font-semibold justify-between">
                                        <span>Shipping</span>
                                        <span className="font-semibold">BDT {district?.name === 'Dhaka City' ? 70 : 130}</span>
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-gray-200">
                                    <div className="flex justify-between text-xl font-semibold">
                                        <span>Total</span>
                                        <span>BDT </span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-400">
                                        Shipping costs are calculated during checkout.
                                    </p>
                                </div>
                                {/* Payment */}
                                <div>
                                    <h3 className="text-xl font-semibold mt-6">Payment Method</h3>
                                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="payment-method"
                                            value="pay-on-delivery"
                                            defaultChecked
                                            className="h-5 w-5"
                                        />
                                        <span>Cash on Delivery</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );

}
const DhakaCityPS = [
    "Adabor", "Airport", "Badda", "Banani", "Bangshal", "Bhashantek",
    "Cantonment", "Chackbazar", "Dakshin Khan", "Darus‑Salam", "Demra",
    "Dhanmondi", "Gandaria", "Gulshan", "Hatirjheel", "Hazaribagh",
    "Jatrabari", "Kadamtoli", "Kafrul", "Kalabagan", "Kamrangirchar",
    "Khilgaon", "Khilkhet", "Kotwali", "Lalbagh", "Mirpur Model",
    "Mohammadpur", "Motijheel", "Mugda", "New Market", "Pallabi",
    "Paltan Model", "Ramna Model", "Rampura", "Rupnagar", "Sabujbag",
    "Shah Ali", "Shahbag", "Shahjahanpur", "Sher‑e‑Bangla Nagar",
    "Shyampur", "Sutrapur", "Tejgaon", "Tejgaon Industrial", "Turag",
    "Uttara East", "Uttara West", "Uttar Khan", "Vatara", "Wari", "Zone not Clear"
]


