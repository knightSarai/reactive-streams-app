import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import {fetchStreams} from '../../actions/';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
    marginTop: "2rem"
    },
    list:{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)"
    },
    inline: {
      display: 'inline',
    },
    avatar: {
        background: "#fff"
    },
    streamLinkes : {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "100%",
        "& .link": {
            margin: "0.5rem 1px 0px 1px",
            color: `${theme.palette.linkColor.main}`
        }
    }
  }));

const StreamList = ({currentUserId, fetchStreams, streams}) =>{
    const classes = useStyles();
    useEffect(()=>{
        fetchStreams();
    },[fetchStreams]);

    const renderAdmin = (stream) => {
        if (stream.userId && stream.userId === currentUserId) {
            return (
            <div className={classes.streamLinkes}>
                <Link
                    component="button"
                    variant="body2"
                    className="link"
                >
                    Edit
                </Link>
                <Link
                    component="button"
                    variant="body2"
                    className="link"
                >
                    Delete
                </Link>
            </div>
            )
        }
    }

    const renderList = () => {
        return streams.map(stream => (
            <Grid item xs={12} sm={6} lg={4} key={stream.id}>
                <ListItem >
                    <ListItemAvatar>
                        <OndemandVideoIcon  fontSize="large"/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={stream.title}
                        secondary= {
                            <React.Fragment>
                                {stream.description}
                            </React.Fragment>
                        }
                    />
                    {renderAdmin(stream)}
                </ListItem>
            </Grid>
            
        ))
    }

    return (
        <React.Fragment>
            <Typography variant="h4"  className={classes.root}>
                Streams
            </Typography>
            <List >
            <Grid container spacing={4}>
                {renderList()}
            </Grid>
            </List>
        </React.Fragment >
        
    )
}

const mapStateToProps = (state) => {
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);

