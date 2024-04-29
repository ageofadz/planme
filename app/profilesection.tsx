import React from 'react'
import { Box, Button, Modal } from '@mui/material'
import { useUser } from '@auth0/nextjs-auth0/client'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import Profile from './profile'
import lessonsTable from './lessonsTable'
import { type Lesson } from './types/lesson'
import { getLessons } from './networking/routes'

interface profileProps {
  loadLesson: (l: Lesson) => void
  setActiveStep: (n: number) => void
  lesson: Lesson | undefined
  saveOpen: () => void
  lessons: Lesson[] | undefined
  setLessons: (l: Lesson[]) => void
}

export default function ProfileSection ({ loadLesson, setActiveStep, lesson, saveOpen, lessons, setLessons }: profileProps): React.JSX.Element {
  const { user } = useUser()

  const [isProfileOpen, setProfileOpen] = React.useState(false)
  const profileOpen = (): void => { setProfileOpen(true); console.log('profile open') }
  const profileClosed = (): void => { setProfileOpen(false); console.log('profile closed') }

  const [isLessonsOpen, setLessonsOpen] = React.useState(false)

  const pullLessons = (): void => {
    getLessons().then((lessons) => {
      if (lessons) {
        setLessons(lessons)
      }
    }).catch((e) => { console.log(e) })
  }

  const lessonsOpen = (): void => {
    pullLessons()
    setLessonsOpen(true)
    console.log('lessons open')
  }
  const lessonsClosed = (): void => {
    setActiveStep(0)
    setLessonsOpen(false); console.log('lessons closed')
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '54vw',
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
          {
          lessonsTable(lessons, loadLesson, lessonsClosed, lesson, saveOpen, pullLessons)
          }
        </Box>
      </Modal>

    </Box>
    : <>
<Button color="inherit" href='/api/auth/login' startIcon={<LoginIcon />}>Log In/Register</Button>
</>)
}
