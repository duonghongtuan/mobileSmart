import React, { Component } from 'react';
import axios from 'axios';

export default class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            desc: '',
            image: '',
            show: false
        }
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDesc(e) {
        this.setState({
            desc: e.target.value
        });
    }
    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        });
    }

    onFileChange(e) {
        this.setState({
            image: e.target.files[0]
        })
    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', this.state.image)
        formData.append('name', this.state.name)
        formData.append('desc', this.state.desc)
        formData.append('price', this.state.price)
        formData.append('company', this.state.company)
        axios.post("http://localhost:4000/products/upload", formData, {
        }).then(res => {
            this.setState({show: true})
            console.log(res.data)
        })
    }

    render() {
        return (
            <div className="">
                <div className="row" style={{ marginTop: '40px' }}>
                    <div className="col-md-4 offset-md-4">
                    {this.state.show===true?
                        <div style={{color:"#28a745", textAlign: 'center', fontSize: 20}}>Thêm thành công!</div>
                        : null
                    }
                        <form onSubmit={this.onSubmit} enctype="multipart/form-data" method="POST">
                            <div className="form-group">
                                <label>Tên sản phẩm: </label>
                                <input type="text" className="form-control" value={this.state.name}
                                    onChange={this.onChangeName} required
                                />
                            </div>
                            <div className="form-group">
                                <label>Mô tả: </label>
                                <input type="text" className="form-control" value={this.state.desc}
                                    onChange={this.onChangeDesc} required/>
                            </div>
                            <div className="form-group">
                                <label>Giá: </label>
                                <input type="text" className="form-control" value={this.state.price}
                                    onChange={this.onChangePrice} required
                                />
                            </div>
                            <div className="form-group" >
                                <label>Công ty: </label>
                                <input type="text" className="form-control" value={this.state.company}
                                    onChange={this.onChangeCompany} required />
                                <div style={{marginTop: 10}}>
                                <div class="form-check-inline">
                                    <label class="form-check-label">
                                        <input type="radio" class="form-check-input" value="samsung"
                                        name="company"
                                        onChange={this.onChangeCompany}
                                        />Samsung
                                    </label>
                                </div>
                                <div class="form-check-inline">
                                    <label class="form-check-label">
                                        <input type="radio" class="form-check-input" value="iphone" 
                                        name="company"
                                        onChange={this.onChangeCompany}
                                        />Iphone
                                    </label>
                                </div>
                                </div>
                            </div>
                            <div className="form-group" >
                                <input type="file" onChange={this.onFileChange} name="image" required />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary" type="submit">Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}