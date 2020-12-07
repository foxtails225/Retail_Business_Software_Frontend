import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NotificationAlert from 'react-notification-alert';
import {
  Table,
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Button,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledAlert,
} from 'reactstrap';
import MainHeader from '../../components/headers/MainHeader';
import APP_CONST from '../../../helper/constant';
import http from '../../../helper/http';
import { 
  productDelete,
  productGenerate
} from '../../../store/actions/product';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.columns = [
      'id',
      'title',
      'image_stickers',
      'check_stickers',
      'name_stickers',
      'image_tshirts',
      'check_tshirts',
      'name_tshirts',
      'image_mugs',
      'check_mugs',
      'name_mugs',
      'image_bags',
      'check_toteBags',
      'name_toteBags',
      'image_covers',
      'check_cushionCovers',
      'name_cushionCovers',
      'image_kids',
      'check_kids',
      'name_kids',
      'image_hoodies',
      'check_hoodies',
      'name_hoodies',
    ];
    this.state = {
      imageUrl: [],
      onlyData: [],
      entities: {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 25,
        total: 1,
      },
      first_page: 1,
      current_page: 1,
      sorted_column: 'updated_at',
      offset: 5,
      order: 'desc',
      searchKey: '',
      message: '',
      responseErrors: '',
      errors: {},
      isModal: false,
      isDeleteModal: false,
      isDownloadData: [],
      columnsAllCheck: [],
      productListId: '',
      checkedItems: {},
    };
    this.onSubmitExport = this.onSubmitExport.bind(this);
    this.fetchEntities = this.fetchEntities.bind(this);
  }

  componentDidMount() {
    this.setState({ current_page: this.state.entities.current_page }, () => {
      this.fetchEntities();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imageUrl) {
      this.setState({ imageUrl: nextProps.imageUrl });
    }
    if (nextProps.message) {
      this.showNotification(nextProps.message);
      this.setState(
        {
          isModal: false,
          isDeleteModal: false,
          current_page: this.state.first_page,
        },
        () => {
          this.fetchEntities();
        }
      );
    }
  }

  changePage(pageNumber) {
    this.setState({ current_page: pageNumber }, () => {
      this.fetchEntities();
    });
  }

  fetchEntities() {
    let fetchUrl = `${APP_CONST.API_URL}/product/list/?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.per_page}&search_key=${this.state.searchKey}`;
    http
      .get(fetchUrl)
      .then((response) => {
        this.setState({
          entities: response.data.data,
          isDownloadData: [],
          columnsAllCheck: [],
        });
      })
      .catch((e) => {
        this.setState({
          entities: {
            data: [],
            current_page: 1,
            last_page: 1,
            per_page: 25,
            total: 1,
          },
          isDownloadData: [],
          columnsAllCheck: [],
        });
      });
  }

  searchKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { value } = e.target;
      this.setState(
        {
          current_page: this.state.first_page,
          searchKey: value,
        },
        () => {
          this.fetchEntities();
        }
      );
    }
  };

  pagesNumbers() {
    if (!this.state.entities.to) {
      return [];
    }
    let from = this.state.entities.current_page - this.state.offset;
    if (from < 1) {
      from = 1;
    }
    let to = from + this.state.offset * 2 - 1;
    if (to >= this.state.entities.last_page) {
      to = this.state.entities.last_page;
      from = this.state.entities.last_page - this.state.offset * 2;
      if (from < 1) {
        from = 1;
      }
    }
    let pagesArray = [];
    for (let page = from; page <= to; page++) {
      pagesArray.push(page);
    }
    return pagesArray;
  }

  columnHead(value) {
    const name = value.toUpperCase().split('_');
    if (name.length > 1) return name[1];
    else return name;
  }

  sortByColumn(column) {
    if (column === this.state.sorted_column) {
      this.state.order === 'asc'
        ? this.setState(
          { order: 'desc', current_page: this.state.first_page },
          () => {
            this.fetchEntities();
          }
        )
        : this.setState({ order: 'asc' }, () => {
          this.fetchEntities();
        });
    } else {
      this.setState(
        {
          sorted_column: column,
          order: 'asc',
          current_page: this.state.first_page,
        },
        () => {
          this.fetchEntities();
        }
      );
    }
  }

  pageList() {
    return this.pagesNumbers().map((page) => {
      return (
        <PaginationItem
          className={classnames({
            active: page === this.state.entities.current_page,
          })}
          key={'pagination-' + page}
        >
          <PaginationLink onClick={() => this.changePage(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });
  }

  tableHeads() {
    let icon;
    let self = this;
    if (this.state.order === 'asc') {
      icon = <i className='fa fa-sort-alpha-down'></i>;
    } else {
      icon = <i className='fa fa-sort-alpha-up'></i>;
    }
    let columns = this.columns.map((column) => {
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
      } else if (column.includes('check')) {
        return (
          <th
            scope='col'
            key={column}
            className='text-center'
            style={{ width: '3%' }}
          >
            <div className='custom-control custom-checkbox product-item-checkbox'>
              <Input
                className='custom-control-input'
                type='checkbox'
                checked={this.state.columnsAllCheck.includes(column)}
                id={column + '_column'}
                onChange={(e) => self.handleAllColumnCheck(e, column)}
              />
              <label
                className='custom-control-label'
                htmlFor={column + '_column'}
              ></label>
            </div>
          </th>
        );
      } else if (column.includes('image')) {
        return (
          <th
            scope='col'
            key={column}
            className='text-center'
            style={{ width: '13%' }}
          >
            IMAGE
          </th>
        );
      } else if (column.includes('title')) {
        return (
          <th
            scope='col'
            className='text-center'
            style={{ minWidth: '200px' }}
            key={column}
            onClick={() => this.sortByColumn(column)}
          >
            {this.columnHead(column)}
            {column === this.state.sorted_column && icon}
          </th>
        );
      } else if (column.includes('name_covers')) {
        return (
          <th
            scope='col'
            className='text-center'
            style={{ width: '25%' }}
            key={column}
            onClick={() => this.sortByColumn(column)}
          >
            CUSHION COVERS
            {column === this.state.sorted_column && icon}
          </th>
        );
      } else if (column.includes('name_bags')) {
        return (
          <th
            scope='col'
            className='text-center'
            style={{ width: '25%' }}
            key={column}
            onClick={() => this.sortByColumn(column)}
          >
            TOTE BAGS
            {column === this.state.sorted_column && icon}
          </th>
        );
      } else if (column.includes('name_kids')) {
        return (
          <th
            scope='col'
            className='text-center'
            style={{ width: '25%' }}
            key={column}
            onClick={() => this.sortByColumn(column)}
          >
            KIDS
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
            onClick={() => this.sortByColumn(column)}
          >
            {this.columnHead(column)}
            {column === this.state.sorted_column && icon}
          </th>
        );
      }
    });
    columns.push(
      <th
        scope='col'
        className='text-center'
        key='action'
        style={{ width: '6%' }}
      >
        Action
      </th>
    );
    return columns;
  }

  handleDetail(id) {
    this.props.history.push('/main/product-detail/' + id);
  }

  handleChecked = (event) => {
    const { id, name } = event.target;
    var checked = document.getElementById(id).checked;
    this.setState((prevState) => {
      return { checkedItems: { ...prevState.checkedItems, [name]: checked } }
    });
  }
  
  onSubmitGenerator = (event) => {
    event.preventDefault();
    let products = [];

    Object.keys(this.state.checkedItems).map(item => {
      if (this.state.checkedItems[item]) {
        products.push(item);
      }
    });
    this.props.productGenerate({ products });
    this.setState({checkedItems: {}});
  }

  dataList() {
    var self = this;
    if (this.state.entities.data.length) {
      return this.state.entities.data.map((product, index) => {
        return (
          <tr key={product.id}>
            {Object.keys(product).map((key, i) => {
              if (key === 'id') {
                let current_number = (self.state.current_page - 1) * 20 + index + 1;
                return (
                  <td className="text-center" key={key} style={{ minWidth: '5vw' }}>
                    <div className="custom-control custom-checkbox">
                      <Input
                        id={`class-number-${product.id}`}
                        name={product.id}
                        className="custom-control-input"
                        type="checkbox"
                        checked={Object.keys(self.state.checkedItems).includes(product.id.toString()) ?
                          self.state.checkedItems[product.id.toString()] : false
                        }
                        onChange={this.handleChecked}
                      />
                      <label
                        className={`custom-control-label ${current_number < 10 ? 'pl-2' : ''}`}
                        htmlFor={`class-number-${product.id}`}
                      >
                        {index + 1}
                      </label>
                    </div>
                  </td>
                );
              } else if (key.includes('name')) {
                let downloadLink = '';
                downloadLink = product['name_' + key.substring(5)];
                return (
                  <td
                    className='text-center'
                    key={key}
                    style={{ width: '40px', height: '40px' }}
                    dangerouslySetInnerHTML={{
                      __html:
                        product['isdownload_' + key.substring(5)] === 1
                          ? '<a target="__blank" href="' +
                          APP_CONST.BASE_URL +
                          '/export-file?data=%5B%22' +
                          downloadLink +
                          '%22%5D' +
                          '"><img src="https://img.icons8.com/ultraviolet/40/000000/export-csv.png" style="width: 22px;height: 22px;"></a>   ' +
                          product[key]
                          : product[key],
                    }}
                  ></td>
                );
              } else if (key.includes('isdownload')) {
                return (
                  <td key={key}>
                    <div
                      className={classnames(
                        'custom-control custom-checkbox product-item-checkbox',
                        {
                          'custom-control-disable':
                            product['isupload' + key.substring(10)],
                        }
                      )}
                    >
                      <Input
                        className='custom-control-input'
                        id={key + index}
                        checked={this.state.isDownloadData.includes(
                          product[Object.keys(product)[i + 1]]
                        )}
                        type='checkbox'
                        disabled={
                          product['isupload' + key.substring(10)] ? true : false
                        }
                        onChange={(e) =>
                          self.handleCheck(
                            e,
                            product[Object.keys(product)[i + 1]]
                          )
                        }
                      />
                      <label
                        className='custom-control-label'
                        htmlFor={key + index}
                      ></label>
                    </div>
                  </td>
                );
              } else if (key.includes('image')) {
                let url =
                  `${APP_CONST.BASE_URL}` +
                  '/data/dropbox?fileName=' +
                  product[key].replace('.jpg', '');
                return (
                  <td key={key}>
                    <img className='img-tbl-productlist' src={url} alt='' />
                  </td>
                );
              } else if (
                key.includes('updated_at') ||
                key.includes('isupload')
              ) {
                return null;
              } else {
                return (
                  <td
                    className='text-center'
                    key={key}
                    style={{ width: '40px', height: '40px' }}
                  >
                    {product[key]}
                  </td>
                );
              }
            })}
            <td className='td-action'>
              <UncontrolledDropdown>
                <DropdownToggle
                  className='btn-icon-only text-light'
                  color=''
                  role='button'
                  size='sm'
                >
                  <i className='fas fa-ellipsis-v' />
                </DropdownToggle>
                <DropdownMenu className='dropdown-menu-arrow' right>
                  <DropdownItem
                    onClick={(e) => {
                      self.handleDetail(product.id);
                    }}
                  >
                    Detail
                  </DropdownItem>
                  <DropdownItem
                    onClick={(e) => {
                      self.handleDelete(product.id);
                    }}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td
            colSpan={this.columns.length + 1}
            className='text-center td-noredords'
          >
            No Records Found.
          </td>
        </tr>
      );
    }
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
      type: 'success',
      icon: 'ni ni-bell-55',
      autoDismiss: 7,
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  handleSubmitDelete = (e) => {
    e.preventDefault();
    const id = this.state.productListId;
    this.props.productDelete({ id: id });
  };

  handleDelete(id) {
    this.setState({
      productListId: id,
      isDeleteModal: true,
      responseErrors: '',
    });
  }

  onSubmitExport(event) {
    event.preventDefault();
    this.form.submit();
    this.setState({ isDownloadData: [] });
  }

  handleCheck(e, name) {
    var data = [...this.state.isDownloadData];
    if (e.target.checked) {
      if (data.indexOf(name) === -1) {
        data.push(name);
      }
    } else {
      data = data.filter((item) => item !== name);
    }
    this.setState({ isDownloadData: data });
  }

  handleAllColumnCheck(e, column) {
    var isDownloadData = [...this.state.isDownloadData];
    let variant = column.substring(6);
    for (let i in this.state.entities.data) {
      let variantSkuNo = this.state.entities.data[i]['name_' + variant];
      if (e.target.checked) {
        if (!isDownloadData.includes(variantSkuNo)) {
          isDownloadData.push(variantSkuNo);
          continue;
        }
      } else {
        if (isDownloadData.includes(variantSkuNo)) {
          isDownloadData = isDownloadData.filter(
            (item) => item !== variantSkuNo
          );
        }
      }
    }

    var columnsAllCheck = [...this.state.columnsAllCheck];
    if (e.target.checked) {
      if (columnsAllCheck.indexOf(column) === -1) {
        columnsAllCheck.push(column);
      }
    } else {
      columnsAllCheck = columnsAllCheck.filter((item) => item !== column);
    }

    this.setState({ isDownloadData, columnsAllCheck });
  }

  render() {
    let { responseErrors, isDeleteModal } = this.state;
    return (
      <>
        <div className='rna-wrapper'>
          <NotificationAlert ref='notificationAlert' />
        </div>
        <MainHeader name='Product List' parentName='Product' />
        <Container className='mt--6 product-list-container' fluid>
          <Card style={{ minHeight: '700px' }}>
            <CardBody>
              <Row>
                <Col>
                  <Modal
                    isOpen={isDeleteModal}
                    toggle={() => {
                      this.setState({
                        isDeleteModal: !this.state.isDeleteModal,
                      });
                    }}
                  >
                    <Form method='POST' onSubmit={this.handleSubmitDelete}>
                      <ModalHeader>Confirm</ModalHeader>
                      <ModalBody>
                        {responseErrors && (
                          <UncontrolledAlert color='warning'>
                            <span className='alert-text ml-1'>
                              <strong
                                dangerouslySetInnerHTML={{
                                  __html: responseErrors,
                                }}
                              ></strong>
                            </span>
                          </UncontrolledAlert>
                        )}
                        <FormGroup>
                          <label>Do you really want to delete?</label>
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color='secondary'
                          onClick={(e) => {
                            this.setState({ isDeleteModal: false });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button color='primary' type='submit'>
                          Delete
                        </Button>
                      </ModalFooter>
                    </Form>
                  </Modal>
                  <form
                    action={APP_CONST.BASE_URL + '/export'}
                    ref={(f) => (this.form = f)}
                    method='get'
                    onSubmit={this.onSubmitExport}
                  >
                    <input
                      type='hidden'
                      name='data'
                      value={JSON.stringify(this.state.isDownloadData)}
                    ></input>
                    <Button className='btn-productList' color='primary'>
                      Export CSV
                    </Button>
                    <Button 
                      className='btn-productList' 
                      color='primary'
                      onClick={this.onSubmitGenerator}
                    >
                      {`Generator`}
                    </Button>
                  </form>
                </Col>
                <Col>
                  <div className='div-searchbar-product'>
                    <Form className='navbar-search form-inline mr-sm-3 '>
                      <FormGroup className='mb-0'>
                        <InputGroup className='input-group-alternative input-group-merge'>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='fas fa-search' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder='Search'
                            type='text'
                            name='searchKey'
                            onKeyDown={this.searchKey}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Form>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12} xl={12}>
                  <div className='div-tbl-productlist'>
                    <Table
                      className='align-items-center'
                      hover
                      bordered
                      responsive
                    >
                      <thead className='thead-light'>
                        <tr>{this.tableHeads()}</tr>
                      </thead>
                      <tbody>{this.dataList()}</tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className='py-4'>
              <nav aria-label='...'>
                <Pagination
                  className='pagination justify-content-end mb-0'
                  listClassName='justify-content-end mb-0'
                >
                  <PaginationItem
                    className={classnames({
                      disabled: 1 == this.state.entities.current_page,
                    })}
                  >
                    <PaginationLink
                      onClick={() =>
                        this.changePage(this.state.entities.current_page - 1)
                      }
                    >
                      <i className='fas fa-angle-left' />
                      <span className='sr-only'>Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  {this.pageList()}
                  <PaginationItem
                    className={classnames({
                      disabled:
                        this.state.entities.last_page ===
                        this.state.entities.current_page,
                    })}
                  >
                    <PaginationLink
                      onClick={() =>
                        this.changePage(this.state.entities.current_page + 1)
                      }
                    >
                      <i className='fas fa-angle-right' />
                      <span className='sr-only'>Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </nav>
            </CardFooter>
          </Card>
        </Container>
      </>
    );
  }
}
const mapStateToProps = ({ product }) => ({
  imageUrl: product.imageUrl,
  message: product.message,
  responseErrors: product.errors,
});
export default connect(mapStateToProps, {
  productDelete,
  productGenerate
})(withRouter(ProductList));
