'use client'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import CollapsibleTable from './table'
import '../node_modules/reveal.js/dist/reveal.css'
import '../node_modules/reveal.js/dist/theme/beige.css'
import Button from '@mui/material/Button/Button'
import ClearIcon from '@mui/icons-material/Clear'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { uuid } from 'uuidv4'
import { AppBar, Card, CardContent, Checkbox, FormControlLabel, FormGroup, IconButton, MenuItem, Paper, Select, Step, StepButton, Stepper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import { AddBoxOutlined, NavigateBefore, NavigateNext } from '@mui/icons-material'
import Image from 'next/image'
import { Activity } from './types/activity'
import type { Options } from './types/options'
import { saveLesson } from './networking/routes'
import LoginButton from './login'

export let tl: [{ term: string, image: string, type: string | undefined }?] = []

export default function Home (): React.JSX.Element {
  const steps = ['Enter target language', 'Add lesson stages', 'Set lesson options', 'Finish']

  const [activeStep, setActiveStep] = React.useState(0)
  const [currTL, setTL] = React.useState(tl)
  const [completed] = React.useState<Record<number, boolean>>({})

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
    rulesAfterActivities: true
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
          <LoginButton />
          <Button color="inherit" onClick = {() => {
            setRows([{ id: 'a137d048-66fa-4a02-874e-7b400c40f33c', category: 'Group productive', name: 3 }, { id: 'd8cf45c8-3787-491e-b934-43a1c29f6bd3', category: 'Individual receptive', name: 14 }, { id: 'a811ecd7-9740-4fc3-b5f3-715fe4eaab23', category: 'Individual receptive', name: 15 }, { id: '9612ae08-8669-4f49-a9dd-52280dbef06b', category: 'Individual productive', name: 18 }, { id: '1d3d61a0-124a-48f2-be14-2def622b344b', category: 'Other', name: 7 }])
            setOptions({ songs: { timer: 'https://www.youtube.com/watch?v=_W0bSen8Qjg', intro: 'https://www.youtube.com/watch?v=tVlcKp3bWH8', cleanup: 'https://www.youtube.com/watch?v=SFE0mMWbA-Y', goodbye: 'https://www.youtube.com/watch?v=PraN5ZoSjiY' }, rules: { listen: true, sitNicely: true, english: true, nice: true, tryBest: true, raiseHand: true, sticker: true }, dragonImage: 'https://media1.tenor.com/m/W9Dmn0ZkTmsAAAAC/dragon-rawr.gif', generateHandouts: true, rulesAfterActivities: true })
          }}>Register</Button>
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
      ? <Card>
        <CardContent>
    <h2><b>Options</b></h2>

                <FormGroup>

                    <FormControlLabel control={
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={options.theme}
                        label="Theme"
                        onChange={(e) => { setOptions({ ...options, theme: e.target.value as any }) }}
                      >
                        <MenuItem value={'black'}>Black</MenuItem>
                        <MenuItem value={'white'}>White</MenuItem>
                        <MenuItem value={'league'}>League</MenuItem>
                        <MenuItem value={'beige'}>Beige</MenuItem>
                        <MenuItem value={'night'}>Night</MenuItem>
                        <MenuItem value={'serif'}>Serif</MenuItem>
                        <MenuItem value={'simple'}>Simple</MenuItem>
                        <MenuItem value={'solarized'}>Solarized</MenuItem>
                        <MenuItem value={'moon'}>Moon</MenuItem>
                        <MenuItem value={'dracula'}>Dracula</MenuItem>
                        <MenuItem value={'sky'}>Sky</MenuItem>
                        <MenuItem value={'blood'}>Blood</MenuItem>
                      </Select>
                    } label="Theme" />

                    <FormControlLabel control={<Switch checked={options.generateHandouts} onChange={(e) => { setOptions({ ...options, generateHandouts: e.target.checked }) }} />} label="Generate handouts" />
                    <FormControlLabel control={<Switch checked={options.rulesAfterActivities} onChange={(e) => { setOptions({ ...options, rulesAfterActivities: e.target.checked }) }} />} label="Rule check after lesson stages" />

                    {<TextField className="my-2" label="Timer URL" value={options.songs?.timer} onChange={(e) => { setOptions({ ...options, songs: { ...options.songs, timer: e.target.value } }) }} />}
                    {<TextField className="my-2" label="intro song URL" value={options.songs?.intro} onChange={(e) => { setOptions({ ...options, songs: { ...options.songs, intro: e.target.value } }) }} />}
                    {// make songs reactive - loop through songs and set accordingly
                    }
                    {<TextField className="my-2" label="Song 1 URL" value={options.songs?.one} onChange={(e) => { setOptions({ ...options, songs: { ...options.songs, one: e.target.value } }) }} />}
                    {<TextField className="my-2" label="Song 2 URL" value={options.songs?.two} onChange={(e) => { setOptions({ ...options, songs: { ...options.songs, two: e.target.value } }) }} />}
                    {<TextField className="my-2" label="Song 3 URL" value={options.songs?.three} onChange={(e) => { setOptions({ ...options, songs: { ...options.songs, three: e.target.value } }) }} />}
                    {<TextField className="my-2" label="cleanup song URL" value={options.songs?.cleanup} onChange={(e) => { setOptions({ ...options, songs: { ...options.songs, cleanup: e.target.value } }) }} />}
                    {<TextField className="my-2" label="Goodbye song URL" value={options.songs?.goodbye} onChange={(e) => { setOptions({ ...options, songs: { ...options.songs, goodbye: e.target.value } }) }} />}
                    {<TextField className="my-2" label="Dragon picture URL" value={options.dragonImage} onChange={(e) => { setOptions({ ...options, dragonImage: e.target.value }) }} />
}
                    <Paper elevation={4}>
                    Rules:
                    <br></br>

                <FormControlLabel control={<Checkbox checked={options.rules?.listen} onChange={(e) => { setOptions({ ...options, rules: { ...options.rules, listen: e.target.checked } }) }} />} label="Listen to the teacher" />
                <FormControlLabel control={<Checkbox checked={options.rules?.sitNicely} onChange={(e) => { setOptions({ ...options, rules: { ...options.rules, sitNicely: e.target.checked } }) }} />} label="Sit nicely" />
                <FormControlLabel control={<Checkbox checked={options.rules?.english} onChange={(e) => { setOptions({ ...options, rules: { ...options.rules, english: e.target.checked } }) }} />} label="Speak English" />
                <FormControlLabel control={<Checkbox checked={options.rules?.raiseHand} onChange={(e) => { setOptions({ ...options, rules: { ...options.rules, raiseHand: e.target.checked } }) }} />} label="Raise your hand" />
                <FormControlLabel control={<Checkbox checked={options.rules?.nice} onChange={(e) => { setOptions({ ...options, rules: { ...options.rules, nice: e.target.checked } }) }} />} label="Be nice" />
                <FormControlLabel control={<Checkbox checked={options.rules?.tryBest} onChange={(e) => { setOptions({ ...options, rules: { ...options.rules, tryBest: e.target.checked } }) }} />} label="Try your best" />
                <FormControlLabel control={<Checkbox checked={options.rules?.sticker} onChange={(e) => { setOptions({ ...options, rules: { ...options.rules, sticker: e.target.checked } }) }} />} label="Five stars, sticker" />
                </Paper>

                </FormGroup>
      </CardContent>
    </Card>
      : <></>}

{ activeStep === 0
  ? <div className="flex flex-row">

                    <Card className="flex">

      <CardContent >

      <h2><b>Target language</b></h2>

      <Button variant="outlined" onClick={() => {
        const arr = { term: '', image: '', type: currTL[currTL.length - 1]?.type ?? '' }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setTL([...currTL, arr] as any)
        updateTL()
      }}><b>Add TL</b><AddBoxOutlined /></Button>
      <div className="overflow-y-scroll">

      <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="tl table" >
        <TableHead >
          <TableRow >
            <TableCell align="left" >Type</TableCell>
            <TableCell align="left" >Language</TableCell>
            <TableCell align="left" >Image (Optional)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {
        currTL.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">
              <Select value={row?.type} onChange={(e) => { handleChange(e, i, 'type') }}>
              <MenuItem value={'vocab/grammar'}>Vocab/Grammar Point</MenuItem>
              <MenuItem value={'text'}>Receptive Text Segment</MenuItem>
              </Select>
              </TableCell>
              <TableCell align="right"><TextField multiline={row?.type === 'text'} value={row?.term} onChange={(e) => { handleChange(e, i, 'term') }}></TextField></TableCell>
              <TableCell align="right"><TextField value={row?.image} onChange={(e) => { handleChange(e, i, 'image') }}></TextField></TableCell>
              <TableCell align="right"><Button variant='outlined' className='my-auto' onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                setTL(currTL.filter((_, ind) => ind !== i) as any)
                updateTL()
              }}><ClearIcon /></Button></TableCell>
            </TableRow>
        ))}

        </TableBody>
      </Table>
    </TableContainer>

      {/* <form action={(target) => handleSubmitTerms(target)}>
        {inputFieldsTerms.map((input, index) => {
          return (
            <div key={index}>
              <input className="text-black"
                name='term'
                placeholder='Term'
              />
              <input className="text-black"
                name='image'
                placeholder='Image URL (optional)'
              />
              <input type="submit" hidden />
            </div>
          )
        })}
      </form> */}
      </div>
      </CardContent>
    </Card>

  </div>
  : <></> }

      {activeStep === 1 ? CollapsibleTable(rows, setRows) : <></>}

      {activeStep === 3
        ? <div>
      <Button className="flex w-32 my-4" variant="outlined" onClick={() => {
        localStorage.setItem('rows', JSON.stringify(rows))
        localStorage.setItem('options', JSON.stringify(options))
        localStorage.setItem('tl', JSON.stringify(tl))
        window.open('/presentation')
      }}>
         Preview presentation
       </Button>
       <Button className="flex w-32 my-4" variant="outlined" onClick={() => {
         saveLesson(rows, tl, options)
       }}>
          Save presentation
        </Button>
        </div>
        : <></>}

      </div>

      </div>

        </div>
    </main>
    </UserProvider>
  )
}
