import React, { Dispatch, SetStateAction, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { AddBoxOutlined, DragHandle, RemoveCircleOutline } from "@mui/icons-material";
import { uuid } from "uuidv4";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, InputLabel } from "@mui/material";
import getMenuItemsForCategory from "./getMenuItemsForCategory";
import getOptionsForItem from "./getOptionsForItem";
import { Row } from "./row";

export default function BasicTable(rows: Row[], setRows: Dispatch<SetStateAction<Row[]>>) {


  function createData(id: string, category: string, name: string) {
    return { id, category, name };
  }

  const handleChange = (e: any, id: String, field: String) => {
    console.log(e, id);
    const newRows = rows.map(row => {
      if (row.id == id) {
        if (field=='name') {
        return {...row, name: e.target.value}
        }
        if (field=='category') {
          return {...row, category: e.target.value, name: ''}
        }
      } else {
        return row
      }
    })
    setRows(newRows as any)
  }

  const handleRemove = (id: string) => {
    const newRows = rows.filter(row => row.id!==id);
    setRows(newRows as any)
  }

  const handleAdd = () => {
    const newRow=createData(uuid(), '', '');
    const newRows = [...rows, newRow]
    setRows(newRows as any)
  }

  const handleDragEnd = (e: any) => {
    if (!e.destination) return;
    let tempData = Array.from(rows);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setRows(tempData);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Table sx={{ minWidth: 650 }} aria-label="activity table">
        <TableHead>


        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Template</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={"Test-Teach-Test"}
                        label="Template"
                        >
                        <MenuItem>Test-Teach-Test</MenuItem>
                        <MenuItem>Twenty</MenuItem>
                        <MenuItem>Thirty</MenuItem>
                        </Select>
                        </FormControl>
          <TableRow>
            <TableCell><b>Activity</b></TableCell>
            <TableCell><b>Category</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><Button variant="outlined" onClick={()=>handleAdd()}><b>Add stage</b><AddBoxOutlined /></Button></TableCell>
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                        align="left">
                          
                          <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Category</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={row.category}
                                        label="Category"
                                        onChange={(e) => handleChange(e, row.id, 'category')}
                                    >
                                        <MenuItem value={'Other'}>Other</MenuItem>
                                        <MenuItem value={'Individual receptive'}>Individual receptive</MenuItem>
                                        <MenuItem value={'Group receptive'}>Group receptive</MenuItem>
                                        <MenuItem value={'Individual productive'}>Individual productive</MenuItem>
                                        <MenuItem value={'Group productive'}>Group productive</MenuItem>
                                        <MenuItem value={'Controlled practice'}>Controlled practice</MenuItem>
                                        <MenuItem value={'Semi-controlled practice'}>Semi-controlled practice</MenuItem>
                                        <MenuItem value={'Freer practice'}>Freer practice</MenuItem>
                                    </Select>
                                </FormControl>
                          </TableCell>
                          <TableCell
                            align="left">
                              <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Activity Name</InputLabel>
                                    {getMenuItemsForCategory(row.category, row.name, row.id, handleChange)}
                                </FormControl>
                              </TableCell>
                        <TableCell
                          align="left"><Button onClick={() => handleRemove(row.id)}><RemoveCircleOutline /></Button></TableCell>


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
  );
}
