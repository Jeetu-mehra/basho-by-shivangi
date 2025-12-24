import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/auth";
import { createSession } from "@/lib/session";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.passwordHash) {
      // If no user OR user has no password (signed up via OTP only before)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    });

    return NextResponse.json({ success: true, role: user.role });

  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}