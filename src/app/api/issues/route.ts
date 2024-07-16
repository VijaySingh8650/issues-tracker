import {
  RequestBodyOfIssuesSchema,
} from "@/schemas/issues";
import { NextRequest, NextResponse } from "next/server";


import { PrismaClient } from "@prisma/client";
import { getIssues, postIssues } from "@/actions/issues";

const prisma = new PrismaClient();

// To create an issue
export async function POST(request: NextRequest, response: NextResponse) {
  try{

    const requestBody = await request.json();
  
    let validateRequestBody = RequestBodyOfIssuesSchema.parse(requestBody);
    
    await postIssues(validateRequestBody);

    return NextResponse.json(
      {
        message: "Issues created successfully",
      },
      { status: 200 }
    );
    
  }

  catch (error) {

    if (error instanceof Error) {
      return NextResponse.json(`${error.message}`, { status: 400 });
    }

    return NextResponse.json("Something went wrong", { status: 500 });
  }
}

//To get active/resolved issues as per type of the issues
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    
    let issueStatus = request?.nextUrl?.searchParams?.get("status");
    let issueType = (request?.nextUrl?.searchParams?.get("issue"));

    let response = await getIssues(issueType, issueStatus);
    

    return NextResponse.json({ data: response }, { status: 200 });


  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, {
        status: 500,
      });
    }

    return new NextResponse("Something went wrong", {
      status: 500,
    });
  }
}



