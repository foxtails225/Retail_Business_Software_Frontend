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
  createVariant,
  updateVariant,
  deleteVariant,
  listSizes,
  listColors,
} from "../../../store/actions/variant";
import APP_CONST from "../../../helper/constant";

class HoodiesVariant extends React.Component {
  constructor(props) {
    super(props);
    this.colorstring = "";
    this.sizestring = "";
    this.columns = ["id", "name", "size", "color"];
    this.state = {
      sizes: [],
      colors: [],
      entities: {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 25,
        total: 1,
      },
      first_page: 1,
      current_page: 1,
      sorted_column: this.columns[1],
      offset: 5,
      order: "asc",
      searchKey: "",
      modalHoodies: {
        id: 0,
        name: "",
        gender: "",
        color: "",
        type: "",
        size: "",
      },
      responseErrors: "",
      errors: {},
      isModal: false,
      isDeleteModal: false,
    };
    this.validator = new ReeValidate({
      name: "required",
    });
    this.props.listSizes({ type: "hoodies" });
    this.props.listColors({ type: "hoodies" });
  }
  componentDidMount() {
    this.setState({ current_page: this.state.entities.current_page }, () => {
      this.fetchEntities();
    });
  }
  componentWillReceiveProps(nextProps) {
    const { modalHoodies } = this.state;
    if (nextProps.sizes) {
      if (
        nextProps.sizes.length > 0 &&
        nextProps.sizes.length != this.state.sizes.length
      ) {
        this.setState({ sizes: nextProps.sizes }, function () {
          modalHoodies["size"] = this.state.sizes[0].key;
        });
      }
    }
    if (nextProps.colors) {
      if (
        nextProps.colors.length > 0 &&
        nextProps.colors.length != this.state.colors.length
      ) {
        this.setState({ colors: nextProps.colors }, function () {
          modalHoodies["color"] = this.state.colors[0].key;
        });
      }
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
    if (
      nextProps.responseErrors &&
      nextProps.responseErrors !== this.state.responseErrors
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
    const Hoodies = data.find((obj) => {
      return obj.id === id;
    });
    this.setState({
      modalHoodies: { ...Hoodies },
      isModal: true,
      responseErrors: "",
      errors: {},
    });
  }

  handleDelete(id) {
    const { data } = this.state.entities;
    const Hoodies = data.find((obj) => {
      return obj.id === id;
    });
    this.setState({
      modalHoodies: { ...Hoodies },
      isDeleteModal: true,
      responseErrors: "",
    });
  }

  fetchEntities() {
    let fetchUrl = `${APP_CONST.API_URL}/Hoodiesvariant/list/?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.per_page}&search_key=${this.state.searchKey}`;
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
            per_page: 25,
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
      if (column === "id") {
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
      } else if (column === "name") {
        return (
          <th
            scope="col"
            className="text-center"
            style={{ width: "20%" }}
            key={column}
            onClick={() => this.sortByColumn(column)}
          >
            {this.columnHead(column)}
            {column === this.state.sorted_column && icon}
          </th>
        );
      } else {
        return (
          <th
            scope="col"
            className="text-center"
            style={{ width: "20%" }}
            key={column}
            // onClick={() => this.sortByColumn(column)}
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
        style={{ width: "15%" }}
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
              if (key === "id")
                return (
                  <td className="text-center" key={key}>
                    {index + 1}
                  </td>
                );
              else if (key === "color") {
                return this.state.colors.map((item) => {
                  if (data[key] === item.key)
                    return (
                      <td className="text-center" key={key}>
                        {item.name}
                      </td>
                    );
                });
              } else if (key === "size") {
                return this.state.sizes.map((item) => {
                  if (data[key] === item.key)
                    return (
                      <td className="text-center" key={key}>
                        {item.name}
                      </td>
                    );
                });
              } else if (key === "name") {
                return (
                  <td className="text-center" key={key}>
                    {data[key]}
                  </td>
                );
              }
            })}
            <td className="td-action">
              <Row>
                <Col md={12} xl={12}>
                  <Button
                    className="btn-tbl-Hoodiesvariant-edit"
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
                    className="btn-tbl-Hoodiesvariant-delete"
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
  fhan;

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

  createHoodies() {
    this.setState({
      isModal: true,
      errors: {},
      responseErrors: "",
    });
    const { modalHoodies } = this.state;
    this.colorstring = this.state.colors[0]["name"];
    this.sizestring = this.state.sizes[0]["name"];
    modalHoodies["id"] = 0;
    modalHoodies["name"] = this.colorstring + " " + this.sizestring;
    modalHoodies["color"] = this.state.colors[0]["key"];
    modalHoodies["size"] = this.state.sizes[0]["key"];
    modalHoodies["id"] = 0;
    this.setState({ modalHoodies });
  }
  handleChangeSelect = (e) => {
    const { name, value } = e.target;
    const { modalHoodies } = this.state;
    this.state.colors.map((item) => {
      if (item.key == modalHoodies["color"]) this.colorstring = item.name;
    });
    this.state.sizes.map((item) => {
      if (item.key == modalHoodies["size"]) this.sizestring = item.name;
    });
    if (name === "color") {
      this.state.colors.map((item) => {
        if (item.key === value) this.colorstring = item.name;
      });
    }
    if (name === "size") {
      this.state.sizes.map((item) => {
        if (item.key === value) this.sizestring = item.name;
      });
    }
    var namestring = this.colorstring + " " + this.sizestring;
    modalHoodies[name] = value;
    modalHoodies["name"] = namestring;
    this.setState({ modalHoodies });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const { modalHoodies } = this.state;
    modalHoodies[name] = value;
    this.setState({ modalHoodies });

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
    const { modalHoodies } = this.state;
    const { id } = modalHoodies;
    this.props.deleteVariant(id);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { modalHoodies } = this.state;
    this.validator.validateAll(modalHoodies).then((success) => {
      if (success) {
        if (modalHoodies.id === 0) {
          const {
            name,
            gender = "",
            color,
            size,
            type = "",
            master_type = "hoodies",
          } = modalHoodies;
          this.props.createVariant({
            name,
            gender,
            color,
            size,
            type,
            master_type,
          });
        } else {
          const {
            id,
            gender = "",
            name,
            color,
            size,
            type = "",
            master_type = "hoodies",
          } = modalHoodies;
          this.props.updateVariant({
            id,
            gender,
            name,
            color,
            type,
            size,
            master_type,
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
      modalHoodies,
      responseErrors,
    } = this.state;
    return (
      <>
        <div className="rna-wrapper">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <MainHeader name="Hoodies Variant" parentName="Variant" />
        <Container className="mt--6 Hoodies-variant-container" fluid>
          <Card style={{ minHeight: "700px" }}>
            <CardBody>
              <Row>
                <Col>
                  <Button
                    className="btn-createHoodies"
                    color="primary"
                    onClick={() => {
                      this.createHoodies();
                    }}
                  >
                    Create Hoodies Variant
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
                      <ModalHeader color="primary">
                        Hoodies Variant Edit
                      </ModalHeader>
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
                          <label htmlFor="hoodiesFormControlInput">Name</label>
                          <Input
                            name="name"
                            ref="name"
                            required
                            disabled
                            value={modalHoodies.name}
                            placeholder="e.g. Hoodies Name"
                            type="text"
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            invalid={"name" in errors}
                          />
                          <div className="invalid-feedback">{errors.name}</div>
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="genderFormControlInput">Colors</label>
                          <Input
                            name="color"
                            ref="color"
                            required
                            type="select"
                            value={modalHoodies.color}
                            onChange={this.handleChangeSelect}
                          >
                            {this.state.colors.map((item) => {
                              return (
                                <option key={item.key} value={item.key}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="genderFormControlInput">Sizes</label>
                          <Input
                            name="size"
                            ref="size"
                            required
                            type="select"
                            value={modalHoodies.size}
                            onChange={this.handleChangeSelect}
                          >
                            {this.state.sizes.map((item) => {
                              return (
                                <option key={item.key} value={item.key}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </Input>
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
                <Col>
                  <div className="div-searchbar-createHoodies">
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
                  <div className="div-tbl-Hoodiesvariant">
                    <Table className="align-items-center" hover bordered>
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

const mapStateToProps = ({ variant }) => ({
  colors: variant.colors,
  sizes: variant.sizes,
  message: variant.message,
  responseErrors: variant.errors,
});

export default connect(mapStateToProps, {
  createVariant,
  updateVariant,
  deleteVariant,
  listColors,
  listSizes,
})(HoodiesVariant);
