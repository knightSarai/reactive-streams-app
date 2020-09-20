import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import {fetchStream} from '../../actions'

function StreamShow(props) {
    const {match, fetchStream, stream} = props;
    
    useEffect(()=> {
        const {id} = match.params
        fetchStream(id)
    }, [match, fetchStream]);

    if (!stream) {
        return <h1>Loading..</h1>
    }
    return (
        <div>
            Stream {stream.id}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps.match.params;
    return {
        stream: state.streams[id], 
        isSignedIn: state.auth.isSignedIn, 
        oauth: state.auth.oauth
    };
}

export default connect(mapStateToProps, {fetchStream})(StreamShow)
