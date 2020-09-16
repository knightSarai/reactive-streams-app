import React, {createContext} from 'react';
import moodReducer from '../reducers/mood.reducer';
import {useLocalStorageReducer} from '../hooks/useLocalStorageReducer';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


export const MoodContext = createContext();

export const MainProvider = (props) => {
    const [mood, dispatch] = useLocalStorageReducer('mood', {isDarkMood: false}, moodReducer);
    const theme = createMuiTheme({
        palette: {
          type: mood.isDarkMood ? "dark" : "light" ,
          primary: {
            main: mood.isDarkMood? '#283149' : "#f73859",
          },
          secondary: {
            light: mood.isDarkMood? '#f85f73' : "#4791db",
            main: mood.isDarkMood?"#f73859" : "#283149",
          }
        }
      });
    return (
        <MoodContext.Provider value={{mood, dispatch}}>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </MoodContext.Provider>
    )
}

