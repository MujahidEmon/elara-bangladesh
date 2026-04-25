
import ProductGrid from "@/components/ProductPage/ProductGrid";
import { FiFilter } from "react-icons/fi";


export const metadata = {
    title: 'All Products',
    description: 'Explore our extensive collection of electronics, mobile accessories, home appliances, and more at Elara Bangladesh. Find the perfect products to enhance your lifestyle.',
}

const AllProducts =  () => {

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
                                    className={" text-gray-800 "}
                                >
                                    {category.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div>
                <ProductGrid></ProductGrid>
            </div>
        </div>
    );
};

export default AllProducts;
