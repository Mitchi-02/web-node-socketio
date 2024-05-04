import Customer from '../src/models/Customer'

export default async function CustomerSeeder() {
  console.log(`Customer seeder started.`)
  const TOTAL = 2
  try {
    await Customer.deleteMany()
    for (let i = 0; i < TOTAL; i++) {
      await Customer.create({
        name: `customer ${i}`,
        email: `c${i}@gmail.com`,
        password:
          '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        CLIENT_ID: `client${i}`,
        CLIENT_SECRET: `secret${i}`,
        billing_infos: new Map(),
      })
    }
    console.log(`${TOTAL} customers seeded successfully.`)
  } catch (error: any) {
    error.message = 'Error Customer Seeder: ' + error.message 
    throw error
  }
}
