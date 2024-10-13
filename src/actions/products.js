"use server";

import prisma from 'db';
import { shuffleArray } from 'utils/util';

export async function getProducts(){
  const products = await prisma.product.findMany({
    include :{
      category: {
        select: {
          name: true
        },
      },
    }
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

export const createMultipleProducts = async(value) => {
  let products = await prisma.product.createMany({
    data: value,
  });
  return products
}

export async function updateProductById(product, id){
  const productData = await prisma.product.update({
    where: {
      id
    },
    include: {
      category: {
        select: {
          name: true
        },
      },
    },
    data: product});
  return productData;
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
    take: 10, // Fetch more than 10 to ensure randomness
  });

  // Shuffle the products and take the first 10
  // const shuffledProducts = shuffleArray(products).slice(0, 10);

  return products;
}

export async function productsInCart(productIds){
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    }
  });
  return products;
}

export async function productsCategorySearch(categoryIds) {
  const products = await prisma.product.findMany({
    where: {
      AND: [
      {categoryId: {
        in: categoryIds,
      }
    },
    {
      enabled : true
    }
    ]
    },
    include: {
      category: {
        select: {
          name: true,
          enabled: true
        },
      },
    },
  });

  const filteredProducts = products.filter(product => product.category.enabled);

  return filteredProducts;
}



export async function productsSearch(searchString) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchString,
            mode: 'insensitive', 
          },
        },
        {
          tags: {
            hasSome: searchString.split(' ')// Optional: case insensitive for tags
          },
        },
      ],
    },
    include: {
      category: {
        select: {
          name: true,
          enabled: true
        },
      },
    },
  });

  const filteredProducts = products.filter(product => product.category.enabled);

  return filteredProducts;
}

export async function getProductById(productId) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,           // Include the related category
      },
    });

    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    throw error;
  } 
}

export async function deleteProduct(id){
  const deleteProduct = await prisma.product.delete({
  where: {
    id: id,
  },
    })
}