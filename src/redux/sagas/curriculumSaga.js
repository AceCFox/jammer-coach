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

//this saga will get all the skills assigned to a skater
//it requires a user id as a payload
//it will fire with every 'GET_CURRICULUM' action
function* getCurriculum(action){
    try {
        const response = yield axios.get('/api/skater/skill/' + action.payload);
        yield put({ type: 'SET_CURRICULUM', payload: response.data });
    }  catch (error) {
        console.log('Error with curriculumGet:', error);
    }
}



function* curriculumSaga() {
  yield takeLatest('ASSIGN_SKILL', assignSkill);
  yield takeLatest('GET_CURRICULUM', getCurriculum);
}

export default curriculumSaga;