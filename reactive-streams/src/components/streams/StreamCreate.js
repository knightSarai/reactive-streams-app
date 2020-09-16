import React, { Component } from 'react';
import {Field, formValues, reduxForm} from 'redux-form';
import {TextField, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

    onSubmit(formValues) {
        console.log(formValues);
    }

    render() {
        const {classes, handleSubmit} = this.props
        return (
            <form  onSubmit={handleSubmit(this.onSubmit)}  className={classes.root}>
                <Field name="title" component={this.renderInput} className={classes.textField}/>
                <br/>
                <Field name="description" component={this.renderInput}/>
                <br/>
                <Button type="submit" variant="contained" color="primary"className={classes.button} >Submit</Button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = "You must enter the title";
    }
    if (!formValues.description) {
        errors.description = "You must enter a description"
    }
    return errors;
}

export default withStyles(styles)(reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate));