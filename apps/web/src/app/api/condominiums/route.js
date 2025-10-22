import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const condominiums = await sql`
      SELECT c.*, u.full_name as sindico_name 
      FROM condominiums c
      LEFT JOIN users u ON c.sindico_id = u.id
      ORDER BY c.name
    `;

    return Response.json({ condominiums });
  } catch (err) {
    console.error("GET /api/condominiums error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, address, totalUnits, monthlyFee, sindicoId } = body;

    if (!name || !address || !totalUnits || !monthlyFee) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO condominiums (name, address, total_units, monthly_fee, sindico_id)
      VALUES (${name}, ${address}, ${totalUnits}, ${monthlyFee}, ${sindicoId || null})
      RETURNING *
    `;

    const condominium = result[0];
    return Response.json({ condominium });
  } catch (err) {
    console.error("POST /api/condominiums error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}