import { connect } from 'react-redux'
import AddTopic from '../components/AddTopic.js'
import { addPendingTransaction } from '../actions'

const mapStateToProps = (state) => ({
  web3: state.web3
})

const mapDispatchToProps = {
  addPendingTransaction: addPendingTransaction
}

const VisibleAddTopic = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTopic)

export default VisibleAddTopic
