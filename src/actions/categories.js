 "use server"

import {imageUpload} from 'utils/cloudinary'
import prisma from 'db';

export const createCategory = async(name, file) => {
    let result = "";
    if(file){
         result = await imageUpload(file, 'Category');
    }
    let category = await prisma.category.create({
        data: {
            name,
            image: result
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