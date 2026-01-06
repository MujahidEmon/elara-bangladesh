import { connectDB } from "@/lib/connectDB";
import bcrypt from 'bcrypt'
export const POST = async (request) => {
    const newUser = await request.json();
    try {
        const db = await connectDB();
        const userCollection = db.collection("users");
        const existingUser = await userCollection.findOne({email: newUser.email});
        if(existingUser){
            return Response.json({message: "user already exists"}, {status: 409})
        }
        const hashedPassword = await bcrypt.hash(newUser.password, 14);
        const response = await userCollection.insertOne({...newUser, password: hashedPassword});
        return Response.json({message: "user created"}, {status:200})
    } catch (error) {
        return Response.json({message: "Something went wrong"}, {status: 500})
    }
}