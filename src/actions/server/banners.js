import { connectDB } from "@/lib/connectDB";

export async function getBanners() {
  const db = await connectDB();
  const bannerCollection = db.collection("sliders");

  const banners = await bannerCollection.find({}).toArray();

  return banners.map((banner) => ({
    ...banner,
    _id: banner._id.toString(),
    createdAt: banner.createdAt?.toISOString(),
    updatedAt: banner.updatedAt?.toISOString(),
  }));
}