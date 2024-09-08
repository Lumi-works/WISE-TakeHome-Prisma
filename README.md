# Product Management System

Frontend: Typescript & Next.js & Tailwind & NextUI
Backend: Prisma & PostgreSQL

## Table of Contents

- [Product Management System](#product-management-system)
  - [Table of Contents](#table-of-contents)
  - [Project Setup](#project-setup)
    - [Requirements](#requirements)
    - [Installation](#installation)
  - [Folder Structure](#folder-structure)
  - [Backend Setup](#backend-setup)
    - [MikroORM Configuration](#mikroorm-configuration)
  - [Running the Project](#running-the-project)

## Project Setup

### Requirements

- Node.js (>= 18.0.0)
- PostgreSQL
- Prisma
- Next.js (>= 13)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/database
   ```

   Replace `user`, `password`, and `database` with your PostgreSQL credentials.

## Folder Structure

- `lib/prisma.ts`: Prisma configuration.
- `prisma/schema.prisma`: Prisma schema definition for products and carts.
- `src/app/api/product/route.ts`: API route for fetching products.
- `src/app/api/cart/add`: API route for adding to cart.
- `src/app/api/cart/remove`: API route for removing from cart.
- `src/app/api/cart/update`: API route for updating an entry in the cart.
- `src/app/api/cart/total`: API route for counting the total products in the cart.
- `src/components/ProductCard`: Component to display individual product cards.
- `src/components/Navbar`: Component to display the navbar
- `src/app/page.tsx`: Frontend component to fetch and display products.
- `src/app/shopcart/page.tsx`: Frontend component to display the shopcart

## Backend Setup

### Prisma Configuration

1. **Create the Prisma configuration file:**

   ```typescript
   // lib/prisma.ts
   import { PrismaClient } from "@prisma/client";

   const prismaClientSingleton = () => {
     return new PrismaClient();
   };
    
   declare const globalThis: {
     prismaGlobal: ReturnType<typeof prismaClientSingleton>;
   } & typeof global;
    
   const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
    
   export default prisma;
    
   if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

   ```

2. **Create the schema:**

   ```typescript
   // prisma/schema.prisma
   generator client {
     provider = "prisma-client-js"
   }
    
   datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
   }
    
   model product {
      id          Int  @id @default(autoincrement())
      name        String
      description String  @db.Text
      price       Decimal @db.Decimal
      imageUrl    String  @db.Text
      cart        cart?  
      cartId      Int?  @unique
   }
    
   model cart {
      id        Int    @id @default(autoincrement())
      product   product? @relation(fields: [productId], references: [id])
      productId Int?  @unique
      quantity  Int?
   }

   ```

3. **Database Initialization and Migration:**

   Run the following commands to migrate the database:

   ```bash
   npx prisma migrate:dev
   npx prisma db push
   ```

## Running the Project

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Visit the application:**

   Open `http://localhost:3000` in your browser to view the application.
