import { connectDB } from "@/lib/connectDB";

export async function GET(request, { params }) {
  try {
    const { orderNumber } = await params;

    if (!orderNumber?.trim()) {
      return Response.json({ message: "Order number is required" }, { status: 400 });
    }

    const db = await connectDB();
    const ordersCollection = db.collection("orders");
    const order = await ordersCollection.findOne({ orderNumber: orderNumber.trim() });

    if (!order) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    return Response.json({
      order: {
        ...order,
        _id: order._id.toString(),
        createdAt: order.createdAt?.toISOString?.() || order.createdAt,
        updatedAt: order.updatedAt?.toISOString?.() || order.updatedAt,
      },
    });
  } catch (error) {
    console.error("Failed to track order", error);
    return Response.json({ message: "Failed to track order" }, { status: 500 });
  }
}
