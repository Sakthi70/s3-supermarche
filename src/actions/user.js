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
    include:{
      addresses : true
    }
    });
    const {hashedPassword, ...userDetails} = user;
    return userDetails
}

export const createUser = async(data)=> {
    await prisma.user.create({
        data: data
    });
}

export const getUsers = async()=>{
  let users = await prisma.user.findMany({
    where :{
      enabled:true
    },
    include: {
      _count: {
        select:{
            orders:true
        }
      }
    }
  })
  return users 
}

export const createAddress = async(data) =>{
  return await prisma.address.create({
    data: data
});
}

export const updateAddress = async(address) =>{
  const {id, ...data} = address;
  return await prisma.address.update({
    data: data,
    where:{id}
});
}

export const deleteAddress = async(id) =>{
  return await prisma.address.delete({
    where: {
      id
    }
});
}

export const deleteCustomer = async (id,count) => {
  if (count > 0) {
    return await prisma.user.update({
      where: { id: id },
      data: { email: "",  enabled:false },
    });
  } else {
    await prisma.session.deleteMany({
      where : {
        userId: id
      }
    });
    await prisma.authenticator.deleteMany({
      where : {
        userId: id
      }
    });
    await prisma.account.deleteMany({
      where : {
        userId: id
      }
    });
    await prisma.address.deleteMany({
      where : {
        userId: id
      }
    });
    return await prisma.user.delete({
      where : {
        id: id
      }
    });
  }
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