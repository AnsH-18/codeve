import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import client from "./lib/db"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: {strategy: "jwt"},
  ...authConfig,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = String(token.sub)
      }
      return session;
    },
    async jwt({ token, user }) {
      await client.connect()
      const db = client.db()
      const userCollection = db.collection("users")

      if(user){
        token.sub = user.id
      }
    
      if(token.sub){
          const dbUser = await userCollection.findOne({id: token.sub});
          if(dbUser){
            token.id = dbUser._id
          }
      }
      return token;
    }
  }
})