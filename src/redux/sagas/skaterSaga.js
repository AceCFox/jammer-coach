import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "GET_SKATER" actions
function* allSkater() {
  try {
    //get categories from database/server
    const response = yield axios.get('/api/user/all');
    // store categories in category reducer
    yield put({ type: 'SET_ALL_SKATER', payload: response.data });
  } catch (error) {
      console.log('Error with category get:', error);
  }
}

function* skaterSaga() {
  yield takeLatest('GET_SKATER', allSkater);
}

export default skaterSaga;