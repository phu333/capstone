var initialState = [];
const myEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_employee':
            return state;
        case 'CREATE_employee':
            state.push(action.employee)
            
            return [...state];
        case 'UPDATE_employee':
            state.push(action.employee)
            return [...state];
        case 'DEACTIVE_employee':
            state.push(action.employeeID)
            return [...state];
        default:
            return state;
    }
}
export default myEmployeeReducer;