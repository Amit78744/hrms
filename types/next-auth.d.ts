// types/next-auth.d.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        id: string; // Add id property
        role?: string;
    }
}

declare module "next-auth" {
    interface User {
        id: string; // Add id property
        role?: string;
    }

    interface Session {
        user: User;
    }
}
