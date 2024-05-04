import { Schema, model } from 'mongoose'
import { IConversation } from '@/types/models'



const conversationSchema = new Schema<IConversation>(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
  },
  { timestamps: true }
)

const Conversation = model<IConversation>('Conversation', conversationSchema, 'conversations')


export default Conversation