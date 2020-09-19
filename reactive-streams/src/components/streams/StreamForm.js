import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {TextField, Button, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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

class StreamForm extends Component {
    renderErr = ({error, touched}) =>{
        if (touched && error) {
            return [true, error]
        }else {
            return [false, null]
        }
    }

    renderInput = ({input, className, meta}) => {
        /*input has props, such as onChange */
        let {value} = input;
        input = {...input, value: value.trimStart()}
        const [isError, errMsg] = this.renderErr(meta);

        return <TextField error={isError} helperText={errMsg} {...input} label={input.name} className={className}/>
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    renderForm = () => {
        const {classes, handleSubmit, formHeader} = this.props;
        return (
            <form  onSubmit={handleSubmit(this.onSubmit)}  className={classes.root}>
                <Typography variant="h5">{formHeader}</Typography>
                <Field name="title" component={this.renderInput} className={classes.textField}/>
                <br/>
                <Field name="description" component={this.renderInput}/>
                <br/>
                <Button type="submit" variant="contained" color="primary" className={classes.button} >Submit</Button>
            </form>
        )
    }


    render() {
        return (
            this.renderForm()
        )
    }
}

const formWrapped = reduxForm({
    form: 'StreamForm',
    validate
    }
)(StreamForm);

const componentStyled = withStyles(styles)(formWrapped);

export default componentStyled ;