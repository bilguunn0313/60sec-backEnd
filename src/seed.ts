
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.plan.createMany({
    data: [
      { name: "Basic", price: 0.00, interval: "MONTHLY" },
      { name: "Premium", price: 14.000, interval: "MONTHLY" },
      { name: "Pro", price: 32.000, interval: "YEARLY" },
    ],
  });
}

main()
  .then(() => console.log("✅ Plans seeded!"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
