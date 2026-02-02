import { signinUser } from "@/controllers/userController";

export async function POST(req) {
      return await signinUser(req)
}
