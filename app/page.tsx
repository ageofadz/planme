'use client'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import CollapsibleTable from './table'
import '../node_modules/reveal.js/dist/reveal.css'
import '../node_modules/reveal.js/dist/theme/beige.css'
import Button from '@mui/material/Button/Button'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { AppBar, Box, FormGroup, IconButton, Modal, Snackbar, Step, StepButton, Stepper, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { NavigateBefore, NavigateNext, Save } from '@mui/icons-material'
import Image from 'next/image'
import { initialActivity, type activityItem } from './types/activity'
import { optionsObj } from './types/options'
import { genPrintables, getActivities, saveLesson } from './networking/routes'
import CloseIcon from '@mui/icons-material/Close'
import ProfileSection from './profilesection'
import OptionsPage from './options'
import LanguagePage from './language'
import SavePage from './savePage'
import { type Language, LanguageType, type LanguageItem } from './types/language'
import theme from './theme'
import { type Lesson } from './types/lesson'

const init: LanguageItem[] = []
const initialLanguage: Language = {
  vocab: [],
  receptive: [],
  grammar: [],
  rules: [],
  review: []
}
const initialActivities: activityItem[] = []

export default function Home (): React.JSX.Element {
  const steps = ['Enter target language', 'Add lesson stages', 'Set lesson options', 'Finish']
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed] = React.useState<Record<number, boolean>>({})
  const [isSaveOpen, setSaveOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState(0)
  const [vocab, setVocab] = React.useState(init)
  const [toastOpen, setToastOpen] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState('')
  const [receptive, setReceptive] = React.useState(init)
  const [grammar, setGrammar] = React.useState(init)
  const [rules, setRules] = React.useState(init)
  const [review, setReview] = React.useState(init)
  const [tl, setTL] = React.useState(initialLanguage)
  const [activities, setActivities] = React.useState(initialActivities)
  const [rows, setRows] = React.useState([
    initialActivity
  ])

  const openToast = (message: string): void => {
    setToastMessage(message)
    setToastOpen(true)
  }

  const populateTL = (): void => {
    setTL({ vocab, receptive, grammar, rules, review })
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setActiveTab(newValue)
  }

  const loadLesson = (lesson: Lesson): void => {
    setRows(lesson.rows)
    setOptions(lesson.options)
    setVocab(lesson.tl.vocab)
    setGrammar(lesson.tl.grammar)
    setReceptive(lesson.tl.receptive)
    setRules(lesson.tl.rules)
    setReview(lesson.tl.review)
    populateTL()
  }

  const saveOpen = (): void => { setSaveOpen(true); console.log('save open') }
  const saveClosed = (): void => { setSaveOpen(false); console.log('save closed') }

  const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }

    setToastOpen(false)
  }

  const snackAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

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

  const [options, setOptions] = useState(optionsObj)

  if (activities.length < 1) {
    void getActivities(setActivities)
  }

  console.log(activities)

  return (
    <UserProvider>
    <ThemeProvider theme={theme}>
    <main>
    <Box className="flex flex-col  lg:static">
    <AppBar position="static" className="flex">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Image src="/planmi.png"
            height={84}
            width={84}
            alt="planmi"
          />
          </Typography>
          <ProfileSection loadLesson={loadLesson} setActiveStep={setActiveStep} />
        </Toolbar>
      </AppBar>
    <Stepper nonLinear activeStep={activeStep} className="flex w-4/5 mx-auto my-4">
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box className="flex items-center justify-center my-4">
        <Button variant='outlined' onClick = {() => { setActiveStep(activeStep - 1) }} disabled={activeStep === 0}><NavigateBefore /></Button>
        <Button variant='outlined' onClick = {() => { setActiveStep(activeStep + 1) }} disabled={activeStep === 3}><NavigateNext /></Button>
        </Box>
        </Box>
        <Box className="flex">
    <Box className="flex p-24  lg:static items-center justify-center w-full">

          <Box className="flex">
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

      </Box>

      </Box>

        </Box>

<Modal
    open={isSaveOpen}
    onClose={saveClosed}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
                <FormGroup>
                <TextField onChange={(e) => { setOptions({ ...options, name: e.target.value }) }} value={options.name} label="Lesson name" />
        <Button className='my-5' disabled={!options.name || options.name.length < 3} variant="outlined" onClick = { () => {
          populateTL()
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          saveLesson(rows, tl, options).then(() => {
            openToast('Lesson saved!')
            populateTL()
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            if (options.generateHandouts) void genPrintables(rows as any, tl, options)
          }).catch((err) => {
            console.log(err)
          })
        }
        }> <Save /> Save lesson </Button>
        </FormGroup>
    </Box>
  </Modal>

  <Snackbar
  open={toastOpen}
  autoHideDuration={6000}
  message={toastMessage}
  action={snackAction}
  onClose={handleSnackClose}
/>
    </main>

    </ThemeProvider>
    </UserProvider>
  )
}
