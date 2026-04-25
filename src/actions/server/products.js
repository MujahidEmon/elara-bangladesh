import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

const db = await connectDB();
const productCollection = await db.collection("products");

export const getProducts = async () => {
    const products = await productCollection.find().toArray();
    return products;
}


// get single product by id
export const getProductById = async (id) => {
    const product = await productCollection.findOne({ _id: new ObjectId(id) });
     return { ...product, _id: product._id.toString() } || {};
}