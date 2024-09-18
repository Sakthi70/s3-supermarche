import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { CredentialsSignin } from "next-auth"
import db from './db';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

export const { handlers: {GET, POST}, signIn, signOut, auth } = NextAuth({
    adapter:PrismaAdapter(db),
    callbacks: {
        async jwt({token, user}) {
          if (user) {
            token = {id:user.id, admin:user.isAdmin, name:user.name, email:user.email, image: user.image || null}; 
          }
          return token;
        },
        async session({ session, token }) {
         
          session.user = {
            ...token
          };
          return session;
        },
      },
    session: {strategy:'jwt'},
  providers: [
    CredentialsProvider({
    id: "credentials",
    name: 'credentials',
      credentials: {
        email:{
            label: "Email",
            type:'email',
            placeholder: "email@example.com"
        },
        password: {
            label: "Password",
            type:'password'
        }
      },
      authorize: async ( credentials) => {
        if(!credentials || !credentials.email || !credentials.password){
             return null;
        }
        try {
            const email = credentials.email;
            let user =  await db.user.findUnique({
                where: {
                    email,
                }
            })
            if(user){
                const isMatch = bcrypt.compareSync(credentials.password, user.hashedPassword);

                if (isMatch) {
                   return user;
                } else {
                    throw new Error("Email or Password is not correct");
                }
            } else {
                throw new Error("User not found");
            }
        } catch (error) {
            throw new Error(error);
        }  
  },

})] ,

})