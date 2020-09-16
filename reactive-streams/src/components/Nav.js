import React, {useContext} from 'react';
import {MoodContext} from '../context/main.context';
import { makeStyles } from '@material-ui/core/styles';

import useToggleDrawer from '../hooks/useToggleState';

import {AppBar, Toolbar, Typography, IconButton, Switch} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from './Drawer'
import GoogleAuth from './GoogleAuth'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
      display: "flex"
  }
}));

export default function Appbar(props) {
  const classes = useStyles();
  const {mood, dispatch} = useContext(MoodContext);
  const {isDarkMood} = mood;
  const onSelectChange = () => {
    dispatch({
      type: 'TOGGLE',
      payload: {
        isDarkMood: !isDarkMood
      }
    })
  }
  const [DrawerOpen, toggleDrawer] = useToggleDrawer(false);

  return (
    <div className={classes.root}>
        <Drawer className={classes.drawer} DrawerOpen={DrawerOpen} toggleDrawer={toggleDrawer}/>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=> toggleDrawer(!DrawerOpen)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Reactive Streams
            </Typography>
            <Switch checked={isDarkMood} onChange={onSelectChange}/>
            <GoogleAuth/>
          </Toolbar>
        </AppBar>
    </div>
  );
}