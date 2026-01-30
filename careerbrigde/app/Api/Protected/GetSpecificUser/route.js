import { getSpecificUserController } from "@/controllers/userController";


export async function GET(req) {
   return await getSpecificUserController(req);
}