/* eslint-disable react/react-in-jsx-scope */
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Activity } from './types/activity'

export default function getMenuItemsForCategory (
  category: string,
  name: Activity,
  id: string,
  func: (e: any, id: string, field: string) => void
): React.JSX.Element {
  switch (category) {
    case 'Group receptive':
      return (
            <>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    onChange={(e) => { func(e, id, 'name') }}
                >
                    <MenuItem value={'Grass skirts'}>Grass skirts</MenuItem>
                    <MenuItem value={Activity.VocabBingo}>Vocab bingo</MenuItem>
                    <MenuItem value={Activity.VocabOnBoard}>Vocab on board</MenuItem>
                </Select>
            </>
      )
    case 'Individual productive':
      return (
            <>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    onChange={(e) => { func(e, id, 'name') }}
                >
                    <MenuItem value={Activity.HotPotato}>Hot potato</MenuItem>
                </Select>
            </>
      )
    case 'Group productive':
      return (
            <>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    name={id}
                    onChange={(e) => { func(e, id, 'name') }}
                >
                    <MenuItem value={Activity.Dragon}>Dragon drilling</MenuItem>
                    <MenuItem value={Activity.Zombie}>Zombie</MenuItem>
                </Select>
            </>
      )
    case 'Receptive skills':
      return (
              <>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={name}
                      label="Name"
                      onChange={(e) => { func(e, id, 'name') }}
                  >
                      <MenuItem value={Activity.SlapOrder}>Slap the order</MenuItem>
                      <MenuItem value={Activity.UnderlineVocab}>Underline the vocabulary</MenuItem>
                  </Select>
              </>
      )
    case 'Individual receptive':
      return (
            <>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    onChange={(e) => { func(e, id, 'name') }}
                >
                    <MenuItem value={Activity.SlapCollage}>Slap the board - collage</MenuItem>
                    <MenuItem value={Activity.SlapTargets}>Slap the board - targets</MenuItem>
                    <MenuItem value={Activity.StickyCollage}>Sticky ball - collage</MenuItem>
                    <MenuItem value={Activity.StickyTargets}>Sticky ball - targets</MenuItem>
                    <MenuItem value={Activity.Charades}>Charades</MenuItem>
                </Select>
            </>
      )
    case 'Controlled practice':
      return (
            <>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    onChange={(e) => { func(e, id, 'name') }}
                >
                    <MenuItem value={Activity.Wordsearch}>Wordsearch</MenuItem>
                    <MenuItem value={'Worksheet'}>Worksheet</MenuItem>
                    <MenuItem value={'Worksheet'}>Worksheet</MenuItem>
                </Select>
            </>
      )
    case 'Semi-controlled practice':
      return (
            <>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    onChange={(e) => { func(e, id, 'name') }}
                >
                    <MenuItem value={Activity.Wordsearch}>Wordsearch</MenuItem>
                </Select>
            </>
      )
    case 'Freer practice':
      return (
            <>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    onChange={(e) => { func(e, id, 'name') }}
                >
                    <MenuItem value={10}>Freer practice</MenuItem>
                </Select>
            </>
      )
    case 'Other':
      return (
                <>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={name}
                        label="Name"
                        onChange={(e) => { func(e, id, 'name') }}
                    >
                        <MenuItem value={Activity.Intro}>intro song</MenuItem>
                        <MenuItem value={Activity.Song1}>Song/video 1</MenuItem>
                        <MenuItem value={Activity.Song2}>Song/video 2</MenuItem>
                        <MenuItem value={Activity.Song3}>Song/video 3</MenuItem>
                        <MenuItem value={Activity.Cleanup}>cleanup song</MenuItem>
                        <MenuItem value={Activity.Goodbye}>Goodbye song</MenuItem>
                        <MenuItem value={Activity.Rules}>Rules</MenuItem>
                        <MenuItem value={Activity.HowAreYou}>How are you warmup?</MenuItem>
                    </Select>
                </>
      )
    default:
      return (<></>)
  }
}
