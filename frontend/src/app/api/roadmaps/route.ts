import { NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_URL;

export async function GET() {
  try {
    if (!backendUrl) {
      throw new Error("BACKEND_URL is missing");
    }

    const response = await fetch(`${backendUrl}/api/roadmaps`, {
      cache: "no-store",
    });
    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        msg: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}
