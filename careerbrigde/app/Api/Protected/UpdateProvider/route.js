import { updatedProviderController } from "@/controllers/providerController";

export async function POST(req) {
    return await updatedProviderController(req);
}