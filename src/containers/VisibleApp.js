import { connect } from 'react-redux'
import App from '../components/App.js'
import { instantiateWeb3 } from '../actions'

const mapStateToProps = (state) => ({
  web3: state.web3
})


const mapDispatchToProps = {
  instantiateWeb3: instantiateWeb3
}

const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default VisibleApp
