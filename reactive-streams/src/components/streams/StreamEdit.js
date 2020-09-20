import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchStream, editStream} from '../../actions';
import StreamForm from './StreamForm';
import { Button} from '@material-ui/core';
import GoogleIcon from '../../icons/Googlecon';
import { makeStyles } from '@material-ui/styles';
import _ from "lodash";

const styles = makeStyles(theme=>({
    root: {
        textAlign: "center",
        marginTop: "2rem"
        
    },
    button: {
      margin: "1rem"
    }
  }));

function StreamEdit(props) {
    const classes = styles()
    const {match, fetchStream, editStream, stream, isSignedIn, oauth} = props;

    useEffect(()=> {
        const {id} = match.params;
        fetchStream(id);
    },
        [match, fetchStream]
    )

    const onSubmit = (formValues) => {
        const {id} = match.params;
        editStream(id, formValues)
    }

    const renderSignIn = () => {
        return (
            <div className={classes.root}>
                <h1>Please login to edite the stream</h1>
                <Button color="primary" variant="contained" onClick={() => oauth.signIn()}><GoogleIcon />Sign in</Button>
            </div> 
        )
    }

    const renderForm = () => {
        return (
            <StreamForm 
                initialValues={_.pick(stream, 'title', 'description')}
                formHeader="Edit stream" 
                onSubmit={onSubmit}
            />
        )
    }

    if(!stream && !isSignedIn) {
        return <div>Loading...</div>
    }
    
    if(isSignedIn) {
        return renderForm()
    } else {
        return renderSignIn()
    }
}

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps.match.params;
    return {
        stream: state.streams[id], 
        isSignedIn: state.auth.isSignedIn, 
        oauth: state.auth.oauth
    };
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);