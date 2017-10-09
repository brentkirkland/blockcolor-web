export const instantiateWeb3 = () => ({
  type: 'INSTANTIATE_WEB3'
});

export const initiateColor = (color) => ({
  type: 'INITIATE_COLOR',
  color: color
})

export const addColorHashArray = (arr, color) =>({
  type: 'ADD_COLOR_ARRAY',
  arr: arr,
  color: color
})

export const addColorHashData = (hash, data) => ({
  type: 'ADD_COLOR_HASH',
  data: data,
  hash: hash
})

export const addPendingTransaction = (hash, color) => ({
  type: 'ADD_PENDING_TRANSACTION',
  color: color,
  hash: hash
})
