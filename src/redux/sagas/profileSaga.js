import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "PUT_EMAIL" actions
function* updateEmail(action) {
  try {
    //update the user email in database/server
    yield axios.put('/api/user/email', action.payload);
    // get the newly updated user data
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
      console.log('Error with category get:', error);
  }
}

// worker Saga: will be fired on "PUT_BIO" actions
function* updateBio(action) {
    try {
      //update the user bio in database/server
      yield axios.put('/api/user/bio', action.payload);
      // get the newly updated user data
      yield put({ type: 'FETCH_USER' });
    } catch (error) {
        console.log('Error with category get:', error);
    }
  }

// worker Saga: will be fired on "PUT_GOALS" actions
function* updateGoals(action) {
    try {
      //update the user goals in database/server
      yield axios.put('/api/user/goals', action.payload);
      // get the newly updated user data
      yield put({ type: 'FETCH_USER' });
    } catch (error) {
        console.log('Error with category get:', error);
    }
  }

function* profileSaga() {
  yield takeLatest('PUT_EMAIL',updateEmail);
  yield takeLatest('PUT_BIO', updateBio);
  yield takeLatest('PUT_GOALS', updateGoals);
}

export default profileSaga;