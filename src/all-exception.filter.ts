import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common"
import { BaseExceptionFilter } from "@nestjs/core"
import { MyLoggerService } from "./my-logger/my-logger.service"
import { PrismaClientValidationError } from "generated/prisma/runtime/library"
import { Response, Request } from "express"

type MyResponseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object
}

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
    // getting the logger
    private readonly logger = new MyLoggerService(AllExceptionFilter.name)

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const myResponseObj: MyResponseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: ''
        }

        if (exception instanceof HttpException) {
            myResponseObj.statusCode = exception.getStatus()
            myResponseObj.response = exception.getResponse()
        } else if (exception instanceof PrismaClientValidationError) {
            myResponseObj.statusCode = 442
            myResponseObj.response = exception.message.replaceAll(/\n/g, '')
        } else {
            myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            myResponseObj.response = "Internal Server Error"
        }

        response.status(myResponseObj.statusCode).json(myResponseObj)

        this.logger.error(myResponseObj.response, AllExceptionFilter.name)

        super.catch(exception, host)
    }
}