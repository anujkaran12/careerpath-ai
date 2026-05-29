import { NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_URL;

export async function POST(request: Request) {
  try {
    if (!backendUrl) {
      throw new Error("BACKEND_URL is missing");
    }

    const body = await request.json();
    const response = await fetch(`${backendUrl}/api/roadmaps/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
