import React, {Component} from 'react';
import {connect } from 'react-redux';
import {signIn, signOut, initOath} from '../actions';
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
                const {initOath} = this.props;
                initOath({oauth: window.gapi.auth2.getAuthInstance()})
                this.onAuthChange(this.props.oauth.isSignedIn.get());
                this.props.oauth.isSignedIn.listen(this.onAuthChange);
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
                userId: this.props.oauth.currentUser.get().getBasicProfile().getId(),
                userName:  this.props.oauth.currentUser.get().getBasicProfile().getName(),
            });
        } else {
            this.props.signOut();
        }
    }

    onSignInClick(){
        
        this.props.oauth.signIn();
    };

    onSignOutClick() {
        this.props.oauth.signOut();
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
        oauth: state.auth.oauth,
        isSignedIn: state.auth.isSignedIn,
        userName: state.auth.userName
    }
}

export default connect(mapStateToProps, {signIn, signOut, initOath})(GoogleAuth);

//*https://accounts.google.com/o/oauth2/auth?redirect_uri=storagerelay%3A%2F%2Fhttp%2Flocalhost%3A3000%3Fid%3Dauth532126&response_type=permission id_token&scope=email profile openid&openid.realm=&client_id=60471022609-59kkholm574cik7bigaicu6uugpam3d2.apps.googleusercontent.com&ss_domain=http%3A%2F%2Flocalhost%3A3000&fetch_basic_profile=true&gsiwebsdk=2