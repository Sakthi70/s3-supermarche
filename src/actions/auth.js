import  {signIn, signOut} from 'auth';
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
    redirectTo: '/'
  };
  console.log(rawFormData);
  try {
    await signIn("credentials", rawFormData);
  } catch(error){
    if(error){
        switch(error.type){
            case 'CredentialsSignin':
                return {error: 'Invalid Credentails!'};
            default:
                return {error:'Something went wrong!'};
        }
    }
  throw error; 
  }
  revalidatePath('/');
}