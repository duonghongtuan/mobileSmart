import React, { useEffect, useState } from 'react'
import Product from './product'
import axios from 'axios';
import "./home.css"

export default function Category({ match }) {
    const [products, setProducts] = useState([])
    const [sort, setsort] = useState(0)
    const [arraySort, setArraySort] = useState([])
    const fetchData = () => {
        axios.get('http://localhost:4000/products')
            .then(response => {
                let array = []
                let array1 = []
                array = response.data
                console.log(array);
                for (let i = array.length - 1; i >= 0; i--) {
                    if (array[i].company === match.params.id) {
                        array1.push(array[i])
                    }
                }
                setProducts(array1)
                setArraySort(array1)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    useEffect(() => {
        fetchData()
    }, [])

    var array = []
    const SortUp = () => {
        array = products.sort((a, b) => {
            return a.price - b.price
        })
        setsort(1)
        setProducts(array)
        array = []
    }
    const SortUp2 = () => {
        array = products.sort((a, b) => {
            return a.price - b.price
        })
        array.reverse()
        setsort(2)
        setProducts(array)
        array = []
    }

    const sortPrice = (e) => {
        let a, b
        let x = e.target.value
        switch (x) {
            case "0":
                a = 0
                b = 1999999
                break
            case "1":
                a = 2000000
                b = 3999999
                break
            case "2":
                a = 4000000
                b = 6999999
                break
            case "3":
                a = 7000000
                b = 9999999
                break
            case "4":
                a = 10000000
                b = 19999999
                break
            case "5":
                a = 20000000
                b = 100000000
                break
        }

        for (let i = 0; i < arraySort.length; i++) {
            let price = Number(arraySort[i].price)
            if ((price >= a) & (price <= b)) {
                array.push(arraySort[i])
            }
        }
        setProducts(array)
        array = []
    }

    const Prodcts = () => {
        return products.map(function (object, i) {
            return <Product obj={object} key={i} />;
        });
    }

    return (
        <div>
            <button style={{ color: "#007bff", marginLeft: 1.5 + "em", fontSize: 25 }} onClick={fetchData} className="btn">
                {match.params.id === "iphone" ? "Iphone" : "Samsung"}
            </button><br />
            <div className="btn-group" style={{ marginBottom: 10 }}>
                <button onClick={SortUp} className="btn priceSort"
                    style={{ marginLeft: 2 + "em" }}>
                    Giá : Thấp đến cao
                </button>
                <button onClick={SortUp2} className="btn priceSort">
                    Giá : Cao - thấp
                </button>
                <button onClick={sortPrice} className="btn priceSort" value="0">
                    Dưới 2 triệu
                </button>
                <button onClick={sortPrice} className="btn priceSort" value="1">
                    Từ 2 - 4 triệu
                </button>
                <button onClick={sortPrice} className="btn priceSort" value="2">
                    Từ 4 - 7 triệu
                </button>
                <button onClick={sortPrice} className="btn priceSort" value="3">
                    Từ 7 - 10 triệu
                </button>
                <button onClick={sortPrice} className="btn priceSort" value="4">
                    Từ 10 - 20 triệu
                </button>
                <button onClick={sortPrice} className="btn priceSort" value="5">
                    Trên 20 triệu
                </button>
            </div>
            {products.length===0?
                <div style={{ color: "red", fontSize: 20, textAlign: 'center' }}>
                    Không có sản phẩm phù hợp
                </div>
                : null
            }
            <div>
                {Prodcts()}
            </div>
        </div>
    )
}
