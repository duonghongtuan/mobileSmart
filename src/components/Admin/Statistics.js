import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Statistics() {
    const [array, setArray] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/indexHistory')
            .then(response => {
                setArray(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
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
        <div>
            <div>
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
