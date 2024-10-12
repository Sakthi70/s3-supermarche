"use server"
import prisma from "db";

export async function getSettings() {
  const settings = await prisma.settings.findFirst({
  });
  return settings
}

export const updateSettings = async (value) => {
  const { id, ...data } = value;
  let settings = await prisma.settings.update({
    where: {
      id
    },
    data: data
  });
  return settings
}


export async function getFooterLinks() {
  const footerLinks = await prisma.footerLinks.findMany({
  });
  return footerLinks
}




export async function createFooterLinks(footerLinks) {
  const operations = footerLinks.map(async (data) => {
    if (data.id) {
      return await prisma.footerLinks.update({
        where: { id: data.id },
        data: { name: data.name, url:data.url, col:data.col },
      });
    } else {
      return await prisma.footerLinks.create({
        data: { name: data.name, url:data.url, col:data.col },
      });
    }
  });

  const results = await Promise.all(operations);
  return { results }
}

export const updateFooterLink = async (value) => {
  const { id, ...data } = value;
  let footerLink = await prisma.footerLinks.update({
    where: {
      id
    },
    data: data
  });
  return footerLink
}


export async function deleteFooterLink(id) {
  const footerLink = await prisma.footerLinks.delete({
    where: {
      id: id,
    },
  })
}