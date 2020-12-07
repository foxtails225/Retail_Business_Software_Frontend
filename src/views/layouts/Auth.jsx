import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { authRoutes } from "routes.js";


class Auth extends React.Component {
  componentWillMount() {
    if (this.props.isLogin) {
      this.props.history.push('/main/product-list');
    }
  }
  componentWillUpdate(nextProps) {
    if (nextProps.isLogin) {
      this.props.history.push('/main/product-list');
    }
  }

  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  componentDidUpdate(e) {
    if (e.history.pathname !== e.location.pathname) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainContent.scrollTop = 0;
    }
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    });
  };
  render() {
    return (
      <>
        <div className="main-content" ref="mainContent">
          <Switch>{this.getRoutes(authRoutes)}</Switch>
        </div>
      </>
    );
  }
}

function mapStateToProps({ auth }) {
  return { isLogin: auth.isLogin };
}

export default connect(mapStateToProps)(withRouter(Auth));
