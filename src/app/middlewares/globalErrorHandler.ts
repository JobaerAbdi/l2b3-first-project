import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";

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
  else if(err?.name === "ValidationError"){  // ValidationError provide mongoose.
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources
  }
  else if(err?.name === "CastError"){   // CastError provide mongoose. Its show for only invalid id.
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources
  }
  
    return res.status(statusCode).json({
      success: false,
      message,
      errorSources,
      stack: config.node_env === "development" ? err?.stack : null   
    })
}

export default globalErrorHandler