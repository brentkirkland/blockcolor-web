import Oko from '../contracts/blockcolor.json'

const initial_state = {
  loading: true,
  contract: undefined,
  instance: undefined,
  account: undefined
}

const lightstatus = (state = initial_state, action) => {
  switch (action.type) {
    case 'INSTANTIATE_WEB3':
      const contract = window.web3.eth.contract(Oko.abi)
      return { ...state,
        loading: false,
        contract: contract,
        instance: contract.at(Oko.networks["boji"].address),
        account: window.web3.eth.accounts[0]
      }
    default:
      return state;
  }
}

export default lightstatus
