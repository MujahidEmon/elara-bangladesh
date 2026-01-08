import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

const handler = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        // Add your authentication providers here
        CredentialsProvider({
            credentials:{
                email: {},
                password: {}
            },

            async authorize(credentials){
                const {email, password} = credentials;

                if(!email || !password){
                    return null;
                }

                const db = await connectDB();
                const currentUser = await db.collection('users').findOne({email});

                if(!currentUser){
                    return null;
                }

                const isPasswordValid = bcrypt.compareSync(password, currentUser.password);

                if(!isPasswordValid){
                    return null;
                }

                return currentUser;
            }
            
        })
    ],
    callbacks: {},
    pages: {
        signIn: '/login'
    },

})

export { handler as GET, handler as POST };