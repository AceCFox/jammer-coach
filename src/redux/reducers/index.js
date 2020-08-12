import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import category from './categoryReducer';
import skill from './skillReducer';
import allSkater from './allSkaterReducer';
import skillCategory from './skillCategoryReducer';
import curriculum from './curriculumReducer';
import footage from './footageReducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  category, //will have the array of category objects {id and name}
  skill, //will have an array of skill objects (title, author, url, id, description)
  allSkater,//will have an array of skater obejcts (id, username, bio, goals)
  skillCategory,//has an array of objects {skill_id, category_id, name, id}
  curriculum,//has an array of skill objects joined to a user
  footage,//has an array of footage objects with a .id, .url, .added_by, .user_skill_id, .notes
});

export default rootReducer;
