import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const total = await prisma.cart.aggregate({
      _sum: {
        quantity: true,
      },
    });

    const totalProducts = total._sum.quantity || 0;
    return NextResponse.json({ totalProducts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart total:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart total" },
      { status: 500 }
    );
  }
}
