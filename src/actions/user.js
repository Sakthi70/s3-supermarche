"use server"
import prisma from "db";
import { saltAndHashPassword } from "utils/helper";


export const finduserByEmail =async(email) => {
    return await prisma.user.findFirst({
        where: { email: email },
      });
}

export const finduserById =async(userId) => {
   let user =  await prisma.user.findUnique({
    
    where: {
      id: userId,
    },
    });
    const {hashedPassword, ...userDetails} = user;
    return userDetails
}

export const createUser = async(data)=> {
    await prisma.user.create({
        data: data
    });
}

export const updateUserPassword = async(data)=> {
    const {email, password} = data;
    const hash = saltAndHashPassword(password);
    try {
        const updatedUser = await prisma.user.update({
          where: { email: email },
          data: {
            hashedPassword: hash
          },
        });
        return updatedUser;
      } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Could not update user');
      } 
}

export const updateUserDetail = async(data,id)=> {
  try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: data
      });
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Could not update user');
    } 
}