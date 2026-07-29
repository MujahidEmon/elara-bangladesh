import { connectDB } from "@/lib/connectDB";

export const GET = async () => {
  try {
    const db = await connectDB();
    const banners = await db
      .collection("sliders")
      .find({
        $or: [{ isActive: true }, { status: "Active" }],
      })
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return Response.json(banners);
  } catch (error) {
    console.error("Failed to fetch banners", error);
    return Response.json([], { status: 200 });
  }
};
