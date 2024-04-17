import { Button } from '@mui/material'
import React from 'react'
import type { Options } from './types/options'
import type { Activity } from './types/activity'

export default function SavePage (rows: Array<{
  id: string
  category: string
  name: Activity
}>, options: Options, tl: [({
  term: string
  image: string
  type: string | undefined
} | undefined)?],
saveOpen: () => void): React.JSX.Element {
  return (
<div>
      <Button className="flex w-32 my-4" variant="outlined" onClick={() => {
        localStorage.setItem('rows', JSON.stringify(rows))
        localStorage.setItem('options', JSON.stringify(options))
        localStorage.setItem('tl', JSON.stringify(tl))
        window.open('/presentation')
      }}>
         Preview presentation
       </Button>
       <Button className="flex w-32 my-4" variant="outlined" onClick={saveOpen}>
          Save lesson
        </Button>
        </div>)
}
