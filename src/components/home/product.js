import React, { Component } from 'react';
import './home.css'
import { useHistory } from 'react-router-dom'

export default function Product({obj}) {
    const history = useHistory()

    const goDetails = () => {
        history.push('/details/' + obj._id)
    }
    let x = obj.price
    var a = x.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return (
        <div className="listProducts" onClick={goDetails}>
            <div>
                <img src={obj.image} className="img" alt="" />
            </div>
            <div className="name">{obj.name}</div>
            <div id="price">{a} đ</div>
        </div>
    );
}