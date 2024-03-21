import React from 'react'
import { Button } from '@mui/material'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function ProfileSection (): React.JSX.Element {
  const { user } = useUser()

  return (user
    ? <div>
    <Button className="px-10" color="inherit" href="/api/auth/logout">Lessons</Button>

    <Button className="px-10" color="inherit" href="/api/auth/logout">Profile</Button>

    <Button className="px-10" color="inherit" href="/api/auth/logout">Log out</Button>
    </div>
    : <>
<Button color="inherit" href='/api/auth/login'>Log In/Register</Button>
</>)
}
