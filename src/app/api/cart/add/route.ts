import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Add a product to the cart
export async function POST(request: Request) {
  const { productId, quantity } = await request.json();

  try {
    const newCartItem = await prisma.cart.create({
      data: {
        productId,
        quantity,
      },
    });
    return NextResponse.json(newCartItem, { status: 201 });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { error: "Failed to add product to cart" },
      { status: 500 }
    );
  }
}
