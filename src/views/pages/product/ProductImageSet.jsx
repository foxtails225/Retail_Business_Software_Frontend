import React from 'react';
import { connect } from 'react-redux';

import classnames from 'classnames';
import NotificationAlert from 'react-notification-alert';
import { Table, Button, Row, Col, Card, CardBody, Container } from 'reactstrap';

import MainHeader from '../../components/headers/MainHeader';

import {
  productImageSetList,
  updateProductImageSets,
} from '../../../store/actions/product';

class ProductImageset extends React.Component {
  constructor(props) {
    super(props);
    this.refPriceVars = {};
    this.state = {
      data: {
        tshirts: [],
        stickers: [],
        mugs: [],
        toteBags: [],
        cushionCovers: [],
        kids: [],
        hoodies: [],
      },
      isEdit: {
        tshirts: [],
        stickers: [],
        mugs: [],
        toteBags: [],
        cushionCovers: [],
        kids: [],
        hoodies: [],
      },
      data_th: ['SET 1', 'SET 2', 'SET 3'],
      data_tr1: ['File', 'File 1', 'File 2', 'File 3', 'Action'],
      data_tr2: ['File', 'File 1', 'File 2', 'Action'],
      data_tr_mug: ['File', 'MUG', 'MSG', 'MXG', 'Action'],
      data_tr_cover: ['File', 'CUP', 'CNP', 'CQP', 'Action'],
    };
    this.props.productImageSetList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imageSets) {
      let { data, isEdit } = this.state;
      for (var key in nextProps.imageSets) {
        data[key] = nextProps.imageSets[key];
        nextProps.imageSets[key].map((data, index) => {});
      }
      this.setState({ data: data });
      this.setState({ isEdit: isEdit });
    }

    if (nextProps.responseErrors) {
      this.showNotification(nextProps.responseErrors);
      this.props.productImageSetList();
    }
  }

  Capitalize(str) {
    if (str == 'cushionCovers') {
      str = 'cushion Covers';
    } else if (str == 'toteBags') {
      str = 'tote Bags';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  tableHeads(type) {
    let width;
    if (
      type == 'toteBags' ||
      type == 'stickers' ||
      type == 'hoodies' ||
      type == 'kids'
    ) {
      let columns = this.state.data_tr2.map((column, index) => {
        if (index === 0) {
          width = { width: '15%' };
        } else {
          width = { width: '40%' };
        }

        return (
          <th scope='col' className='text-center' style={width} key={index}>
            {this.state.data_tr2[index]}
          </th>
        );
      });
      return columns;
    } else if (type == 'cushionCovers') {
      let columns = this.state.data_tr_cover.map((column, index) => {
        if (index === 0) {
          width = { width: '15%' };
        } else {
          width = { width: '26.5%' };
        }

        return (
          <th scope='col' className='text-center' style={width} key={index}>
            {this.state.data_tr_cover[index]}
          </th>
        );
      });
      return columns;
    } else if (type == 'mugs') {
      let columns = this.state.data_tr_mug.map((column, index) => {
        if (index === 0) {
          width = { width: '15%' };
        } else {
          width = { width: '26.5%' };
        }

        return (
          <th scope='col' className='text-center' style={width} key={index}>
            {this.state.data_tr_mug[index]}
          </th>
        );
      });
      return columns;
    } else {
      let columns = this.state.data_tr1.map((column, index) => {
        if (index === 0) {
          width = { width: '15%' };
        } else {
          width = { width: '26.5%' };
        }

        return (
          <th scope='col' className='text-center' style={width} key={index}>
            {this.state.data_tr1[index]}
          </th>
        );
      });
      return columns;
    }
  }

  emitChange(e, type, index, file) {
    let { data } = this.state;
    data[type][index][file] = e.target.innerHTML;
  }

  dataList(type) {
    var self = this;
    return this.state.data[type].map((data, index) => {
      return (
        <tr key={index}>
          <th style={{ textAlign: 'center', color: '#8898aa' }}>
            {this.state.data_th[index]}
          </th>
          <td
            className='text-center'
            contentEditable={this.state.isEdit[type][index]}
            onInput={(e) => this.emitChange(e, type, index, 'file1')}
            onBlur={(e) => this.emitChange(e, type, index, 'file1')}
            suppressContentEditableWarning={true}
            style={{
              width: '40px',
              height: '40px',
              border: this.state.isEdit[type][index]
                ? '2px solid'
                : '1px solid rgb(233, 236, 239)',
            }}
          >
            {data.file1}
          </td>
          <td
            className='text-center'
            contentEditable={this.state.isEdit[type][index]}
            onInput={(e) => this.emitChange(e, type, index, 'file2')}
            onBlur={(e) => this.emitChange(e, type, index, 'file2')}
            suppressContentEditableWarning={true}
            style={{
              width: '40px',
              height: '40px',
              border: this.state.isEdit[type][index]
                ? '2px solid'
                : '1px solid rgb(233, 236, 239)',
            }}
          >
            {data.file2}
          </td>
          {type == 'toteBags' ||
            type == 'stickers' ||
            type == 'hoodies' ||
            type == 'kids' || (
              <td
                className='text-center'
                contentEditable={this.state.isEdit[type][index]}
                onInput={(e) => this.emitChange(e, type, index, 'file3')}
                onBlur={(e) => this.emitChange(e, type, index, 'file3')}
                suppressContentEditableWarning={true}
                style={{
                  width: '40px',
                  height: '40px',
                  border: this.state.isEdit[type][index]
                    ? '2px solid'
                    : '1px solid rgb(233, 236, 239)',
                }}
              >
                {data.file3}
              </td>
            )}
          <td>
            <Row>
              <Col md={12} xl={12}>
                <Button
                  className='btn-tbl-tshirtvariant-edit'
                  size='sm'
                  color='primary'
                  data-dz-remove
                  onClick={(e) => {
                    this.handleEdit(e, type, index);
                  }}
                >
                  <span className='btn-inner--icon mr-1'>
                    <i
                      className={classnames({
                        'fas fa-edit': !self.state.isEdit[type][index],
                        'fas fa-save': self.state.isEdit[type][index],
                      })}
                    />
                  </span>
                  <span className='btn-inner--text'>
                    {!self.state.isEdit[type][index] && 'EDIT'}
                    {self.state.isEdit[type][index] && 'SAVE'}
                  </span>
                </Button>
              </Col>
            </Row>
          </td>
        </tr>
      );
    });
  }

  handleEdit(e, type, index) {
    let { isEdit } = this.state;
    isEdit[type][index] = !isEdit[type][index];
    this.setState({ isEdit: isEdit });
    if (!isEdit[type][index]) {
      this.props.updateProductImageSets(this.state.data[type][index]);
    }
  }

  getbody() {
    var self = this;
    {
      var divTable = Object.keys(this.state.data).map((key) => {
        return (
          <Row key={key}>
            <Col md={12} xl={12}>
              <div className='div-tbl-product-imageset-variant'>
                <div className='div-tbl-title-imgVar'>
                  <Row>
                    <Col style={{ tableLayout: 'fixed', width: '600px' }}>
                      <h2>{this.Capitalize(key) + ' Image Sets'}</h2>
                    </Col>
                  </Row>
                </div>
                <div className='tbl-wrapper'>
                  <Table className='align-items-center' bordered responsive>
                    <thead className='thead-light'>
                      <tr>{this.tableHeads(key)}</tr>
                    </thead>
                    <tbody>{this.dataList(key)}</tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>
        );
      });
    }
    return divTable;
  }

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
      type: 'error',
      icon: 'ni ni-bell-55',
      autoDismiss: 7,
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  render() {
    return (
      <>
        <div className='rna-wrapper'>
          <NotificationAlert ref='notificationAlert' />
        </div>
        <MainHeader name='Variant Product Image Set' parentName='Variant' />
        <Container className='mt--6 product-imageset-variant-container' fluid>
          <Card style={{ minHeight: '700px' }}>
            <CardBody>{this.getbody()}</CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ product }) => ({
  imageSets: product.imageSets,
  responseErrors: product.errors,
  message: product.message,
});

export default connect(mapStateToProps, {
  productImageSetList,
  updateProductImageSets,
})(ProductImageset);
