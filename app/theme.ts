import { type ThemeOptions } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#9ba88d',
      contrastText: 'rgba(255,255,255,0.87)'
    },
    secondary: {
      main: '#9ba88d'
    },
    background: {
      default: '#282a2b',
      paper: '#282a2b'
    },
    text: {
      primary: '#9ba88d',
      secondary: '#9ba88d',
      disabled: 'rgba(155,168,141,0.95)'
    }
  }
}
export default createTheme(themeOptions)
