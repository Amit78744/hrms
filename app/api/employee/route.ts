import pool from '../../../database/db';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";


// Action to read
export const GET = async () => {
  	try {
      const result = await pool.query("SELECT * FROM users WHERE role = 'Employee' ORDER BY name")
    	
    	return NextResponse.json({
	    	"employees":result.rows
	  	});
    } catch (error: unknown) {
    	if (error instanceof Error) {
	    	console.error("Error message:", error.message);
	  	} else {
	    	console.error("Unknown error:", error);
	  	}
      return NextResponse.json({ });
    }
};

// Action to create
export const POST = async (req: NextRequest) => {
	try {
		const session = await getServerSession(authOptions);
  	const { fullName, email, password, phone, status, address } = await req.json();
  	
		const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
		console.log(result.rows)
    if (result.rows.length > 0) {
      return NextResponse.json({
				"status": 500,
				"message": "Email already exist"
			});
    }else{

      const hashedPassword = await bcrypt.hash(password, 12);

  		const userResult = await pool.query('INSERT INTO users (name, email, phone, password, status, address, role) VALUES ($1, $2, $3, $4, $5, $6, $7)', [fullName,email,phone,hashedPassword,status,address,'Employee']);
  		
    	return NextResponse.json({
				"status": 200,
				"message": "Employee created successfully"
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

// Action to update or edit
export const PUT = async (req: NextRequest) => {
  	const { id, fullName, email, phone, status, address } = await req.json();

		try {
      const result = await pool.query('UPDATE users SET name = $1, email = $2, phone = $3, status = $4, address = $5 WHERE id = $6 RETURNING *', [fullName, email, phone, status, address, id]);
      	
      return NextResponse.json({
				"status": 200,
				"message": "Employee updated successfully"
			});
      	
    } catch (error: unknown) {
    	if (error instanceof Error) {
    		return NextResponse.json({
					"status": 500,
					"message": "Error: "+error.message
				});
	    	
	  	} else {
	    	return NextResponse.json({
					"status": 500,
					"message": "Error: "+error
				});
	  	}
    }
};

// Action to delete
export const DELETE = async (req: NextRequest) => {
	const url = new URL(req.url).searchParams;
	const id = Number(url.get("id")) || 0;

	try {

  	await pool.query('DELETE FROM users WHERE id = $1', [id]);
  	
  	return NextResponse.json({
			"status": 200,
			"message": "Employee deleted successfully"
		});

  } catch (error: unknown) {
  	if (error instanceof Error) {
			return NextResponse.json({
				"status": 500,
				"message": "Error: "+error.message
			});
	    	
	  } else {
    	return NextResponse.json({
				"status": 500,
				"message": "Error: "+error
			});
	  }
  }  	
};