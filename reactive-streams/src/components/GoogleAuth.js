import React, {Component} from 'react';
import {connect } from 'react-redux';
import {signIn, signOut} from '../actions';
import {Button} from '@material-ui/core';
import GoogleIcon from '../icons/Googlecon'

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
                scope: 'email',
                prompt: "select_account"
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
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
                userId: this.auth.currentUser.get().getBasicProfile().getId(),
                userName:  this.auth.currentUser.get().getBasicProfile().getName(),
            });
        } else {
            this.props.signOut(
                this.auth
            );
        }
    }

    onSignInClick(){
        this.auth.signIn();
    };

    onSignOutClick() {
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
        auth: state.auth.auth,
        isSignedIn: state.auth.isSignedIn,
        userName: state.auth.userName
    }
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);

//*https://accounts.google.com/o/oauth2/auth?redirect_uri=storagerelay%3A%2F%2Fhttp%2Flocalhost%3A3000%3Fid%3Dauth532126&response_type=permission id_token&scope=email profile openid&openid.realm=&client_id=60471022609-59kkholm574cik7bigaicu6uugpam3d2.apps.googleusercontent.com&ss_domain=http%3A%2F%2Flocalhost%3A3000&fetch_basic_profile=true&gsiwebsdk=2