# 📝 Stage 2 Day 3 - Blog
Repository to store our learning progress at Dumbways.id Bootcamp

## 🎯 Topic & Task
Day 3 - Prisma Advance Query
- Create a new schema for Posts, Comments, and Users tables using Prisma.
- Implement Filtering to display a list of Posts based on User.
- Implement Pagination for the list of Comments on each Post.
- Implement Grouping to count the number of comments per Post.
- Create a /posts endpoint with a Filtering feature based on User.
- Create a /posts/:id/comments endpoint with a Pagination feature to limit the number of comments displayed.
- Create a /posts/comments-summary endpoint to display the number of comments per Post using Grouping.
- Add Pagination and additional Filters for the summary results (e.g., filter only Posts with a comment count > 10).

## 🛠️ How to Setup Typescript
```text
Follow these steps to initialize the TypeScript environment:

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
  generator client {
    provider = "prisma-client-js"
    output   = "../src/generated/prisma"
  }

  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }

  model Post {
      id        Int       @id @default(autoincrement())
      title     String
      content   String
      authorId  Int
      author    User      @relation(fields: [authorId], references: [id])
      comments  Comment[]
      createdAt DateTime  @default(now())
  }

- npx prisma generate                                       # generate the client code
- npx prisma migrate dev --name init                        # push schema to PostgreSQL
- create src/connection/client.ts
- npx prisma studio                                         # to see Data in localhost:555, execute at other bash
```

## 🛠️ How to do Seeding
```text
- Edit the model in schema.prisma: 
    model User {
      id        Int       @id @default(autoincrement())
      username  String    @unique
      posts     Post[]
      comments  Comment[]
    }

    model Post {
      id        Int       @id @default(autoincrement())
      title     String
      content   String
      authorId  Int
      author    User      @relation(fields: [authorId], references: [id])
      comments  Comment[]
      createdAt DateTime  @default(now())
    }

    model Comment {
      id        Int      @id @default(autoincrement())
      text      String
      postId    Int
      authorId  Int
      post      Post     @relation(fields: [postId], references: [id])
      author    User     @relation(fields: [authorId], references: [id])
      createdAt DateTime @default(now())
    }
- npx prisma migrate dev --name init
- npx prisma generate
- add src/connection/seed.ts
- add your code seed.ts
- edit package.json,
    "prisma": {
        "seed": "ts-node src/connection/seed.ts"
      }, 
- npx prisma db seed
```

## 📂 Project Structure
```text
This project follows a modular structure to separate concerns:

├── prisma/
│   ├── schema.prisma           # Prisma Schema (v6 style)
│   └── migrations/             # Database migration history
├── src/
│   ├── app.ts                  # Application entry point & configuration
│   ├── connection/
│   │   ├── seed.ts             # to perform seeding
│   │   └── client.ts           # Prisma Client instantiation
│   ├── routes/                 # API endpoint definitions (URL paths)
│   │   ├── post-route.ts       # Routes for Post-related resources
│   │   └── user-route.ts       # Routes for User-related resources
│   ├── controllers/            # Request handling & business logic
│   │   ├── post-controller.ts  # Logic for Post operations
│   │   └── user-controller.ts  # Logic for User operations
│   ├── models/                 # Data schemas & database interactions
│   │   └── post-model.ts       # Post data structure (e.g., Mongoose/Sequelize)
│   └── ...
├── .env                        # Environment variables (DB URL)
├── package.json                # Project dependencies & scripts
├── package-lock.json
└── tsconfig.json
```

---
## 🚀 Implementation Flow
```text
1. Setup TypeScript: Configure the compiler and folder structure.
2. Setup Prisma 6: Install specific version 6 to match learning materials.
3. Model Definition: Define the Product table in schema.prisma.
4. Migration: Use npx prisma migrate dev to create the table in PostgreSQL.
5. Seeding: Create Data based on model and insert Datas to the Database
6. Controller Logic: Use prisma.product.create/findMany/update/delete in your controllers.

💡 Note on Naming Conventions: > In Express, it is common to use kebab-case (e.g., post-controller.ts) or camelCase for files. Consistency is key!
```

### 💡 Helpful Tips
- Prisma Client: In src/connection/client.ts, simply use:
```text
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
```

---

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