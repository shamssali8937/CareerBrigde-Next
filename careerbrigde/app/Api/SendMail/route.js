import { sendMailController } from "@/controllers/mailController";

export async function POST(req) {
   return  await sendMailController(req);
}