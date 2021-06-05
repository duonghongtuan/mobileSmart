import React, { useState, useEffect } from 'react';
import './cart.css'
import CuccessOder from './CuccessOder';
import { BiArrowBack } from "react-icons/bi";

export default function Order({ item, total, goCart, totalNum }) {
    const [quantity, setQuantity] = useState()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [city, setCity] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()
    const [home, setHome] = useState()
    const [modal, setModal] = useState(false)
    const [obj, setObj] = useState({})

    useEffect(() => {
        var count = 0
        for (let i = 0; i < item.length; i++) {
            count = item[i].quantity + count
        }
        setQuantity(count)
    }, [])

    const Cuccess = (event) => {
        if (name != null & phone != null & city != null & district != null & ward != null & home != null) {
            var x = {
                name: name,
                phone: phone,
                city: city,
                district: district,
                ward: ward,
                home: home,
                total: total,
                quantity: quantity,
                totalNum: totalNum
            }
            setObj(x)
            setModal(!modal)
            event.preventDefault()
        }

    }

    return (
        <div className="main">
            {modal == true ? <CuccessOder obj={obj} item={item} />
                : null}
            <div className="content">
                <div className="exit">
                    <button onClick={goCart} class="btn btn-light" >
                        <BiArrowBack size="2em" />
                    </button>
                </div>
                <div className="title">Tiến hành đặt hàng</div>
                <div className="info">
                    <span>Số sản phẩm: </span>
                    <span className="number">{quantity}</span><br />
                    <span>Tổng tiền: </span>
                    <span className="number">{total} đ</span>
                </div>
                <div className="info">Thông tin khách hàng</div>

                <form className=".needs-validation">
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Họ và tên" value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Số điện thoại" value={phone}
                                onChange={(e) => setPhone(e.target.value)} required
                            />
                        </div>
                    </div>
                    <div className="info">Địa chỉ nhận hàng</div>
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Tỉnh" value={city}
                                onChange={(e) => setCity(e.target.value)} required
                            />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Huyện" value={district}
                                onChange={(e) => setDistrict(e.target.value)} required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Phường/Xã" value={ward}
                                onChange={(e) => setWard(e.target.value)} required
                            />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Số nhà, tên đường" value={home}
                                onChange={(e) => setHome(e.target.value)} required
                            />
                        </div>
                    </div>
                    <div className="order">
                        <button type="submit" onClick={Cuccess} className="buy" >Đặt hàng</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
