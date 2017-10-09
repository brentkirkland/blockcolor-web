import React, {Component} from 'react';
import './App.css';
import PropTypes from 'prop-types'
import Textarea from 'react-textarea-autosize';
import ipfsAPI from 'ipfs-api'
import bs58 from 'bs58'
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

class AddTopic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      subject: ''
    };
  }

  renderTopicButton() {
    if (this.state.topic !== '') {
      return (
        <div className="Topic-button-active" onClick={this.add.bind(this)}>
          <b>Create</b>
        </div>
      )
    }
  }

  setHash (err, files) {
    if (err) {
      console.log(err)
    } else {
      var hash = files[0].hash;
      const bytes = bs58.decode(hash);
      const multiHashId = 2;
      const b = bytes.slice(multiHashId, bytes.length);
      this.props.web3.instance.writeEvent.estimateGas("0", 0, "0x" + b.toString("hex"), 0, (error, result) => {
        console.log(result)
        this.props.web3.instance.writeEvent.sendTransaction("0", 0, "0x" + b.toString("hex"), 0, {gas: result*2}, (err, r) => {
          if (error) {
            console.log(error)
          }
          this.reset()
          // console.log('the result is!', r)
          // this.props.addPendingTransaction(r, this.props.color)
        })
      })
    }
  }

  add () {
    var d = new Date();
    const obj = {
      version: '0.0.1',
      subject: this.state.subject,
      paragraph: this.state.topic,
      timestamp: d.getTime(),
      attachments: [],
      color: this.props.color,
      user: this.props.web3.account
    }
    ipfs.add(Buffer.from(JSON.stringify(obj)), this.setHash.bind(this))
  }

  renderBreaker() {
    if (this.state.topic !== '') {
      return (<div className="breaker"/>)
    }
  }

  handleTopicText(e) {
    this.setState({topic: e.target.value})
  }

  handleSubjectText(e) {
    this.setState({subject: e.target.value})
  }

  reset () {
    this.setState({
      topic: ''
    })
  }

  render() {
    return (
      <div className="Yellow-add">
        <span className="Blurb-title">New Ticket</span>
        <div className="Pink-new">
          <Textarea key={1} rows={1} onChange={this.handleSubjectText.bind(this)} placeholder="Summary" value={this.state.subject}/>
          <br/>
          <Textarea key={2} rows={1} onChange={this.handleTopicText.bind(this)} placeholder="Details" value={this.state.topic}/>
          <br/>
          {this.renderBreaker()}
          {this.renderTopicButton()}
        </div>
      </div>
    );
  }
}

AddTopic.propTypes = {
  web3: PropTypes.object.isRequired,
  addPendingTransaction: PropTypes.func.isRequired,
  color: PropTypes.number.isRequired
}

export default AddTopic;
