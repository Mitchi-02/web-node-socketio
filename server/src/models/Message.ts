import { IMessage } from '@/types/models'
import { Schema, model } from 'mongoose'

const MessageSchema = new Schema<IMessage>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: false,
      default: ''
    },
    media: [
      new Schema({
        src: String,
        name: String,
      }, {_id: false}),
    ],
  },
  { timestamps: true }
)

const Message = model<IMessage>('Message', MessageSchema, 'messages')

export default Message
