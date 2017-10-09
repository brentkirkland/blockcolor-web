import React, {Component} from 'react';
import './App.css';
import PropTypes from 'prop-types'
// import Message from './Message'
// import AddMessage from './AddMessage'
import bs58 from 'bs58'
import { Link } from 'react-router-dom'
//ipfs should be added to redux
import ipfsAPI from 'ipfs-api'
const ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

// TODO: Move this component up to be a dumb component
class Topic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      res: '',
      done: false
    };
  }

  componentDidMount() {
    this.convertIPFSHash()
  }

  getHash(str) {
    const remove0x = str.slice(2, str.length);
    const bytes = Buffer.from(`1220${remove0x}`, "hex");
    const hash = bs58.encode(bytes);
    return hash;
  }

  catFunc() {
    // TODO: figure out why this will not add a new guy
    ipfs.files.cat(this.getHash(this.props.ipfs), this.handleStream.bind(this))
  }

  convertIPFSHash() {
    const data = this.props.colors.data.get(this.props.ipfs);
    if (data.get('paragraph') === null) {
      this.catFunc();
    }
  }

  handleStream(err, stream) {
    stream.on('data', this.chunk.bind(this))

    stream.on('error', function(err) {
      console.error('Oh nooo', err)
    })

    stream.on('end', this.end.bind(this))
  }

  chunk(chunk) {
    if (this.props.colors.data.get(this.props.ipfs).get('paragraph') === null) {
      this.setState({
        res: this.state.res + chunk.toString()
      })
    }
  }

  end() {
    this.props.addColorHashData(this.props.ipfs, JSON.parse(this.state.res))
  }

  getColors (val) {
    if (val === 0) {
      return 'blue'
    } else if (val === 1) {
      return 'yellow'
    } else if (val === 2) {
      return 'cyan'
    } else if (val === 3) {
      return 'orange'
    } else if (val === 4) {
      return 'pink'
    } else if (val === 5) {
      return 'purple'
    } else if (val === 6) {
      return 'green'
    } else if (val === 7) {
      return 'black'
    } else {
      return 'red'
    }
  }

  renderExtras() {
    const data = this.props.colors.data.get(this.props.ipfs)
    const hash = data.get('hash')
    if (data.get('data') !== null) {
      var newDate = new Date();
      newDate.setTime(data.get('timestamp'));
      var dateString = newDate.toUTCString();
      console.log(data.get('paragraph'), 'heyyyy')
      return (
        <div className='Topic'>
          <div style={
              {
                backgroundColor: this.getColors(data.get('color')),
                marginBottom: '10px',
                width: '20px',
                height: '20px'
              }
            }/>
          <Link to={'/thread/' + hash}>{hash}</Link>
          <p><i>{dateString}</i></p>
          <p><b>{data.get('subject')}</b></p>
          <p>{data.get('paragraph')}</p>
          <p>{data.get('attachments')}</p>
        </div>
      )
    } else {
      return (
        <div className='Topic'>
          <Link to={hash}>{hash}</Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="Yellow">
        <div className="Topic-wrapper">
          {this.renderExtras()}
        </div>
      </div>
    );
  }
}

Topic.propTypes = {
  ipfs: PropTypes.string.isRequired,
  colors: PropTypes.object.isRequired,
  addColorHashData: PropTypes.func.isRequired
}

export default Topic;
