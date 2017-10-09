import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './App.css';
import Topic from '../containers/VisibleTopic'
import VisibleAddTopic from '../containers/VisibleAddTopic'

class Color extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color: 0
    };
  }

  componentWillMount() {
    this.props.initiateColor(this.props.colors.color);
  }

  componentDidMount() {
    this.getColorHashArrayWithProps()
    // setInterval(this.getColorHashArrayWithProps.bind(this), 10000);
  }

  getColorHashArrayWithProps() {
    this.getColorHashArray(this.props.colors.color);
  }

  getColorHashArray(color) {
    const web3 = this.props.web3;
    const func = web3.instance.getColorHashArray.call;
    func(color, (err, r) => {
      if (err) {
        console.log(err)
      } else {
        if (r) {
          this.props.addColorHashArray(r, color)
        }
      }
    })
  }

  renderTopic(a, i) {
    return <Topic key={'topic' + a} ipfs={a}/>
  }

  mapTopics() {
    return this.props.colors.colors[this.props.colors.color].array.map(this.renderTopic.bind(this))
  }

  renderTopics() {
    if (this.props.colors.color in this.props.colors.colors) {
      if (this.props.colors.colors[this.props.colors.color].hasBaseArray) {
        return this.mapTopics()
      } else {
        return (
          <p>Loading...</p>
        )
      }
    }
  }

  handleSelect(e) {
    this.setState({color: parseInt(e.target.value, 10)})
    this.getColorHashArray(parseInt(e.target.value, 10));
  }

  renderSelect() {
    return (
      <select value={this.props.colors.color} onChange={this.handleSelect.bind(this)}>
        <option value={0}>New</option>
        <option value={1}>Techs</option>
        <option value={2}>Repairs</option>
        <option value={3}>Support</option>
        <option value={4}>Operations</option>
        <option value={5}>Approvals</option>
        <option value={6}>Sales</option>
        <option value={7}>King Fred</option>
        <option value={8}>Closed</option>
      </select>
    )
  }

  render() {
    return (
      <div>
        {this.renderSelect()}
        <VisibleAddTopic color={this.props.colors.color}/> {this.renderTopics()}
        <p>{'This is color: ' + this.props.colors.color}</p>
      </div>
    );
  }
}

Color.propTypes = {
  color: PropTypes.number
}

export default Color;
