const categoryReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CATEGORY':
        return action.payload;
      default:
        return state;
    }
  };
  
  // category will be on the redux state at:
  // state.category
  export default categoryReducer;
  