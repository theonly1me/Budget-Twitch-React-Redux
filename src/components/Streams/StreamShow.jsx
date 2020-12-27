import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js';

const StreamShow = props => {
  const videoRef = useRef(null);

  const {
    match: {
      params: { id },
    },
  } = props;

  useEffect(() => {
    props.fetchStream(id);
    const player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });
    player.attachMediaElement(videoRef.current);
    player.load();

    return () => {
      player.unload();
    };
  }, []);

  const title = props.stream?.title;
  const description = props.stream?.description;

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} controls />
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { id },
    },
  } = ownProps;

  return { stream: state.streams[id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
