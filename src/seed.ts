// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function main() {
//   await prisma.plan.createMany({
//     data: [
//       { name: "Basic", price: 0.00, interval: "MONTHLY" },
//       { name: "Premium", price: 14.00, interval: "THREE_MONTHS" },
//       { name: "Pro", price: 32.00, interval: "YEARLY" },
//     ],
//   });
// }

// main()
//   .then(() => console.log("Plans seeded!"))
//   .catch((err) => console.error("Error seeding plans:", err))
//   .finally(() => prisma.$disconnect());
