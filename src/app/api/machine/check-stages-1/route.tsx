
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  context: {
    params: {
      id: string;
    };
  },
  response: NextResponse
) {
  try {
    
    let res =  await prisma.machine.findFirst({
      where: {machineId: Number(context?.params?.id)},
    });
   
    if(!res){

      return NextResponse.json(
        {response: "Machine does not exist"},
        { status: 404 }
      );

    }

    return NextResponse.json(
      {response: res},
      { status: 200 }
    );


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


export async function POST(request: NextRequest, response: NextResponse) {
    try {

        let requestBody = await request.json();

      
      
      return NextResponse.json({ data: requestBody }, { status: 200 });
  
  
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