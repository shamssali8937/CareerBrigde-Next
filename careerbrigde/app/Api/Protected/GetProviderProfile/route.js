import { getProviderProfileController } from "@/controllers/providerController";

export async function GET(req) {
    return await getProviderProfileController(req);
}