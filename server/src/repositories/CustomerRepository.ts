import Customer from '@/models/Customer'

export function readCustomerByCredentials({ CLIENT_ID, CLIENT_SECRET }: { CLIENT_ID: string, CLIENT_SECRET: string }) {
  return Customer.findOne({
    CLIENT_ID,
    CLIENT_SECRET
  })
}
