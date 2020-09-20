 import React, {useEffect} from 'react';
 import {connect} from 'react-redux';
 import {fetchStream, deleteStream} from '../../actions';
 import  useToggleOpen from '../../hooks/useToggleState';
 import history from '../../helpers/history'
 import Modal from '../Modal';
 import { makeStyles } from '@material-ui/core/styles';
 import GoogleIcon from '../../icons/Googlecon';
import Button from '@material-ui/core/Button';
 
 const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        marginTop: "2rem"
    },
    button: {
        margin: "1rem"
    },
    error: {
        background: `${theme.palette.error.main}`
    },
    neutral: {
        background: `${theme.palette.neutral.main}`
    }
  }));

const StreamDelete = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useToggleOpen(true);
    const {match, fetchStream, deleteStream, stream, isSignedIn, oauth} = props;

    useEffect(()=> {
        const {id} = match.params;
        fetchStream(id);
    },
        [match, fetchStream]
    )

    const renderContent = () => {
        if(!stream) {
            return "Are you sure you want to delete this stream?"
        }
        return `"Are you sure you want to delete this stream with title: ${stream.title}?"`
    }

    const onDismiss = () => {
        history.push("/")
    }
    const actions = () => {
        const {id} = props.match.params;
        return (
        <div>        
            <Button onClick={()=> deleteStream(id)} type="submit" variant="contained"  className={`${classes.button} ${classes.error}`} >
              Delete
            </Button>
            <Button type="submit" variant="contained"  className={`${classes.button} ${classes.neutral}`} onClick={onDismiss}>
              Cancel
            </Button>
         </div>
    )}

    const renderModal = (
        <Modal 
                title="Delete Stream"
                description={renderContent()}
                actions = {actions()}
                open={open}
                setOpen={setOpen}
                onDismiss= {onDismiss}
            />
    )
    const renderSignIn = (
            <div className={classes.root}>
                <h1>Please login to add new stream</h1>
                <Button color="primary" variant="contained" onClick={oauth.signIn}><GoogleIcon />Sign in</Button>
            </div> 
        )
    return (
        <div className={classes.root} onClick={onDismiss}>
            {isSignedIn?
            renderModal:
            renderSignIn}
        </div>
    
  );
}

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps.match.params;
    return {
        stream: state.streams[id], 
        isSignedIn: state.auth.isSignedIn, 
        oauth: state.auth.oauth
    };
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);