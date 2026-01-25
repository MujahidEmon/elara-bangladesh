import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import React from "react";

export async function GET(request, { params }){
  const param = await params;
  console.log("Params:", params.id);
  const db =  await connectDB();
  const productCollection =  await db.collection("products");
  try {
    const product = await productCollection.findOne({ _id: new ObjectId(param.id)});
    return Response.json(product);
  } catch (error) {
    console.log(error);
  }
};