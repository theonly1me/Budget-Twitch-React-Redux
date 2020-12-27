import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = props => {
  const {
    match: {
      params: { id },
    },
  } = props;

  useEffect(() => {
    props.fetchStream(id);
  }, []);

  const { title, description } = props.stream;

  return (
    <div>
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
