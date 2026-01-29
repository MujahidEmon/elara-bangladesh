import { connectDB } from "@/lib/connectDB"

export const POST = async (request) => {
    const order = await request.json();
    const db = await connectDB();
    const ordersCollection = db.collection("orders");

    try {
        const result = await ordersCollection.insertOne(order);
        return Response.json({message: "Order placed successfully"})
    } catch (error) {
        console.log(error);
    }
}