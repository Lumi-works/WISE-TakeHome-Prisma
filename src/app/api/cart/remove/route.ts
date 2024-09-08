import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Remove a product from the cart
export async function POST(req: Request) {
  try {
    const { productId } = await req.json();

    const removedCartItem = await prisma.cart.deleteMany({
      where: {
        product: { id: productId },
      },
    });

    return NextResponse.json(removedCartItem, { status: 200 });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove product from cart" },
      { status: 500 }
    );
  }
}
