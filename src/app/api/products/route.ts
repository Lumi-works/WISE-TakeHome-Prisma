import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// an API route to get all products
export async function GET(req: Request) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
