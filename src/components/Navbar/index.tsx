"use client";
import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Badge,
} from "@nextui-org/react";
import Logo from "./Logo";
import ShopCart from "./ShopCart";

export default function App() {
  const [cartNumber, setCartNumber] = useState(0);

  useEffect(() => {
    fetch("/api/cart/total")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.totalProducts === "number") {
          setCartNumber(data.totalProducts);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <Navbar isBlurred={false} className="border-b border-gray-200 mb-4">
      <NavbarBrand className="flex items-center space-x-2s">
        <Link
          href="/"
          color="foreground"
          className="flex items-center space-x-2"
        >
          <Logo />
          <p className="font-bold text-inherit">Not Amazon</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Badge content={cartNumber} color="danger" shape="rectangle">
            <Button
              isIconOnly
              as={Link}
              href="/shopcart"
              variant="ghost"
              className="bg-transparent border-none shadow-none"
            >
              <ShopCart />
            </Button>
          </Badge>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
