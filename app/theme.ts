import { type ThemeOptions } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#9ba88d',
      contrastText: '#262a2b'
    },
    secondary: {
      main: '#a7d6bd'
    },
    background: {
      default: '#9ba88d',
      paper: '#9ba88d'
    },
    text: {
      primary: '#262a2b',
      secondary: '#262a2b',
      disabled: 'rgba(38,42,43,0.49)'
    }
  },
  typography: {
    h1: {
      fontWeight: 800
    },
    fontFamily: 'Open Sans',
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
}

export default createTheme(themeOptions)
