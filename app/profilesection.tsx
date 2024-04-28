import React from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import { useUser } from '@auth0/nextjs-auth0/client'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import Profile from './profile'

export default function ProfileSection (): React.JSX.Element {
  const { user } = useUser()

  const [isProfileOpen, setProfileOpen] = React.useState(false)
  const profileOpen = (): void => { setProfileOpen(true); console.log('profile open') }
  const profileClosed = (): void => { setProfileOpen(false); console.log('profile closed') }

  const [isLessonsOpen, setLessonsOpen] = React.useState(false)
  const lessonsOpen = (): void => { setLessonsOpen(true); console.log('lessons open') }
  const lessonsClosed = (): void => { setLessonsOpen(false); console.log('lessons closed') }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  return (user
    ? <Box>
    <Button className="px-10" color="inherit" onClick={lessonsOpen} startIcon={<HistoryEduIcon />}>Lessons</Button>

    <Button className="px-10" color="inherit" onClick={profileOpen} startIcon={<AccountBoxIcon />}>Profile</Button>

    <Button className="px-10" color="inherit" href="/api/auth/logout" startIcon={<LogoutIcon />}>Log out</Button>

    <Modal
        open={isProfileOpen}
        onClose={profileClosed}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Profile />
        </Box>
      </Modal>

      <Modal
        open={isLessonsOpen}
        onClose={lessonsClosed}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color="primary">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="primary">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>

    </Box>
    : <>
<Button color="inherit" href='/api/auth/login' startIcon={<LoginIcon />}>Log In/Register</Button>
</>)
}
