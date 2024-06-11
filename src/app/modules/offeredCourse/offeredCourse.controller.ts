import { RequestHandler } from 'express'
import { OfferedCourseServices } from './offeredCourse.service'

//=====================================================================================================

const createOfferedCourse: RequestHandler = async (req, res, next) => {
  try {
    const offeredCourseData = req.body
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(offeredCourseData)
    res.status(200).json({
      success: true,
      message: 'Offered Course is created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

//=====================================================================================================

const getAllOfferedCourses: RequestHandler = async (req, res, next) => {
  try {
    const query = req.query
    const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(query)
    res.status(200).json({
      success: true,
      message: 'Offered Course is retrieved successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

//=====================================================================================================

const getSingleOfferedCourses: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id)
    res.status(200).json({
      success: true,
      message: 'Single offered course is retrieved successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}


//=====================================================================================================
/*
const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse updated successfully',
    data: result,
  })
})

//=====================================================================================================

const deleteOfferedCourseFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await OfferedCourseServices.de(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourse deleted successfully',
      data: result,
    })
  },
)
*/
export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourses,
  // updateOfferedCourse,
  // deleteOfferedCourseFromDB,
}
