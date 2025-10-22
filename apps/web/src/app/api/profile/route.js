import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    
    // Get user from auth_users table
    const authUsers = await sql`SELECT id, name, email, image FROM auth_users WHERE id = ${userId} LIMIT 1`;
    const authUser = authUsers?.[0] || null;
    
    if (!authUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Get user from users table (CondoManager specific data)
    const condoUsers = await sql`SELECT * FROM users WHERE email = ${authUser.email} LIMIT 1`;
    const condoUser = condoUsers?.[0] || null;

    return Response.json({ 
      authUser,
      condoUser,
      isOnboarded: !!condoUser
    });
  } catch (err) {
    console.error("GET /api/profile error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { phone, role, condominiumId, unitNumber } = body || {};

    // Get auth user data
    const authUsers = await sql`SELECT id, name, email, image FROM auth_users WHERE id = ${userId} LIMIT 1`;
    const authUser = authUsers?.[0] || null;
    
    if (!authUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user already exists in users table
    const existingUsers = await sql`SELECT * FROM users WHERE email = ${authUser.email} LIMIT 1`;
    const existingUser = existingUsers?.[0] || null;

    if (existingUser) {
      // Update existing user
      const setClauses = [];
      const values = [];

      if (typeof phone === "string" && phone.trim().length > 0) {
        setClauses.push("phone = $" + (values.length + 1));
        values.push(phone.trim());
      }

      if (typeof role === "string" && ["administrator", "sindico", "resident"].includes(role)) {
        setClauses.push("role = $" + (values.length + 1));
        values.push(role);
      }

      if (typeof condominiumId === "number") {
        setClauses.push("condominium_id = $" + (values.length + 1));
        values.push(condominiumId);
      }

      if (typeof unitNumber === "string" && unitNumber.trim().length > 0) {
        setClauses.push("unit_number = $" + (values.length + 1));
        values.push(unitNumber.trim());
      }

      setClauses.push("updated_at = CURRENT_TIMESTAMP");

      if (setClauses.length === 1) { // Only updated_at
        return Response.json({ error: "No valid fields to update" }, { status: 400 });
      }

      const finalQuery = `UPDATE users SET ${setClauses.join(", ")} WHERE id = $${values.length + 1} RETURNING *`;
      const result = await sql(finalQuery, [...values, existingUser.id]);
      const updated = result?.[0] || null;

      return Response.json({ condoUser: updated });
    } else {
      // Create new user in users table
      const password_hash = "$2a$10$placeholder"; // Placeholder since auth is handled by auth_users table
      
      const result = await sql`
        INSERT INTO users (email, password_hash, full_name, phone, role, condominium_id, unit_number)
        VALUES (${authUser.email}, ${password_hash}, ${authUser.name}, ${phone || null}, ${role || 'resident'}, ${condominiumId || null}, ${unitNumber || null})
        RETURNING *
      `;
      
      const newUser = result?.[0] || null;
      return Response.json({ condoUser: newUser });
    }
  } catch (err) {
    console.error("PUT /api/profile error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}