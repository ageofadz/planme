'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import React from 'react'

export default function ProfileClient (): React.JSX.Element {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    user
      ? (
          <div className='flex flex-col'>
            <div className='flex'>
            <img className='py-4 mx-auto' src={user.picture ?? ''} alt={user.name ?? ''} />
            </div>
            <div className='flex w-full text-wrap'>
            <h2 className='m-auto text-xl text-center py-4'>{user.name}</h2>
            </div>
          </div>
        )
      : (<></>)
  )
}
