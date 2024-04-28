'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import Box from '@mui/material/Box'
import React from 'react'

export default function ProfileClient (): React.JSX.Element {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <Box>Loading...</Box>
  if (error) return <Box>{error.message}</Box>

  return (
    user
      ? (
          <Box className='flex flex-col'>
            <Box className='flex'>
            <img className='py-4 mx-auto' src={user.picture ?? ''} alt={user.name ?? ''} />
            </Box>
            <Box className='flex w-full text-wrap'>
            <h2 className='m-auto text-xl text-center py-4'>{user.name}</h2>
            </Box>
          </Box>
        )
      : (<></>)
  )
}
