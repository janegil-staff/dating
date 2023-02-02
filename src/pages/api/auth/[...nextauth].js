import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";


export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
      
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error('Ingen bruker funnet!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
       
        if (!isValid) {
          client.close();
          throw new Error('Passordet er feil!');
        }
        client.close();
        return { email: user.email };
      },
    }),
  ],
});
