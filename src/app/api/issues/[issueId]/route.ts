import { getIssueById } from "@/actions/issues";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, context:{
    params: {
      issueId: string;
    }
  } ,  response: NextResponse) {
    try {

        let response = await getIssueById(context?.params?.issueId);

        return NextResponse.json({data: response }, { status: 200});
  
  

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


// export async function PUT(request: NextRequest, context:{
//     params: {
//       issueId: string;
//     }
//   } ,  response: NextResponse) {
//     try {
      

//     let filteredData;

//       if(context?.params?.issueId){

//         filteredData = await prisma?.issues?.update({
//             where:{
//                 id: context?.params?.issueId
//             },
//             data:{
//                 ...request?.body
//             }
//         });


        
//     }

  

//     return NextResponse.json({message: "Update successfully"}, { status: 200});
  
  

//     } catch (error) {
//       if (error instanceof Error) {
//         return new NextResponse(error.message, {
//           status: 500,
//         });
//       }
  
//       return new NextResponse("Something went wrong", {
//         status: 500,
//       });
//     }
// }