import React, { useState, useEffect } from 'react';
import './cart.css'
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import moment from 'moment'

export default function CuccessOder({ obj, item }) {
    const history = useHistory()
    const [listName, setListName] = useState('')
    useEffect(() => {
        var name = ''
        for (let i = 0; i < item.length; i++) {
            if (i===0) {
                name = item[i].name
            } else {
                name = name + ', ' + item[i].name
            }
        }
        setListName(name)
        var array={
            idUser: item[0].idUser,
            user: obj.name,
            phone: obj.phone,
            products: name,
            address: obj.city + ", " + obj.district + ", " + obj.ward + ', ' + obj.home,
            date: moment().format('L'),
            quantity: obj.quantity,
            total: obj.totalNum
        }
        axios.post('http://localhost:4000/createHistory', array)
            .then(res => {
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    const goHome=()=>{
        axios.delete('http://localhost:4000/deleteAllCart')
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
        history.push('/')
    }
    return (
        <div className="cuccessOder">
            <div className="content ">
                <div className="title cuccess">Đơn hàng đã đặt thành công</div>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td style={{ width: 30 + "%" }}>Tên sản phẩm:</td>
                            <td style={{ width: 70 + "%" }}>{listName}</td>
                        </tr>
                        <tr>
                            <td>Số lượng:</td>
                            <td>{obj.quantity}</td>
                        </tr>
                        <tr>
                            <td>Người nhận:</td>
                            <td>{obj.name}</td>
                        </tr>
                        <tr>
                            <td>Số điện thoại</td>
                            <td>{obj.phone}</td>
                        </tr>
                        <tr>
                            <td>Thời gian đặt:</td>
                            <td>{moment().format('L')}</td>
                        </tr>
                        <tr>
                            <td>Địa chỉ nhận hàng:</td>
                            <td>{obj.city + ", " + obj.district + ", " + obj.ward + ', ' + obj.home}</td>
                        </tr>
                        <tr>
                            <td>Tổng tiền:</td>
                            <td>{obj.total} đ</td>
                        </tr>
                    </tbody>
                </table>
                <div className="order">
                    <button type="button" onClick={goHome} className="buy" >Thoát</button>
                </div>
            </div>
        </div>
    )
}
