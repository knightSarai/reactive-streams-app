import React, {Component, createRef} from 'react';
import flv from 'flv.js';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions'

class StreamShow extends Component {
    constructor(props) {
        super(props);
        this.videoRef = createRef()
    }

    componentDidMount() {
        const {match, fetchStream} = this.props;
        const {id} = match.params;
        fetchStream(id);
        this.buildPlayer();
    }
    
    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer = () => {
        const {stream, match} = this.props;
        const {id} = match.params;
        if (this.player || !stream) {
            return;
        }
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load()
    }
    
    render() {
        const {stream} = this.props;
        if (!stream) {
            return <h1>Loading..</h1>
        }
        return (
            <div style={{marginTop: "1rem"}}>
                <video 
                    ref={this.videoRef} 
                    style={{width: "100%", height: "85vh"}} 
                    controls
                />
                <h1>Stream {stream.title}</h1>
            </div>
        )
    }
   
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
