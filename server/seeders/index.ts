import { ConnectOptions, connect, disconnect } from 'mongoose'
import UserSeeder from './UserSeeder'
import CustomerSeeder from './CustomerSeeder'
import { config } from 'dotenv'
import MessageSeeder from './MessageSeeder'
import ConversationSeeder from './ConversationSeeder'
config()

async function main(seeders: (() => Promise<void>)[]) {
  await connect(process.env.DB_CONNECTION || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  console.log('Database connected.')

  for (const seeder of seeders) {
    await seeder()
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  await new Promise((resolve) => setTimeout(resolve, 1000))
  await disconnect()
  console.log('Database disconnected.')
}

if(process.env.NODE_ENV !== 'production') {
  main([CustomerSeeder, UserSeeder, ConversationSeeder, MessageSeeder])
}
