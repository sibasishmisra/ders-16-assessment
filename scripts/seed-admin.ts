import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

async function main() {
  const email = 'sibasish.mishra@5elements.co.in';
  const password = 'Admin@2200';
  const name = 'Sibasish Mishra';

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.admin.deleteMany({});

  await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  console.log('Admin created:', email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
