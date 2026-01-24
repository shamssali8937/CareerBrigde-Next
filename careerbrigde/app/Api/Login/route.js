import connect from "@/dbConfig/dbConfig";
connect();

export async function GET() {
  await connect();

  return Response.json({
    success: true,
    message: "DB connected ✅",
  });
}