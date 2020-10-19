export const contractInformation = () => {
  return {
    type: 'LIST_contract',
  }
}
export const createContract = (contract) => {
  
  return {
    type: 'CREATE_contract',
    contract
  }
}
export const updateContract = (contract) => {
  return {
    type: 'UPDATE_contract',
    contract
  }
}
export const deactiveContract = (contractID) => {
  return {
    type: 'DEACTIVE_contract',
    contractID
  }
}