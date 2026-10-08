import { NextResponse } from 'next/server';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().optional(),
  honeypot: z.string().max(0, "Invalid submission").optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const result = formSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.flatten().fieldErrors }, { status: 400 });
    }

    // TODO: implement provider hook for email / CRM

    return NextResponse.json({ success: true, message: "Contact form submitted successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
