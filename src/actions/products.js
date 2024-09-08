"use server";

import prisma from 'db';
import { shuffleArray } from 'utils/util';

export async function getProducts(){
  const products = await prisma.product.findMany({
    
  });
  return {products}
}

export async function createProduct(product){
  const products = await prisma.product.create({
    data:{
      ...product
    }
  });
  return {products}
}

export async function getRandomProducts(categoryIds) {
  const products = await prisma.product.findMany({
    where: {
      categoryId: {
        in: categoryIds,
      },
    },
    include: {
      category: {
        select: {
          name: true
        },
      },
    },
    take: 100, // Fetch more than 10 to ensure randomness
  });

  // Shuffle the products and take the first 10
  const shuffledProducts = shuffleArray(products).slice(0, 10);

  return shuffledProducts;
}

export async function getProductById(productId) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,           // Include the related category
        productVariant: true,    // Include the related product variants
      },
    });

    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    throw error();
  } 
}