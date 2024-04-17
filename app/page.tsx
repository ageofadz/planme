'use client'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import CollapsibleTable from './table'
import '../node_modules/reveal.js/dist/reveal.css'
import '../node_modules/reveal.js/dist/theme/beige.css'
import Button from '@mui/material/Button/Button'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { uuid } from 'uuidv4'
import { AppBar, Box, FormControlLabel, FormGroup, IconButton, Modal, Step, StepButton, Stepper, Toolbar, Typography } from '@mui/material'
import { NavigateBefore, NavigateNext, Save } from '@mui/icons-material'
import Image from 'next/image'
import { Activity } from './types/activity'
import type { Options } from './types/options'
import { genPrintables, saveLesson } from './networking/routes'
import ProfileSection from './profilesection'
import OptionsPage from './options'
import LanguagePage from './language'
import SavePage from './savePage'

let tl: [{ term: string, image: string, type: string | undefined }?] = []

export default function Home (): React.JSX.Element {
  const steps = ['Enter target language', 'Add lesson stages', 'Set lesson options', 'Finish']

  const [activeStep, setActiveStep] = React.useState(0)
  const [currTL, setTL] = React.useState(tl)
  const [completed] = React.useState<Record<number, boolean>>({})
  const [isSaveOpen, setSaveOpen] = React.useState(false)

  const saveOpen = (): void => { setSaveOpen(true); console.log('save open') }
  const saveClosed = (): void => { setSaveOpen(false); console.log('save closed') }

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

  const updateTL = (): void => {
    tl = currTL
  }

  const handleChange = (e: any, i: number, field: string): void => {
    console.log('test')
    const newRows = currTL.map((row, index) => {
      console.log('test')
      if (index === i) {
        if (field === 'term') {
          return { ...row, term: e.target.value }
        }
        if (field === 'type') {
          return { ...row, type: e.target.value, term: '', image: '' }
        }
        if (field === 'image') {
          return { ...row, image: e.target.value }
        }
      } else {
        return row
      }
      return null
    })
    // Fix this by adding a proper type to newRows and the setter
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setTL(newRows as any)
    tl = newRows as [{ term: string, image: string, type: string }?]
  }

  const handleStep = (step: number) => () => {
    setActiveStep(step)
  }

  function createData (id: string, category: string, name: Activity): { id: string, category: string, name: Activity } {
    return { id, category, name }
  }
  const [rows, setRows] = useState([
    createData(uuid(), 'Other', Activity.Song1)
  ])

  const optionsObj: Options = {
    songs: {
      timer: 'https://www.youtube.com/watch?v=_W0bSen8Qjg',
      intro: 'https://www.youtube.com/watch?v=tVlcKp3bWH8',
      cleanup: 'https://www.youtube.com/watch?v=SFE0mMWbA-Y',
      goodbye: 'https://www.youtube.com/watch?v=PraN5ZoSjiY'

    },
    rules: {
      listen: true,
      sitNicely: true,
      english: true,
      nice: true,
      tryBest: true,
      raiseHand: true,
      sticker: true
    },
    dragonImage: 'https://media1.tenor.com/m/W9Dmn0ZkTmsAAAAC/dragon-rawr.gif',
    generateHandouts: true,
    rulesAfterActivities: true,
    theme: 'white'
  }

  const [options, setOptions] = useState(optionsObj)

  return (
    <UserProvider>
    <main>
    <div className="flex flex-col bg-gradient-to-t lg:static bg-blue-gray-100">
    <AppBar position="static" className="flex">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Image src="/planmi.png" // Route of the image file
            height={144} // Desired size with correct aspect ratio
            width={144} // Desired size with correct aspect ratio
            alt="Your Name"
          />
          </Typography>
          <ProfileSection />
        </Toolbar>
      </AppBar>
    <Stepper nonLinear activeStep={activeStep} className="flex w-4/5 mx-auto my-4">
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div className="flex items-center justify-center my-4">
        <Button variant='outlined' onClick = {() => { setActiveStep(activeStep - 1) }} disabled={activeStep === 0}><NavigateBefore /></Button>
        <Button variant='outlined' onClick = {() => { setActiveStep(activeStep + 1) }} disabled={activeStep === 3}><NavigateNext /></Button>
        </div>
        </div>
        <div className="flex">
    <div className="flex p-24 bg-gradient-to-t lg:static items-center justify-center bg-white w-full">

          <div className="flex">
    { activeStep === 2
      ? OptionsPage(options, setOptions)
      : <></>}

{ activeStep === 0
  ? LanguagePage(currTL, setTL, updateTL, handleChange)
  : <></> }

      {activeStep === 1 ? CollapsibleTable(rows, setRows) : <></>}

      {activeStep === 3
        ? SavePage(rows, options, tl, saveOpen)
        : <></>}

      </div>

      </div>

        </div>

<Modal
    open={isSaveOpen}
    onClose={saveClosed}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
                <FormGroup>
                <FormControlLabel labelPlacement='top' control={<TextField />} label="Lesson name" />
                <FormControlLabel labelPlacement='top' control={
        <Button variant="outlined" onClick = { () => {
          saveLesson(rows, tl, options).then(() => {
            if (options.generateHandouts) void genPrintables(rows, tl, options)
          }).catch((err) => {
            console.log(err)
          })
        }
        }> <Save /> </Button>
      } label="Save lesson" />
        </FormGroup>
    </Box>
  </Modal>
    </main>

    </UserProvider>
  )
}
