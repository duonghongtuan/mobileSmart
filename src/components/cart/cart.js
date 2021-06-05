import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableCart from './tableCart';
import Order from './order';


export default function Cart() {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState()
    const [totalNum, setTotalNum] = useState()
    const [order, setOrder] = useState(false)

    const fetchData = () => {
        let x = localStorage.getItem("user")
        var ID ="1010101"
        if (x != null) {
            ID = JSON.parse(x).user._id
        }
        var array = []
        var array1 = []
        axios.get('http://localhost:4000/indexCart')
            .then(response => {
                console.log(response.data);
                var obj = response.data
                var array2 =[]
                for (let i = 0; i < obj.length; i++) {
                    if (ID === obj[i].idUser) {
                        array2.push(obj[i])
                    }
                }
                axios.get('http://localhost:4000/products')
                    .then(response => {
                        array = response.data
                        let T = 0
                        for (let i = 0; i < array2.length; i++) {
                            T = T + array2[i].amount
                            for (let j = 0; j < array.length; j++) {
                                if (array2[i].idProduct === array[j]._id) {
                                    let product = {
                                        idUser: array2[i].idUser,
                                        id: array2[i]._id,
                                        name: array[j].name,
                                        image: array[j].image,
                                        quantity: array2[i].quantity,
                                        price: array[j].price,
                                        amount: array2[i].amount,
                                    }
                                    array1.push(product)
                                    console.log(product)
                                }
                            }
                        }

                        setProducts(array1)
                        setTotalNum(T)
                        let x = T.toString()
                        let y = x.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        setTotal(y)
                    })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchData()
    }, [])
    const goOrder = () => {
        setOrder(!order)
    }
    const tabRow = () => {
        return products.map((object, i) => {
            return <TableCart obj={object} key={i} fetchData={fetchData} />;
        });
    }

    return (
        <div>
            <h3 align="center">Giỏ Hàng</h3>
            {products.length === 0 ? null :
                <div>
                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th colSpan="2" style={{ width: 40 + '%' }}>Sản phẩm</th>
                                <th style={{ width: 15 + '%' }}>Giá</th>
                                <th style={{ width: 10 + '%' }}>Số lượng</th>
                                <th style={{ width: 20 + '%' }}>Thành tiền</th>
                                <th style={{ width: 15 + '%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabRow()}
                        </tbody>
                    </table>
                    <div>
                        <button className="buy" style={{ width: 25 + '%', padding: 5 }}
                            onClick={goOrder}
                        >
                            Tiến hành đặt hàng
                        </button>
                        {order === true ?
                            <Order item={products} total={total} goCart={goOrder} totalNum={totalNum} />
                            : null}
                        <span style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 20 }} >
                            Tổng tiền:
                        </span>
                        <span style={{ color: 'red', marginLeft: 5, fontSize: 20 }}>
                            {total} đ
                        </span>
                    </div>
                </div>
            }
        </div >
    )
}