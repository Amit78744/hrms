import pool from '../../../database/db';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

type User = {
    id: string; // or number, depending on your schema
    name?: string | null;
    email?: string | null;
    image?: string | null;
};

type Session = {
    user: User;
    // Include any other session properties you expect
};

// Action to create
export const POST = async (req: NextRequest) => {
	try {
		const session = await getServerSession(authOptions) as Session;
  	const { oldPassword, newPassword } = await req.json();
  	const userId = session.user?.id;

		const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
		const password = result.rows[0].password;
		
		// Check if the password matches
    const isValidPassword = await bcrypt.compare(
      oldPassword,
      password || ""
    );

    if (!isValidPassword) {
      return NextResponse.json({
				"status": 500,
				"message": "Old password not match"
			});
    }else{

      const hashedPassword = await bcrypt.hash(newPassword, 12);

  		const userResult = await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword,userId]);
  		console.log(userResult)
    	return NextResponse.json({
				"status": 200,
				"message": "Password updated successfully"
			});
    }

	} catch (error: unknown) {
  	if (error instanceof Error) {
    	console.error("Error message:", error.message);
  	} else {
    	console.error("Unknown error:", error);
  	}
    return NextResponse.json({ });
  }
};