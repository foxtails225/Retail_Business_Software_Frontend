import React from "react";
import { connect } from "react-redux";
import NotificationAlert from "react-notification-alert";
import LoadingOverlay from "react-loading-overlay";

import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Container,
  Button,
  CustomInput,
  Form,
} from "reactstrap";

import MainHeader from "../../components/headers/MainHeader";
import http from "../../../helper/http";
import APP_CONST from "../../../helper/constant";

class TradeMarkCheck extends React.Component {
  state = {
    isActive: false,
    isShowResult: false,
    selectedFile: null,
    count: 0,
    fileName: "",
  };

  showNotification = (message) => {
    let options = {
      place: "tr",
      message: (
        <div className="alert-text">
          <span
            className="alert-title"
            data-notify="title"
            dangerouslySetInnerHTML={{ __html: message }}
          ></span>
        </div>
      ),
      type: "success",
      icon: "ni ni-bell-55",
      autoDismiss: 7,
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  onChangeHandler = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  onFileUploadHandler = (event) => {
    event.preventDefault();
    if (this.state.selectedFile) {
      this.setState({
        isActive: true,
        isShowResult: false,
        count: 0,
        fileName: 0,
      });
      const data = new FormData();
      data.append("csv", this.state.selectedFile);
      http
        .post(`${APP_CONST.API_URL}/trademark/uploadCheck`, data, {})
        .then((res) => {
          this.setState({
            isActive: false,
            isShowResult: true,
            count: res.data.data.result.count,
            fileName: res.data.data.result.downloadFile,
          });
          this.showNotification(res.data.data.message);
        });
    }
  };

  render() {
    return (
      <>
        <MainHeader name="Trademark Check" parentName="Trademark" />
        <Container className="mt--6 setting-container" fluid>
          <LoadingOverlay
            active={this.state.isActive}
            spinner
            text="Uploading file and checking. Just a wait. It takes several minutes ..."
          >
            <Card style={{ minHeight: "700px" }}>
              <CardBody>
                <div className="rna-wrapper">
                  <NotificationAlert ref="notificationAlert" />
                </div>
                <Row>
                  <Col md={8}>
                    <Form role="form" onSubmit={this.onFileUploadHandler}>
                      <h4 className="dropbox-title">Upload Check</h4>
                      <hr />
                      <Row>
                        <Col md={8}>
                          <FormGroup className="upload_file">
                            <CustomInput
                              type="file"
                              id="file"
                              name="file"
                              label="Choose CSV Files"
                              onChange={this.onChangeHandler.bind(this)}
                              className="form-control form-control"
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <Button type="submit" color="primary">
                            Start Check
                          </Button>
                        </Col>
                      </Row>
                      {this.state.isShowResult && (
                        <Row>
                          <Col md={6}>
                            <p className="mb-4 card-text">
                              Result Count: {this.state.count}
                            </p>
                            <a
                              href={
                                APP_CONST.BASE_URL + "/" + this.state.fileName
                              }
                              target="_blank"
                              className="btn btn-primary"
                              rel="noopener noreferrer"
                            >
                              Download
                            </a>
                          </Col>
                        </Row>
                      )}
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </LoadingOverlay>
        </Container>
      </>
    );
  }
}

export default connect(null, {})(TradeMarkCheck);
