const curriculumReducer = (state = [{}], action) => {
    switch (action.type) {
      case 'SET_CURRICULUM':
        return action.payload;
      default:
        return state;
    }
  };
  
  // curriculum will be on the redux state at:
  // state.curriculum
  export default curriculumReducer;