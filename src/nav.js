import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "./App.css"
import SearchProducts from './components/home/SearchProducts';

function Nav() {
    const [name, setName] = useState('')
    const history = useHistory();
    const [user, setUser] = useState({})
    const [products, setProducts] = useState([])
    const [array, setArray] = useState([])
    const [modal, setModal] = useState(true)
    

    useEffect(() => {
        let x = localStorage.getItem("user")
        axios.get('http://localhost:4000/products')
            .then(response => {
                setArray(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
        if (x != null) {
            setUser(JSON.parse(x).user)
        }

    }, [])

    const logout = () => {
        localStorage.clear()
        setUser({})
        history.push("/")
    }
    const Search = () => {
        setModal(!modal)
        if (name === '') {
            history.push("/")
        } else {
            history.push("/search/" + name)
        }
    }
    const SearchProduct = (e) => {
        setModal(true)
        setName(e.target.value)
        let array1 = []
        if (e.target.value === '') {
            setProducts([])
        } else {
            let regex = new RegExp(e.target.value, "i")
            for (let i = 0; i < array.length; i++) {
                if (array[i].name.search(regex) !== -1) {
                    if (array1.length < 5) {
                        array1.push(array[i])
                    }
                }
            }
            setProducts(array1)
        }
        console.log()

    }
    const offMoadl = () => {
        setModal(!modal)
    }
    return (
        <div className="header">
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Link to={"/"} className="navbar-brand ">
                        <div className="buy logo">mobileSmart</div>
                    </Link>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-link">
                            <NavLink exact to={'/'} activeClassName="active">Trang chủ</NavLink>
                        </li>
                        {user.role ?
                            <li className="nav-link">
                                <NavLink to={'/profile'} activeClassName="active">Tài khoản</NavLink>
                            </li>
                            : null
                        }
                        <li className="nav-link">
                            <NavLink to={'/cart'} activeClassName="active">Giỏ hàng</NavLink>
                        </li>
                        {user.role === "admin" ?
                            <li className="nav-link">
                                <NavLink to={'/admin/statistics'} activeClassName="active">Admin</NavLink>
                            </li>
                            : null
                        }

                    </ul>
                    <div className="form-inline">
                        <input class="form-control mr-sm-2" type="text" placeholder="Tìm kiếm"
                            value={name} onChange={SearchProduct}
                        />
                        <button class="btn btn-success" onClick={Search} >Tìm kiếm</button>
                        {modal === true ?
                            <div className="column">
                                {products.map((item, index) => {
                                    return <SearchProducts item={item} key={index} offModal={offMoadl} />
                                })}
                            </div>
                            : null}
                    </div>

                    {user.username ?
                        <DropdownButton id="dropdown-basic-button" title={user.username}
                            style={{ marginLeft: 8 }}
                        >
                            <Dropdown.Item href="#/action-1" onClick={logout} >Đăng xuất</Dropdown.Item>
                        </DropdownButton>
                        :
                        <NavLink to={'/login'} activeClassName="nav-item active" style={{ marginLeft: 8 }}>Đăng nhập</NavLink>
                    }
                </div>
            </nav>
        </div >
    )
}


export default Nav