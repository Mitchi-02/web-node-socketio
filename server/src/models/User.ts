import { Schema, model } from 'mongoose'
import { IUser } from '@/types/models'

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
)

const User = model<IUser>('User', UserSchema, 'users')

export default User
