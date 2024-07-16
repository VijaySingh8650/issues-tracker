
import { TypeRequestBodyOfIssues } from "@/schemas/issues";
import {z} from "zod";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { customErrorHandler } from "../root";
import { GetIssuesByFilterationServices, PostIssuesServices , GetIssuesByIdServices} from "@/services/issues";

export async function postIssues(req: TypeRequestBodyOfIssues) {
    try {
      const response = await PostIssuesServices(req)
      return response
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw error.issues[0].message
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw await customErrorHandler(error)
      }
      throw error
    }
  }

export async function getIssues(issueType: string | null, issueStatus: string | null) {
    try {
      const response = await GetIssuesByFilterationServices(issueType, issueStatus)
      return response
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw error.issues[0].message
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw await customErrorHandler(error)
      }
      throw error
    }
  }


export async function getIssueById(id:string) {
    try {
      const response = await GetIssuesByIdServices(id);
      return response;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw error.issues[0].message
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw await customErrorHandler(error)
      }
      throw error
    }
  }


