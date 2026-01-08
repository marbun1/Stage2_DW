import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // USERS
  const user = await prisma.users.create({
    data: {
      username: "admin",
      password: "admin123",
    },
  });

  // CATEGORIES
  const tech = await prisma.categories.create({
    data: { name: "Tech" },
  });

  const life = await prisma.categories.create({
    data: { name: "Lifestyle" },
  });

  // POSTS
  const post1 = await prisma.posts.create({
    data: {
      title: "Belajar Prisma",
      content: "Prisma ORM itu enak",
      authorId: user.id,
      categoryId: tech.id,
    },
  });

  const post2 = await prisma.posts.create({
    data: {
      title: "Hidup Seimbang",
      content: "Jangan ngoding doang",
      authorId: user.id,
      categoryId: life.id,
    },
  });

  // COMMENTS (BIAR ADA PAGINATION & GROUPING)
  for (let i = 1; i <= 12; i++) {
    await prisma.comments.create({
      data: {
        content: `Komentar ${i} di post 1`,
        postId: post1.id,
      },
    });
  }

  for (let i = 1; i <= 3; i++) {
    await prisma.comments.create({
      data: {
        content: `Komentar ${i} di post 2`,
        postId: post2.id,
      },
    });
  }

  console.log("🌱 Seed selesai");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
