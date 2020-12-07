import React from 'react';
import classnames from 'classnames';
import ReeValidate from 'ree-validate';
import { connect } from 'react-redux';

import NotificationAlert from 'react-notification-alert';
import {
  UncontrolledAlert,
  Table,
  Button,
  Row,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormGroup,
  Form,
  Col,
  Card,
  CardBody,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import MainHeader from '../../components/headers/MainHeader';
import http from '../../../helper/http';
import {
  createArtist,
  updateArtist,
  deleteArtist,
} from '../../../store/actions/artist';
import APP_CONST from '../../../helper/constant';

class ArtistList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = ['id', 'code', 'name', 'artist email', 'target'];
    this.state = {
      code: '',
      name: '',
      email: '',
      entities: {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 1,
      },
      first_page: 1,
      current_page: 1,
      sorted_column: this.columns[0],
      offset: 5,
      order: 'asc',
      searchKey: '',
      modalArtist: {
        id: 0,
        code: '',
        name: '',
        email: '',
        target: 0,
      },
      responseErrors: '',
      errors: {},
      isModal: false,
      isDeleteModal: false,
    };
    this.validator = new ReeValidate({
      code: 'required|min:1|max:4',
      name: 'required|min:3',
      email: 'required|email',
      target: 'required|min:1',
    });
  }

  componentDidMount() {
    this.setState({ current_page: this.state.entities.current_page }, () => {
      this.fetchEntities();
    });
  }

  componentWillReceiveProps(nextProps) {
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
    if (
      nextProps.responseErrors &&
      nextProps.responseErrors != this.state.responseErrors
    ) {
      this.setState({
        responseErrors: nextProps.responseErrors,
      });
    }
  }
  searchKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { value } = e.target;
      this.setState(
        { current_page: this.state.first_page, searchKey: value },
        () => {
          this.fetchEntities();
        }
      );
    }
  };

  handleEdit(id) {
    const { data } = this.state.entities;
    const artist = data.find((obj) => {
      return obj.id == id;
    });
    this.setState({
      modalArtist: { ...artist },
      errors: {},
      isModal: true,
      responseErrors: '',
    });
  }

  handleDelete(id) {
    const { data } = this.state.entities;
    const artist = data.find((obj) => {
      return obj.id == id;
    });
    this.setState({
      modalArtist: { ...artist },
      isDeleteModal: true,
      responseErrors: '',
    });
  }

  fetchEntities() {
    let fetchUrl = `${APP_CONST.API_URL}/artist/list/?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.per_page}&search_key=${this.state.searchKey}`;
    http
      .get(fetchUrl)
      .then((response) => {
        this.setState({ entities: response.data.data });
      })
      .catch((e) => {
        this.setState({
          entities: {
            data: [],
            current_page: 1,
            last_page: 1,
            per_page: 20,
            total: 1,
          },
        });
      });
  }

  changePage(pageNumber) {
    this.setState({ current_page: pageNumber }, () => {
      this.fetchEntities();
    });
  }

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
    return value.split('_').join(' ').toUpperCase();
  }

  tableHeads() {
    let icon;
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
      } else {
        return (
          <th
            scope='col'
            className='text-center'
            style={{ width: '26%' }}
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
        style={{ width: '17%' }}
      >
        Action
      </th>
    );
    return columns;
  }

  dataList() {
    var self = this;
    if (this.state.entities.data.length) {
      return this.state.entities.data.map((data, index) => {
        return (
          <tr key={data.id}>
            {Object.keys(data).map((key) => {
              if (key == 'id')
                return (
                  <td className='text-center' key={key}>
                    {index + 1}
                  </td>
                );
              else
                return (
                  <td className='text-center' key={key}>
                    {data[key]}
                  </td>
                );
            })}
            <td className='td-action'>
              <Row>
                <Col md={12} xl={12}>
                  <Button
                    className='btn-tbl-artistlist-edit'
                    size='sm'
                    color='primary'
                    data-dz-remove
                    onClick={(e) => {
                      self.handleEdit(data.id);
                    }}
                  >
                    <span className='btn-inner--icon mr-1'>
                      <i className='fas fa-edit' />
                    </span>
                    <span className='btn-inner--text'>EDIT</span>
                  </Button>
                  <Button
                    className='btn-tbl-artistlist-delete'
                    size='sm'
                    color='warning'
                    data-dz-remove
                    onClick={(e) => {
                      self.handleDelete(data.id);
                    }}
                  >
                    <span className='btn-inner--icon mr-2'>
                      <i className='fas fa-trash' />
                    </span>
                    <span className='btn-inner--text'>DELETE</span>
                  </Button>
                </Col>
              </Row>
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

  createArtist() {
    this.setState({
      isModal: true,
      modalArtist: {
        id: 0,
        code: '',
        name: '',
        email: '',
      },
      responseErrors: '',
      errors: {},
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const { modalArtist } = this.state;
    modalArtist[name] = value;
    this.setState({ modalArtist });
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
  };

  handleBlur = (e) => {
    const { name, value } = e.target;
    const validation = this.validator.errors;

    if (value === '') {
      return;
    }

    this.validator.validate(name, value).then(() => {
      if (validation.has(name)) {
        const { errors } = this.state;
        errors[name] = validation.first(name);
        this.setState({ errors });
      }
    });
  };

  handleSubmitDelete = (e) => {
    e.preventDefault();
    const { modalArtist } = this.state;
    const { id } = modalArtist;
    this.props.deleteArtist(id);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { modalArtist } = this.state;
    this.validator.validateAll(modalArtist).then((success) => {
      if (success) {
        if (modalArtist.id === 0) {
          this.props.createArtist(modalArtist);
        } else {
          this.props.updateArtist(modalArtist);
        }
      }
    });
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

  render() {
    const {
      errors,
      isModal,
      isDeleteModal,
      modalArtist,
      responseErrors,
    } = this.state;
    return (
      <>
        <div className='rna-wrapper'>
          <NotificationAlert ref='notificationAlert' />
        </div>
        <MainHeader name='Artist List' parentName='Artist' />
        <Container className='mt--6 artist-list-container' fluid>
          <Card style={{ minHeight: '700px' }}>
            <CardBody>
              <Row>
                <Col>
                  <Button
                    className='btn-createartist'
                    color='primary'
                    onClick={() => {
                      this.createArtist();
                    }}
                  >
                    Create Artist
                  </Button>
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
                  <Modal
                    isOpen={isModal}
                    toggle={() => {
                      this.setState({ isModal: !this.state.isModal });
                    }}
                  >
                    <Form
                      role='form'
                      method='POST'
                      onSubmit={this.handleSubmit}
                    >
                      <ModalHeader color='primary'>Artist Edit</ModalHeader>
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
                          <label htmlFor='tshirtsFormControlInput'>
                            Artist Code
                          </label>
                          <Input
                            name='code'
                            required
                            value={modalArtist.code}
                            placeholder='e.g. Artist Code'
                            type='text'
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            invalid={'code' in errors}
                          />
                          <div className='invalid-feedback'>{errors.code}</div>
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor='tshirtsFormControlInput'>
                            Artist Name
                          </label>
                          <Input
                            name='name'
                            required
                            value={modalArtist.name}
                            placeholder='e.g. Artist Name'
                            type='text'
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            invalid={'name' in errors}
                          />
                          <div className='invalid-feedback'>{errors.name}</div>
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor='tshirtsFormControlInput'>
                            Artist Email
                          </label>
                          <Input
                            name='email'
                            required
                            value={modalArtist.email}
                            placeholder='e.g. Artist Email'
                            type='text'
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            invalid={'email' in errors}
                          />
                          <div className='invalid-feedback'>{errors.email}</div>
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor='tshirtsFormControlInput'>
                            Artist Target
                          </label>
                          <Input
                            name='target'
                            required
                            value={modalArtist.target}
                            placeholder='e.g. Artist Target'
                            type='number'
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            invalid={'target' in errors}
                          />
                          <div className='invalid-feedback'>{errors.target}</div>
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color='secondary'
                          onClick={(e) => {
                            this.setState({ isModal: false });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button color='primary' type='submit'>
                          Save Changes
                        </Button>
                      </ModalFooter>
                    </Form>
                  </Modal>
                </Col>
                <Col>
                  <div className='div-searchbar-createartist'>
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
                  <div className='div-tbl-artistlist'>
                    <Table
                      className='align-items-center'
                      style={{ tableLayout: 'fixed' }}
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

const mapStateToProps = ({ artist }) => ({
  responseErrors: artist.errors,
  message: artist.message,
});

export default connect(mapStateToProps, {
  createArtist,
  updateArtist,
  deleteArtist,
})(ArtistList);
