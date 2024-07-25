
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

let sendRecipeToMachine = "";


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

    sendRecipeToMachine = context?.params?.id;
    
    console.log(sendRecipeToMachine, "receieved from frontend");

    return NextResponse.json(
      {response: sendRecipeToMachine},
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

        let requestBody:any = await request.json();

        if(requestBody?.recipeReceivedCount < 3){

              let res =   await axios.get(`https://1388f8b1455b1c7b8ed7c3744b9214d3.balena-devices.com/machineRecipeRes?transactionId=${sendRecipeToMachine}`);
              console.log(res, "machine response");

        }

        console.log(requestBody, "state-4");
      
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