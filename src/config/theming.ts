import { createTheme } from '@mui/material';

export const colors = {
  primary: {
    main: '#113270',
  },
  secondary: {
    main: '#a61f3b',
  },
  tertiary: {
    main: '#704f11',
  },
  text: {
    primary: '#113270',
    secondary: '#434343',
  },
  background: '#fffdfd',
  blue: '#113270',
  red: '#a61f3b',
  yellow: '#F8BF4B',
  palettes: {
    primary: {
      50: '#e5e9f1',
      100: '#bec7dd',
      200: '#95a3c5',
      300: '#6c80ae',
      400: '#4c659f',
      500: '#294c90',
      600: '#234588',
      700: '#193c7c',
      800: '#113270',
      900: '#052259',
    },
    secondary: {
      50: '#fae2e6',
      100: '#f2b7c1',
      200: '#e88998',
      300: '#dd5d72',
      400: '#d34057',
      500: '#c9293f',
      600: '#ba243e',
      700: '#a61f3b',
      800: '#931938',
      900: '#701132',
    },
    tertiary: {
      50: '#fde8bf',
      100: '#e5c69c',
      200: '#c5a376',
      300: '#a2814f',
      400: '#896731',
      500: '#704f11',
      600: '#66450b',
      700: '#583903',
      800: '#4c2b00',
      900: '#3f1d00',
    }
  },
  beige: '#F5E8DB',
  lightBeige: '#FEFAF2',
  backgroundPrimary: '#F5E8DB',
  darkSecondary: '',
  lightSecondary: '',
  black: '#000000',
  white: '#ffffff',
  'white-two': 'rgba(255,252,248,0.41)',
  'lightgrey-one': '#f5f5f5',
  'lightgrey-two': '#efeded',
  lightgreyE: '#eee',
  'grey-one': '#8c8c8c',
  success: '#33cc33',
};

export const theme = createTheme({
  palette: {
    primary: {
      ...colors.primary,
    },
    secondary: {
      ...colors.secondary,
    },
    text: {
      ...colors.text,
    },
  },
});
