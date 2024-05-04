import User from '@/models/User'
import { IUser } from '@/types/models'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/utils/constants'

export function paginateUsersByCustomer(
  customerId: string,
  {
    page,
    page_size,
  }: {
    page?: number
    page_size?: number
  }
) {
  const limit = page_size || DEFAULT_PAGE_SIZE
  const skip = ((page || DEFAULT_PAGE) - 1) * limit
  return User.find({ customerId }).skip(skip).limit(limit)
}

export function countUsersByCustomer(customerId: string) {
  return User.countDocuments({ customerId })
}

export function readUserByIdAndCustomer(_id: string, customerId: string) {
  return User.findOne({ _id, customerId })
}

export function createUser(u: IUser) {
  return User.create(u)
}

export function updateUserByIdAndCustomer(
  _id: string,
  customerId: string,
  u: Omit<IUser, 'customerId' | 'isAdmin'>
) {
  return User.findOneAndUpdate({ _id, customerId }, u, {
    returnDocument: 'after',
  })
}

export function deleteUserByIdAndCustomer(_id: string, customerId: string) {
  return User.findOneAndDelete({ _id, customerId })
}
