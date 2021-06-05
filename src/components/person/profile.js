import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "./profile.css"

export default function Profile() {
    const history = useHistory();
    const [user, setUser] = useState({})
    const [array, setArray] = useState([])

    useEffect(() => {
        let x = localStorage.getItem("user")
        var ID
        if (x != null) {
            setUser(JSON.parse(x).user)
            ID = JSON.parse(x).user._id
            console.log(JSON.parse(x).user._id)
        }
        axios.get('http://localhost:4000/indexHistory')
            .then(response => {
                let obj = response.data
                let array1 = []
                console.log(obj)
                for (let i = 0; i < obj.length; i++) {
                    if (ID === obj[i].idUser) {
                        array1.push(obj[i])
                    }
                }
                console.log(array1)
                setArray(array1)
            })
            .catch(function (error) {
                console.log(error);
            })

    }, [])

    const goEdit = () => {
        history.push('/edit/' + user._id)
    }
    const tabRow = () => {
        return (array.map((item, index) => {
            let x = (item.total).toString()
            let y = x.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            return (
                <tr key={index}>
                    <td>{item.user}<br />Số điện thoại: {item.phone}</td>
                    <td>{item.products}</td>
                    <td>{item.address}</td>
                    <td>{item.date}</td>
                    <td style={{ textAlign: "center" }}>{item.quantity}</td>
                    <td style={{ textAlign: "center" }}>{y} đ</td>
                </tr>
            )
        }))
    }
    return (
        <div className="container-profile">
            <div className="profile">
                <div className="divcenter"><h3>Tài Khoản</h3></div><hr />
                <div >
                    <table >
                        <tr >
                            <th>Tên:</th>
                            <td>{user.username}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{user.email}</td>
                        </tr>
                    </table>
                </div>
                <hr />
                <div className="divcenter">
                    <button type="button" class="btn btn-success" onClick={goEdit}>Chỉnh sửa</button>
                </div>
            </div>
            <div className="history">
                <div className="title-history"><h3>Lịch sử mua hàng</h3></div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th style={{ width: 15 + '%' }}>Người mua</th>
                            <th style={{ width: 20 + '%' }}>Sản phẩm</th>
                            <th style={{ width: 30 + '%' }}>Địa chỉ</th>
                            <th style={{ width: 10 + '%' }}>Ngày mua</th>
                            <th style={{ width: 10 + '%' }}>Số lượng</th>
                            <th style={{ width: 15 + '%' }}>Số tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabRow()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
