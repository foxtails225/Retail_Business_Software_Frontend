import React from 'react';
import classnames from 'classnames';
import {
  Table,
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import MainHeader from '../../components/headers/MainHeader';
import APP_CONST from '../../../helper/constant';
import http from '../../../helper/http';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: {
        tshirts: [
          'id',
          'sku',
          'title',
          'keyword',
          'category',
          'artist',
          'price',
          'weight',
          'print',
        ],
        stickers: [
          'id',
          'sku',
          'title',
          'keyword',
          'category',
          'artist',
          'price',
          'width',
          'height',
          'printmode',
        ],
        mugs: [
          'id',
          'sku',
          'title',
          'keyword',
          'category',
          'artist',
          'price',
          'weight',
          'printmode',
        ],
        bags: [
          'id',
          'sku',
          'title',
          'keyword',
          'category',
          'artist',
          'price',
          'weight',
          'printmode',
        ],
        covers: [
          'id',
          'sku',
          'title',
          'keyword',
          'category',
          'artist',
          'price',
          'weight',
          'printmode',
        ],
        kids: [
          'id',
          'sku',
          'title',
          'keyword',
          'category',
          'artist',
          'price',
          'weight',
          'printmode',
        ],
        hoodies: [
          'id',
          'sku',
          'title',
          'keyword',
          'category',
          'artist',
          'price',
          'weight',
          'printmode',
        ],
      },
      displayData: [],
      tshirts: [],
      stickers: [],
      mugs: [],
      bags: [],
      cushioncovers: [],
      kids: [],
      hoodies: [],
      product: {},
      message: '',
      responseErrors: '',
      errors: {},
      isModal: false,
      isDeleteModal: false,
      active: 'active',
      showDetailType: 'tshirts',
      activeTabColor: '#dee2e6',
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchEntities(id);
  }

  fetchEntities(id) {
    let fetchUrl = `${APP_CONST.API_URL}/product/detail/?id=${id}`;
    http
      .get(fetchUrl)
      .then((response) => {
        let tshirts = response.data.data[0];
        let stickers = response.data.data[1];
        let mugs = response.data.data[2];
        let bags = response.data.data[3];
        let cushioncovers = response.data.data[4];
        let kids = response.data.data[6];
        let hoodies = response.data.data[5];
        let product = response.data.data[7];

        this.setState({
          tshirts,
          displayData: tshirts,
          stickers,
          mugs,
          bags,
          hoodies,
          cushioncovers,
          kids,
          product,
        });
      })
      .catch((e) => { });
  }

  columnHead(value) {
    const name = value.toUpperCase().split('_');
    if (name.length > 1) return name[1];
    else return name;
  }

  tableHeads() {
    let icon;
    if (this.state.order === 'asc') {
      icon = <i className='fa fa-sort-alpha-down'></i>;
    } else {
      icon = <i className='fa fa-sort-alpha-up'></i>;
    }
    let columns = this.state.columns[this.state.showDetailType].map(
      (column) => {
        if (column === 'id') {
          return (
            <th
              scope='col'
              className='text-center'
              style={{ width: '5%' }}
              key={column}
            >
              {'No'}
            </th>
          );
        } else if (column.includes('title')) {
          return (
            <th
              scope='col'
              className='text-center'
              style={{ minWidth: '200px' }}
              key={column}
            >
              {this.columnHead(column)}
              {column === this.state.sorted_column && icon}
            </th>
          );
        } else {
          return (
            <th
              scope='col'
              className='text-center'
              style={{ width: '25%' }}
              key={column}
            >
              {this.columnHead(column)}
              {column === this.state.sorted_column && icon}
            </th>
          );
        }
      }
    );

    return columns;
  }
  dataList() {
    if (this.state.displayData.length > 0) {
      return this.state.displayData.map((detail, index) => {
        return (
          <tr key={index}>
            <td key={index}>{index + 1}</td>
            {Object.keys(detail).map((key) => {
              return (
                <td
                  className='text-center'
                  key={key}
                  style={{ width: '40px', height: '40px' }}
                >
                  {detail[key]}
                </td>
              );
            })}
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td
            colSpan={this.state.columns.tshirts.length + 1}
            className='text-center td-noredords'
            style={{ height: '40px' }}
          />
        </tr>
      );
    }
  }
  getBodyTag(type, e) {
    this.setState({ showDetailType: type }, function () {
      if (this.state.showDetailType === 'tshirts') {
        this.setState({ displayData: this.state.tshirts });
      }
      if (this.state.showDetailType === 'stickers') {
        this.setState({ displayData: this.state.stickers });
      }
      if (this.state.showDetailType === 'mugs') {
        this.setState({ displayData: this.state.mugs });
      }
      if (this.state.showDetailType === 'bags') {
        this.setState({ displayData: this.state.bags });
      }
      if (this.state.showDetailType === 'covers') {
        this.setState({ displayData: this.state.cushioncovers });
      }
      if (this.state.showDetailType === 'kids') {
        this.setState({ displayData: this.state.kids });
      }
      if (this.state.showDetailType === 'hoodies') {
        this.setState({ displayData: this.state.hoodies });
      }
      if (this.state.showDetailType === 'source') {
        this.setState({ displayData: [] });
      }
    });
  }

  renderSwitch(param) {
    switch (param) {
      case 'tshirts':
        return (
          <div className='.div-searchbar-createproductdetail'>
            <Row>
              <Col md={12} xl={12}>
                <div className='div-tbl-productdetailvariant'>
                  <Table
                    className='align-items-center'
                    hover
                    bordered
                    responsive
                  >
                    <thead className='thead-light'>
                      <tr>{this.tableHeads()}</tr>
                    </thead>
                    <tbody key={'tshirts'}>{this.dataList()}</tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        );
      case 'stickers':
        return (
          <div>
            <Row>
              <Col md={12} xl={12}>
                <div className='div-tbl-productdetailvariant'>
                  <Table
                    className='align-items-center'
                    hover
                    bordered
                    responsive
                  >
                    <thead className='thead-light'>
                      <tr>{this.tableHeads()}</tr>
                    </thead>
                    <tbody key={'stickers'}>{this.dataList()}</tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        );
      case 'mugs':
        return (
          <div>
            <Row>
              <Col md={12} xl={12}>
                <div className='div-tbl-productdetailvariant'>
                  <Table
                    className='align-items-center'
                    hover
                    bordered
                    responsive
                  >
                    <thead className='thead-light'>
                      <tr>{this.tableHeads()}</tr>
                    </thead>
                    <tbody key={'mugs'}>{this.dataList()}</tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        );
      case 'bags':
        return (
          <div>
            <Row>
              <Col md={12} xl={12}>
                <div className='div-tbl-productdetailvariant'>
                  <Table
                    className='align-items-center'
                    hover
                    bordered
                    responsive
                  >
                    <thead className='thead-light'>
                      <tr>{this.tableHeads()}</tr>
                    </thead>
                    <tbody key={'bags'}>{this.dataList()}</tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        );
      case 'covers':
        return (
          <div>
            <Row>
              <Col md={12} xl={12}>
                <div className='div-tbl-productdetailvariant'>
                  <Table
                    className='align-items-center'
                    hover
                    bordered
                    responsive
                  >
                    <thead className='thead-light'>
                      <tr>{this.tableHeads()}</tr>
                    </thead>
                    <tbody key={'covers'}>{this.dataList()}</tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        );
      case 'kids':
        return (
          <div>
            <Row>
              <Col md={12} xl={12}>
                <div className='div-tbl-productdetailvariant'>
                  <Table
                    className='align-items-center'
                    hover
                    bordered
                    responsive
                  >
                    <thead className='thead-light'>
                      <tr>{this.tableHeads()}</tr>
                    </thead>
                    <tbody key={'kids'}>{this.dataList()}</tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        );
      case 'hoodies':
        return (
          <div>
            <Row>
              <Col md={12} xl={12}>
                <div className='div-tbl-productdetailvariant'>
                  <Table
                    className='align-items-center'
                    hover
                    bordered
                    responsive
                  >
                    <thead className='thead-light'>
                      <tr>{this.tableHeads()}</tr>
                    </thead>
                    <tbody key={'hoodies'}>{this.dataList()}</tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        );
      case 'source':
        return (
          <div>
            <Row>
              <Col md={12} xl={12}>
                <h2 style={{ marginTop: '5px', marginLeft: '15px' }}>
                  {this.state.product.source}
                </h2>
              </Col>
            </Row>
          </div>
        );
      default:
        return null;
    }
  }
  
  render() {
    const self = this;
    return (
      <>
        <MainHeader name='Product Detail' parentName='Product' />
        <Container className='mt--6 product-detail-container' fluid>
          <Card style={{ minHeight: '700px' }}>
            <CardBody>
              <div className='div-tab-detaillist'>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames('nav-product-list', {
                        active: self.state.showDetailType == 'tshirts',
                      })}
                      href='#'
                      onClick={(e) => {
                        self.getBodyTag('tshirts', e);
                      }}
                    >
                      Tshirts
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames('nav-product-list', {
                        active: self.state.showDetailType == 'stickers',
                      })}
                      href='#'
                      onClick={(e) => {
                        self.getBodyTag('stickers', e);
                      }}
                    >
                      Stickers
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames('nav-product-list', {
                        active: self.state.showDetailType == 'mugs',
                      })}
                      href='#'
                      onClick={(e) => {
                        self.getBodyTag('mugs', e);
                      }}
                    >
                      Mugs
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames('nav-product-list', {
                        active: self.state.showDetailType == 'bags',
                      })}
                      href='#'
                      onClick={(e) => {
                        self.getBodyTag('bags', e);
                      }}
                    >
                      Tote Bags
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames('nav-product-list', {
                        active: self.state.showDetailType == 'covers',
                      })}
                      href='#'
                      onClick={(e) => {
                        self.getBodyTag('covers', e);
                      }}
                    >
                      Cushion covers
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames('nav-product-list', {
                        active: self.state.showDetailType == 'kids',
                      })}
                      href='#'
                      onClick={(e) => {
                        self.getBodyTag('kids', e);
                      }}
                    >
                      Kids
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames('nav-product-list', {
                        active: self.state.showDetailType == 'hoodies',
                      })}
                      href='#'
                      onClick={(e) => {
                        self.getBodyTag('hoodies', e);
                      }}
                    >
                      Hoodies
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames('nav-product-list', {
                        active: self.state.showDetailType == 'source',
                      })}
                      href='#'
                      onClick={(e) => {
                        self.getBodyTag('source', e);
                      }}
                    >
                      Source
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
              {this.renderSwitch(this.state.showDetailType)}
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

export default ProductDetail;
