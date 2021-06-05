import React, { Component } from 'react';
import axios from 'axios';
import Product from './product'
import { Link } from 'react-router-dom';
import Slideshow from './Banner';
import { AiFillApple } from "react-icons/ai";
import './home.css'
import { FcTwoSmartphones } from "react-icons/fc";

import img1 from './images/01.png';
import img2 from './images/02.png';
import img3 from './images/03.png';

const collection = [
    { src: img1, caption: "Caption one" },
    { src: img2, caption: "Caption two" },
    { src: img3, caption: "Caption three" },
];

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            samsung: [],
            iphone: []
        };
    }

    componentDidMount() {
        var array = []
        var array1 = []
        var array2 = []
        axios.get('http://localhost:4000/products')
            .then(response => {
                array = response.data
                console.log(array);
                for (let i = array.length - 1; i >= 0; i--) {
                    if ((array[i].company === 'samsung') & (array1.length < 5)) {
                        array1.push(array[i])
                    }
                    if ((array[i].company === 'iphone') & (array2.length < 5)) {
                        array2.push(array[i])
                    }
                }
                this.setState({ samsung: array1 })
                this.setState({ iphone: array2 })
                this.setState({ products: response.data });
                //console.log(this.state.products)
            })
            .catch(function (error) {
                console.log(error);
            })

    }
    samsung() {
        return this.state.samsung.map(function (object, i) {
            return <Product obj={object} key={i} />;
        });
    }
    iphone() {
        return this.state.iphone.map(function (object, i) {
            return <Product obj={object} key={i} />;
        });
    }
    render() {
        return (
            <div>
                <Slideshow
                    input={collection}
                    ratio={`6:1`}
                    mode={`automatic`}
                    timeout={5000}
                />
                <Link to={"/category/"+"iphone"}>
                <div class="p-2 bg-primary order-1 phone iphone"><AiFillApple size="1.5em" /> iPhone</div>
                </Link>
                <div>
                    <div className="row">
                        {this.iphone()}
                    </div>
                </div>
                <Link to={"/category/"+"samsung"}>
                <div class="p-2 bg-primary order-1 phone">SAMSUNG</div>
                </Link>
                <div>
                    <div className="row">
                        {this.samsung()}
                    </div>
                </div>
            </div>
        );
    }
}