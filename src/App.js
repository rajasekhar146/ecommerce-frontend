import './App.css';
import React, { useEffect } from 'react'
import Layout from '../src/components/layouts'
import {
  Route,
  Switch
} from 'react-router-dom';
import Home from './containers/home'
import Signin from './containers/signin'
import Signup from './containers/signup'
import PrivateRoute from './components/privateroute'
import ProductsPage from './containers/productspage';
import OrdersPage from './containers/orders'
import CategoryPage from './containers/categories'
import AuthStore from './stores/authstore'
import {
  getAuthToken,
  getFromLocalStorage
} from './utils';



function App() {

  useEffect(() => {
    AuthStore.set({ authToken: getAuthToken() })
    AuthStore.set({ user: getFromLocalStorage('user') })
  }, [])

  

  return (
    <div className="App">
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/products" component={ProductsPage} />
            <PrivateRoute path="/orders" component={OrdersPage} />
            <PrivateRoute path="/category" component={CategoryPage} />


            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
          </Switch>
      
    </div>
  );
}

export default App;
