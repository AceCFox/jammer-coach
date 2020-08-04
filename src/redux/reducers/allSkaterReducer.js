const allSkaterReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_SKATER':
        return action.payload;
      default:
        return state;
    }
  };
  
  // all users will be on the redux state at:
  // state.allSkater
  export default allSkaterReducer;
  