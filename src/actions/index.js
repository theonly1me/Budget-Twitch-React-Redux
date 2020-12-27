import streams from '../APIs/streams';
import browserHistory from '../history';

//Action Creators
export const signIn = userId => {
  return {
    type: 'SIGN_IN',
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT',
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });
  dispatch({
    type: 'CREATE_STREAM',
    payload: response.data,
  });
  //programmatic routing to stream List
  browserHistory.push('/');
};

export const fetchStreams = () => async (dispatch, getState) => {
  const response = await streams.get('/streams');
  dispatch({
    type: 'FETCH_STREAMS',
    payload: response.data,
  });
};

export const fetchStream = id => async (dispatch, getState) => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({
    type: 'FETCH_STREAM',
    payload: response.data,
  });
};

export const deleteStream = id => async (dispatch, getState) => {
  await streams.delete(`/streams/${id}`);
  dispatch({
    type: 'DELETE_STREAM',
    payload: id,
  });
  browserHistory.push('/');
};

export const updateStream = (id, formValues) => async (dispatch, getState) => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({
    type: 'UPDATE_STREAM',
    payload: response.data,
  });
  //programmatic routing to stream List
  browserHistory.push('/');
};
