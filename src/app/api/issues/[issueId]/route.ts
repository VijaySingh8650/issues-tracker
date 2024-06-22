import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET(request: NextRequest, context:{
    params: {
      issueId: string;
    }
  } ,  response: NextResponse) {
    try {
      

    let filteredData;

      if(context?.params?.issueId){

        filteredData = await prisma?.issues?.findFirst({
            where:{
                id: context?.params?.issueId
            }
        });

        console.log(filteredData, "filteredData");

        
    }

  

    return NextResponse.json({data: filteredData }, { status: filteredData ? 200 : 404});
  
  

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


export async function PUT(request: NextRequest, context:{
    params: {
      issueId: string;
    }
  } ,  response: NextResponse) {
    try {
      

    let filteredData;

      if(context?.params?.issueId){

        filteredData = await prisma?.issues?.update({
            where:{
                id: context?.params?.issueId
            },
            data:{
                ...request?.body
            }
        });


        
    }

  

    return NextResponse.json({message: "Update successfully"}, { status: 200});
  
  

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