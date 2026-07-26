import { connectDB } from "@/lib/connectDB";

const toSlug = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const GET = async () => {
  try {
    const db = await connectDB();
    const categoriesCollection = db.collection("categories");
    const savedCategories = await categoriesCollection
      .find({ isActive: { $ne: false } })
      .sort({ order: 1, name: 1 })
      .toArray();

    if (savedCategories.length) {
      return Response.json(savedCategories);
    }

    const productCategories = await db.collection("products").distinct("category");
    const categories = productCategories
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
      .map((name, index) => ({
        _id: `${toSlug(name)}-${index}`,
        name,
        slug: toSlug(name),
        href: `/products?search=${encodeURIComponent(name)}`,
      }));

    return Response.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return Response.json([], { status: 200 });
  }
};
