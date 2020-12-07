import React from 'react';
import { connect } from 'react-redux';
import NotificationAlert from 'react-notification-alert';
import { updateSetting, getSetting } from '../../../../store/actions/setting';

import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Input,
  Container,
  Button,
  CustomInput,
  Form,
} from 'reactstrap';

import MainHeader from '../../../components/headers/MainHeader';
import http from '../../../../helper/http';
import APP_CONST from '../../../../helper/constant';

class Setting extends React.Component {
  state = {
    sku_number: '',
    brand: '',
    dropbox_root: '',
    product_create_guide: '',
    setting: [],
    responseErrors: '',
    allupdate: false,
    selectedFile: null,
    selectedUnUploadFile: null,
    message: '',
  };

  constructor(props) {
    super(props);
    this.props.getSetting();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.setting) {
      this.setState({
        setting: nextProps.setting,
        sku_number: nextProps.setting.sku_number,
        brand: nextProps.setting.brand,
        dropbox_root: nextProps.setting.dropbox_root,
        product_create_guide: nextProps.setting.product_create_guide
      });
    }

    if (nextProps.message) {
      this.showNotification(nextProps.message);
    }

    if (nextProps.responseErrors) {
      this.showNotification(nextProps.responseErrors);
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  showNotification = (message) => {
    let options = {
      place: 'tr',
      message: (
        <div className='alert-text'>
          <span
            className='alert-title'
            data-notify='title'
            dangerouslySetInnerHTML={{ __html: message }}
          ></span>
        </div>
      ),
      type: 'success',
      icon: 'ni ni-bell-55',
      autoDismiss: 7,
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  onSubmitSkuNumber = (e) => {
    e.preventDefault();
    const { sku_number } = this.state;
    this.props.updateSetting({
      value: sku_number,
      type: 'sku_number',
    });
  };

  onSubmitdropbox = (e) => {
    e.preventDefault();
    const { dropbox_root } = this.state;
    this.props.updateSetting({
      value: dropbox_root,
      type: 'dropbox_root',
    });
  };

  onSubmitBrandName = (e) => {
    e.preventDefault();
    const { brand } = this.state;
    this.props.updateSetting({
      value: brand,
      type: 'brand_name',
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  onChangeUnuploadHandler = (e) => {
    this.setState({
      selectedUnUploadFile: e.target.files[0],
    });
  };

  onSubmitProductCreateInstruction = (e) => {
    e.preventDefault();
    const { product_create_guide } = this.state;
    this.props.updateSetting({
      value: product_create_guide,
      type: 'product_create_guide',
    });
  };

  onFileUploadHandler = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('csv', this.state.selectedFile);
    http.post(`${APP_CONST.API_URL}/upload`, data, {}).then((res) => {
      this.showNotification(res.data.message);
    });
  };

  onFileUnUploadHandler = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('csv', this.state.selectedUnUploadFile);
    http.post(`${APP_CONST.API_URL}/unupload`, data, {}).then((res) => {
      this.showNotification(res.data.message);
    });
  };

  render() {
    return (
      <>
        <MainHeader name='Setting' parentName='Setting' />
        <Container className='mt--6 setting-container' fluid>
          <Card style={{ minHeight: '700px' }}>
            <CardBody>
              <div className='rna-wrapper'>
                <NotificationAlert ref='notificationAlert' />
              </div>
              <Row>
                <Col md={4}>
                  <Form
                    role='form'
                    method='POST'
                    onSubmit={this.onSubmitSkuNumber}
                  >
                    <h4 className='sku-title'>SKU Number</h4>
                    <hr />
                    <Row>
                      <Col md={8}>
                        <FormGroup className='sku-number'>
                          <Input
                            type='text'
                            name='sku_number'
                            value={this.state.sku_number}
                            onChange={this.handleChange}
                            placeholder='Enter SKU Number'
                            className='form-control form-control'
                            required
                            maxLength='5'
                            minLength='5'
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <Button type='submit' color='primary'>
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col md={4}>
                  <Form
                    role='form'
                    method='POST'
                    onSubmit={this.onSubmitBrandName}
                  >
                    <h4 className='brand-title'>Brand </h4>
                    <hr />
                    <Row>
                      <Col md={8}>
                        <FormGroup className='brand-name'>
                          <Input
                            type='text'
                            name='brand'
                            value={this.state.brand}
                            onChange={this.handleChange}
                            placeholder='Enter Brand'
                            className='form-control form-control'
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <Button type='submit' color='primary'>
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col md={4}>
                  <Form
                    role='form'
                    method='POST'
                    onSubmit={this.onSubmitdropbox}
                  >
                    <h4 className='dropbox-title'>Drop Box</h4>
                    <hr />
                    <Row>
                      <Col md={8}>
                        <FormGroup className='dropbox'>
                          <Input
                            type='text'
                            name='dropbox_root'
                            value={this.state.dropbox_root}
                            onChange={this.handleChange}
                            placeholder='Enter dropbox Root URL'
                            className='form-control form-control'
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <Button type='submit' color='primary'>
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form role='form' onSubmit={this.onFileUploadHandler}>
                    <h4 className='dropbox-title'>Upload Check</h4>
                    <hr />
                    <Row>
                      <Col md={8}>
                        <FormGroup className='upload_file'>
                          <CustomInput
                            type='file'
                            id='file'
                            name='file'
                            label='Choose CSV Files'
                            onChange={this.onChangeHandler.bind(this)}
                            className='form-control form-control'
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <Button type='submit' color='primary'>
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col md={4}>
                  <Form role='form' onSubmit={this.onFileUnUploadHandler}>
                    <h4 className='dropbox-title'>Upload Clear</h4>
                    <hr />
                    <Row>
                      <Col md={8}>
                        <FormGroup className='upload_file'>
                          <CustomInput
                            type='file'
                            id='file'
                            name='file'
                            label='Choose CSV Files'
                            onChange={this.onChangeUnuploadHandler.bind(this)}
                            className='form-control form-control'
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <Button type='submit' color='primary'>
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form
                    role='form'
                    method='POST'
                    onSubmit={this.onSubmitProductCreateInstruction}
                  >
                    <h4 className='dropbox-title'>
                      Product Create Instruction
                    </h4>
                    <hr />
                    <Row>
                      <Col md={8}>
                        <FormGroup className='dropbox'>
                          <Input
                            type='textarea'
                            name='product_create_guide'
                            value={this.state.product_create_guide}
                            onChange={this.handleChange}
                            placeholder='Product Create Instructions'
                            className='form-control form-control'
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <Button type='submit' color='primary'>
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}
const mapStateToProps = ({ setting }) => ({
  responseErrors: setting.errors,
  message: setting.message,
  setting: setting.setting,
});

export default connect(mapStateToProps, {
  updateSetting,
  getSetting,
})(Setting);
