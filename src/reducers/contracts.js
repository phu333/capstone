var initialState = [];
const myContractReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_contract':
            return state;
        case 'CREATE_contract':
            state.push(action.contract)
            
            return [...state];
        case 'UPDATE_contract':
            state.push(action.contract)
            return [...state];
        case 'DEACTIVE_contract':
            state.push(action.contractID)
            return [...state];
        default:
            return state;
    }
}
export default myContractReducer;