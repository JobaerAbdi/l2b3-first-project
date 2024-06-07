// ---------------------------------------------------------------------------------------------------

import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { AdminSearchableFields } from './admin.constant'
import { TAdmin } from './admin.interface'
import { Admin } from './admin.model'
import { User } from '../user/user.model'

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await adminQuery.modelQuery
  return result
}

// ---------------------------------------------------------------------------------------------------

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id)
  return result
}

// ---------------------------------------------------------------------------------------------------

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Admin.findByIdAndUpdate(
    id, 
    modifiedUpdatedData, 
    { new: true, runValidators: true}
  )
  return result
}

// ---------------------------------------------------------------------------------------------------

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deleteAdmin = await Admin.findByIdAndUpdate(
      // When id search we get all information this id.
      id,
      { isDeleted: true },
      { new: true, session },
    )
    // console.log(deleteAdmin)
    if (!deleteAdmin) {
      throw new Error('Failed to delete admin!')
    }
    // get user _id from deleteAdmin
    const userId = deleteAdmin.user // This is (user Object ID) from get Admin.
    const deleteUser = await User.findByIdAndUpdate(
      userId, // user: new ObjectId('6661c0e378ca3cafa4bf11bd'),
      { isDeleted: true },
      { new: true, session },
    )
    if (!deleteUser) {
      throw new Error('Failed to delete user!')
    }
    await session.commitTransaction()
    await session.endSession()
    return deleteAdmin
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB
}
