"use client";
import { useState } from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";

export default function App({
  productId,
  title,
  price,
  description,
  imageUrl,
}: {
  productId: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}) {
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const result = await response.json();
      if (result.error) {
        console.error(result.error);
      } else {
        setInCart(true);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleUpdateQuantity = async () => {
    try {
      const response = await fetch("/api/cart/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const result = await response.json();
      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      const result = await response.json();
      if (result.error) {
        console.error(result.error);
      } else {
        setInCart(false);
        setQuantity(1); // Reset quantity when removed
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    handleUpdateQuantity();
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      if (newQuantity === 1) {
        handleRemoveFromCart();
      } else {
        handleUpdateQuantity();
      }
      return newQuantity;
    });
  };

  console.log("Product ID:", productId);
  console.log("Quantity:", quantity);

  return (
    <Card className="py-4">
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={imageUrl}
          width={270}
        />
      </CardBody>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="text-2xl mb-1">{title}</h4>
        <p className="text-xs text-gray-400 mb-1">{description}</p>
        <div className="flex items-center space-x-14">
          <p className="text-base font-semibold">${price}</p>
          {inCart ? (
            <div className="flex items-center space-x-2">
              <Button className="px-2" size="sm" onClick={decreaseQuantity}>
                -
              </Button>
              <span>{quantity}</span>
              <Button className="px-2" size="sm" onClick={increaseQuantity}>
                +
              </Button>
            </div>
          ) : (
            <Button className="px-10" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
