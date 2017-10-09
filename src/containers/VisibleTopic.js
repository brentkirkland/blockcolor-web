import { connect } from 'react-redux'
import Topic from '../components/Topic.js'
import { addColorHashData } from '../actions'

const mapStateToProps = (state) => ({
  colors: state.colors
})

const mapDispatchToProps = {
  addColorHashData: addColorHashData
}

const VisibleTopic = connect(
  mapStateToProps,
  mapDispatchToProps
)(Topic)

export default VisibleTopic
