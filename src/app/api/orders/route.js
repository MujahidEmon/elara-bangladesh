import { connectDB } from "@/lib/connectDB";

const generateOrderNumber = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const random = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `ELBD${year}${month}${random}`;
};

export const POST = async (request) => {
  try {
    const order = await request.json();
    const { name, phone, address, productDetails } = order;
    // console.log("order", order);

    // if (!name || !phone || !address || !productDetails?.productId) {
    //   return Response.json(
    //     { message: "Name, phone, address, and product are required" },
    //     { status: 400 }
    //   );
    // }

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
