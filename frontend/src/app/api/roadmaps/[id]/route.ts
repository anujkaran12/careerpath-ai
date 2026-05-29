import { NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_URL;

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    if (!backendUrl) {
      throw new Error("BACKEND_URL is missing");
    }

    const { id } = await params;
    const response = await fetch(`${backendUrl}/api/roadmaps/${id}`, {
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

export async function DELETE(_: Request, { params }: Params) {
  try {
    if (!backendUrl) {
      throw new Error("BACKEND_URL is missing");
    }

    const { id } = await params;
    const response = await fetch(`${backendUrl}/api/roadmaps/${id}`, {
      method: "DELETE",
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
