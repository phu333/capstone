var initialState = [];
const myLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_login':
      return state;
    case 'ADD_login':
      state.pop()
      state.push(action.login)
      return [...state];
    case 'LOGOUT':
      state = initialState
      state.pop()
      console.log(state)
      return [...state];
    default:
      return state;
  }
}
export default myLoginReducer;