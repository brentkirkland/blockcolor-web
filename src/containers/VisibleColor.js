import { connect } from 'react-redux'
import Color from '../components/Color.js'
import { initiateColor, addColorHashArray } from '../actions'

const mapStateToProps = (state) => ({
  web3: state.web3,
  colors: state.colors
})


const mapDispatchToProps = {
  initiateColor: initiateColor,
  addColorHashArray: addColorHashArray
}

const VisibleColor = connect(
  mapStateToProps,
  mapDispatchToProps
)(Color)

export default VisibleColor
