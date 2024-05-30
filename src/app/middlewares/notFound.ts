import { Request, Response } from 'express'

const notFound = (req: Request, res: Response) => {
  res.status(500).json({
    success: false,
    message: 'API not found',
    error: '',
  })
}


export default notFound;