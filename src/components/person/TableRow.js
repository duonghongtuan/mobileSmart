import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
}
delete() {
    axios.get('http://localhost:4000/delete/'+this.props.obj._id)
        .then(console.log('Deleted'))
        .catch(err => console.log(err))
}
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.username}
          </td>
          <td>
            {this.props.obj.email}
          </td>
          <td>
          <button onClick={this.delete} className="btn btn-danger">Xóa</button>
          </td>
        </tr>
    );
  }
}
