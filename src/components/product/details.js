import React, { useState, useEffect } from 'react';
import './details.css'
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Details({ match }) {
    let history = useHistory();
    const [product, setProduct] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        let x = localStorage.getItem("user")
        if (x != null) {
            setUser(JSON.parse(x).user)
            console.log(JSON.parse(x).user)
        }
        axios.get('http://localhost:4000/products/edit/' + match.params.id)
            .then(response => {
                console.log(response.data);
                setProduct(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    const addCart = () => {
        let idUser=""
        if(user._id==null){
            idUser="1010101"
        }else{
            idUser= user._id
        }
        const obj = {
            idUser: idUser,
            idProduct: product._id,
            quantity: 1,
            amount: product.price
        };
        axios.post('http://localhost:4000/createCart', obj)
            .then(res => {
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error)
            })
        history.push('/cart')
        
    }
    return (
        <div>
            <div className="titleDetail">
                Điện thoại {product.name}
            </div>
            <div>
                <div className="left">
                    <div className="thumbnail">
                    <img src={product.image}  alt="" />
                    </div>
                </div>
                <div className="center">
                    <div className="price">
                        <span style={{ color: "black" }}>Giá: </span>
                        {product.price} đ
                        </div>
                    <div>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>{product.name}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Bộ sản phẩm gồm: Hộp, Sạc, Tai nghe, Sách hướng dẫn, Bút cảm ứng, Cáp, Cây lấy sim, Ốp lưng</td>
                                </tr>
                                <tr>
                                    <td>Bảo hành chính hãng 12 tháng.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button onClick={addCart} className="buy">Mua ngay</button>
                </div>
                <div className="right">
                    <h5>Thông số kỹ thuật</h5>
                    {product.desc}
                </div>
            </div>
        </div>
    );
}