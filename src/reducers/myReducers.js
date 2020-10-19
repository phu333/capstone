import { combineReducers } from 'redux'
import myLoginReducer from './logins'
import myContractReducer from'./contracts'
import myContractExtensionReducer from './contractExtensions'
import myCustomerReducer from'./customers'
import myContractTypeReducer from './contractTypes'
import myUserReducer from './users'
import mySignatureReducer from'./signatures'
import myEmployeeReducer from './employees'
const myReducers  = combineReducers({
    myLoginReducer,
    myContractReducer,
    myContractExtensionReducer,
    myCustomerReducer,
    myContractTypeReducer,
    myUserReducer,
    mySignatureReducer,
    myEmployeeReducer,
});
export default myReducers;