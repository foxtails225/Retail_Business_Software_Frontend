import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
// plugins styles downloaded
import "assets/vendor/fullcalendar/dist/fullcalendar.min.css";
import "assets/vendor/sweetalert2/dist/sweetalert2.min.css";
import "assets/vendor/select2/dist/css/select2.min.css";
import "assets/vendor/quill/dist/quill.core.css";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// core styles
import "assets/scss/dashboard.scss?v1.0.0"; 

import { Provider } from "react-redux";
import AdminLayout from "views/layouts/Admin.jsx";
import AuthLayout from "views/layouts/Auth.jsx";
import { authCheck } from "./store/actions/auth";
import store from "./store";
import ProductDetail from "views/pages/product/ProductDetail.jsx";

store.dispatch(authCheck());

const app = (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/main" component={AdminLayout} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/main/product-detail/:id" component={ProductDetail}/>
        <Redirect from="*" to="/auth/login" />
      </Switch>
    </HashRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
