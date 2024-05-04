import { Schema, model } from 'mongoose'
import { ICustomer } from '@/types/models'


const CustomerSchema = new Schema<ICustomer>(
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
    CLIENT_ID: {
      type: String,
      required: true,
      unique: true,
    },
    CLIENT_SECRET: {
      type: String,
      required: true,
    },
    billing_infos: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
)

const Customer = model<ICustomer>('Customer', CustomerSchema, 'customers')

export default Customer
