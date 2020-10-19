export const contractTypeInformation = () => {
    return {
      type: 'LIST_contractType',
    }
  }
  export const createContractType = (contractType) => {
    
    return {
      type: 'CREATE_contractType',
      contractType
    }
  }
  export const updateContractType = (contractType) => {
    return {
      type: 'UPDATE_contractType',
      contractType
    }
  }
  export const deactiveContractType = (contractTypeID) => {
    return {
      type: 'DEACTIVE_contractType',
      contractTypeID
    }
  }