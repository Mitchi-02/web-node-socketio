import { Types } from 'mongoose'
import Conversation from '../src/models/Conversation'
import Message from '../src/models/Message'

export default async function MessageSeeder() {
  console.log(`Message seeder started.`)
  const PER_USER_PER_CONV = 5
  try {
    await Message.deleteMany()
    const all = await Conversation.find().populate('users') 
    for (const c of all) {
      for (let i = 0; i < PER_USER_PER_CONV; i++) {
        for (const u of c.users) {
          const m = await Message.create({
            //@ts-ignore
            user: u.id,
            //@ts-ignore
            content: `message ${i} from ${u.name} in conv ${c.id}`,
            media: []
          })
          c.messages.unshift(new Types.ObjectId(m.id))
          await c.save()
        }
      }
    }
    console.log(`Messages seeded for each conversation.`)
  } catch (error: any) {
    error.message = 'Error in Message Seeder: ' + error.message
    throw error
  }
}
