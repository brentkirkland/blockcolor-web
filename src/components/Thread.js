import React, {Component} from 'react';
import Topic from '../containers/VisibleTopic';
import VisibleAddTopic from '../containers/VisibleAddTopic'
import MoveThread from '../containers/VisibleMoveThread'
import './App.css';

class Thread extends Component {

  // componentWillMount () {
  //   this.props.initiateColor(this.state.color);
  // }

  componentDidMount() {
    this.getThreadHashArray();
    // console.log(this.props)
    // console.log(this.props.match.params[0])
  }

  getThreadHashArray() {
    const web3 = this.props.web3;
    console.log(web3.instance)
    console.log(this.props.ipfs)
    const func = web3.instance.getThread.call;
    func(this.props.match.params[0], (err, r) => {
      if (err) {
        console.log(err)
      } else {
        this.props.addColorHashArray(r, this.props.match.params[0])
      }
    })
  }

  renderTopic (a, i) {
    return <Topic ipfs={a} color={0}/>
  }

  renderTopics () {
    // if (this.props.match.params[0].length === 66) {
    //   // needs correct color
    //   return (
    //     <Topic ipfs={this.props.match.params[0].replace("thread/", "")} color={0}/>
    //   )
    // }
    if (this.props.match.params[0] in this.props.colors.colors) {
      // console.log('fuckkkkkk', this.props.colors.colors[this.props.match.params[0]])
      return this.props.colors.colors[this.props.match.params[0]].array.map(this.renderTopic.bind(this))
    }
  }

  render() {
    return (
      <div>
        {this.renderTopics()}
        <p>{this.props.match.params[0]}</p>
        <p>Needs to assume that it has no data</p>
        <p>Needs an input box</p>
        <MoveThread color={this.props.colors.data.get(this.props.match.params[0]).get('color')} ipfs={this.props.match.params[0]}/>
      </div>
    )
  }
}

export default Thread;
