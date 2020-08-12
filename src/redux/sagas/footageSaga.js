import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "ADD_FOOTAGE" actions
function* postFootage(action) {
  try {
    //update the user email in database/server
    yield axios.post('/api/footage', action.payload);
    // get the newly updated user data
    yield put({ type: 'FETCH_FOOTAGE' });
  } catch (error) {
      console.log('Error with category get:', error);
  }
}


function* footageSaga() {
  yield takeLatest('ADD_FOOTAGE',postFootage);

}

export default footageSaga;