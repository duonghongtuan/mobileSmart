import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./cart.css"

export default function TableCart({ obj, fetchData }) {
    const [quantity, setQuantity] = useState(obj.quantity)
    const [amount, setAmount] = useState(obj.amount)

    const Delete = () => {
        axios.delete('http://localhost:4000/deleteCart/' + obj.id)
            .then(()=>{
                console.log('Deleted')
                fetchData()
            })
            .catch(err => console.log(err))
    }

    const addQuantity = () => {
        let q = quantity
        let a = Number(obj.price)
        q++
        setQuantity(q)
        setAmount(q * a)
        const array = {
            quantity: q,
            amount: a * q
        }
        axios.put('http://localhost:4000/editCart/' + obj.id, array)
            .then(res => {
                console.log("succeed")
                fetchData()
            });

    }
    const subQuantity = () => {
        let q = quantity
        q--
        setQuantity(q)
        if (q == 0) {
            axios.delete('http://localhost:4000/deleteCart/' + obj.id)
                .then(res => {
                    console.log("Deleted")
                    fetchData()
                })
                .catch(err => console.log(err))
        } else {
            let a = Number(obj.price)
            setAmount(q * a)
            const array = {
                quantity: q,
                amount: q * a
            }
            axios.put('http://localhost:4000/editCart/' + obj.id, array)
                .then(res => {
                    console.log("succeed")
                    fetchData()
                });
        }

    }
    let x = obj.price
    let y = obj.amount
    let z = y.toString()
    var price = x.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    var a = z.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    return (
        <tr style={{textAlign: 'center'}}>
            <td>
                <img style={{ maxHeight: 100, maxWidth: 100 }}
                    src={obj.image} className="rounded" alt="" />
            </td>
            <td>
                {obj.name}
            </td>
            <td>
                {price} đ
            </td>
            <td>
                <button className="btn-primary" style={{ width: 28 }} onClick={subQuantity}>-</button>
                <span style={{ padding: 10 }}>{quantity}</span>
                <button className="btn-primary" onClick={addQuantity}>+</button>
            </td>
            <td>
                {a} đ
            </td>
            <td>
                <button onClick={Delete} className="btn btn-danger">Xóa</button>
            </td>
        </tr>
    )
}
