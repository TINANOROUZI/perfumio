import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const u = await prisma.user.findMany(); // <- should compile
  console.log("users:", u.length);
}
main().finally(() => prisma.$disconnect());
