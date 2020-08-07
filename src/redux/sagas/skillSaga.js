import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "GET_ALL_SKILL" actions
function* allSkill() {
  try {
    //get all skills from database/server
    const response = yield axios.get('/api/skill/');
    // store all skills in skill reducer
    yield put({ type: 'SET_SKILL', payload: response.data });
  } catch (error) {
      console.log('Error with skill get:', error);
  }
}

//worker Saga that will be fired on "GET_SKILL_CATEGORY" actions
function* categorySkill(action) {
  try {
    //get all skills from database/server
    const response = yield axios.get('/api/skill/category'+ action.payload);
    // store all skills in skill reducer
    yield put({ type: 'SET_SKILL', payload: response.data });
  } catch (error) {
      console.log('Error with skill get:', error);
  }
}

function* deleteSkill(action){
  try{
    yield axios.delete('/api/skill/' + action.payload);
    yield put({type: 'GET_ALL_SKILL'});
  } catch(error){
    console.log('error deleting skill:', error);
  }
}


function* skillSaga() {
  yield takeLatest('GET_ALL_SKILL', allSkill);
  yield takeLatest('GET_SKILL_CATEGORY', categorySkill);
  yield takeLatest('DELETE_SKILL', deleteSkill);
}

export default skillSaga;