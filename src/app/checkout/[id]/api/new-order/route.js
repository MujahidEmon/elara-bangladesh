import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
    const newOrder = await request.json();
    const db = await connectDB();
    const ordersCollection = db.collection("orders");


    try {
        ordersCollection.insertOne(newOrder);
        return new Response(JSON.stringify({ message: "Order created successfully" }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to create order" }), { status: 500 });
    }
}