'use client'

import { User } from 'next-auth'
import Input from '../Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '../Button'
import { updateInfosAction } from '@/actions'
import toast from '@/lib/toast'
import { useSession } from 'next-auth/react'

const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
})

type InformationForm = yup.InferType<typeof schema>

const InfosSection = () => {
  const { data: session, update } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<InformationForm>({
    resolver: yupResolver(schema),
    defaultValues: { email: session?.user?.email, name: session?.user?.name },
  })

  const onSubmit: SubmitHandler<InformationForm> = async (data) => {
    if (!isDirty) return
    const res = await updateInfosAction(data)
    if (res?.error) {
      toast('error', res?.error)
    } else {
      await update({
        ...session,
        user: {
          ...session?.user,
          name: data.name,
          email: data.email,
        },
      })
      toast('success', 'Info updated successfully')
    }
  }

  return (
    <div className='space-y-10'>
      <h2 className='text-2xl font-bold'>Information Section</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='grid'>
        <Input
          label='Email'
          error={errors.email?.message}
          inputProps={{
            type: 'text',
            placeholder: 'Enter your email here',
            ...register('email'),
          }}
        />
        <Input
          label='Name'
          error={errors.name?.message}
          inputProps={{
            type: 'text',
            placeholder: 'Enter your name here',
            ...register('name'),
          }}
        />
        <Button loading={isSubmitting} className='py-4'>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default InfosSection
