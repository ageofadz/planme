
'use client'
import { useState } from 'react'
import genPowerPoint from './genpowerpoint'
import TextField from '@mui/material/TextField';
import CollapsibleTable from './table';
import Button from '@mui/material/Button/Button';
import { uuid } from 'uuidv4';
import { AppBar, Card, CardContent, Checkbox, FormControlLabel, FormGroup, IconButton, Paper, Radio, RadioGroup, Step, StepButton, Stepper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { AddBoxOutlined, NavigateBefore, NavigateNext } from '@mui/icons-material';
import Image from 'next/image';


export var tl: [{term: string, image: string}?] = [];

export default function Home() {

  const steps = ['Enter target language', 'Add lesson stages', 'Set lesson options', 'Finish'];


  const [activeStep, setActiveStep] = React.useState(0);
  const [currTL, setTL] = React.useState(tl)
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const updateTL = () => {
    tl = currTL;
  }

  const handleChange = (e: any, i: number, field: String) => {
    console.log('test')
    const newRows = currTL.map((row, index) => {
      console.log('test')
      if (index == i) {
        if (field=='term') {
          return {...row, term: e.target.value}
        }
        if (field=='type') {
        return {...row, type: e.target.value, term: '', image: ''}
        }
        if (field=='image') {
          return {...row, image: e.target.value}
        }
      } else {
        return row
      }
    })
    setTL(newRows as any)
    updateTL()
  }

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  function createData(id: string, category: string, name: string) {
    return { id, category, name };
  }
  const [rows, setRows] = useState([
    createData(uuid(), 'Other', "Song"),
  ]);

  let optionsObj: Options = {
    songs: {
      timer: "https://www.youtube.com/watch?v=_W0bSen8Qjg",
      intro: "https://www.youtube.com/watch?v=tVlcKp3bWH8",
      cleanup: "https://www.youtube.com/watch?v=SFE0mMWbA-Y",
      goodbye: "https://www.youtube.com/watch?v=PraN5ZoSjiY",

    },
    rules: { 
      listen: true,
      sitNicely: true,
      english: true,
      nice: true,
      tryBest: true,
      raiseHand: true,
      sticker: true,
    },
    dragonImage: "https://media1.tenor.com/m/W9Dmn0ZkTmsAAAAC/dragon-rawr.gif",
    generateHandouts: true,
    rulesAfterActivities: true,
  };

  const [options, setOptions] = useState(optionsObj);

  const [inputFieldsTerms, setinputFieldsTerms] = useState([
    {term: '', image: ''}
])
const addFieldTerms = () => {
  let newfield = { term: '', image: '' }

  setinputFieldsTerms([...inputFieldsTerms, newfield])
}
const removeField = () => {
  let data = [...inputFieldsTerms];
  data.splice(inputFieldsTerms.length-1, 1)
  setinputFieldsTerms(data)
}

const handleSubmitTerms = (target: FormData) => {
  const terms = (target.getAll('term'));
  const images = (target.getAll('image'));
  tl = [];
  console.log("cleared");
  for (var i = 0; i < terms.length; i++) {
    const term = terms[i].toString()
    const image = images[i].toString()
    tl.push({term, image})
  }
  console.log(tl);
  if (terms[terms.length-1].toString().length<1) {
    console.log("empty");
    return;
  }
  else {
    addFieldTerms();
  }

}
  return (
    <main>
    <div className="flex flex-col bg-gradient-to-t lg:static">
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
          <Button color="inherit">Login</Button>
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
        <Button variant='outlined' onClick = {() => setActiveStep(activeStep-1)} disabled={activeStep==0}><NavigateBefore /></Button>
        <Button variant='outlined' onClick = {() => setActiveStep(activeStep+1)} disabled={activeStep==3}><NavigateNext /></Button>
        </div>
        </div>
    <div className="flex flex-row p-24 bg-gradient-to-t lg:static items-center justify-center ">




    {    activeStep==2 ?  <Card>
        <CardContent>
    <h2><b>Options</b></h2>

                <FormGroup>

                    <FormControlLabel control={<Switch checked={options.generateHandouts} onChange={(e) => setOptions({...options, generateHandouts : e.target.checked})} />} label="Generate handouts" />

                    {<TextField className="my-2" label="Timer URL" value={options.songs?.timer} onChange={(e) => setOptions({...options, songs: {...options.songs, timer: e.target.value}})} />}
                    {<TextField className="my-2" label="Intro Song URL" value={options.songs?.intro} onChange={(e) => setOptions({...options, songs: {...options.songs, intro: e.target.value}})} />}
                    {//make songs reactive - loop through songs and set accordingly
                    }
                    {<TextField className="my-2" label="Song 1 URL" onChange={(e) => setOptions({...options, songs: {...options.songs, one: e.target.value}})}  />}
                    {<TextField className="my-2" label="Song 2 URL" onChange={(e) => setOptions({...options, songs: {...options.songs, two: e.target.value}})}  />}
                    {<TextField className="my-2" label="Song 3 URL" onChange={(e) => setOptions({...options, songs: {...options.songs, three: e.target.value}})} />}
                    {<TextField className="my-2" label="Cleanup song URL"  value={options.songs?.cleanup} onChange={(e) => setOptions({...options, songs: {...options.songs, cleanup: e.target.value}})} />}
                    {<TextField className="my-2" label="Goodbye song URL"  value={options.songs?.goodbye} onChange={(e) => setOptions({...options, songs: {...options.songs, goodbye: e.target.value}})} />}
                    {<TextField className="my-2" label="Dragon picture URL" value={options.dragonImage} onChange={(e) => setOptions({...options, dragonImage: e.target.value})} />
}
                    <Paper elevation={4}>
                    Rules:
                    <br></br>

                <FormControlLabel control={<Checkbox checked={options.rules?.listen} onChange={(e) => setOptions({...options, rules: {...options.rules, listen: e.target.checked}})} />} label="Listen to the teacher"  />
                <FormControlLabel control={<Checkbox checked={options.rules?.sitNicely} onChange={(e) => setOptions({...options, rules: {...options.rules, sitNicely: e.target.checked}})} />} label="Sit nicely" />
                <FormControlLabel control={<Checkbox checked={options.rules?.english} onChange={(e) => setOptions({...options, rules: {...options.rules, english: e.target.checked}})} />} label="Speak English" />
                <FormControlLabel control={<Checkbox checked={options.rules?.raiseHand} onChange={(e) => setOptions({...options, rules: {...options.rules, raiseHand: e.target.checked}})} />} label="Raise your hand" />
                <FormControlLabel control={<Checkbox checked={options.rules?.nice} onChange={(e) => setOptions({...options, rules: {...options.rules, nice: e.target.checked}})} />} label="Be nice" />
                <FormControlLabel control={<Checkbox checked={options.rules?.tryBest} onChange={(e) => setOptions({...options, rules: {...options.rules, tryBest: e.target.checked}})} />} label="Try your best" />
                <FormControlLabel control={<Checkbox checked={options.rules?.sticker} onChange={(e) => setOptions({...options, rules: {...options.rules, sticker: e.target.checked}})} />} label="Five stars, sticker" />
                </Paper>
                    
                </FormGroup>
      </CardContent>
    </Card>   : <></>}

{    activeStep==0 ? <div className="flex flex-row">
  
  
                    <Card className="flex">

      <CardContent >

      <h2><b>Target language</b></h2>

      <Button variant="outlined" onClick={() => {
        const arr = [{term: '', image: ''}]
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
              <TableCell  align="right"><TextField value=""></TextField></TableCell>
              <TableCell  align="right"><TextField value={row?.term} onChange={(e) => handleChange(e, i, 'term')}></TextField></TableCell>
              <TableCell  align="right"><TextField value={row?.image} onChange={(e) => handleChange(e, i, 'image')}></TextField></TableCell>
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
                    
  </div> : <></> } 
      
          
      {activeStep == 1 ? CollapsibleTable(rows, setRows) : <></>}

      {activeStep== 3 ? <Button variant="outlined" onClick={() => {
        genPowerPoint(rows, options)
        }}>
          Generate powerpoint
        </Button> : <></>}

      </div>
    </main>
  )
}
