import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export const createSchemaDescription = (req: string, res: string): string => {
  return `</br></br>Request Type: <b>${req}</b>, </br>Response Type: <b>${res}</b>`
}

export const trimSiUnit = (defaultSIUnit: string): string => {
  return defaultSIUnit.split('(')[1].replace(')', '')
}

export async function customErrorHandler(error: any): Promise<string> {
  if (error instanceof PrismaClientKnownRequestError) {
    // Check if it's a unique constraint violation error
    if (error.code === 'P2002') {
      // Customize the error message for the unique constraint violation

      console.log('----------------------: ', error.meta!.target)

      return `A Record with the same ${formatStringWithSpaces(
        error.meta!.target as string[]
      )} already exists.`
    } else {
      // Handle other known Prisma errors here
      console.log(error)
      return 'Failed to create the record please the check your data and try again.'
    }
  } else {
    // Handle other types of errors here
    console.log(error)
    return 'Internal Server Error'
  }
}

function formatStringWithSpaces(strReq: string[]) {
  let retVal = []

  console.log(strReq)

  for (let str of strReq) {
    let resultArray = []

    for (let i = 0; i < str.length; i++) {
      console.log(i)

      if (str[i] === str[i].toUpperCase()) {
        // If the character is uppercase, add a space before it
        resultArray.push(' ')
      }

      let newChar = str[i]
      if (i === 0) {
        console.log(i)
        newChar = str.charAt(i).toUpperCase()
      }
      resultArray.push(newChar)
    }

    // Join the array back into a string
    const formattedStr = resultArray.join('')

    // Remove leading space if it exists
    if (formattedStr.startsWith(' ')) {
      return formattedStr.substring(1)
    }

    retVal.push(formattedStr)
  }

  return retVal
}
