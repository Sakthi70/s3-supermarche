"use server";

import prisma from 'db';

export const createCategory = async(name, file) => {
  
   
    let category = await prisma.category.create({
      data: {
        name,
            image: file
        }
    });
    return category
}

export async function getCategories(){
    const categories = await prisma.Category.findMany();
    return {categories}
}

  export async function deleteCategory(id){
    const deleteCategory = await prisma.Category.delete({
    where: {
      id: id,
    },
      })
}