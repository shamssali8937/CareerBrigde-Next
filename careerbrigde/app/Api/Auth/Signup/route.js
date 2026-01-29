import { signupUser } from "@/controllers/userController";
import { NextResponse } from "next/server";


export async function POST(req) {
   return await signupUser(req);
}