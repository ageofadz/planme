import React, { type Dispatch, type SetStateAction } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'
import { AddBoxOutlined, DragHandle, RemoveCircleOutline } from '@mui/icons-material'
import { uuid } from 'uuidv4'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Button, FormControl, InputLabel, TextField } from '@mui/material'
import { initialActivity, type activityItem } from './types/activity'
import { LanguageType } from './types/language'
import { type Category } from './types/category'

export default function BasicTable (rows: activityItem[], setRows: Dispatch<SetStateAction<activityItem[]>>, activities: activityItem[]): React.JSX.Element {
  const handleChange = (e: any, id: string, field: string): void => {
    console.log(e, id)
    const newRows = rows.map(row => {
      if (row.id === id) {
        if (field === 'name') {
          const act = activities.filter((a) => a.category === row.category && a.name === e.target.value)
          if (act[0]) {
            return { ...act[0], name: e.target.value, id: row.id, language: row.language }
          }
          return { ...row, name: e.target.value }
        }
        if (field === 'category') {
          return { ...row, category: e.target.value, name: '' }
        }
        if (field === 'language') {
          return { ...row, language: [e.target.value], category: '', name: '' }
        }
        if (field === 'media') {
          return { ...row, name: row.category, extra: e.target.value }
        }
      }
      return row
    })
    setRows(newRows as SetStateAction<activityItem[]>)
  }

  const handleRemove = (id: string): void => {
    const newRows = rows.filter(row => row.id !== id)
    setRows(newRows as SetStateAction<activityItem[]>)
  }

  const handleAdd = (): void => {
    const prevRow = rows.length > 0 ? rows[rows.length - 1] : initialActivity
    const newRow: activityItem = { id: uuid(), name: '', category: prevRow.category, language: prevRow.language, layout: prevRow.layout }
    const newRows = [...rows, newRow]
    setRows(newRows as SetStateAction<activityItem[]>)
  }

  const handleDragEnd = (e: DropResult): void => {
    if (!e.destination) return
    const tempData = Array.from(rows)
    const [sourceData] = tempData.splice(e.source.index, 1)
    tempData.splice(e.destination.index, 0, sourceData)
    setRows(tempData)
  }

  const categoryItems = (l: LanguageType): React.JSX.Element[] => {
    const items = []
    const correctActivities = []
    for (const a of activities) {
      for (const g of a.language) {
        if (g === l) {
          correctActivities.push(a)
        }
      }
    }

    const categories = correctActivities.map((a) => a.category).filter((c, i, self) =>
      i === self.indexOf(c))

    for (const c of categories) {
      items.push(<MenuItem value={c}>{c}</MenuItem>)
    }

    return items
  }

  const activityItems = (l: LanguageType, c: Category): React.JSX.Element[] => {
    const items = []
    const correctActivities = []
    for (const a of activities) {
      for (const g of a.language) {
        if (g === l && a.category === c) {
          correctActivities.push(a)
        }
      }
    }

    const acts = correctActivities.map((a) => a.name).filter((c, i, self) =>
      i === self.indexOf(c))

    for (const a of acts) {
      items.push(<MenuItem value={a}>{a}</MenuItem>)
    }

    return items
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Table sx={{ minWidth: 650 }} aria-label="activity table">
        <TableHead>

        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Template</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={'Test-Teach-Test'}
                        label="Template"
                        >
                        <MenuItem>Test-Teach-Test</MenuItem>
                        <MenuItem>Twenty</MenuItem>
                        <MenuItem>Thirty</MenuItem>
                        </Select>
                        </FormControl>
          <TableRow>
            <TableCell><Button variant="outlined" onClick={() => { handleAdd() }}><b>Add stage</b><AddBoxOutlined /></Button></TableCell>
          </TableRow>
        </TableHead>
        <Droppable droppableId="droppable-1">
          {(provider) => (
            <TableBody ref={provider.innerRef} {...provider.droppableProps}>
              {rows.map((row, index) => (
                <Draggable key={`${index}`} draggableId={`${index}`} index={index}>
                  {(provider) => (
                    <TableRow
                      key={`${index}`}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      {...provider.draggableProps}
                      ref={provider.innerRef}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                        {...provider.dragHandleProps}
                      >
                        <DragHandle />
                      </TableCell>
                      <TableCell
                        align="left"
                      >
                        <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Language type</InputLabel>

                                    <Select
                                        className='w-40'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={row.language}
                                        label="Category"
                                        onChange={(e) => { handleChange(e, row.id, 'language') }}
                                    >
                                        <MenuItem value={0}>Vocab</MenuItem>
                                        <MenuItem value={1}>Receptive skills</MenuItem>
                                        <MenuItem value={2}>Grammar</MenuItem>
                                        <MenuItem value={3}>Rules</MenuItem>
                                        <MenuItem value={4}>Review</MenuItem>
                                        <MenuItem value={5}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                      </TableCell>
                      <TableCell
                        align="left">

                          <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Category</InputLabel>

                                    <Select
                                        className='w-40'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={row.category}
                                        label="Category"
                                        onChange={(e) => { handleChange(e, row.id, 'category') }}
                                    >
                                      {categoryItems(row.language[0])}
                                    </Select>
                                </FormControl>
                          </TableCell>
                          <TableCell
                            align="left">
                              <FormControl fullWidth>

                {row.language.length > 0 && row.language[0] === LanguageType.other
                  ? <TextField
                  className='w-40'
                  label="URL"
                  onChange={(e) => {
                    handleChange(e, row.id, 'media')
                  }}/>
                  : <>
                  <InputLabel id="demo-simple-select-label">Activity Name</InputLabel>
                  <Select
                    className='w-40'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={row.name}
                    label="Name"
                    onChange={(e) => {
                      handleChange(e, row.id, 'name')
                    }}
                >
                                    {activityItems(row.language[0], row.category)}

                </Select></>}
                                </FormControl>
                              </TableCell>
                        <TableCell
                          align="left"><Button onClick={() => { handleRemove(row.id) }}><RemoveCircleOutline /></Button></TableCell>

                    </TableRow>
                  )}
                </Draggable>
              ))}
              {provider.placeholder}
            </TableBody>
          )}
        </Droppable>
      </Table>
    </DragDropContext>
  )
}
