import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//this saga gets fired with every 'ASSIGN_SKILL' action
//it will add a skill to a skater's curriculum on the user_skill table
function* assignSkill(action){
    try {
        yield axios.post('/api/skater/assign', action.payload);
        yield put({ type: 'GET_SKATER' });
    }  catch (error) {
        console.log('Error with skill post:', error);
    }
}



function* curriculumSaga() {
  yield takeLatest('ASSIGN_SKILL', assignSkill);
}

export default curriculumSaga;