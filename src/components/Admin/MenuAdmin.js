import React from 'react'
import "./Admin.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import FileUpload from '../product/file-upload';
import Products from '../product/products';
import Index from '../person/index.component';
import Statistics from './Statistics';

export default function MenuAdmin() {
    return (
        <div className="menuAdmin">
            <div className="menu">
                <div className="admin"><h3>ADMIN</h3></div>
                <div className="tabMenu">
                    <NavLink to={'/admin/statistics'} activeClassName="activeMenu">Sản phẩm được mua</NavLink>
                </div>
                <div className="tabMenu">
                    <NavLink to={'/admin/index'} activeClassName="activeMenu">Danh sách khách Hàng</NavLink>
                </div>
                <div className="tabMenu">
                    <NavLink to={'/admin/productup'} activeClassName="activeMenu">
                        Thêm sản phẩm
                        </NavLink>
                </div>
                <div className="tabMenu">
                    <NavLink to={'/admin/products'} activeClassName="activeMenu">
                        Danh sách sản phẩm
                        </NavLink>
                </div>
            </div>
            <div className="mainMenu">
                <Switch>
                    <Route exact path='/admin/productup' component={FileUpload} />
                    <Route path='/admin/statistics' component={Statistics} />
                    <Route path='/admin/index' component={Index} />
                    <Route path='/admin/products' component={Products} />
                </Switch>
            </div>
        </div>
    )
}
