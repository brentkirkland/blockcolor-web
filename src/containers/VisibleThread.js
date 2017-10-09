import { connect } from 'react-redux'
import Thread from '../components/Thread.js'
import { addColorHashArray } from '../actions'

const mapStateToProps = (state) => ({
  web3: state.web3,
  colors: state.colors
})


const mapDispatchToProps = {
  addColorHashArray: addColorHashArray
}

const VisibleThread = connect(
  mapStateToProps,
  mapDispatchToProps
)(Thread)

export default VisibleThread
