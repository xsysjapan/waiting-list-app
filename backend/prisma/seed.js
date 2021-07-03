const PrismaClient = require("@prisma/client").PrismaClient;
const crypto = require("crypto");
const prisma = new PrismaClient();
function md5Hash(data) {
  return crypto.createHash("md5").update(data).digest("hex");
}
async function main() {
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      name: "Admin",
      passwordHash: md5Hash("P@ssw0rd#"),
    },
  });
  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
