import { connectDB } from "@/lib/connectDB";

const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(1000 + Math.random() * 9000).toString();
  return `${timestamp}${random}`;
};

export const POST = async (request) => {
  try {
    const order = await request.json();
    const { name, phone, address, productDetails } = order;

    if (!name || !phone || !address || !productDetails?.productId) {
      return Response.json(
        { message: "Name, phone, address, and product are required" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const ordersCollection = db.collection("orders");
    const now = new Date();
    let orderNumber = generateOrderNumber();

    while (await ordersCollection.findOne({ orderNumber })) {
      orderNumber = generateOrderNumber();
    }

    const orderDoc = {
      ...order,
      orderNumber,
      phone: phone.trim(),
      productId: productDetails.productId,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };

    const result = await ordersCollection.insertOne(orderDoc);

    return Response.json(
      {
        message: "Order created successfully",
        orderId: result.insertedId,
        order: {
          ...orderDoc,
          _id: result.insertedId.toString(),
          createdAt: now.toISOString(),
          updatedAt: now.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create order", error);
    return Response.json({ message: "Failed to create order" }, { status: 500 });
  }
};
