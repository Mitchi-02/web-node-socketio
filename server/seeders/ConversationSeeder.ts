import Conversation from '../src/models/Conversation'
import User from '../src/models/User'

export default async function ConversationSeeder() {
  console.log(`Conversation seeder started.`)
  try {
    await Conversation.deleteMany()
    const all = await User.find()
    for (const u of all) {
      const second = all.find(
        (us) => us.id !== u.id && u.customerId.equals(us.customerId)
      )
      Conversation.create({
        users: [u.id, second!.id],
        messages: [],
        customerId: u.customerId
      })
    }
    console.log(`conversations seeded for each user.`)
  } catch (error: any) {
    error.message = 'Error in Conversation Seeder: ' + error.message
    throw error
  }
}
