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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import MainHeader from "../../components/headers/MainHeader";
import http from "../../../helper/http";
import {
  createKeyword,
  updateKeyword,
  deleteKeyword,
} from "../../../store/actions/keyword";
import APP_CONST from "../../../helper/constant";

class KeywordList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      "id",
      "tshirts",
      "stickers",
      "mugs",
      "tote_bags",
      "cushion_covers",
      "kids",
      "hoodies",
    ];
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
      sorted_column: this.columns[1],
      offset: 5,
      order: "asc",
      searchKey: "",
      modalKeyword: {
        id: 0,
        tshirts: "",
        stickers: "",
        mugs: "",
        tote_bags: "",
        cushion_covers: "",
        kids: "",
        hoodies: "",
      },
      responseErrors: "",
      errors: {},
      isModal: false,
      isDeleteModal: false,
    };

    this.validator = new ReeValidate({
      tshirts: "required|min:3",
      stickers: "required|min:3",
      mugs: "required|min:3",
      tote_bags: "required|min:3",
      cushion_covers: "required|min:3",
      kids: "required|min:3",
      hoodies: "required|min:3",
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
    const keyword = data.find((obj) => {
      return obj.id === id;
    });
    this.setState({
      modalKeyword: { ...keyword },
      isModal: true,
      responseErrors: "",
      errors: {},
    });
  }

  handleDelete(id) {
    const { data } = this.state.entities;
    const keyword = data.find((obj) => {
      return obj.id === id;
    });
    this.setState({
      modalKeyword: { ...keyword },
      isDeleteModal: true,
      responseErrors: "",
    });
  }

  fetchEntities() {
    let fetchUrl = `${APP_CONST.API_URL}/keyword/list/?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.per_page}&search_key=${this.state.searchKey}`;
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
      } else {
        return (
          <th
            scope="col"
            className="text-center"
            style={{ width: "13%" }}
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
        style={{ width: "6%" }}
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
              else
                return (
                  <td className="text-center" key={key}>
                    {data[key]}
                  </td>
                );
            })}
            <td className="td-action">
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  color=""
                  role="button"
                  size="sm"
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    onClick={(e) => {
                      self.handleEdit(data.id);
                    }}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    onClick={(e) => {
                      self.handleDelete(data.id);
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

  createKeyword() {
    this.setState({
      isModal: true,
      modalKeyword: {
        id: 0,
        tshirts: "",
        stickers: "",
        mugs: "",
        bags: "",
        tote_bags: "",
        cushion_covers: "",
        kids: "",
        hoodies: "",
      },
      responseErrors: "",
      errors: {},
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const { modalKeyword } = this.state;
    modalKeyword[name] = value;
    this.setState({ modalKeyword });

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
    const { modalKeyword } = this.state;
    const { id } = modalKeyword;
    this.props.deleteKeyword(id);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { modalKeyword } = this.state;
    this.validator.validateAll(modalKeyword).then((success) => {
      if (success) {
        if (modalKeyword.id === 0) {
          const {
            tshirts,
            stickers,
            mugs,
            tote_bags,
            cushion_covers,
            kids,
            hoodies,
          } = modalKeyword;
          this.props.createKeyword({
            tshirts,
            stickers,
            mugs,
            tote_bags,
            cushion_covers,
            kids,
            hoodies,
          });
        } else {
          const {
            id,
            tshirts,
            stickers,
            mugs,
            tote_bags,
            cushion_covers,
            kids,
            hoodies,
          } = modalKeyword;
          this.props.updateKeyword({
            id,
            tshirts,
            stickers,
            mugs,
            tote_bags,
            cushion_covers,
            kids,
            hoodies,
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
      modalKeyword,
      responseErrors,
    } = this.state;

    return (
      <>
        <div className="rna-wrapper">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <MainHeader name="Keyword List" parentName="Keyword" />
        <Container className="mt--6 keyword-list-container" fluid>
          <Card style={{ minHeight: "700px" }}>
            <CardBody>
              <Row>
                <Col>
                  <Button
                    className="btn-createkeyword"
                    color="primary"
                    onClick={() => {
                      this.createKeyword();
                    }}
                  >
                    Create Keyword
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
                      <ModalHeader color="primary">Keyword Edit</ModalHeader>
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
                          <label htmlFor="tshirtsFormControlInput">
                            Tshirts Keyword
                          </label>
                          <Input
                            required
                            id="tshirtsFormControlInput"
                            name="tshirts"
                            value={modalKeyword.tshirts}
                            type="text"
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            invalid={"tshirts" in errors}
                            maxLength={40}
                          />
                          <div className="invalid-feedback">
                            {errors.tshirts}
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="stickersFormControlInput">
                            Stickers Keyword
                          </label>
                          <Input
                            required
                            id="stickersFormControlInput"
                            name="stickers"
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            invalid={"stickers" in errors}
                            value={modalKeyword.stickers}
                            type="text"
                            maxLength={40}
                          />
                          <div className="invalid-feedback">
                            {errors.stickers}
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="mugsFormControlInput">
                            Mugs Keyword
                          </label>
                          <Input
                            required
                            id="mugsFormControlInput"
                            name="mugs"
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            invalid={"mugs" in errors}
                            value={modalKeyword.mugs}
                            type="text"
                            maxLength={40}
                          />
                          <div className="invalid-feedback">{errors.mugs}</div>
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="toteBagsFormControlInput">
                            Tote Bags Keyword
                          </label>
                          <Input
                            required
                            id="toteBagsFormControlInput"
                            name="tote_bags"
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            invalid={"tote_bags" in errors}
                            value={modalKeyword.tote_bags}
                            type="text"
                            maxLength={40}
                          />
                          <div className="invalid-feedback">
                            {errors.tote_bags}
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="cushionFormControlInput">
                            Cushion Covers Keyword
                          </label>
                          <Input
                            required
                            id="cushionFormControlInput"
                            name="cushion_covers"
                            onBlur={this.handleBlur}
                            value={modalKeyword.cushion_covers}
                            onChange={this.handleChange}
                            invalid={"cushion_covers" in errors}
                            type="text"
                            maxLength={40}
                          />
                          <div className="invalid-feedback">
                            {errors.cushion_covers}
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="kidsFormControlInput">
                            Kids Keyword
                          </label>
                          <Input
                            required
                            id="kidsFormControlInput"
                            name="kids"
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            value={modalKeyword.kids}
                            invalid={"kids" in errors}
                            placeholder="e.g. Kids Funny Cute School"
                            type="text"
                            maxLength={40}
                          />
                          <div className="invalid-feedback">{errors.kids}</div>
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="hoodiesFormControlInput">
                            Hoodies Keyword
                          </label>
                          <Input
                            id="hoodiesFormControlInput"
                            required
                            name="hoodies"
                            value={modalKeyword.hoodies}
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            invalid={"hoodies" in errors}
                            placeholder="e.g. Hoodies Funny Pun Joke Novelty"
                            type="text"
                            maxLength={40}
                          />
                          <div className="invalid-feedback">
                            {errors.hoodies}
                          </div>
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
                  <div className="div-searchbar-createkeyword">
                    <Form className="navbar-search form-inline mr-sm-3">
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
                  <div className="div-tbl-keywordlist">
                    <Table
                      className="align-items-center"
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

const mapStateToProps = ({ keyword }) => ({
  responseErrors: keyword.errors,
  message: keyword.message,
});

export default connect(mapStateToProps, {
  createKeyword,
  updateKeyword,
  deleteKeyword,
})(KeywordList);
