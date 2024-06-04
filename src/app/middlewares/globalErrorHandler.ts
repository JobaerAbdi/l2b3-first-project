import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod";
import config from "../config";
import handleZodError from "../errors/handleZodError";

// const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Something went wrong!';
  
//     return res.status(statusCode).json({
//       success: false,
//       message: message,
//       error: err,
//     })
// }
// ----------------------------------------------------------------------------------------------
const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  type TErrorSources = {
     path: string | number;
     message: string
  }[]

  let errorSources: TErrorSources = [
    {
    path: '',
    message: 'Something went wrong!'
    }
  ]


  if(err instanceof ZodError){
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources
    // console.log(simplifiedError);
  }
  
    return res.status(statusCode).json({
      success: false,
      message: message,
      errorSources,
      stack: config.node_env === "development" ? err?.stack : null   
    })
}

export default globalErrorHandler