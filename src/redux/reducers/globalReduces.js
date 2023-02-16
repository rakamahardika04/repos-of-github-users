const initialState = {
    username: '',
    datas: []
  }
  
  function clearArray(array) {
    while (array.length > 0) {
      array.pop();
    }
  }
  
  // Reducers 
  const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_USERNAME": 
            return {
                ...state,
                username: state.username = action.username
            }
            break;
        case "SET_DATAS":
              return {
                  ...state,
                  datas: state.datas = action.datas
              }
              break;
        case "EMPTY_DATAS":
            clearArray(state.datas)
            return {
              ...state
            }
            break;
        default:
            return {
                ...state
            }
    }
    return state;
  }

export default rootReducer;