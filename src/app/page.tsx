"use client";
import { Image } from "@nextui-org/react";
import ProductCard from "@/src/components/ProductCard";
import { Product } from "@/src/types/Product";
import { useEffect, useState } from "react";

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
      <div className="mb-8">
        <Image
          isZoomed
          width={1240}
          height={420}
          alt="NextUI Fruit Image with Zoom"
          src="https://media.wired.com/photos/632b71c4f1e5c40d2b1bc705/master/w_2240,c_limit/AirPods-Pro-2nd-Gen-Gear.jpg"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p>Loading...</p>
        ) : Array.isArray(products) ? (
          products.map((product: Product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              title={product.name}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
            />
          ))
        ) : (
          <p>Error: Failed to load products.</p>
        )}
      </div>
    </main>
  );
}
