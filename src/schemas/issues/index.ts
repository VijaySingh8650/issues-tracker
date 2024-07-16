import { z } from "zod";

export const typeOfIssues = z.enum(["Repair", "Operational"]);
export const statusOfIssues = z.enum(["Active", "Resolved"]);

export const IssuesDetails = z.object({

  problem: z.string({
    required_error: 'Problem is required',
    invalid_type_error: 'Problem should be string',
  }),
  issuesPictures: z.array(z.string())?.optional(),
  typeOfIssue: typeOfIssues.refine(value => value !== undefined, {
    message: 'Type of issue is required',
  }),

});

export const RequestBodyOfIssuesSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name should be string",
  }),
  outletName: z.string({
    required_error: 'OutletName is required',
    invalid_type_error: 'OutletName should be string',
  }),
  issues: z.array(IssuesDetails),
});

export type TypeRequestBodyOfIssues = z.infer<typeof RequestBodyOfIssuesSchema>;


export const ResponseBodyOfIssuesSchema = z.object({
   id : z.number(),
   problem : z.string(),
   issuesPictures : z.array(z.string()).default([]),
   resolvedPictures : z.array(z.string()).default([]),
   typeOfIssue : typeOfIssues,
   status : statusOfIssues,
   createdAt : z.date(),
   updatedAt : z.date(),
   resolvedBy : z.string(),
})

export const ResponseBodyOfIssueCreationSchema = z.object({
  id: z.number(),
  name : z.string(),
  outletName : z.string(),
  issues : ResponseBodyOfIssuesSchema
});


export type TypeResponseBodyOfIssueCreationSchema = 
  z.infer<typeof ResponseBodyOfIssueCreationSchema>;


