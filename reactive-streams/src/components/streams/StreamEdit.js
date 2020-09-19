import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions'

function StreamEdit(props) {
    const {match, fetchStream, stream} = props;
    useEffect(()=> {
        const {id} = match.params;
        fetchStream(id)
    }, [match, fetchStream])

    if(!stream) {
        return <div>Loading...</div>
    }
    return (
        <div>
            {stream.title}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps.match.params;
    return {stream: state.streams[id]}
}

export default connect(mapStateToProps, {fetchStream})(StreamEdit);