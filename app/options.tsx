import { Card, CardContent, Checkbox, FormControlLabel, FormGroup, MenuItem, Paper, Select, Switch, TextField } from '@mui/material'
import React from 'react'
import type { Options } from './types/options'

export default function OptionsPage (options: Options, setOptions: React.Dispatch<React.SetStateAction<Options>>): React.JSX.Element {
  return (<Card>
        <CardContent>
    <h2><b>Options</b></h2>

                <FormGroup>

                    <FormControlLabel control={
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={options.theme}
                        label="Theme"
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
                    } label="Theme" />

                    <FormControlLabel control={<Switch checked={options.generateHandouts} onChange={(e) => { setOptions({ ...options, generateHandouts: e.target.checked }) }} />} label="Generate handouts" />
                    <FormControlLabel control={<Switch checked={options.rulesAfterActivities} onChange={(e) => { setOptions({ ...options, rulesAfterActivities: e.target.checked }) }} />} label="Rule check after lesson stages" />

                    {<TextField className="my-2" label="Timer URL" value={options.songs?.timer} onChange={(e) => { setOptions({ ...options, songs: { ...options.songs, timer: e.target.value } }) }} />}
                    {<TextField className="my-2" label="intro song URL" value={options.songs?.intro} onChange={(e) => { setOptions({ ...options, songs: { ...options.songs, intro: e.target.value } }) }} />}
                    {// make songs reactive - loop through songs and set accordingly
                    }
                    {<TextField className="my-2" label="Song 1 URL" value={options.songs?.one} onChange={(e) => { setOptions({ ...options, songs: { ...options.songs, one: e.target.value } }) }} />}
                    {<TextField className="my-2" label="Song 2 URL" value={options.songs?.two} onChange={(e) => { setOptions({ ...options, songs: { ...options.songs, two: e.target.value } }) }} />}
                    {<TextField className="my-2" label="Song 3 URL" value={options.songs?.three} onChange={(e) => { setOptions({ ...options, songs: { ...options.songs, three: e.target.value } }) }} />}
                    {<TextField className="my-2" label="cleanup song URL" value={options.songs?.cleanup} onChange={(e) => { setOptions({ ...options, songs: { ...options.songs, cleanup: e.target.value } }) }} />}
                    {<TextField className="my-2" label="Goodbye song URL" value={options.songs?.goodbye} onChange={(e) => { setOptions({ ...options, songs: { ...options.songs, goodbye: e.target.value } }) }} />}
                    {<TextField className="my-2" label="Dragon picture URL" value={options.dragonImage} onChange={(e) => { setOptions({ ...options, dragonImage: e.target.value }) }} />
}
                    <Paper elevation={4}>
                    Rules:
                    <br></br>

                <FormControlLabel control={<Checkbox checked={options.rules?.listen} onChange={(e) => { setOptions({ ...options, rules: { ...options.rules, listen: e.target.checked } }) }} />} label="Listen to the teacher" />
                <FormControlLabel control={<Checkbox checked={options.rules?.sitNicely} onChange={(e) => { setOptions({ ...options, rules: { ...options.rules, sitNicely: e.target.checked } }) }} />} label="Sit nicely" />
                <FormControlLabel control={<Checkbox checked={options.rules?.english} onChange={(e) => { setOptions({ ...options, rules: { ...options.rules, english: e.target.checked } }) }} />} label="Speak English" />
                <FormControlLabel control={<Checkbox checked={options.rules?.raiseHand} onChange={(e) => { setOptions({ ...options, rules: { ...options.rules, raiseHand: e.target.checked } }) }} />} label="Raise your hand" />
                <FormControlLabel control={<Checkbox checked={options.rules?.nice} onChange={(e) => { setOptions({ ...options, rules: { ...options.rules, nice: e.target.checked } }) }} />} label="Be nice" />
                <FormControlLabel control={<Checkbox checked={options.rules?.tryBest} onChange={(e) => { setOptions({ ...options, rules: { ...options.rules, tryBest: e.target.checked } }) }} />} label="Try your best" />
                <FormControlLabel control={<Checkbox checked={options.rules?.sticker} onChange={(e) => { setOptions({ ...options, rules: { ...options.rules, sticker: e.target.checked } }) }} />} label="Five stars, sticker" />
                </Paper>

                </FormGroup>
      </CardContent>
    </Card>)
}
