import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

class AuthHeader extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-gradient-info py-7 py-lg-7 pt-lg-9">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col className="px-5" lg="6" md="8" xl="5">
                  {this.props.title ? (
                    <h1 className="text-white">{this.props.title}</h1>
                  ) : null}
                  {this.props.lead ? (
                    <p className="text-lead text-white">{this.props.lead}</p>
                  ) : null}
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
      </>
    );
  }
}

AuthHeader.propTypes = {
  title: PropTypes.string,
  lead: PropTypes.string
};

export default AuthHeader;
