
'use client'
import { useState } from 'react'
import genPowerPoint from './genpowerpoint'
import TextField from '@mui/material/TextField';
import CollapsibleTable from './table';
import Button from '@mui/material/Button/Button';
import { uuid } from 'uuidv4';


export var tl: [{term: string, image: string}?];

export default function Home() {


  function createData(id: string, category: string, name: string) {
    return { id, category, name };
  }
  const [rows, setRows] = useState([
    createData(uuid(), 'Other', "Song"),
    createData(uuid(), 'Other', "Rules"),
    createData(uuid(), "Individual receptive", 'Vocab on screen'),
    createData(uuid(), "Group receptive", 'Vocab on screen'),
    createData(uuid(), "Individual productive", 'Vocab on screen'),
    createData(uuid(), "Group productive", 'Vocab on screen'),
    createData(uuid(), "Controlled practice", 'Worksheet'),
    createData(uuid(), "Semi-controlled practice", 'Vocab on screen'),
    createData(uuid(), "Freer practice", "mingle"),
  ]);

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
    <main className="flex flex-row p-24 bg-gradient-to-t lg:static">
    <div>
      <h2><b>Target language</b></h2>
      <div className="overflow-y-scroll">
      <form action={(target) => handleSubmitTerms(target)}>
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
      </form>
      </div>
      </div>
        <div>
          
      {CollapsibleTable(rows, setRows)}
      <Button variant="outlined" onClick={() => {
        genPowerPoint(rows)
        }}>
          Generate powerpoint
        </Button>
      </div>
    </main>
  )
}
