import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      name: '',
      password: ''
    };
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value })
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  signIn(e) {
    e.preventDefault();
    axios.post('http://localhost:4000/login', {
      email: this.state.name,
      password: this.state.password
    })
      .then(response => {
        console.log("cuccess")
        localStorage.setItem("user",JSON.stringify(response.data))
        let role=response.data.user.role
        if(role==="admin"){
          this.props.history.push('/admin/statistics')
          window.location.reload()
        }else{
          this.props.history.push('/')
          window.location.reload()
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="row" style={{ marginTop: '40px' }}>
          <div className="col-md-4 offset-md-4">
          <h3>Đăng nhập</h3>
            <form className="form-signin">
              <label for="inputname" className="sr-only">Tên đăng nhập: </label>

              <input type="text" onChange={this.handleNameChange} value={this.state.name}
                name="name" id="inputname" className="form-control"
                placeholder="User name" required /><br/>

              <label for="inputPassword" className="sr-only">Mật khẩu</label>

              <input type="password" onChange={this.handlePasswordChange}
                id="inputPassword" className="form-control"
                placeholder="Password" required /><br/>

              <button className="btn btn-lg btn-primary btn-block"
                onClick={this.signIn} type="submit">Đăng nhập
              </button>

              <Link to={'/create'} >
                <button className="btn btn-lg btn-primary btn-block"
                  type="button" style={{ marginTop: "10px" }}>Đăng ký</button>
              </Link>
            </form>
          </div>
        </div>
      </div>

    )
  }
}
