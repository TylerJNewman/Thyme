import {extendTheme, theme as baseTheme} from '@chakra-ui/react'
import '@fontsource/inter/variable.css'
import 'focus-visible/dist/focus-visible'
import * as components from './components'
import * as foundations from './foundations'

const colors = {
  green: {
    '50': '#F0F5F1',
    '100': '#D4E2D9',
    '200': '#B9D0C1',
    '300': '#9DBEA8',
    '400': '#82AB90',
    '500': '#669978',
    '600': '#527A60',
    '700': '#3D5C48',
    '800': '#293D30',
    '900': '#141F18',
  },
  yellow: {
    '50': '#FCF7E8',
    '100': '#F8EABF',
    '200': '#F3DC95',
    '300': '#EFCE6C',
    '400': '#EAC043',
    '500': '#E6B219',
    '600': '#B88F14',
    '700': '#8A6B0F',
    '800': '#5C470A',
    '900': '#2E2405',
  },
  blue: {
    '50': '#ECF5F9',
    '100': '#CAE4ED',
    '200': '#A7D2E1',
    '300': '#85C1D6',
    '400': '#63AFCA',
    '500': '#409EBF',
    '600': '#337E99',
    '700': '#265F73',
    '800': '#1A3F4C',
    '900': '#0D2026',
  },
}

export const theme = extendTheme({
  ...foundations,
  components: {...components},
  colors: {...baseTheme.colors, brand: baseTheme.colors.yellow, ...colors},
  styles: {
    ...baseTheme.styles,
    global: {
      ...baseTheme.styles.global,
      body: {
        bg: 'yellow.50',
      },
    },
  },
  space: {
    '4.5': '1.125rem',
  },
})
