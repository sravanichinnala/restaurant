import {Component} from 'react'
import './index.css'
class index extends Component {
  render() {
    const {cartOrdersCount} = this.props
    return (
      <div className="navbar">
        <div className="navbar-left">
          <h1>UNI Resto Cafe</h1>
        </div>
        <div className="navbar-right">
          <ul>
            <li>My Orders</li>
            <li>
              cart <p>{cartOrdersCount}</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default index
