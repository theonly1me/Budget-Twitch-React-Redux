import React from 'react';
import Modal from '../modal';
import browserHistory from '../../history';
import { connect } from 'react-redux';

import { deleteStream } from '../../actions';

const StreamDelete = props => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const actions = (
    <>
      <button
        onClick={() => props.deleteStream(id)}
        className="ui button negative"
      >
        Delete
      </button>
      <button onClick={() => browserHistory.push('/')} className="ui button">
        Cancel
      </button>
    </>
  );
  return (
    <div>
      StreamDelete
      <Modal
        title="Delete Stream"
        content={`Are you sure you want to delete the ${props.stream?.title} stream?`}
        actions={actions}
        onDismiss={() => browserHistory.push('/')}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { id },
    },
  } = ownProps;

  return {
    stream: state.streams[id],
  };
};

export default connect(mapStateToProps, { deleteStream })(StreamDelete);
