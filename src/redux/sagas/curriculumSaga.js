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

//this saga will update a skater_note on a skill_skater row
//it will fire with every 'UPDATE_SKATER_NOTE' action
function* updateSkaterNote(action){
    try {
        yield axios.put('/api/skater/skatenote', action.payload);
        yield put({ type: 'GET_CURRICULUM', payload: action.payload.user_id });
        //console.log('updading user:', action.payload.user_id)
    }  catch (error) {
        console.log('Error on update skater note:', error);
    }
}

//this saga will update a coach_note on a skill_skater row
//it will fire with every 'UPDATE_COACH_NOTE' action
function* updateCoachNote(action){
    try {
        yield axios.put('/api/skater/coachnote',  {data: action.payload});
        yield put({ type: 'GET_CURRICULUM', payload: action.payload.user_id });
        console.log(`in update coach note saga`, action.payload);
    }  catch (error) {
        console.log('Error on update skater note:', error);
    }
}

//this saga will delete a row from user_skill
//it will fire with every 'DELETE_USER_SKILL' action
function* deleteUserSkill(action){
    try {
        yield axios.delete('/api/skater/skill', {data: action.payload} );
        let id = action.payload.user_id;
        yield put({ type: 'GET_CURRICULUM', payload: id });
       console.log('in deleteSaga with', action.payload)
    }  catch (error) {
        console.log('Error on update skater note:', error);
    }
}



function* curriculumSaga() {
  yield takeLatest('ASSIGN_SKILL', assignSkill);
  yield takeLatest('GET_CURRICULUM', getCurriculum);
  yield takeLatest('UPDATE_SKATER_NOTE', updateSkaterNote);
  yield takeLatest('UPDATE_COACH_NOTE', updateCoachNote);
  yield takeLatest('DELETE_USER_SKILL', deleteUserSkill);
}

export default curriculumSaga;