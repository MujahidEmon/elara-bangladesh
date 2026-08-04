import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";


const CartButton = ({ compact = false }) => {
    if (compact) {
        return (
            <span className="relative inline-flex">
                <FiShoppingCart size={28} />
            </span>
        );
    }

    return (
        <Link
            href="/cart"
            className="group flex flex-col items-center gap-1 text-slate-950 transition hover:text-[#fcab35]"
            aria-label="View cart"
        >
            <span className="relative">
                <FiShoppingCart
                    size={27}
                    strokeWidth={1.75}
                />
            </span>

            <span className="text-sm font-medium leading-none">
                Cart
            </span>
        </Link>
    );
};

export default CartButton;
