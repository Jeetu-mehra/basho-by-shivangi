import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOTP } from "@/lib/mailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    // Upsert User (Create if new, update if exists)
    // We store OTP directly in the user record for simplicity
    await prisma.user.upsert({
      where: { email },
      update: { otp, otpExpiresAt: expiresAt },
      create: { 
        email, 
        otp, 
        otpExpiresAt: expiresAt,
        role: "CUSTOMER"
      },
    });

    await sendOTP(email, otp);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}