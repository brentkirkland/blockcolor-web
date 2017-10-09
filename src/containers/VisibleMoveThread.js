import { connect } from 'react-redux'
import MoveThread from '../components/MoveThread'
import { addPendingTransaction } from '../actions'

const mapStateToProps = (state) => ({
  web3: state.web3
})

const mapDispatchToProps = {
  addPendingTransaction: addPendingTransaction
}

const VisibleMoveThread = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveThread)

export default VisibleMoveThread
