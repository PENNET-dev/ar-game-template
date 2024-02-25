import { GlobalStyles, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { createContext, useEffect, useReducer, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IconContext } from 'react-icons';
import { BrowserRouter } from 'react-router-dom';
import { AppShell } from './AppShell';
import { SnackbarAction } from './common/utility/SnackbarAction';
import { propUpdateReducer } from './common/utility/propUpdateReducer';
import { getStorageValue, setStorageValue } from './common/utility/useLocalStorage';
import { THEME_DARK, darkTheme, defaultTheme, THEME_LIGHT } from './theme/Themes';

import './App.css';

export const AppContext = createContext({
});

const initializer = () => {
  return {
    theme: getStorageValue("theme", THEME_LIGHT)
  };
};

function App() {
  const [globalState, globalDispatch] = useReducer(propUpdateReducer, {}, initializer);
  const [topNavigationComponent, setTopNavigationComponent] = useState(null);

  useEffect(() => {
    setStorageValue("theme", globalState?.theme);
  }, [globalState?.theme]);

  return (
    <AppContext.Provider
      value={{
        globalState: globalState, globalDispatch: globalDispatch,
        topNavigationComponent, setTopNavigationComponent
      }}
    >
      {globalState?.theme == THEME_DARK &&
        <GlobalStyles
          styles={{
            body: { backgroundColor: darkTheme.palette.background.default }
          }}
        />
      }
      {globalState?.theme != THEME_DARK &&
        <GlobalStyles
          styles={{
            body: { backgroundColor: defaultTheme.palette.background.default }
          }}
        />
      }
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={globalState?.theme == THEME_DARK ? darkTheme : defaultTheme}>
          <IconContext.Provider value={{ className: 'react-icons', size: 'auto' }}>
            <SnackbarProvider maxSnack={3} autoHideDuration={4000} disableWindowBlurListener={true}
              action={(id) => (
                <SnackbarAction id={id} />
              )}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <HelmetProvider>
                <BrowserRouter>
                  <AppShell />
                </BrowserRouter>
              </HelmetProvider>
            </SnackbarProvider>
          </IconContext.Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </AppContext.Provider>
  );
}

export default App;
