import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { CATEGORIES, CITIES, VERIFIED_PROS } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with authentic trade categories, UK/US cities, and verified pros...");

  // 1. Seed Categories
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        icon: cat.icon,
        description: cat.shortDescription,
        avgPriceUK: cat.avgPriceUK,
        avgPriceUS: cat.avgPriceUS,
        emergencyAvailable: cat.emergencyAvailable,
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        icon: cat.icon,
        description: cat.shortDescription,
        avgPriceUK: cat.avgPriceUK,
        avgPriceUS: cat.avgPriceUS,
        emergencyAvailable: cat.emergencyAvailable,
      },
    });
  }
  console.log(`✓ Seeded ${CATEGORIES.length} service categories`);

  // 2. Seed Cities
  for (const city of CITIES) {
    await prisma.location.upsert({
      where: { slug: city.slug },
      update: {
        name: city.name,
        country: city.country,
        stateCounty: city.stateCounty,
        postalPrefix: city.postalPrefix,
        isPopular: city.isPopular,
      },
      create: {
        slug: city.slug,
        name: city.name,
        country: city.country,
        stateCounty: city.stateCounty,
        postalPrefix: city.postalPrefix,
        isPopular: city.isPopular,
      },
    });
  }
  console.log(`✓ Seeded ${CITIES.length} UK & US cities`);

  // 3. Seed Verified Pros
  const defaultPasswordHash = await bcrypt.hash("TradePro2026!", 10);

  for (const pro of VERIFIED_PROS) {
    const user = await prisma.user.upsert({
      where: { email: pro.email },
      update: {},
      create: {
        name: pro.contactName,
        email: pro.email,
        passwordHash: defaultPasswordHash,
        phone: pro.phone,
        role: "PRO",
      },
    });

    const categoryRecords = await prisma.category.findMany({
      where: { slug: { in: pro.categories } },
    });

    const proProfile = await prisma.proProfile.upsert({
      where: { userId: user.id },
      update: {
        companyName: pro.companyName,
        slug: pro.slug,
        bio: pro.bio,
        phone: pro.phone,
        hourlyRate: pro.hourlyRate,
        calloutFee: pro.calloutFee,
        rating: pro.rating,
        reviewCount: pro.reviewCount,
        yearsInBusiness: pro.yearsInBusiness,
        isVerified: pro.isVerified,
        isInsuranceValid: pro.isInsuranceValid,
        insuranceAmount: pro.insuranceAmount,
        licenseNumber: pro.licenseNumber,
        country: pro.country,
        city: pro.city,
        postcodeOrZip: pro.postcodeOrZip,
        categories: {
          connect: categoryRecords.map((c: { id: string }) => ({ id: c.id })),
        },
      },
      create: {
        userId: user.id,
        companyName: pro.companyName,
        slug: pro.slug,
        bio: pro.bio,
        phone: pro.phone,
        hourlyRate: pro.hourlyRate,
        calloutFee: pro.calloutFee,
        rating: pro.rating,
        reviewCount: pro.reviewCount,
        yearsInBusiness: pro.yearsInBusiness,
        isVerified: pro.isVerified,
        isInsuranceValid: pro.isInsuranceValid,
        insuranceAmount: pro.insuranceAmount,
        licenseNumber: pro.licenseNumber,
        country: pro.country,
        city: pro.city,
        postcodeOrZip: pro.postcodeOrZip,
        categories: {
          connect: categoryRecords.map((c: { id: string }) => ({ id: c.id })),
        },
      },
    });

    // Seed Pro Reviews
    for (const rev of pro.reviews) {
      await prisma.review.create({
        data: {
          proProfileId: proProfile.id,
          authorName: rev.author,
          rating: rev.rating,
          title: rev.title,
          comment: rev.comment,
          city: rev.city,
          verifiedJob: true,
        },
      });
    }
  }

  console.log(`✓ Seeded ${VERIFIED_PROS.length} verified trade pros with detailed reviews`);
  console.log("Database seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
