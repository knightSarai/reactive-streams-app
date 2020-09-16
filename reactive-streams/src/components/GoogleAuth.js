import React, {Component} from 'react';
import {connect } from 'react-redux';
import {signIn, signOut} from '../actions';
import {Button, SvgIcon} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
    icon: {
        margin: theme.spacing(2),
        width: 24,
        height: 24  
      }
})
)

function GoogleIcon(props) {
    const classes = useStyle();
    return (
        <SvgIcon {...props} viewBox="0 0 24 24" className={classes.icon}>
            <path 
                d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
            />
        </SvgIcon>
    )
}

class GoogleAuth extends Component{
    constructor(props) {
        super(props);
        this.auth = {};
        /* Methods binding */
        this.onAuthChange = this.onAuthChange.bind(this);
        this.onSignInClick = this.onSignInClick.bind(this);
        this.onSignOutClick = this.onSignOutClick.bind(this);
    }
    componentDidMount() {
        window.gapi.load('client:auth2', ()=> {
            window.gapi.client.init({
                clientId: "60471022609-59kkholm574cik7bigaicu6uugpam3d2.apps.googleusercontent.com",
                scope: 'email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })

        });
    }
    
    // this function get call with boolean value that indecat if user logged in or not
    /*onAuthChange () {
        this.setState({isSignedIn: this.auth.isSignedIn.get()});
        this.state.isSignedIn && this.setState({ userName:  this.auth.currentUser.get().getBasicProfile().getName()});
        !this.state.isSignedIn && this.setState({ userName:  ""});
    };
    so, instead
    */
   /* we write this */
    onAuthChange(isSignedIn) {
        if (isSignedIn) {
            this.props.signIn({
                userId: this.auth.currentUser.get().getBasicProfile().getName(),
                userName:  this.auth.currentUser.get().getBasicProfile().getName()
            });
        } else {
            this.props.signOut();
        }
    }

    onSignInClick (){
        this.auth.signIn();
    };

    onSignOutClick () {
        this.auth.signOut();
    };

    renderAuthButton = () => {
        const {isSignedIn, userName} = this.props;
        if (isSignedIn === null) {
            return ''    
        } else if (isSignedIn) {
        return <Button color="inherit" onClick={this.onSignOutClick}>{userName}, Sign out</Button>
        } else {
            return <Button color="inherit" onClick={this.onSignInClick}><GoogleIcon />Sign in</Button>
        }
    }

    render() {
        return (
            this.renderAuthButton()
        )   
    }
    
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userName: state.auth.userName
    }
}

export default connect (mapStateToProps, {signIn, signOut})(GoogleAuth);