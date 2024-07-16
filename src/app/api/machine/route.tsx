
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    try {            
      return NextResponse.json({ message: "Please send the status of the machine!"}, { status: 200 });    
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

        let result = await prisma.machine.create({
            data:{
                ...request.body
            }
        })
      
      return NextResponse.json({ data: result }, { status: 200 });
  
  
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