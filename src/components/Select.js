import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './App.css';

class Select extends Component {

  handleSelect(e) {
    this.props.getColorHashArray(parseInt(e.target.value, 10), true);
  }

  // renderSelect () {
  //   return (
  //     <div>
  //       <span>New</span>
  //       <span>Techs</span>
  //       <span>Repairs</span>
  //       <span>Support</span>
  //       <span>Operations</span>
  //       <span>Approvals</span>
  //       <span>Sales</span>
  //       <span>King Fred</span>
  //       <span>Closed</span>
  //     </div>
  //   )
  // }

  render() {
    return (
      <select className={"Select"} value={this.props.colors.color} onChange={this.handleSelect.bind(this)}>
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
}

Select.propTypes = {
  colors: PropTypes.object.isRequired,
  getColorHashArray: PropTypes.func.isRequired
}

export default Select
