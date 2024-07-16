import { prisma } from "@/lib/prisma";
import { TypeRequestBodyOfIssues, TypeResponseBodyOfIssueCreationSchema } from "@/schemas/issues";
import { differenceInDays } from 'date-fns';

export const PostIssuesServices = async (req: TypeRequestBodyOfIssues) => {
  await prisma.issueCreation.create({
    data: {
        name: req.name,
        outletName: req.outletName,
        issues: {
          create: req.issues.map(issue => ({
            problem: issue.problem,
            issuesPictures: issue.issuesPictures?.filter((pic): pic is string => !!pic),
            resolvedPictures: [],
            typeOfIssue: issue.typeOfIssue,
            resolvedBy:"",
            pendingDays: 0
          }))
        }
      },
  });
  return true;
};

export const GetIssuesByFilterationServices = async(issueType:string | null, issueStatus:string | null) =>{
    
    let response = await prisma.issueCreation.findMany({
       
        include: {
            issues: {
              orderBy: {
                createdAt: 'desc' // Order by createdAt field in descending order
              }
            }
          }

    });

    let filteredData:TypeResponseBodyOfIssueCreationSchema[] = [];
    
        for(let i=0; i<response?.length; i++){

            let filteredIssues = [];
            
            response[i].issues?.map((el)=>{

                if(issueStatus && issueType){
                    

                    el?.status === issueStatus && el?.typeOfIssue === issueType && filteredIssues.push({
                        ...el,
                        pendingDays : issueStatus==="Active" ?  differenceInDays(new Date(), el?.createdAt as Date) : el?.pendingDays
                    })

                }
                else{

                    filteredIssues?.push({
                        ...el,
                        pendingDays : el?.status==="Active" ?  differenceInDays(new Date(), el?.createdAt as Date) : el?.pendingDays
                    })

                }
               
            });

            filteredIssues?.length > 0 && filteredData?.push(response[i]);

        }
        
    
    return filteredData;
   

}


export const GetIssuesByIdServices = async(id:string) =>{
  let findIssue =  await prisma.issues.findUnique({
    where: {
      id: Number(id)
    }
  });

  if(findIssue){

    let response = await prisma.issueCreation.findFirst({
      where:{
        id: findIssue?.issueCreationId
      },
      select:{
        id: true,
        name: true,
        outletName: true
      }
    });

    return response;

  }

  return [];
}