"use server";

import prisma from 'db';

export const createCategory = async(value, file) => {
    let category = await prisma.category.create({
      data: {
            ...value,
            image: file
        },
        include:{
          _count: {
            select:{
              categories: true,
              products: true
            }
          }
        }

    });
    return category
}

export const updateCategory = async(value, id) => {
  let category = await prisma.category.update({
    where: {
      id
    },
    include:{
      _count: {
        select:{
          categories: true,
          products: true
        }
      }
    },
    data: value});
  return category
}

export async function getCategories(){
    const categories = await prisma.Category.findMany({
      include:{
        _count: {
          select:{
            categories: true,
            products: true
          }
        }
      }
    });
    return {categories}
}

  export async function deleteCategory(id){
    const deleteCategory = await prisma.Category.delete({
    where: {
      id: id,
    },
      })
}