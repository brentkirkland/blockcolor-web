import { connect } from 'react-redux'
import Page from '../components/Page.js'
import { addColorHashArray } from '../actions'

const mapStateToProps = (state) => ({
  web3: state.web3,
  colors: state.colors
})


const mapDispatchToProps = {
  addColorHashArray: addColorHashArray
}

const VisiblePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)

export default VisiblePage
