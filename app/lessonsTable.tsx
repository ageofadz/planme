import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { initialLesson, type Lesson } from './types/lesson'
import Paper from '@mui/material/Paper'
import { Add, Close, OpenInBrowser, Save } from '@mui/icons-material'
import BeatLoader from 'react-spinners/BeatLoader'
import { deleteLesson, saveLesson } from './networking/routes'

export default function lessonsTable (lessons: Lesson[] | undefined, loadLesson: (l: Lesson) => void, close: () => void, lesson: Lesson | undefined, saveOpen: () => void, pullLessons: () => void): React.JSX.Element {
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

    <Button
      onClick={() => {
        saveOpen()
      }}
      >Save lesson <Save /></Button>
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
              selected={row.options.name === lesson?.options.name}
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
              <TableCell><Button
              onClick={() => {
                deleteLesson(row.options).then(() => {
                  console.log('deleted')
                  pullLessons()
                  loadLesson(initialLesson)
                }).catch((e) => { console.log(e) })
              }}><Close/></Button></TableCell>
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
