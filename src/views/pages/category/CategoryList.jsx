import React from "react";
import classnames from "classnames";
import ReeValidate from "ree-validate";
import { connect } from "react-redux";

import NotificationAlert from "react-notification-alert";
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
} from "reactstrap";

import MainHeader from "../../components/headers/MainHeader";
import http from "../../../helper/http";
import {
  createCategory,
  mergeCategory,
  updateCategory,
  deleteCategory,
} from "../../../store/actions/category";
import APP_CONST from "../../../helper/constant";

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = ["id", "name"];
    this.state = {
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
      order: "asc",
      searchKey: "",
      modalCategory: {
        id: 0,
        name: "",
      },
      modalMergeCategory: {
        id: 0,
        deletedName: "",
        mergedName: ""
      },
      message: "",
      responseErrors: "",
      errors: {},
      isModal: false,
      isDeleteModal: false,
      isMergeModal: false
    };
    this.validator = new ReeValidate({
      name: "required|min:3",
      deletedName: "required|min:3",
      mergedName: "required|min:3"
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
          isMergeModal: false,
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
    if (e.key === "Enter") {
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
    const category = data.find((obj) => {
      return obj.id == id;
    });
    this.setState({
      modalCategory: { ...category },
      isModal: true,
      responseErrors: "",
      errors: {},
    });
  }

  handleDelete(id) {
    const { data } = this.state.entities;
    const category = data.find((obj) => {
      return obj.id == id;
    });
    this.setState({
      modalCategory: { ...category },
      isDeleteModal: true,
      responseErrors: "",
    });
  }

  fetchEntities() {
    let fetchUrl = `${APP_CONST.API_URL}/category/list/?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.per_page}&search_key=${this.state.searchKey}`;
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
    return value.split("_").join(" ").toUpperCase();
  }

  tableHeads() {
    let icon;
    if (this.state.order === "asc") {
      icon = <i className="fa fa-sort-alpha-down"></i>;
    } else {
      icon = <i className="fa fa-sort-alpha-up"></i>;
    }
    let columns = this.columns.map((column) => {
      if (column == "id") {
        return (
          <th
            scope="col"
            className="text-center"
            style={{ width: "5%" }}
            key={column}
          >
            {"No"}
          </th>
        );
      } else {
        return (
          <th
            scope="col"
            className="text-center"
            style={{ width: "75%" }}
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
        scope="col"
        className="text-center"
        key="action"
        style={{ width: "20%" }}
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
              if (key == "id")
                return (
                  <td className="text-center" key={key}>
                    {index + 1}
                  </td>
                );
              else
                return (
                  <td className="text-center" key={key}>
                    {data[key]}
                  </td>
                );
            })}
            <td className="td-action">
              <Row>
                <Col md={12} xl={12}>
                  <Button
                    className="btn-tbl-categorylist-edit"
                    size="sm"
                    color="primary"
                    data-dz-remove
                    onClick={(e) => {
                      self.handleEdit(data.id);
                    }}
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="fas fa-edit" />
                    </span>
                    <span className="btn-inner--text">EDIT</span>
                  </Button>
                  <Button
                    className="btn-tbl-categorylist-delete"
                    size="sm"
                    color="warning"
                    data-dz-remove
                    onClick={(e) => {
                      self.handleDelete(data.id);
                    }}
                  >
                    <span className="btn-inner--icon mr-2">
                      <i className="fas fa-trash" />
                    </span>
                    <span className="btn-inner--text">DELETE</span>
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
            className="text-center td-noredords"
          >
            No Records Found.
          </td>
        </tr>
      );
    }
  }

  sortByColumn(column) {
    if (column === this.state.sorted_column) {
      this.state.order === "asc"
        ? this.setState(
          { order: "desc", current_page: this.state.first_page },
          () => {
            this.fetchEntities();
          }
        )
        : this.setState({ order: "asc" }, () => {
          this.fetchEntities();
        });
    } else {
      this.setState(
        {
          sorted_column: column,
          order: "asc",
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
          key={"pagination-" + page}
        >
          <PaginationLink onClick={() => this.changePage(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });
  }

  handleCategory = (e) => {
    e.preventDefault();
    const { name } = e.target;

    if (name === "createBtn") {
      this.setState({
        isModal: true,
        modalCategory: {
          id: 0,
          name: "",
        },
        responseErrors: "",
        errors: {},
      });
    } else {
      this.setState({
        isMergeModal: true,
        modalMergeCategory: {
          id: 0,
          deletedName: "",
          mergedName: ""
        },
        responseErrors: "",
        errors: {},
      });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const { modalCategory, modalMergeCategory } = this.state;

    if (name === "name") {
      modalCategory[name] = value;
      this.setState({ modalCategory });
    } else {
      modalMergeCategory[name] = value;
      this.setState({ modalMergeCategory });
    }

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

    if (value === "") {
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
    const { modalCategory } = this.state;
    const { id } = modalCategory;
    this.props.deleteCategory(id);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { modalCategory } = this.state;

    this.validator.validateAll(modalCategory).then((success) => {
      if (success) {
        if (modalCategory.id === 0) {
          const { name } = modalCategory;
          this.props.createCategory({
            name,
          });
        } else {
          const { id, name } = modalCategory;
          this.props.updateCategory({
            id,
            name,
          });
        }
      }
    });
  };

  handleMergeSubmit = (e) => {
    e.preventDefault();
    const { modalMergeCategory } = this.state;

    this.validator.validateAll(modalMergeCategory).then((success) => {
      if (success) {
        if (modalMergeCategory.id === 0) {
          const { deletedName, mergedName } = modalMergeCategory;
          
          this.props.mergeCategory({
            deletedName,
            mergedName
          });
        } else {
          const { id, deletedName, mergedName } = modalMergeCategory;
          this.props.mergeCategory({
            id,
            deletedName,
            mergedName
          });
        }
      }
    });
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

  render() {
    const {
      errors,
      isModal,
      isDeleteModal,
      isMergeModal,
      modalCategory,
      modalMergeCategory,
      responseErrors,
    } = this.state;
    return (
      <>
        <div className="rna-wrapper">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <MainHeader name="Category List" parentName="Category" />
        <Container className="mt--6 category-list-container" fluid>
          <Card style={{ minHeight: "700px" }}>
            <CardBody>
              <Row>
                <Col className="col-lg-2">
                  <Button
                    name="createBtn"
                    className="btn-createcategory"
                    color="primary"
                    onClick={(e) => {
                      this.handleCategory(e);
                    }}
                  >
                    Create Category
                  </Button>
                  <Modal
                    isOpen={isDeleteModal}
                    toggle={() => {
                      this.setState({
                        isDeleteModal: !this.state.isDeleteModal,
                      });
                    }}
                  >
                    <Form method="POST" onSubmit={this.handleSubmitDelete}>
                      <ModalHeader>Confirm</ModalHeader>
                      <ModalBody>
                        {responseErrors && (
                          <UncontrolledAlert color="warning">
                            <span className="alert-text ml-1">
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
                          color="secondary"
                          onClick={(e) => {
                            this.setState({ isDeleteModal: false });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button color="primary" type="submit">
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
                      role="form"
                      method="POST"
                      onSubmit={this.handleSubmit}
                    >
                      <ModalHeader color="primary">Category Edit</ModalHeader>
                      <ModalBody>
                        {responseErrors && (
                          <UncontrolledAlert color="warning">
                            <span className="alert-text ml-1">
                              <strong
                                dangerouslySetInnerHTML={{
                                  __html: responseErrors,
                                }}
                              ></strong>
                            </span>
                          </UncontrolledAlert>
                        )}
                        <FormGroup>
                          <label htmlFor="tshirtsFormControlInput">Name</label>
                          <Input
                            name="name"
                            ref="name"
                            required
                            value={modalCategory.name}
                            placeholder="e.g. Category Name"
                            type="text"
                            maxLength={40}
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            invalid={"name" in errors}
                          />
                          <div className="invalid-feedback">{errors.name}</div>
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="secondary"
                          onClick={(e) => {
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
                </Col>
                <Col className="col-lg-2">
                  <Button
                    name="updateBtn"
                    className="btn-createcategory"
                    color="primary"
                    onClick={(e) => {
                      this.handleCategory(e);
                    }}
                  >
                    Merge Category
                  </Button>
                  <Modal
                    isOpen={isMergeModal}
                    toggle={() => {
                      this.setState({ isMergeModal: !this.state.isMergeModal });
                    }}
                  >
                    <Form
                      name="mergeCategory"
                      role="form"
                      method="POST"
                      onSubmit={this.handleMergeSubmit}
                    >
                      <ModalHeader color="primary">Category Merge</ModalHeader>
                      <ModalBody>
                        {responseErrors && (
                          <UncontrolledAlert color="warning">
                            <span className="alert-text ml-1">
                              <strong
                                dangerouslySetInnerHTML={{
                                  __html: responseErrors,
                                }}
                              ></strong>
                            </span>
                          </UncontrolledAlert>
                        )}
                        <FormGroup>
                          <label htmlFor="tshirtsFormControlInput">Deleted Category Name</label>
                          <Input
                            name="deletedName"
                            ref="deletedName"
                            required
                            value={modalMergeCategory.deletedName}
                            placeholder="e.g. Category Name"
                            type="text"
                            maxLength={40}
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            invalid={"deletedName" in errors}
                          />
                          <div className="invalid-feedback">{errors.deletedName}</div>
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="tshirtsFormControlInput">Merged Category Name</label>
                          <Input
                            name="mergedName"
                            ref="mergedName"
                            required
                            value={modalMergeCategory.mergedName}
                            placeholder="e.g. Category Name"
                            type="text"
                            maxLength={40}
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            invalid={"mergedName" in errors}
                          />
                          <div className="invalid-feedback">{errors.mergedName}</div>
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="secondary"
                          onClick={(e) => {
                            this.setState({ isMergeModal: false });
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
                </Col>
                <Col>
                  <div className="div-searchbar-createcategory">
                    <Form className="navbar-search form-inline mr-sm-3 ">
                      <FormGroup className="mb-0">
                        <InputGroup className="input-group-alternative input-group-merge">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Search"
                            type="text"
                            name="searchKey"
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
                  <div className="div-tbl-categorylist">
                    <Table
                      className="align-items-center"
                      style={{ tableLayout: "fixed" }}
                      hover
                      bordered
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>{this.tableHeads()}</tr>
                      </thead>
                      <tbody>{this.dataList()}</tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="py-4">
              <nav aria-label="...">
                <Pagination
                  className="pagination justify-content-end mb-0"
                  listClassName="justify-content-end mb-0"
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
                      <i className="fas fa-angle-left" />
                      <span className="sr-only">Previous</span>
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
                      <i className="fas fa-angle-right" />
                      <span className="sr-only">Next</span>
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

const mapStateToProps = ({ category }) => ({
  responseErrors: category.errors,
  message: category.message,
});

export default connect(mapStateToProps, {
  createCategory,
  mergeCategory,
  updateCategory,
  deleteCategory,
})(CategoryList);
