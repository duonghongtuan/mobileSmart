import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class TableProduct extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.state = {
      price: ''
    }
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }
  delete() {
    let boolean = window.confirm("Bạn muốn xóa sản phẩm này?")
    console.log(boolean)
    if(boolean===true){
      axios.get('http://localhost:4000/products/delete/' + this.props.obj._id)
      .then(res => {
        this.props.update()
        console.log('deleted')
      })
      .catch(err => console.log(err))
    }
  }
  edit(e) {
    e.preventDefault();
    const obj = {
      price: this.state.price,
    };
    axios.post('http://localhost:4000/products/update/' + this.props.obj._id, obj)
      .then(res => console.log(res.data));

      this.props.update()
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.name}
        </td>
        <td>
          {this.props.obj.desc}
        </td>
        <td style={{width: 50}}>
          <input type="text"
            className="form-control price"
            style={{width: 200}}
            value={this.state.price}
            placeholder={this.props.obj.price}
            onChange={this.onChangePrice}
            name="price"
          />
        </td>
        <td>
          <img style={{ maxHeight: 100, maxWidth: 100 }}
            src={this.props.obj.image} className="rounded" alt="" />
        </td>
        <td>
        <button onClick={this.edit} className="btn btn-success">Cập nhật</button>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">Xóa</button>
        </td>
      </tr>
    );
  }
}