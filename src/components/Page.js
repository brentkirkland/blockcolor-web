import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './App.css';
import Topic from '../containers/VisibleTopic'
import Select from '../containers/VisibleSelect'
import VisibleAddTopic from '../containers/VisibleAddTopic'
import MoveThread from '../containers/VisibleMoveThread'
import { Link } from 'react-router-dom'

class Page extends Component {

  componentWillMount() {
    this.getCorrectArray()
  }

  getCorrectArray () {
    if (this.props.match.path === "/") {
      this.getColorHashArrayWithProps()
    } else if (this.props.match.path === "/thread/*") {
      this.getThreadHashArrayWithProps()
    }
  }

  componentDidUpdate (prevProps, prevState) {

    if (this.props.match.params[0] !== this.props.colors.thread && this.props.match.path === "/thread/*") {
      this.getThreadHashArrayWithProps()
    }
  }

  getColorHashArrayWithProps() {
    this.getColorHashArray(this.props.colors.color, true);
  }

  getThreadHashArrayWithProps() {
    this.getColorHashArray(this.props.match.params[0], false);
  }

  getColorHashArray(color, bool) {
    const web3 = this.props.web3;
    var func;
    if (bool) {
      func = web3.instance.getColorHashArray.call;
    } else {
      func = web3.instance.getThread.call;
    }
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
    return <Topic key={'topic' + a + i} ipfs={a}/>
  }

  mapTopics(bool) {
    const obj = this.props.colors.colors
    if (bool) {
      return obj[this.props.colors.color].array.map(this.renderTopic.bind(this))
    }
      return obj[this.props.colors.thread].array.map(this.renderTopic.bind(this))
  }

  // TODO: this.props.colors.color is wonky. Fix later
  renderTopics() {
    if (this.props.colors.color in this.props.colors.colors && this.props.match.path === "/") {
      if (this.props.colors.colors[this.props.colors.color].hasBaseArray) {
        return this.mapTopics(true)
      } else {
        return (
          <p>Loading...</p>
        )
      }
    } else if (this.props.colors.thread in this.props.colors.colors && this.props.match.path === "/thread/*") {
      if (this.props.colors.colors[this.props.colors.thread].hasBaseArray) {
        return this.mapTopics(false)
      } else {
        return (
          <p>Loading...</p>
        )
      }
    }
  }

  renderSelect() {
    if (this.props.match.path === "/") {
      return (
        <Select getColorHashArray={this.getColorHashArray.bind(this)}/>
      )
    }
  }

  renderAdd () {
    if (this.props.colors.color === 0 && this.props.match.path === "/") {
      return <VisibleAddTopic color={0}/>
    }
  }

  renderHeader () {
    if (this.props.match.path === "/thread/*") {
      return (
        <div>
          <h4>{'Thread: ' + this.props.match.params[0]}</h4>
          <Link to="/">← Back</Link>
          <br/>
        </div>
      )
      return <h4>{'Thread: ' + this.props.match.params[0]}</h4>
    }
  }

  renderMoveThread () {
    if (this.props.match.path === "/thread/*") {
      return <MoveThread color={this.props.colors.color} ipfs={this.props.match.params[0]}/>
    }
  }

  renderWeirdBreakWhenNotHomeRoute () {
    if (this.props.match.path === "/thread/*") {
      return <br/>
    }
  }

  render() {
    return (
      <div className="Page">
        <div className="Page-wrapper">
          {this.renderHeader()}
          {this.renderSelect()}
          {this.renderAdd()}
          {this.renderWeirdBreakWhenNotHomeRoute()}
          <span className="Blurb-title">Tickets</span>
          {this.renderTopics()}
          {this.renderMoveThread()}
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  color: PropTypes.number
}

export default Page;
