import React, {Component} from 'react';
import './App.css';
import PropTypes from 'prop-types'
import Textarea from 'react-textarea-autosize';
import ipfsAPI from 'ipfs-api'
import bs58 from 'bs58'
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

//TODO: consolidate this class and
// addtopic into one class

class MoveThread extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      subject: '',
      color: -1
    };
  }

  // this logic will move out eventually
  getButtonOptions (val) {
    if (val === 0) {
      return [1, 2, 3, 6]
    } else if (val === 1) {
      return [1, 2, 4]
    } else if (val === 2) {
      return [2, 1, 3]
    } else if (val === 3) {
      return [3, 2, 6, 1]
    } else if (val === 4) {
      return [4, 5]
    } else if (val === 5) {
      return [5, 1, 3, 8]
    } else if (val === 6) {
      return [6, 7]
    } else if (val === 7) {
      return [1, 2, 3, 4, 5, 6, 7, 8]
    } else {
      return []
    }
  }

  getButtonNames (val) {
    if (val === 0) {
      return 'New'
    } else if (val === 1) {
      return 'Techs'
    } else if (val === 2) {
      return 'Repairs'
    } else if (val === 3) {
      return 'Support'
    } else if (val === 4) {
      return 'Operations'
    } else if (val === 5) {
      return 'Approvals'
    } else if (val === 6) {
      return 'Sales'
    } else if (val === 7) {
      return 'King Fred'
    } else {
      return 'closed'
    }
  }

  renderButton(a, i) {
    if (a === 0) {
      return (
        <div className="Topic-button-active" key={'hey'+i} onClick={this.add0.bind(this)}>
          {this.getButtonNames(a)}
        </div>
      )
    } else if (a === 1) {
      return (
        <div className="Topic-button-active" key={'hey'+i} onClick={this.add1.bind(this)}>
          {this.getButtonNames(a)}
        </div>
      )
    } else if (a === 2) {
      return (
        <div className="Topic-button-active" key={'hey'+i} onClick={this.add2.bind(this)}>
          {this.getButtonNames(a)}
        </div>
      )
    } else if (a === 3) {
      return (
        <div className="Topic-button-active" key={'hey'+i} onClick={this.add3.bind(this)}>
          {this.getButtonNames(a)}
        </div>
      )
    } else if (a === 4) {
      return (
        <div className="Topic-button-active" key={'hey'+i} onClick={this.add4.bind(this)}>
          {this.getButtonNames(a)}
        </div>
      )
    } else if (a === 5) {
      return (
        <div className="Topic-button-active" key={'hey'+i} onClick={this.add5.bind(this)}>
          {this.getButtonNames(a)}
        </div>
      )
    } else if (a === 6) {
      return (
        <div className="Topic-button-active" key={'hey'+i} onClick={this.add6.bind(this)}>
          {this.getButtonNames(a)}
        </div>
      )
    } else if (a === 7) {
      return (
        <div className="Topic-button-active" key={'hey'+i} onClick={this.add7.bind(this)}>
          {this.getButtonNames(a)}
        </div>
      )
    } else {
      return (
        <div className="Topic-button-active" key={'hey'+i} onClick={this.add8.bind(this)}>
          {this.getButtonNames(a)}
        </div>
      )
    }

  }

  renderButtons() {
    if (this.state.topic !== '') {
      const routes = this.getButtonOptions(this.props.color);
      return routes.map(this.renderButton.bind(this))
    }
  }

  // this needs to be reworked!
  setHash (err, files) {
    if (err) {
      console.log(err)
    } else {
      var hash = files[0].hash;
      const bytes = bs58.decode(hash);
      const multiHashId = 2;
      const b = bytes.slice(multiHashId, bytes.length);
      this.props.web3.instance.writeEvent.estimateGas(this.props.ipfs, this.props.color, "0x" + b.toString("hex"), this.state.color, (error, result) => {
        this.props.web3.instance.writeEvent.sendTransaction(this.props.ipfs, this.props.color, "0x" + b.toString("hex"), this.state.color, {gas: result*2}, (err, r) => {
          if (error) {
            console.log(error)
          }
          this.reset()
          // this.props.addPendingTransaction(r, this.props.color)
        })
      })
    }
  }

  // probably can be fixed with a bind. oh well.
  add0() {
    this.setState({
      color: 0
    })
  }

  add1() {
    this.setState({
      color: 1
    })
  }

  add2() {
    this.setState({
      color: 2
    })
  }

  add3() {
    this.setState({
      color: 3
    })
  }

  add4() {
    this.setState({
      color: 4
    })
  }

  add5() {
    this.setState({
      color: 5
    })
  }

  add6() {
    this.setState({
      color: 6
    })
  }

  add7() {
    this.setState({
      color: 7
    })
  }

  add8() {
    this.setState({
      color: 8
    })
  }

  add () {
    var d = new Date();
    const obj = {
      version: '0.0.1',
      subject: this.state.subject,
      paragraph: this.state.topic,
      timestamp: d.getTime(),
      attachments: [],
      color: this.state.color,
      user: this.props.web3.account
    }
    ipfs.add(Buffer.from(JSON.stringify(obj)), this.setHash.bind(this))
  }

  // renderBreaker() {
  //   if (this.state.topic !== '') {
  //     return (<div className="breaker"/>)
  //   }
  // }
  //
  handleTopicText(e) {
    this.setState({topic: e.target.value})
  }

  handleSubjectText(e) {
    this.setState({subject: e.target.value})
  }

  reset () {
    this.setState({
      topic: '',
      subject: '',
      color: -1
    })
  }

  nothing() {}

  render() {
    return (
      <div className="Yellow-add">
        <span className="Blurb-title">Advance Ticket</span>
        <div className="Pink-new">
          <Textarea key={1} rows={1} onChange={this.handleSubjectText.bind(this)} placeholder="Summary" value={this.state.subject}/>
          <br/>
          <Textarea rows={1} onChange={this.handleTopicText.bind(this)} placeholder="Details" value={this.state.topic}/>
          <br/>
          <div className="Buttons">{this.renderButtons()}</div>
          {(this.state.color >= 0) ? this.add() : this.nothing()}
        </div>
      </div>
    );
  }
}

MoveThread.propTypes = {
  web3: PropTypes.object.isRequired,
  addPendingTransaction: PropTypes.func.isRequired,
  color: PropTypes.number.isRequired,
  ipfs: PropTypes.string.isRequired,
}

export default MoveThread;
