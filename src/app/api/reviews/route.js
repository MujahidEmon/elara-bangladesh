import { connectDB } from "@/lib/connectDB";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return Response.json(
        { message: "Product id is required" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const reviews = await db
      .collection("reviews")
      .find({ productId })
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(reviews);
  } catch (error) {
    console.error("Failed to fetch reviews", error);
    return Response.json({ message: "Failed to fetch reviews" }, { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    const review = await request.json();
    const { productId, phone, name, rating, comment, orderId } = review;

    if (!productId || !phone || !name || !rating || !comment || !orderId) {
      return Response.json(
        { message: "Verified order, name, rating, and comment are required" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const ordersCollection = db.collection("orders");
    const reviewsCollection = db.collection("reviews");
    const verifiedOrder = await ordersCollection.findOne({
      phone: phone.trim(),
      $or: [
        { productId },
        { "productDetails.productId": productId },
      ],
    });

    if (!verifiedOrder || verifiedOrder._id.toString() !== orderId) {
      return Response.json(
        { message: "Please verify your order before reviewing this product" },
        { status: 403 }
      );
    }

    const existingReview = await reviewsCollection.findOne({
      productId,
      phone: phone.trim(),
    });

    if (existingReview) {
      return Response.json(
        { message: "You already reviewed this product" },
        { status: 409 }
      );
    }

    const result = await reviewsCollection.insertOne({
      productId,
      orderId,
      phone: phone.trim(),
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      createdAt: new Date(),
    });

    return Response.json(
      { message: "Review submitted successfully", reviewId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create review", error);
    return Response.json({ message: "Failed to submit review" }, { status: 500 });
  }
};
