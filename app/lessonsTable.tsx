import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { initialLesson, type Lesson } from './types/lesson'
import Paper from '@mui/material/Paper'
import { Add, Close, OpenInBrowser } from '@mui/icons-material'
import BeatLoader from 'react-spinners/BeatLoader'

export default function lessonsTable (lessons: Lesson[] | undefined, loadLesson: (l: Lesson) => void, close: () => void): React.JSX.Element {
  return (

<Box>
{
lessons
  ? <TableContainer component={Paper}>
      <Button
      onClick={() => {
        loadLesson(initialLesson)
        close()
      }}
      >New lesson <Add /></Button>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><b>Lesson Name</b></TableCell>
            <TableCell><b>Delete Lesson</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessons.map((row) => (
            <TableRow
              hover
              key={row.options.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
            >
              <TableCell component="th" scope="row"
            onClick={() => {
              loadLesson(row)
              close()
            }}>

                {row.options.name}
              </TableCell>
              <TableCell><Button><Close/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  : <BeatLoader
        color={'white'}
        loading={true}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />}
</Box>)
}
