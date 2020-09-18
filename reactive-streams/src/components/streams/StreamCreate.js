import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createStream} from '../../actions';
import {Field, reduxForm} from 'redux-form';
import {TextField, Button, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import GoogleIcon from '../../icons/Googlecon';
import {validate} from '../../helpers/validate';

const styles = {
    root: {
        textAlign: "center",
        marginTop: "2rem"
        
    },
    button: {
      margin: "1rem"
    },
    textField: {
        margin: "0.7rem"
    }
  };

class StreamCreate extends Component {
    renderErr = ({error, touched}) =>{
        if (touched && error) {
            return [true, error]
        }else {
            return [false, null]
        }
    }

    renderInput = ({input, className, meta}) => {
        /*input has props, such as onChange */
        const [isError, errMsg] = this.renderErr(meta);
        return <TextField error={isError} helperText={errMsg} {...input} label={input.name} className={className}/>
    }

    onSubmit = (formValues) => {
        this.props.createStream(formValues)
    }

    renderForm = (classes, handleSubmit) => {
        return (
            <form  onSubmit={handleSubmit(this.onSubmit)}  className={classes.root}>
                <Typography variant="h5">Create new stream</Typography>
                <Field name="title" component={this.renderInput} className={classes.textField}/>
                <br/>
                <Field name="description" component={this.renderInput}/>
                <br/>
                <Button type="submit" variant="contained" color="primary" className={classes.button} >Submit</Button>
            </form>
        )
    }

    renderSignIn = (classes) => {
        return (
            <div className={classes.root}>
                <h1>Please login to add new stream</h1>
                <Button color="primary" variant="contained" onClick={this.onSignOutClick}><GoogleIcon />Sign in</Button>
            </div> 
        )
    }

    render() {
        const {classes, handleSubmit, isSignedIn} = this.props;
        return (
            isSignedIn ? 
            this.renderForm(classes, handleSubmit) : 
            this.renderSignIn(classes)
        )
        
    }
}


const mapStateToProps = state => {
    return {isSignedIn: state.auth.isSignedIn}
}

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate
    }
)(StreamCreate);

const componentStyled = withStyles(styles)(formWrapped);

export default connect(mapStateToProps, {createStream})(componentStyled) ;