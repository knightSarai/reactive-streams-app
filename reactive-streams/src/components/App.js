import React from 'react';
import {Route, Switch} from 'react-router-dom';
import StreamShow from './streams/StreamShow';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';


import { MainProvider } from '../context/main.context';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container } from '@material-ui/core/';

import Nav from './Nav'

import './App.css'
const rootFont = "'Roboto', sans-serif"
const useStyle = makeStyles({
    root: {
        fontFamily: rootFont,
        margin: 0,
        padding:0,
    },
    papper: {
        height: "100vh"
    }
});

export default function App() {
    const classes = useStyle()
    return (
        <MainProvider>
            <Paper className={classes.papper}>
            <div className={classes.root}>
                <Nav/>
                <Container>
                    <Switch>
                        <Route path="/" exact component={StreamList}/>
                        <Route path="/streams/new" exact component={StreamCreate}/>
                        <Route path="/streams/edit" exact component={StreamEdit}/>
                        <Route path="/streams/delete" exact component={StreamDelete}/>
                        <Route path="/streams/show" exact component={StreamShow}/>
                    </Switch>
                </Container> 
            </div>
        </Paper>
        </MainProvider>
        
    )
}

