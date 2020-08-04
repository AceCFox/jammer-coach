import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "GET_CATEGORY" actions
function* category() {
  try {
    //get categories from database/server
    const response = yield axios.get('/api/category/');
    // store categories in category reducer
    yield put({ type: 'SET_CATEGORY', payload: response.data });
  } catch (error) {
      console.log('Error with category get:', error);
  }
}

function* categorySaga() {
  yield takeLatest('GET_CATEGORY', category);
}

export default categorySaga;