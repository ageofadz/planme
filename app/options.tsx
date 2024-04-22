import { Card, CardContent, FormControlLabel, FormGroup, MenuItem, Select, Switch, TextField } from '@mui/material'
import React from 'react'
import type { Options } from './types/options'

export default function OptionsPage (options: Options, setOptions: React.Dispatch<React.SetStateAction<Options>>): React.JSX.Element {
  return (<Card>
        <CardContent>

                <FormGroup>

                    <FormControlLabel control={
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={options.theme}
                        className='w-40'
                        onChange={(e) => { setOptions({ ...options, theme: e.target.value as any }) }}
                      >
                        <MenuItem value={'black'}>Black</MenuItem>
                        <MenuItem value={'white'}>White</MenuItem>
                        <MenuItem value={'league'}>League</MenuItem>
                        <MenuItem value={'beige'}>Beige</MenuItem>
                        <MenuItem value={'night'}>Night</MenuItem>
                        <MenuItem value={'serif'}>Serif</MenuItem>
                        <MenuItem value={'simple'}>Simple</MenuItem>
                        <MenuItem value={'solarized'}>Solarized</MenuItem>
                        <MenuItem value={'moon'}>Moon</MenuItem>
                        <MenuItem value={'dracula'}>Dracula</MenuItem>
                        <MenuItem value={'sky'}>Sky</MenuItem>
                        <MenuItem value={'blood'}>Blood</MenuItem>
                      </Select>
                    } label="Theme"
                    labelPlacement="start" />

                    <FormControlLabel
                    labelPlacement="start" className="my-2" control={<Switch checked={options.generateHandouts} onChange={(e) => { setOptions({ ...options, generateHandouts: e.target.checked }) }} />} label="Generate handouts" />
                    <FormControlLabel
                    labelPlacement="start" className="my-2" control={<Switch checked={options.rulesAfterActivities} onChange={(e) => { setOptions({ ...options, rulesAfterActivities: e.target.checked }) }} />} label="Rule check after lesson stages" />
                    <TextField className="my-2 w-full" label="Dragon picture URL" value={options.dragonImage} onChange={(e) => { setOptions({ ...options, dragonImage: e.target.value }) }} />

                </FormGroup>
      </CardContent>
    </Card>)
}
