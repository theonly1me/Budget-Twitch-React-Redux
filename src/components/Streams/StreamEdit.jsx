import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { updateStream, fetchStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = props => {
  const {
    match: {
      params: { id },
    },
  } = props;

  useEffect(() => {
    props.fetchStream(id);
  }, []);

  const onSubmit = formValues => {
    props.updateStream(id, formValues);
  };

  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        initialValues={_.pick(props.stream, 'title', 'description')}
        onSubmit={onSubmit}
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
    //I'm an idiot for doing this
    // stream: Object.values(state.streams).find(stream => stream?.id === +id),
    //when I could've done this
    stream: state.streams[id],
  };
};

export default connect(mapStateToProps, { fetchStream, updateStream })(
  StreamEdit
);
