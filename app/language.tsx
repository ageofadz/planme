import { AddBoxOutlined } from '@mui/icons-material'
import { Card, CardContent, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TextField } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear'

export default function LanguagePage (currTL: [({
  term: string
  image: string
  type: string | undefined
} | undefined)?],

setTL: (value: React.SetStateAction<[({
  term: string
  image: string
  type: string | undefined
} | undefined)?]>) => void,
updateTL: () => void,
handleChange: (e: any, i: number, field: string) => void): React.JSX.Element {
  return (
<div className="flex flex-row">

                    <Card className="flex">

      <CardContent >
    <div className="flex-col">
      <h2><b>Target language</b></h2>

      <Button variant="outlined" onClick={() => {
        const arr = { term: '', image: '', type: currTL[currTL.length - 1]?.type ?? '' }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setTL([...currTL, arr] as any)
        updateTL()
      }}><b>Add TL</b><AddBoxOutlined /></Button>
      </div>
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
  )
}
