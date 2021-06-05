import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Product from './product'
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Search({ match }) {
    const history = useHistory();
    const [products, setProducts] = useState([])
    const [abc, setabc] = useState(0)
    const fetchData = () => {
        axios.get('http://localhost:4000/products')
            .then(response => {
                let array = []
                let array1 = []
                array = response.data
                console.log(array);
                let name = match.params.name
                let regex = new RegExp(name, "i")

                for (let i = 0; i < array.length; i++) {
                    if (array[i].name.search(regex) != -1) {
                        array1.push(array[i])
                    }
                }
                setProducts(array1)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useMemo(() => (
        fetchData()
    ), [match.params.name])
    // useEffect(() => {
    //     fetchData()
    // }, [])  
    var array = []
    const SortUp = () => {
        array = products.sort((a, b) => {
            return a.price - b.price
        })
        setabc(3)
        setProducts(array)
    }
    const SortUp2 = () => {
        array = products.sort((a, b) => {
            return a.price - b.price
        })
        array.reverse()
        setabc(2)
        setProducts(array)
    }
    const Products = () => {
        return products.map(function (object, i) {
            return <Product obj={object} key={i} />;
        });
    }
    return (
        <div>
            <div>
                {products.length === 0 ?
                    <p>
                        không tìm thấy kết quả nào phù hợp với từ khóa "{match.params.name}"
                    </p>
                    : <div className="btn-group" style={{ marginBottom: 10 }}>
                        <button onClick={SortUp} className="btn"
                            style={{ marginRight: 10,marginLeft: 2+"em" }}>
                            Giá: Thấp - cao
                        </button>
                        <button onClick={SortUp2} className="btn">
                            Giá: Cao - thấp
                        </button>
                    </div>
                }
            </div>
            <div>
                {products.map(function (object, i) {
                    return <Product obj={object} key={i} />;
                })}
            </div>
        </div>
    )
}
