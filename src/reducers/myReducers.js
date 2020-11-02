import { combineReducers } from 'redux'
import myLoginReducer from './logins'
import myContractReducer from'./contracts'
import myContractExtensionReducer from './contractExtensions'
import myCustomerReducer from'./customers'
import myContractTypeReducer from './contractTypes'

import mySignatureReducer from'./signatures'
import myEmployeeReducer from './employees'
const myReducers  = combineReducers({
    myLoginReducer,
    myContractReducer,
    myContractExtensionReducer,
    myCustomerReducer,
    myContractTypeReducer,
    
    mySignatureReducer,
    myEmployeeReducer,
});
export default myReducers;