import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NotFound from "./components/notFound";
import Navbar from "./components/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ProfileForm from "./components/profileForm";
import PasswordResetForm from "./components/passwordResetForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import Products from "./components/products";
import ProductForm from "./components/productForm";
import Categorys from "./components/categorys";
import CategoryForm from "./components/categoryForm";
import Orders from "./components/orders";
import OrderForm from "./components/orderForm";
import Statuss from "./components/statuss";
import StatusForm from "./components/statusForm";

class App extends Component {

  state = {};
  //we wanted to show currently loggedin userName to the Navbar so we get user set in state and passed to Navbar component
  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = async () => {
    try {
      const {data:user} = await auth.getCurrentUser();
      this.setState({ user });
    }
    catch (ex) {
      console.log(ex.message);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navbar user={this.state.user} />
        <main role="main" className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />      
            
            {/* following is a protected route only loggedIn user can access it */}
            <Route
                path="/products/:id"
                render={props => {
                  if (!auth.isUserLoggedIn()) return <Redirect to="/login" />;
                  return <ProductForm {...props} />;
                }}
            />
            <Route
                path="/products"
                render={props => {
                  if (!auth.isUserLoggedIn()) return <Redirect to="/login" />;
                  return <Products {...props} />;
                }}
            />

            <Route
                path="/categorys/:id"
                render={props => {
                  if (!auth.isUserLoggedIn()) return <Redirect to="/login" />;
                  return <CategoryForm {...props} />;
                }}
            />
            <Route
                path="/categorys"
                render={props => {
                  if (!auth.isUserLoggedIn()) return <Redirect to="/login" />;
                  return <Categorys {...props} />;
                }}
            />

            <Route
                path="/orders/:id"
                render={props => {
                  if (!auth.isUserLoggedIn()) return <Redirect to="/login" />;
                  return <OrderForm {...props} />;
                }}
            />
            <Route
                path="/orders"
                render={props => {
                  if (!auth.isUserLoggedIn()) return <Redirect to="/login" />;
                  return <Orders {...props} />;
                }}
            />

            <Route
                path="/statuss/:id"
                render={props => {
                  if (!auth.isUserLoggedIn()) return <Redirect to="/login" />;
                  return <StatusForm {...props} />;
                }}
            />
            <Route
                path="/statuss"
                render={props => {
                  if (!auth.isUserLoggedIn()) return <Redirect to="/login" />;
                  return <Statuss {...props} />;
                }}
            />

            <Route
                path="/profile"
                render={props => {
                  if (!auth.isUserLoggedIn()) return <Redirect to="/login" />;
                  return <ProfileForm {...props} user={this.state.user} />;
                }}
            />
            <Route
                path="/updatePassword/:id"
                render={props => {
                  if (!auth.isUserLoggedIn()) return <Redirect to="/login" />;
                  return <PasswordResetForm {...props} user={this.state.user} />;
                }}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/products" />

            <Redirect to="/not-found" />
          </Switch>
        </main>

      </React.Fragment>
    );
  }
}

export default App;
