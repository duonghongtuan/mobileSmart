import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Create from './components/person/create.component';
import Edit from './components/person/edit.component';
import Index from './components/person/index.component';
import Home from './components/home/home';
import Details from './components/product/details';
import Cart from './components/cart/cart';
import Login from './components/login/login';
import Nav from './nav'
import Category from './components/home/category';
import Search from './components/home/Search';
import Admin from './components/Admin/Admin';
import MenuAdmin from './components/Admin/MenuAdmin';
import Profile from './components/person/profile';

class App extends Component {
    render() {
        return (
            <Router>
                <Nav />
                <br/>
                <div className="container-fluid" style={{marginTop:3+"rem"}}>               
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/create' component={Create} />
                        <Route path='/edit/:id' component={Edit} />
                        <Route path='/index' component={Index} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/details/:id' component={Details} />
                        <Route path='/cart' component={Cart} />
                        <Route path='/login' component={Login} />
                        <Route path='/category/:id' component={Category} />
                        <Route path='/search/:name' component={Search} />
                        <Route path='/admin' component={Admin}>
                            <MenuAdmin />
                            
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;