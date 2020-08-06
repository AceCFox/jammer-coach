import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//this saga gets fired with every 'POST_SKILL' action
function* updateSkill(action){
    try {
        yield axios.put('/api/skill/', action.payload);
        yield put({ type: 'GET_ALL_SKILL' });
    }  catch (error) {
        console.log('Error with skill update:', error);
    }
}



function* updateSkillSaga() {
  yield takeLatest('UPDATE_SKILL', updateSkill);
}

export default updateSkillSaga;