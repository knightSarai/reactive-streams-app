import React from 'react';
import {withRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core/';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import QueueIcon from '@material-ui/icons/Queue';
import {
    Drawer as MUIDrawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText    
} from '@material-ui/core';


const useStyles = makeStyles({
    drawerTitle: {
        marginTop: "1rem",
        paddingBottom: "0.55rem",
        textAlign: "center",
        fontSize: "1.2rem",
    },
    list: {
        width: "180px",
    },
    lestItem: {
        display: "flex"
    }
})


function Drawer(props) {
    const {history, DrawerOpen, toggleDrawer} = props;
    const classes = useStyles();
 
    const onToggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        toggleDrawer(!DrawerOpen)
    }
    const renderedList = [
        {
            text: "Streams",
            icon: <MovieCreationIcon/>,
            onClick: () => {
                history.push('/')
            }
        },
        {
            text: "New Stream",
            icon: <QueueIcon/>,
            onClick: () => {
                history.push('/streams/new')
            }
        },
    ]
    return (
        <div className="">
            <MUIDrawer 
                open={DrawerOpen}
                onClick={onToggleDrawer}
            >
                <Typography variant="subtitle2" className={classes.drawerTitle} color="secondary">
                    Reactive Streams
                </Typography>
                <Divider/>
                <List className={classes.list}  >
                    {
                        renderedList.map((item) => {
                            const {text, icon, onClick} = item;
                            return (
                                <ListItem className={classes.listItem} button key={text} onClick={onClick}>
                                    <ListItemIcon >{icon && icon}</ListItemIcon>
                                    <ListItemText  primary={text} />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </MUIDrawer>
        </div>
        
    )
}

export default withRouter(Drawer);