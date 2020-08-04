import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//this saga gets fired with every 'POST_SKILL' action
function* addSkill(action){
    try {
        yield axios.post('/api/skill', action.payload);
        yield put({ type: 'GET_ALL_SKILL' });
    }  catch (error) {
        console.log('Error with skill post:', error);
    }
}



function* skillSaga() {
  yield takeLatest('POST_SKILL', addSkill);
}

export default skillSaga;