import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import db from './db';
import {saltAndHashPassword} from './utils/helper';
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
 
export const { handlers: {GET, POST}, signIn, signOut, auth } = NextAuth({
    adapter:PrismaAdapter(db),
    session: {strategy:'jwt'},
  providers: [Credentials({
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
        console.log('Credentials',credentials);
        if(!credentials || !credentials.email || !credentials.password){
             return null;
        }
        const email = credentials.email;
        const hash = saltAndHashPassword(credentials.password);
        let user =  await db.user.findUnique({
            where: {
                email,
            }
        })

        if(!user){
            user = await db.user.create({
                data: {
                     email,
                    hashedPassword: hash
                }
            })
        }else{
            const isMatch = bcrypt.compareSync(credentials.password, user.hashedPassword);
            if(!isMatch){
                throw new Error('Incorrect password.');
            }
        }
        return user;
      }
  })] ,
})