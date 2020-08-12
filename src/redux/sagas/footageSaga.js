import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "ADD_FOOTAGE" actions
function* postFootage(action) {
  try {
    //add new footage to the user_footage table
    yield axios.post('/api/footage', action.payload);
    // get the newly updated user footage rows
    yield put({ type: 'FETCH_FOOTAGE' });
  } catch (error) {
      console.log('Error with category get:', error);
  }
}

// worker Saga: will be fired on "FETCH_FOOTAGE" actions
function* getFootage() {
    try {
      //get all the footage rows from the user_footage table
      const response = yield axios.get('/api/footage');
      //store the footage data in the footage reducer
      yield put({ type: 'SET_FOOTAGE', payload:response.data });
    } catch (error) {
        console.log('Error with category get:', error);
    }
  }


function* footageSaga() {
  yield takeLatest('ADD_FOOTAGE',postFootage);
  yield takeLatest('FETCH_FOOTAGE', getFootage);
}

export default footageSaga;