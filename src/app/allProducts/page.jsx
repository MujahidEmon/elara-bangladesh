'use client';
import NewProductCard from "@/components/ProductCard/NewProductCard";
import { FiFilter } from "react-icons/fi";

const AllProducts = () => {

    // 🔹 Static products array
    const allProducts = [
        {
            _id: "1",
            name: "Smart Watch",
            price: 120,
            image: "https://i.ibb.co/0jZ3QbP/watch.jpg",
        },
        {
            _id: "2",
            name: "Wireless Headphone",
            price: 80,
            image: "https://i.ibb.co/3rGz8bN/headphone.jpg",
        },
        {
            _id: "3",
            name: "Gaming Mouse",
            price: 35,
            image: "https://i.ibb.co/QXnK8Xr/mouse.jpg",
        },
        {
            _id: "4",
            name: "Mechanical Keyboard",
            price: 95,
            image: "https://i.ibb.co/zF1YcK7/keyboard.jpg",
        },
        {
            _id: "5",
            name: "Bluetooth Speaker",
            price: 60,
            image: "https://i.ibb.co/Yk9R4hR/speaker.jpg",
        },
        {
            _id: "6",
            name: "VR Headset",
            price: 250,
            image: "https://i.ibb.co/0M9f0ZP/vr.jpg",
        },
        {
            _id: "7",
            name: "Power Bank",
            price: 40,
            image: "https://i.ibb.co/7kW8z5n/powerbank.jpg",
        },
        {
            _id: "8",
            name: "USB Hub",
            price: 25,
            image: "https://i.ibb.co/Wk2Z8YF/usbhub.jpg",
        },
    ];


    const categories = [
        {
            id: 1,
            name: "Electronics",
            slug: "electronics",
        },
        {
            id: 2,
            name: "Mobile Accessories",
            slug: "mobile-accessories",
        },
        {
            id: 3,
            name: "Home Appliances",
            slug: "home-appliances",
        },
        {
            id: 4,
            name: "Kitchen Gadgets",
            slug: "kitchen-gadgets",
        },
        {
            id: 5,
            name: "Smart Devices",
            slug: "smart-devices",
        },
        {
            id: 6,
            name: "Office Equipment",
            slug: "office-equipment",
        },
        {
            id: 7,
            name: "Lighting & Decor",
            slug: "lighting-decor",
        },
    ];




    // const [selectedCategory, setSelectedCategory] = useState("");

    // Fetch categories
    // const { categories, isLoading: categoriesLoading } = useAllCategories();

    return (
        <div className="mx-auto px-6 lg:max-w-7xl max-w-lg my-12 md:max-w-4xl">

            <div className="flex flex-row items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-base-400 my-6 sm:mb-8">
                    All Products
                </h2>

                {/* Category Dropdown */}
                <div className="dropdown dropdown-center">
                    <div tabIndex={0} role="button" className="btn m-1">
                        Select Category <FiFilter color="orange" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                        <li>
                            <a
                                // onClick={() => setSelectedCategory("")}
                                className={"bg-[#FCAB35] text-white font-bold"}
                            >
                                All Categories
                            </a>
                        </li>
                        {categories.map((category, idx) => (
                            <li key={idx}>
                                <a
                                    // onClick={() => setSelectedCategory(category)}
                                    className={"bg-[#FCAB35] text-white font-bold"}
                                >
                                    {category.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {allProducts.map((product, idx) => (
                    <NewProductCard key={idx} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
