import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
  try {
    const { phone, productId } = await request.json();

    if (!phone || !productId) {
      return Response.json(
        { eligible: false, message: "Phone number and product are required" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const ordersCollection = db.collection("orders");
    const order = await ordersCollection.findOne({
      phone: phone.trim(),
      $or: [
        { productId },
        { "productDetails.productId": productId },
      ],
    });

    if (!order) {
      return Response.json({
        eligible: false,
        message: "No order found for this phone number and product",
      });
    }

    return Response.json({
      eligible: true,
      message: "Order verified. You can review this product.",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Failed to verify order", error);
    return Response.json(
      { eligible: false, message: "Failed to verify order" },
      { status: 500 }
    );
  }
};
