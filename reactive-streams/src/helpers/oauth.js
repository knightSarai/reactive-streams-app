export default () => {
    let auth;
    const onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn({
                userId: auth.currentUser.get().getBasicProfile().getId(),
                userName:  auth.currentUser.get().getBasicProfile().getName()
            });
        } else {
            props.signOut();
        }
    }

    const init =  () => {
        window.gapi.load('client:auth2', ()=> {
            window.gapi.client.init({
                clientId: "60471022609-59kkholm574cik7bigaicu6uugpam3d2.apps.googleusercontent.com",
                scope: 'email',
                prompt: "select_account"
            })
            .then(() => {
                auth = window.gapi.auth2.getAuthInstance();
                onAuthChange(auth.isSignedIn.get());
                auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    init()
    return {auth, onAuthChange}
}


