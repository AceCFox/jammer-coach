const skillCategoryReducer = (state = [], action) => {
    switch (action.type) {
      case 'PUT_SKILL_CATEGORY':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.skillCategory
  export default skillCategoryReducer;