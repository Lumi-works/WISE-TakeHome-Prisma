import prisma from "@/lib/prisma";

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Product 1",
        description: "This is the description for Product 1.",
        price: 199.99,
        imageUrl:
          "https://media.wired.com/photos/632b71c4f1e5c40d2b1bc705/master/pass/AirPods-Pro-2nd-Gen-Gear.jpg",
      },
      {
        name: "Product 2",
        description: "This is the description for Product 2.",
        price: 149.99,
        imageUrl:
          "https://media.wired.com/photos/632b71c4f1e5c40d2b1bc705/master/pass/AirPods-Pro-2nd-Gen-Gear.jpg",
      },
      {
        name: "Product 3",
        description: "This is the description for Product 3.",
        price: 99.98,
        imageUrl:
          "https://media.wired.com/photos/632b71c4f1e5c40d2b1bc705/master/pass/AirPods-Pro-2nd-Gen-Gear.jpg",
      },
      {
        name: "Product 4",
        description: "This is the description for Product 4.",
        price: 249.99,
        imageUrl:
          "https://media.wired.com/photos/632b71c4f1e5c40d2b1bc705/master/pass/AirPods-Pro-2nd-Gen-Gear.jpg",
      },
      {
        name: "Product 5",
        description: "This is the description for Product 5.",
        price: 179.99,
        imageUrl:
          "https://media.wired.com/photos/632b71c4f1e5c40d2b1bc705/master/pass/AirPods-Pro-2nd-Gen-Gear.jpg",
      },
      {
        name: "Product 6",
        description: "This is the description for Product 6.",
        price: 129.99,
        imageUrl:
          "https://media.wired.com/photos/632b71c4f1e5c40d2b1bc705/master/pass/AirPods-Pro-2nd-Gen-Gear.jpg",
      },
    ],
  });

  console.log("Products have been added");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
