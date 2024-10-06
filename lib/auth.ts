import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from '@/database/db';
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  	session: {
    	strategy: "jwt",
  	},
  	providers: [
    	CredentialsProvider({
      		name: "Credentials",
      		credentials: {
        		email: { label: "Email", type: "email" },
        		password: { label: "Password", type: "password" },
      		},
      		async authorize(credentials) {
        		if (!credentials) return null;

		        // Fetch user by email
		        const result = await pool.query('SELECT * FROM users WHERE email = $1', [credentials?.email]);

		        if (!result.rows[0]) throw new Error("No user found with the entered email");

		        const user = result.rows[0];

		        // Check if the password matches
		        const isValidPassword = await bcrypt.compare(
		          credentials.password,
		          user.password || ""
		        );

		        if (!isValidPassword) {
		          	throw new Error("Invalid password");
		        }

		        return {
		          	id: user.id.toString(),
		          	email: user.email,
		          	name: user.name,		     
		          	role: user.role		     
		        };
      		},
		}),
  	],
  	pages: {
    	signIn: "/auth",
  	},
  	callbacks: {
    	async jwt({ token, user }) {
      		// Attach user data to the token
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
				token.role = user.role;
			}
      		return token;
    	},
    	async session({ session, token }) {
      		// Attach token data to the session
			if (token) {
				session.user = { id: token.id, name: token.name, email: token.email, role: token.role };
			}
      		return session;
    	},
  	},
  	secret: process.env.AUTH_SECRET,
};