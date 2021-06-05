import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableProduct from './TableProduct';
import './details.css'

export default function Products() {
    const [products, setProducts] = useState([])
    const [samsung, setSamsung] = useState([])
    const [iphone, setIphone] = useState([])
    const [colorS, setColorS] = useState("#007bff")
    const [colorI, setColorI] = useState("#FFFFFF")

    const fetchData = () => {
        var array = []
        var array1 = []
        var array2 = []
        axios.get('http://localhost:4000/products')
            .then(response => {
                array = response.data
                console.log(array);
                for (let i = array.length - 1; i >= 0; i--) {
                    if (array[i].company === 'samsung') {
                        array1.push(array[i])
                    }
                    if (array[i].company === 'iphone') {
                        array2.push(array[i])
                    }
                }
                setSamsung(array1)
                setIphone(array2)
                setProducts(array1)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
    const goCategory = (e) => {
        if(e.target.value=="iphone"){
            setProducts(iphone)
            setColorI("#007bff")
            setColorS("#FFFFFF")
        }else{
            setProducts(samsung)
            setColorS("#007bff")
            setColorI("#FFFFFF")
        }
    }
    const tabRow = () => {
        return products.map(function (object, i) {
            return <TableProduct obj={object} key={i} update={fetchData} />;
        });
    }
    return (
        <div>
            <h3 align="center">Danh sách sản phẩm</h3>
            <div className="row">
                <button type="button" class="gocategory" style={{ backgroundColor: colorS }}
                    onClick={goCategory} value="samsung"
                >
                    Samsung
                </button>
                <button type="button" class="gocategory" style={{ backgroundColor: colorI }}
                    onClick={goCategory} value="iphone"
                >iPhone</button>
            </div>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        <th>Tên</th>
                        <th>Cấu hình</th>
                        <th>Giá (đ)</th>
                        <th>Ảnh</th>
                        <th colSpan="2" style={{width: 20+"%"}}></th>
                    </tr>
                </thead>
                <tbody>
                    {tabRow()}
                </tbody>
            </table>
        </div>
    );
}