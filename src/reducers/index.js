import { combineReducers } from 'redux'
import web3 from './web3'
import colors from './colors'

const reduced = combineReducers({
  web3,
  colors
})

export default reduced
