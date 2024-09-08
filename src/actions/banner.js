"use server";

import prisma from "db";

export async function getBanners(type= null, expiry= true) {
  let where = {};
  const currentDate = new Date();
  if(expiry){
    where={ OR: [
      {
        expires: {
          gte: currentDate,  
        },
      },
      {
        expires: null,
      },
    ],
  }
  if(type){
    where['type']=type;
  }
  }
  const banners = await prisma.banner.findMany({
    where : where
  });
  return { banners };
}

export const createBanner = async(value, file) => {
  let banner = await prisma.banner.create({
    data: {
          ...value,
          image: file
      }
  });
  return banner
}

export async function deleteBanner(id){
  const deleteBanner = await prisma.banner.delete({
  where: {
    id: id,
  },
    })
}

export const getBannerById = async(id) => {
  let banner = await prisma.banner.findUnique({
    where: {
      id: id
    },
  })
  return banner
}

export const updateBanner = async(value, id) => {
  let banner = await prisma.banner.update({
    where: {
      id
    },
    data: value});
  return banner
}