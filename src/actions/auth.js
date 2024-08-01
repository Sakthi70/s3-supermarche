// import  {signIn, signOut} from 'auth';
import { signIn, signOut } from "next-auth/react";
import {revalidatePath} from 'next/cache';

export const login = async (provider) => {
    await signIn(provider,{redirectTo:'/'});
    revalidatePath('/');
}

export const logout = async ( ) => {
    await signOut({redirectTo:'/'});
    revalidatePath('/');
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
    throw error;
  }

}