"use server"
import prisma from "db";

export async function getPages(){
    const pages = await prisma.pages.findMany({
      
    });
    return {pages}
  }
  
  export async function createPage(page){
    const pages = await prisma.pages.create({
      data:{
        ...page
      }
    });
    return {pages}
  }

  export const updatePage = async(value) => {
    const {id , ...data } = value;
    let page = await prisma.pages.update({
      where: {
        id
      },
      data: data});
    return page
  }


  export async function getPagebyPageId(pageId){
    const page = await prisma.pages.findFirst({
      where:{
        pageId: pageId
      }
    });
    return page
  }

  export const getPageById = async(id) => {
    let page = await prisma.pages.findUnique({
      where: {
        id: id
      },
    })
    return page
  }

  export async function deletePage(id){
    const pages = await prisma.pages.delete({
    where: {
      id: id,
    },
      })
}