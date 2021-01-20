var initialState = [];
const mySignatureReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_signature':
            return state;
        case 'CREATE_signature':
            
     
            return action.signatureList;
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