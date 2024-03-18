import React from 'react'
import LoginButton from './login'
import { Avatar, Button } from '@mui/material'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function ProfileSection (): React.JSX.Element {
  const { user } = useUser()

  return (user
    ? <>
    <Avatar alt={user.name ?? user.nickname ?? ''} src={user.picture ?? ''} />
    Profile

    <Button color="inherit">Log out</Button>
    </>
    : <>
<LoginButton />
<Button color="inherit">Register</Button>
</>)
}
