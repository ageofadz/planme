// /* eslint-disable react/react-in-jsx-scope */
// import { Checkbox, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material'
// import MenuItem from '@mui/material/MenuItem'
// import Select from '@mui/material/Select'

// export default function getOptionsForItem (
//   category: string,
//   name: string,
//   id: string,
//   func: Function
// ) : React.JSX.Element {
//   switch (name) {
//     case 'Grass skirts':
//       return (
//             <>
//                 <FormGroup>
//                     <FormControlLabel control={<Switch defaultChecked onChange={(e) => func(e, id, name)} />} label="Generate handout" />
//                 </FormGroup>
//             </>
//       )
//     case 'Vocab bingo':
//       return (
//             <>
//                 <FormGroup>
//                     <FormControlLabel control={<Switch defaultChecked onChange={(e) => func(e, id, 'name')} />} label="Generate handout" />
//                 </FormGroup>
//             </>
//       )
//     case 'Hot potato':
//       return (
//             <>
//                     <TextField placeholder="Timer URL" onChange={(e) => func(e, id, 'name')} />
//             </>
//       )
//     case 'Song':
//       return (
//             <>
//                     <TextField placeholder="Song URL" onChange={(e) => func(e, id, 'name')} />
//             </>
//       )
//     case 'Dragon drilling':
//       return (
//             <>
//                     <TextField placeholder="Dragon picture URL" onChange={(e) => func(e, id, 'name')} />
//             </>
//       )
//     case 'Rules':
//       return (
//             <>
//             <FormGroup>
//                 <FormControlLabel control={<Checkbox defaultChecked />} label="Listen to the teacher" />
//                 <FormControlLabel control={<Checkbox defaultChecked />} label="Sit nicely" />
//                 <FormControlLabel control={<Checkbox defaultChecked />} label="Speak English" />
//                 <FormControlLabel control={<Checkbox defaultChecked />} label="Raise your hand" />
//                 <FormControlLabel control={<Checkbox defaultChecked />} label="Be nice" />
//                 <FormControlLabel control={<Checkbox defaultChecked />} label="Try your best" />
//                 <FormControlLabel control={<Checkbox defaultChecked />} label="Five stars, sticker" />
//             </FormGroup>
//             </>
//       )
//     case 'Slap the board':
//       return (
//             <>
//             <FormGroup>
//                 <FormControlLabel control={<Switch defaultChecked onChange={(e) => func(e, id, 'name')}/>} label="All TL on board at once" />
//             </FormGroup>
//             </>
//       )
//     case 'Sticky ball':
//       return (
//             <>
//             <FormGroup>
//                 <FormControlLabel control={<Switch defaultChecked onChange={(e) => func(e, id, 'name')}/>} label="All TL on board at once" />
//             </FormGroup>
//             </>
//       )
//     default:
//       return (<></>)
//   }
// }
