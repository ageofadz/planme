import { AddBoxOutlined } from '@mui/icons-material'
import { Card, CardContent, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, Tabs, Tab } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { type LanguageItem } from './types/language'

export default function LanguagePage (languageType: () => {
  func: React.Dispatch<React.SetStateAction<LanguageItem[]>>
  language: LanguageItem[]
},
handleChange: (e: any, i: number, field: string) => void,
activeTab: number,
handleTabChange: (event: React.SyntheticEvent, newValue: number) => void): React.JSX.Element {
  return (
<div className="flex flex-row">

                    <Card className="flex">

      <CardContent >
    <div className="flex-col">

    <Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example" className='mb-4'>
          <Tab label="Vocab items"/>
          <Tab label="Receptive text segments"/>
          <Tab label="Grammar points"/>
          <Tab label="Rules"/>
          <Tab label="Review items"/>
        </Tabs>

      <Button variant="outlined" onClick={() => {
        const arr = { term: '', image: '' }
        const lt = languageType()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        lt.func([...lt.language, arr] as any)
      }}><b>Add Language</b><AddBoxOutlined /></Button>
      </div>
      <div className="overflow-y-scroll">

      <TableContainer component={Paper} >

      <Table sx={{ minWidth: 650 }} aria-label="tl table" >
        <TableHead >
          <TableRow >
            <TableCell align="left" >Language</TableCell>
            <TableCell align="left" >Image (Optional)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {
        languageType().language.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left"><TextField multiline={true} value={row?.language} onChange={(e) => { handleChange(e, i, 'term') }}></TextField></TableCell>
              <TableCell align="left"><TextField value={row?.image} onChange={(e) => { handleChange(e, i, 'image') }}></TextField></TableCell>
              <TableCell align="left"><Button variant='outlined' className='my-auto' onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                languageType().func(languageType().language.filter((_, ind) => ind !== i) as any)
              }}><ClearIcon /></Button></TableCell>
            </TableRow>
        ))}

        </TableBody>
      </Table>
    </TableContainer>
      </div>
      </CardContent>
    </Card>

  </div>
  )
}
