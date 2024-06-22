import {
  RequestBodyOfIssuesSchema,
  TypeBodyOfIssues,
  TypeRequestBodyOfIssues,
  TypeResponseBodyOfIssues,
} from "@/schemas/issues";
import { NextRequest, NextResponse } from "next/server";
import { SafeParseReturnType } from "zod";
import { differenceInDays } from 'date-fns';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// To create an issue
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    let validateRequestBody: SafeParseReturnType<
      TypeRequestBodyOfIssues,
      TypeRequestBodyOfIssues
    > = RequestBodyOfIssuesSchema.safeParse(request.body);

    if (!validateRequestBody?.success) {
      return NextResponse.json(
        { message: "Please send proper data" },
        { status: 400 }
      );
    }

    //uploading images here

    await prisma.issues.create({
      data: {
        ...request.body,
      },
    });

    return NextResponse.json({ message: request?.body }, { status: 201 });
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

//To get active/resolved issues as per type of the issues
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    
    let issueStatus = request?.nextUrl?.searchParams?.get("status");
    let issueType = (request!.nextUrl!.searchParams!.get("issue"));

    let filteredData;

    if (issueStatus && issueType) {
      filteredData = await prisma.issues.findMany({
        where: {
          status: issueStatus,
          typeOfIssue: issueType,
        },
        orderBy: {
          id: "desc",
        },
        take: 1,
      });
    } else {

      //TODO - pending days
      let sortedData = await prisma.issues.findMany({
        orderBy: {
          id: "desc",
        },
        take: 1,
      });

      filteredData = sortedData &&  sortedData?.map((el:TypeResponseBodyOfIssues)=>{
        

        const createdDate = el?.createdDate;
        const today:Date = new Date();
        const pendingDays =  differenceInDays(today, createdDate);

          return {
            ...el,
            pendingDays : el?.status==="Active" ? pendingDays : 0;
          }
      })

    }

    return NextResponse.json({ data: filteredData }, { status: 200 });
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
