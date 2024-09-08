"use client";

import { useEffect, useState } from "react";

import { Image, Button } from "@nextui-org/react";

import { Product } from "@/src/types/Product";

import ProductCard from "@/src/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <main className="container mb-8">
      <div className="mb-8 grid grid-cols-2">
        <Image
          isZoomed
          width={480}
          height={420}
          alt="NextUI Fruit Image with Zoom"
          src="https://media.wired.com/photos/632b71c4f1e5c40d2b1bc705/master/w_2240,c_limit/AirPods-Pro-2nd-Gen-Gear.jpg"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-start mb-4 text-black">
            Product Name
          </h1>
          <p className="text-start text-sm text-gray-400 mb-4">
            Product description goes here. Product description goes here.
            Product description goes here. Product description goes here.
            Product description goes here. Product description goes here.
            Product description goes here. Product description goes here.
            Product description goes here. Product description goes here.
          </p>
          <div className="flex space-x-20 items-center">
            <p className="text-center text-lg font-bold text-black">$10.00</p>
            <Button className="px-10">Add to Cart</Button>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-black">Similar Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
        {products.length === 0 && <p>Loading...</p>}
        {Array.isArray(products) ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.name}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
            />
          ))
        ) : (
          <p>Error: Data is not in expected format</p>
        )}
      </div>
    </main>
  );
}
