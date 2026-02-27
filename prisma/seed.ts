import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const users = [
  { username: "chan", displayName: "Chan", password: "chan123" },
  { username: "ghegi", displayName: "Ghegi", password: "ghegi123" },
  { username: "gudo", displayName: "Gudo", password: "gudo123" },
];

async function main() {
  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { username: user.username },
      update: { displayName: user.displayName, passwordHash },
      create: {
        username: user.username,
        displayName: user.displayName,
        passwordHash,
      },
    });
    console.log(`✓ Upserted user: ${user.username}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
