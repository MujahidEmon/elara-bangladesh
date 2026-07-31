import { connectDB } from "@/lib/connectDB";


export async function getCategories() {
  const db = await connectDB();
  const categoriesCollection = db.collection("categories");

  const categories = await categoriesCollection.find({}).toArray();
  return categories;

//   return categories.map((category) => ({
//     ...category,
//     _id: category._id.toString(),
//     createdAt: category.createdAt?.toISOString(),
//     updatedAt: category.updatedAt?.toISOString(),
//   }));
}