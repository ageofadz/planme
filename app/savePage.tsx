import { Button } from '@mui/material'
import React from 'react'
import type { Options } from './types/options'
import type { Activity } from './types/activity'
import { type Language } from './types/language'

export default function SavePage (rows: Array<{
  id: string
  category: string
  name: Activity
}>, options: Options, tl: Language,
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
