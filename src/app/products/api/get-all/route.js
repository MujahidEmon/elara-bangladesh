import { connectDB } from "@/lib/connectDB";

export const GET = async () => {
  const db = await connectDB();
  const productCollection = await db.collection("products");

  try {
    const products = await productCollection.find().toArray();
    return Response.json(products);
  } catch (error) {
    console.log(error);
  }
};
