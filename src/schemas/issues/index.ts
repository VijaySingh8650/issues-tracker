import {z} from "zod";

export const typeOfIssues = z.enum(["Repair","Operational"] );
export const statusOfIssues = ["Active","Resolved"] as const;
export type TypeBodyOfIssues = z.infer<typeof typeOfIssues>
export const RequestBodyOfIssuesSchema = z.object({
    name: z.string(),
    outletName: z.string(),
    typeOfIssue : typeOfIssues,
    problem: z.string(),
    issuePhoto: z.string(),
})

export type TypeRequestBodyOfIssues = z.infer<typeof RequestBodyOfIssuesSchema>


export const ResponseBodyOfIssuesSchema = z.object({
    id : z.number(),
//   name          String
//   outletName    String
//   problem       String
//   issuePhoto    String
  resolvedPhoto : z.string(),
//   typeOfIssue   IssueTypeStatus
  status: z.enum(statusOfIssues),
  createdAt: z.date(),
  updatedAt : z.date(),
  resolvedBy : z.string()
});


export const mergedResponseSchema = RequestBodyOfIssuesSchema?.merge(ResponseBodyOfIssuesSchema);

export type TypeResponseBodyOfIssues = Partial<z.infer<typeof mergedResponseSchema>>;