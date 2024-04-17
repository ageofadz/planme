'use client'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import CollapsibleTable from './table'
import '../node_modules/reveal.js/dist/reveal.css'
import '../node_modules/reveal.js/dist/theme/beige.css'
import Button from '@mui/material/Button/Button'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { AppBar, Box, FormControlLabel, FormGroup, IconButton, Modal, Step, StepButton, Stepper, Toolbar, Typography } from '@mui/material'
import { NavigateBefore, NavigateNext, Save } from '@mui/icons-material'
import Image from 'next/image'
import { Layout, type activityItem } from './types/activity'
import type { Options } from './types/options'
import { genPrintables, getActivities, saveLesson } from './networking/routes'
import ProfileSection from './profilesection'
import OptionsPage from './options'
import LanguagePage from './language'
import SavePage from './savePage'
import { type Language, LanguageType, type LanguageItem } from './types/language'
import { Category } from './types/category'

const init: LanguageItem[] = []
const initialLesson: Language = {
  vocab: [],
  receptive: [],
  grammar: [],
  rules: [],
  review: []
}
const initialActivities: activityItem[] = []
const initialActivity: activityItem = { id: '661f805bac6e447032a71901', name: 'Video', language: [LanguageType.other], category: Category.Video, layout: Layout.multimedia, instructions: 'https://www.youtube.com/watch?v=tVlcKp3bWH8' }

export default function Home (): React.JSX.Element {
  const steps = ['Enter target language', 'Add lesson stages', 'Set lesson options', 'Finish']
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed] = React.useState<Record<number, boolean>>({})
  const [isSaveOpen, setSaveOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState(0)
  const [vocab, setVocab] = React.useState(init)
  const [receptive, setReceptive] = React.useState(init)
  const [grammar, setGrammar] = React.useState(init)
  const [rules, setRules] = React.useState(init)
  const [review, setReview] = React.useState(init)
  const [tl, setTL] = React.useState(initialLesson)
  const [activities, setActivities] = React.useState(initialActivities)
  const [rows, setRows] = React.useState([
    initialActivity
  ])

  const populateTL = (): void => {
    setTL({ vocab, receptive, grammar, rules, review })
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setActiveTab(newValue)
  }

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

  const languageType = (): { func: React.Dispatch<React.SetStateAction<LanguageItem[]>>, language: LanguageItem[] } => {
    switch (activeTab) {
      case LanguageType.vocab: return { func: setVocab, language: vocab }
      case LanguageType.grammar: return { func: setGrammar, language: grammar }
      case LanguageType.receptive: return { func: setReceptive, language: receptive }
      case LanguageType.review: return { func: setReview, language: review }
      case LanguageType.rules: return { func: setRules, language: rules }
      default: return { func: setVocab, language: vocab }
    }
  }

  const handleChange = (e: any, i: number, field: string): void => {
    const value = e.target.value as string

    const lt = languageType()

    const newRows = lt.language.map((row, index) => {
      if (index === i) {
        if (field === 'term') {
          return { ...row, language: value }
        }
        if (field === 'image') {
          return { ...row, image: value }
        }
      } else {
        return row
      }
      return row
    })
    lt.func(newRows)
    populateTL()
  }

  const handleStep = (step: number) => () => {
    setActiveStep(step)
  }

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

  if (activities.length < 1) {
    void getActivities(setActivities)
  }

  console.log(activities)

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
  ? LanguagePage(languageType, handleChange, activeTab, handleTabChange)
  : <></> }

      {activeStep === 1 ? CollapsibleTable(rows, setRows, activities) : <></>}

      {activeStep === 3
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ? SavePage(rows as any, options, tl, saveOpen)
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
          populateTL()
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          saveLesson(rows as any, tl, options).then(() => {
            populateTL()
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            if (options.generateHandouts) void genPrintables(rows as any, tl, options)
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
