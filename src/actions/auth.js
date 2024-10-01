// import  {signIn, signOut} from 'auth';

import prisma from 'db';
import { signIn, signOut } from "next-auth/react";
import {revalidatePath} from 'next/cache';
import { saltAndHashPassword } from "utils/helper";
import { createUser, finduserByEmail } from './user';

export const login = async (provider) => {
    await signIn(provider,{redirectTo:'/'});
    // revalidatePath('/');
}

export const logout = async ( ) => {
    await signOut({redirectTo:'/'});
    // revalidatePath('/');
}

export const loginWithCredentials =async(formData)=>{
  const rawFormData = {
    email: formData.email,
    password : formData.password,
    redirect: false
  };

  try {
    const response =  await signIn("credentials", rawFormData);
    return response
  } catch (error) {
    throw error
  }

}


export const registerUser =async(formData)=>{
try{
    const hash = saltAndHashPassword(formData.password);
  await createUser({
           email:formData.email,
           name: formData.name,
           phone: formData.phone,
           dob: formData.dob,
          hashedPassword: hash
      }
  );
  const rawFormData = {
    email: formData.email,
    password : formData.password,
    redirect: false
  };
    const response =  await signIn("credentials", rawFormData);
    return response
  } catch (error) {
      if (error.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
        return {error: true}
      }
  }

}

export const checkEmailExists =async(email)=> {
  try {
    const user = await finduserByEmail(email);

    return user !== null; // returns true if the user exists, otherwise false
  } catch (error) {
    console.log(error)
    throw new Error('Could not check email');
  } 
}