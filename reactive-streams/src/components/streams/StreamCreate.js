import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createStream} from '../../actions';
import StreamForm from './StreamForm';
import { Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import GoogleIcon from '../../icons/Googlecon';

const styles = {
    root: {
        textAlign: "center",
        marginTop: "2rem"
        
    },
    button: {
      margin: "1rem"
    }
  };

class StreamCreate extends Component {
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    renderForm = () => {
        return (
            <StreamForm formHeader="Create a new stream" onSubmit={this.onSubmit}/>
        )
    }

    renderSignIn = (classes) => {
        return (
            <div className={classes.root}>
                <h1>Please login to add new stream</h1>
                <Button color="primary" variant="contained" onClick={() => this.props.oauth.signIn()}><GoogleIcon />Sign in</Button>
            </div> 
        )
    }

    render() {
        const {classes, isSignedIn} = this.props;
        return (
            isSignedIn ? 
            this.renderForm() : 
            this.renderSignIn(classes)
        )
        
    }
}


const mapStateToProps = state => {
    return {isSignedIn: state.auth.isSignedIn, oauth: state.auth.oauth}
}


const componentStyled = withStyles(styles)(StreamCreate);

export default connect(mapStateToProps, {createStream})(componentStyled) ;