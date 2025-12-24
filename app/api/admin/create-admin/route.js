import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { getSession } from "@/lib/session";

export async function POST(req) {
  try {
    // 1. Secure it: Check if requester is Admin
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { email, password, name } = await req.json();
    const hashedPassword = await hashPassword(password);

    // 2. Create the Admin User
    await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name,
        role: "ADMIN" // Important
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
  }
}