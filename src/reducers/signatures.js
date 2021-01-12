var initialState = [];
const mySignatureReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_signature':
            return state;
        case 'CREATE_signature':
            state.push(action.signatureList)
            // console.log(action.signatureList)
            // state = initialState
            // state = action.signatureList
            // console.log(state)
     
            return [...state];
        case 'UPDATE_signature':
            state.push(action.signature)
            return [...state];
        case 'DEACTIVE_signature':
            state.push(action.signatureID)
            return [...state];
        default:
            return state;
    }
}
export default mySignatureReducer;