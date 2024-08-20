"use server";

import prisma from 'db';

export async function getProducts(){
  const products = await prisma.product.findMany({
    
  });
  return {products}
}