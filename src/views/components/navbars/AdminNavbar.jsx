import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { authLogout } from '../../../store/actions/auth';

import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Navbar,
  NavItem,
  Nav,
  Container,
  Input,
  Form,
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { resetAuth } from "../../../store/actions/auth";

class AdminNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: props.user.email,
      password: "",
      responseErrors: "",
      isModal: false,
      auth_name: props.user.name,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({ auth_name: nextProps.user.name });
    }
  }

  logOut() {
    this.props.authLogout();
  }

  resetLog() {
    this.setState({ isModal: true });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.resetAuth({ email, password });
  }

  render() {
    const { isModal, email, password } = this.state;
    return (
      <>
        <Navbar
          className={classnames(
            "navbar-top navbar-expand border-bottom",
            { "navbar-dark bg-info": this.props.theme === "dark" },
            { "navbar-light bg-secondary": this.props.theme === "light" }
          )}
        >
          <Container fluid>
            <Collapse navbar isOpen={true}>
              <Nav className="align-items-center ml-md-auto" navbar>
                <NavItem className="d-xl-none">
                  <div
                    className={classnames(
                      "pr-3 sidenav-toggler",
                      { active: this.props.sidenavOpen },
                      { "sidenav-toggler-dark": this.props.theme === "dark" }
                    )}
                    onClick={this.props.toggleSidenav}
                  >
                    <div className="sidenav-toggler-inner">
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                    </div>
                  </div>
                </NavItem>
              </Nav>
              <Nav className="align-items-center ml-auto ml-md-0" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle className="nav-link pr-0" color="" tag="a">
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img
                          alt="..."
                          src={require("assets/img/theme/avatar.jpg")}
                        />
                      </span>
                      <Media className="ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm font-weight-bold">
                          {this.state.auth_name}
                        </span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <Modal
                    isOpen={isModal}
                    toggle={() => {
                      this.setState({ isModal: !this.state.isModal });
                    }}
                  >
                    <Form
                      role="form"
                      method="POST"
                      onSubmit={this.handleSubmit}
                    >
                      <ModalHeader color="primary">Credential Reset</ModalHeader>
                      <ModalBody>
                        <FormGroup>
                          <label htmlFor="emailFormControlInput">
                            New Email
                          </label>
                          <Input
                            name="email"
                            ref="email"
                            required
                            placeholder="Please enter your new email"
                            value={email}
                            type="email"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="passwordFormControlInput">
                            New Password
                          </label>
                          <Input
                            name="password"
                            ref="password"
                            required
                            type="password"
                            placeholder="Please enter your new password"
                            value={password}
                            onChange={this.handleChange}
                            minLength="6"
                          >
                          </Input>
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="secondary"
                          onClick={e => {
                            this.setState({ isModal: false });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button color="primary" type="submit">
                          Save Changes
                        </Button>
                      </ModalFooter>
                    </Form>
                  </Modal>
                  <DropdownMenu right>
                    <DropdownItem className="noti-title" header tag="div" >
                      <h6 className="text-overflow m-0" style={{ 'cursor': 'pointer' }}>Welcome!</h6>
                    </DropdownItem>
                    <DropdownItem
                      onClick={e => this.resetLog()}
                      style={{ 'cursor': 'pointer' }}
                    >
                      <i className="ni ni-settings-gear-65" />
                      <span>Settings</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      onClick={e => this.logOut()}
                      style={{ 'cursor': 'pointer' }}
                    >
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

AdminNavbar.defaultProps = {
  toggleSidenav: () => { },
  sidenavOpen: false,
  theme: "dark"
};

AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"])
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

export default connect(mapStateToProps, { authLogout, resetAuth })(withRouter(AdminNavbar));