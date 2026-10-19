import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || 'Admin';

  if (!email || !password) {
    console.error('Usage: npx ts-node scripts/provision-admin.ts <email> <password> [name]');
    process.exit(1);
  }

  try {
    const passwordHash = await argon2.hash(password);

    const admin = await prisma.user.upsert({
      where: { email },
      update: {
        role: 'ADMIN',
        passwordHash,
      },
      create: {
        email,
        name,
        passwordHash,
        role: 'ADMIN',
        emailVerified: new Date(),
      },
    });

    console.log(`Successfully provisioned admin: ${admin.email}`);
  } catch (error) {
    console.error('Error provisioning admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
