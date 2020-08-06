import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//this saga gets fired with every 'GET_SKILL_CATAGORY' action
function* getJunction(){
    try {
       const response = yield axios.get('/api/category/skill');
        yield put({ type: 'PUT_SKILL_CATEGORY', payload: response.data });
    }  catch (error) {
        console.log('Error with skill_category GET:', error);
    }
}



function* skillCategorySaga() {
  yield takeLatest('GET_JUNCTION', getJunction);
}

export default skillCategorySaga;