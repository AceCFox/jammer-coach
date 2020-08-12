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
      console.log('Error posting footage:', error);
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
        console.log('Error getting footage:', error);
    }
  }

// worker Saga: will be fired on "DELETE_FOOTAGE" actions
function* deleteFootage(action) {
  try {
   //delete a row from user_footage based on a row id
    yield axios.delete('/api/footage/' + action.payload);
    // get the newly updated user footage rows
    yield put({ type: 'FETCH_FOOTAGE' });
  } catch (error) {
      console.log('Error deleting footage:', error);
  }
}


function* footageSaga() {
  yield takeLatest('ADD_FOOTAGE',postFootage);
  yield takeLatest('FETCH_FOOTAGE', getFootage);
  yield takeLatest('DELETE_FOOTAGE', deleteFootage);
}

export default footageSaga;