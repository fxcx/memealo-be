import type { NextFunction, Response, Request } from 'express'
import { Prisma } from '@prisma/client'
import { HttpStatus } from '@/helpers/httpStatus'

const ERROR_HANDLER = {
  P2002: (res: Response, err: Prisma.PrismaClientKnownRequestError) => {
    const message = 'Unique constraint failed'
    return HttpStatus.BAD_REQUEST(res, message, err)
  },
  P2023: (res: Response, err: Prisma.PrismaClientKnownRequestError) => {
    const message = 'Unique constraint failed'
    return HttpStatus.BAD_REQUEST(res, message, err)
  },
  prismaValidationError: (res: Response, err: Prisma.PrismaClientValidationError) => {
    const message = 'Prisma validation error on request'
    return HttpStatus.UNPROCESSABLE_ENTITY(res, message, err.message)
  },
  defaultError: (res: Response, err: any) => {
    const message = 'Internal server error'
    return HttpStatus.INTERNAL_SERVER_ERROR(res, message, err)
  }
}

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  let option = err?.name
  if (option instanceof Prisma.PrismaClientValidationError) {
    option = 'prismaValidationError'
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    option = 'prismaValidationError'
  }
  const handler = ERROR_HANDLER[option as keyof typeof ERROR_HANDLER] ?? ERROR_HANDLER.defaultError
  handler(res, err)
}
