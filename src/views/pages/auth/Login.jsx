import React from "react";
import classnames from "classnames";
import { connect } from 'react-redux';
import ReeValidate from 'ree-validate';

import {
  UncontrolledAlert,
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import AuthHeader from "../../components/headers/AuthHeader.jsx";
import { authLogin } from '../../../store/actions/auth';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  constructor() {
    super();

    this.validator = new ReeValidate({
      email: 'required|email',
      password: 'required|min:6'
    });
  }
  
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.responseErrors &&
      nextProps.responseErrors != this.state.responseErrors
    ) {
      this.setState({
        responseErrors: nextProps.responseErrors
      });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    const { errors } = this.state;
    if (name in errors) {
      const validation = this.validator.errors;
      this.validator.validate(name, value).then(() => {
        if (!validation.has(name)) {
          delete errors[name];
          this.setState({ errors });
        }
      });
    }
  }

  handleBlur = (e) => {
    const { name, value } = e.target;

    if (value === '') {
      return;
    }

    const validation = this.validator.errors;
    this.validator.validate(name, value).then(() => {
      if (validation.has(name)) {
        const { errors } = this.state;
        errors[name] = validation.first(name);
        this.setState({ errors });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const credentials = {
      email,
      password,
    };

    this.validator.validateAll(credentials)
      .then((success) => {
        if (success) {
          this.props.authLogin(credentials);
        }
      });
  }

  render() {
    const { errors,responseErrors } = this.state;

    return (
      <>
        <AuthHeader
          title="SKU Generator"
          lead="This system will help you generate the sku numbers easily with one mouse click."
        />
        <Container className="mt--9 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <big>Welcome to SKU Generator</big>
                  </div>
                  {responseErrors && (
                    <UncontrolledAlert color="warning">
                      <span className="alert-text ml-1">
                        <strong dangerouslySetInnerHTML={{ __html: responseErrors }}></strong>
                      </span>
                    </UncontrolledAlert>
                  )}
                  <Form role="form" method="POST" onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <InputGroup className="input-group-merge input-group-alternative mb-3" className={classnames()}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          name="email"
                          onBlur={this.handleBlur}
                          onChange={this.handleChange}
                          invalid={'email' in errors}
                        />
                        <div className="invalid-feedback ml-5">
                          {errors.email}
                        </div>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-merge input-group-alternative" className={classnames()}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          name="password"
                          onBlur={this.handleBlur}
                          onChange={this.handleChange}
                          invalid={'password' in errors}
                        />
                        <div className="invalid-feedback ml-5">
                          {errors.password}
                        </div>
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button color="info" type="submit">
                        Sign In
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isLogin: auth.isLogin,
  responseErrors: auth.errors,
  message: auth.message
});

export default connect(mapStateToProps, { authLogin })(Login);
