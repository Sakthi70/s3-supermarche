"use server";

import prisma from "db";

export async function getBanners(type) {
  const banners = await prisma.banner.findMany({
    where: {
      OR: [
        {
          expires: null,
        },
        {
          expires: {
            lte: new Date(),
          },
        },
      ],
    },
  });
  return { banners };
}

export const createBanner = async(value, file) => {
  let category = await prisma.banner.create({
    data: {
          ...value,
          image: file
      }
  });
  return category
}