import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed the database with some Todo items
  await prisma.todo.create({
    data: {
      title: "Buy milk",
      completed: false,
    },
  });

  await prisma.todo.create({
    data: {
      title: "Walk the dog",
      completed: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
