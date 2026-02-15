import { searchJobsController } from "@/controllers/jobController";

export async function POST(req) {
   return  await searchJobsController(req);
}