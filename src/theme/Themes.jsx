import { createTheme } from "@mui/material";
import DEFAULT_THEME_JSON from './DefaultTheme.json';
import DARK_THEME_JSON from './DarkTheme.json';

export const THEME_LIGHT = "light";
export const THEME_DARK = "dark";

export const defaultTheme = createTheme({}, DEFAULT_THEME_JSON);

export const darkTheme = createTheme({}, DARK_THEME_JSON);
