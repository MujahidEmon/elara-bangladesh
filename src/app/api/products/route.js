import { connectDB } from "@/lib/connectDB";

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const GET = async (request) => {
  const db = await connectDB();
  const productCollection = await db.collection("products");
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim();

  try {
    const filter = search
      ? {
          $or: [
            { name: { $regex: escapeRegex(search), $options: "i" } },
            { productName: { $regex: escapeRegex(search), $options: "i" } },
            { title: { $regex: escapeRegex(search), $options: "i" } },
            { category: { $regex: escapeRegex(search), $options: "i" } },
            { brand: { $regex: escapeRegex(search), $options: "i" } },
            { description: { $regex: escapeRegex(search), $options: "i" } },
          ],
        }
      : {};

    const products = await productCollection.find(filter).toArray();
    return Response.json(products);
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    ); // ✅ error return (VERY IMPORTANT)
  }
};
