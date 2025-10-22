import sql from "@/app/api/utils/sql";
import { hash } from "argon2";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, fullName, phone } = body;

    if (!email || !password || !fullName) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Hash the password
    const passwordHash = await hash(password);

    // Create user in users table with administrator role
    const result = await sql`
      INSERT INTO users (email, password_hash, full_name, phone, role)
      VALUES (${email}, ${passwordHash}, ${fullName}, ${phone || null}, 'administrator')
      RETURNING *
    `;

    const newAdmin = result[0];

    // Also create in auth_users table for authentication
    const authResult = await sql`
      INSERT INTO auth_users (id, name, email, "emailVerified", image)
      VALUES (gen_random_uuid(), ${fullName}, ${email}, NULL, NULL)
      RETURNING *
    `;

    const authUser = authResult[0];

    // Link the account in auth_accounts table
    await sql`
      INSERT INTO auth_accounts (
        "userId", provider, type, "providerAccountId", password
      )
      VALUES (${authUser.id}, 'credentials', 'credentials', ${authUser.id}, ${passwordHash})
    `;

    return Response.json({ 
      message: "Administrator created successfully",
      admin: {
        id: newAdmin.id,
        email: newAdmin.email,
        fullName: newAdmin.full_name,
        role: newAdmin.role
      }
    });
  } catch (err) {
    console.error("POST /api/create-admin error", err);
    
    // Check for duplicate email
    if (err.code === '23505') {
      return Response.json({ error: "Email already exists" }, { status: 400 });
    }
    
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}