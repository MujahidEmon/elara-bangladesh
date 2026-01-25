
import NewProductCard from "@/components/ProductCard/NewProductCard";
import axios from "axios";
import { FiFilter } from "react-icons/fi";

const getAllProducts = async () =>{
    const {data} = await axios.get('http://localhost:3000/api/products/get-all');
    return data;
}


const AllProducts = async () => {

    
    const products = await getAllProducts();
    console.log(products);
    // 🔹 Static products array
    


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
                {products.map((product, idx) => (
                    <NewProductCard key={idx} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
