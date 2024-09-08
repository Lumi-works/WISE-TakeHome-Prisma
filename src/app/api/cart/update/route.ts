import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Update the quantity of a product in the cart
export async function PATCH(req: Request) {
  try {
    const { productId, quantity } = await req.json();

    if (quantity === 0) {
      return await fetch("/api/cart/remove", {
        method: "POST",
        body: JSON.stringify({ productId }),
      }).then((res) => res.json());
    }

    const updatedCart = await prisma.cart.updateMany({
      where: { productId },
      data: { quantity },
    });

    return NextResponse.json(updatedCart, { status: 200 });
  } catch (error) {
    console.error("Error updating product quantity:", error);
    return NextResponse.json(
      { error: "Failed to update product quantity" },
      { status: 500 }
    );
  }
}
