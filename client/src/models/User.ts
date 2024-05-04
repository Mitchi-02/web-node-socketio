import { Schema, models, model, Model } from 'mongoose'
import { IUser } from '@/types/models'


interface UserModel extends Model<IUser> {}

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    inChatId: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)


const User: UserModel =
  models.User || model<IUser, UserModel>('User', UserSchema)

export default User
