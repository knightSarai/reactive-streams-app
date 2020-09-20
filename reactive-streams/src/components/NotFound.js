import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles(theme=>({
    root: {
        textAlign: "center",
        marginTop: "2rem"
        
    }
  }));

export default function NotFound() {
    const classes = styles();
    return (
        <div>
            <Typography variant="h1" className={classes.root}>
                Page Not Found :(
            </Typography>
        </div>
    )
}
