
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

    sendRecipeToMachine = request?.nextUrl?.searchParams?.get("receipe") as string;
    
    let response:any = await axios.get("https://1388f8b1455b1c7b8ed7c3744b9214d3.balena-devices.com/isMachineActiveReq");
     console.log(response, "Machine Active");

    if(response?.data?.state === "Active"){
      let machineQueresponse:any = await axios.get("https://1388f8b1455b1c7b8ed7c3744b9214d3.balena-devices.com/machineQueueCountReq");
      if(parseInt(machineQueresponse?.recipeReceivedCount) < 3){
        let res =   await axios.get(`https://1388f8b1455b1c7b8ed7c3744b9214d3.balena-devices.com/machineRecipeRes?transactionId=${sendRecipeToMachine}`);
        console.log(res, "machine response");
        sendRecipeToMachine = "";
      }  
    }

    return NextResponse.json(
      {response: response},
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

        if(parseInt(requestBody?.recipeReceivedCount) < 3 && sendRecipeToMachine){

              let res =   await axios.get(`https://1388f8b1455b1c7b8ed7c3744b9214d3.balena-devices.com/machineRecipeRes?transactionId=${sendRecipeToMachine}`);
              console.log(res, "machine response");
              sendRecipeToMachine = "";
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