import { notFound } from "next/navigation";
import { getProductById } from "@/actions/server/products";
import CheckoutForm from "./ChekoutForm";

export default async function CheckoutPage({ params }) {

    const { id } = await params;

    console.log(id);

    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <CheckoutForm
            product={product}
        />
    );
}