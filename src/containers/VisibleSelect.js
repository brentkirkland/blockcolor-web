import { connect } from 'react-redux'
import Bob from '../components/Select.js'
import { addColorHashArray } from '../actions'

const mapStateToProps = (state) => ({
  colors: state.colors,
  web3: state.web3
})


const mapDispatchToProps = {

}

const VisibleSelect = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bob)

export default VisibleSelect
