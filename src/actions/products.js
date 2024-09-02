"use server";

import prisma from 'db';

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