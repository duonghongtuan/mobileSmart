import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this)
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: ''
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangePasswordConfirm(e) {
        this.setState({
            password_confirm: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            username: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };
        axios.post('http://localhost:4000/register', obj)
            .then(res => {
                
                if (res.data != "Email_has_been_used") {
                    console.log("ok")
                    this.props.history.push('/login')                   
                }else{
                    alert("Email đã được đăng ký")
                }
            })
            .catch(function (error) {
                alert('Kiem tra lai mat khau')
            })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <div className="row" style={{ marginTop: '10px' }}>
                    <div className="col-md-4 offset-md-4">
                        <h3>Dăng Ký Tài Khoản</h3>
                        <form onSubmit={this.onSubmit} className=".was-validated">
                            <div className="form-group">
                                <label>Tên đăng nhập: </label>
                                <input type="text" className="form-control"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email : </label>
                                <input type="email" className="form-control" value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu: </label> <br />
                                <label>( it nhất 6 ký tự: ) </label>
                                <input type="password" className="form-control" value={this.state.password}
                                    onChange={this.onChangePassword}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Nhập lại mật khẩu: </label>
                                <input type="password" className="form-control" value={this.state.password_confirm}
                                    onChange={this.onChangePasswordConfirm}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" value="Register Person" className="btn btn-lg btn-primary btn-block">Đăng ký</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}