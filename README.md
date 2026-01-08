# 📝 Stage 2 Day 3 - Shopping Cart
Repository to store our learning progress at Dumbways.id Bootcamp

## 🎯 Topic & Task
Day 3 - Prisma Advance Query
- Implement Filtering & Sorting products's table based on price or stock
- Implement **Pagination** on endpoint/products using limit & offset
- Create endpoint/orders/summary to visualize total sum order per user using **grouping**
- Add Pagination on Summary Result

## 🛠️ How to Setup Typescript 
```text
- make a folder to contain the project
- npm init -y                                               # to initiliaze Node.js Environment
- npm install express                                       # to install Express Framework
- npm install -D typescript ts-node-dev @types/express      # to install typscript
- npx tsc --init                                            # execute typescript package
- make dir src at root
- create app.ts file inside src
- edit tsconfig.json, define root folder ex: ("rootDir": "./src")
- edit package.json, define inside scripts "dev": "ts-node-dev --respawn src/app.ts"
- npm run dev                                               # to run app.ts

```

## 🛠️ How to Setup Prisma 6 with PostgreSQL
```text
- npm install prisma@6 --save-dev                           # install Prisma CLI v6
- npm install @prisma/client@6                              # install Prisma Client v6
- create database in pgAdmin (e.g., "mini_store_db")
- npx prisma init                                           # initialize Prisma folder
- edit .env file:
  DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"

- edit prisma/schema.prisma (Ensure URL is inside the datasource block):
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }

  model Product {
    id        Int      @id @default(autoincrement())
    name      String
    price     Float
    createdAt DateTime @default(now())
  }

- npx prisma generate                                       # generate the client code
- npx prisma migrate dev --name init                        # push schema to PostgreSQL
```

## 🛠️ How to do Seeding
```text
- Edit the model in schema.prisma
    model User {
      id     Int     @id @default(autoincrement())
      name   String
      email  String  @unique
      orders Order[]
    }

    model Product {
      id     Int     @id @default(autoincrement())
      name   String
      price  Int
      stock  Int
      orders Order[]
    }

    model Order {
      id        Int @id @default(autoincrement())
      userId    Int
      productId Int
      quantity  Int

      user    User    @relation(fields: [userId], references: [id])
      product Product @relation(fields: [productId], references: [id])
    }
- npx prisma migrate dev --name init
- npx prisma generate
- add src/connection/seed.ts
- add your code seed.ts
- edit package.json,
    "prisma": {
        "seed": "ts-node src/prisma/seed.ts"
      }, 
- npx prisma db seed
```

## 📂 Project Structure
```text
├── prisma/
│   ├── schema.prisma           # Prisma Schema (v6 style)
│   └── migrations/             # Database migration history
├── src/
│   ├── app.ts                  # Entry point
│   ├── connection/
│   │   ├── seed.ts             # to perform seeding
│   │   └── client.ts           # Prisma Client instantiation
│   ├── routes/
│   │   ├── product-route.ts    
│   │   └── order-route.ts      
│   ├── controllers/
│   │   ├── product-controller.ts
│   │   └── order-controller.ts
│   └── middlewares/            
├── .env                        # Environment variables (DB URL)
├── package.json
├── package-lock.json
└── tsconfig.json
```

## 🚀 Implementation Flow
```text
1. Setup TypeScript: Configure the compiler and folder structure.
2. Setup Prisma 6: Install specific version 6 to match learning materials.
3. Model Definition: Define the Product table in schema.prisma.
4. Seeding: Create Data based on model and insert Datas to the Database
5. Migration: Use npx prisma migrate dev to create the table in PostgreSQL.
6. Controller Logic: Use prisma.product.create/findMany/update/delete in your controllers.

💡 Note on Naming Conventions: > In Express, it is common to use kebab-case (e.g., post-controller.ts) or camelCase for files. Consistency is key!
```

### 💡 Helpful Tips
- Prisma Client: In src/connection/client.ts, simply use:
```text
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
```

#### Notes
- Read about "naming convention files & folders in express js"
- tsconfig.json template:
```text
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}

```
- prisma documentation : https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/postgresql
- prisma CRUD : https://www.prisma.io/docs/orm/prisma-client/queries/crud