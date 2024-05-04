import Customer from '../src/models/Customer'
import User from '../src/models/User'

export default async function UserSeeder() {
  console.log(`User seeder started.`)
  const TOTAL = 4
  try {
    await User.deleteMany()
    const all = await Customer.find()
    
    for (const c of all) {
      await User.create({
        name: `user admin of customer ${c.name}`,
        avatar: '/profile.jpg',
        customerId: c._id,
        isAdmin: true
      })
      for (let i = 0; i < TOTAL; i++) {
        await User.create({
          name: `user ${i} of customer ${c.name}`,
          avatar: '/profile.jpg',
          customerId: c._id,
        })
      }
    }
    console.log(`${TOTAL} users seeded for each customer.`)
  } catch (error: any) {
    error.message = 'Error in User Seeder: ' + error.message
    throw error
  }
}
