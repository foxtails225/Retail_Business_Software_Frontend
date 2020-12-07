import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import NotificationAlert from 'react-notification-alert';
import classnames from "classnames";

import {
    Table,
    Button,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Container,
    Input,
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    UncontrolledAlert
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


const INIT_ENTITIES = {
    data: [],
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 1,
};

const INIT_MODAL_CATEGORY = {
    id: 0,
    name: "",
};

const INIT_MODAL_MERGE_CATEGORY = {
    id: 0,
    deletedName: "",
    mergedName: ""
}

function CategoryList() {
    const [page, setPage] = useState(1);
    const [columns, setColumns] = useState(['no']);
    const [entities, setEntities] = useState(INIT_ENTITIES);
    const [searchKey, setSearchKey] = useState("");
    const [isModal, setIsModal] = useState(false);
    const [isMergeModal, setIsMergeModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [modalCategory, setModalCategory] = useState(INIT_MODAL_CATEGORY);
    const [modalMergeCategory, setModalMergeCategory] = useState(INIT_MODAL_MERGE_CATEGORY);
    const [optionItems, setOptionItems] = useState({});
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const alertEl = useRef(null);
    const offset = 5;

    const message = useSelector(
        state => { return state['category']['message'] },
        shallowEqual
    );

    const responseErrors = useSelector(
        state => { return state['category']['errors'] },
        shallowEqual
    );

    useEffect(() => {
        let isSubscribed = true;
        let fetchUrl = `${APP_CONST.API_URL}/category/get-category`;
        http
            .get(fetchUrl)
            .then((response) => {
                if (isSubscribed) {
                    setOptionItems(response.data.data);
                }
            })
            .catch((e) => {
                setOptionItems({});
            });
        return () => isSubscribed = false;
    }, []);

    useEffect(() => {
        let fetchUrl = `${APP_CONST.API_URL}/category/list/?page=${page}&per_page=${entities.per_page}&search_key=${searchKey}`;
        http
            .get(fetchUrl)
            .then((response) => {
                setEntities(response.data.data);
                setColumns(Object.keys(response.data.data.data[0]));
            })
            .catch((e) => {
                setEntities(INIT_ENTITIES);
            });
    }, [page, searchKey, message]);

    useEffect(() => {
        if (message !== '') {
            showNotification(message);
            setIsModal(false);
            setIsMergeModal(false);
            setIsDeleteModal(false);
        } else if (responseErrors !== '') {
            setError(responseErrors);
            showNotification(responseErrors);
        }
    }, [message, responseErrors])

    const showNotification = (message) => {
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
        alertEl.current.notificationAlert(options);
    }

    const pagesNumbers = () => {
        if (!entities.to) {
            return [];
        }

        let from = entities.current_page - offset >= 1 ? entities.current_page - offset : 1;
        let to = from + offset * 2 - 1;
        let pagesArray = [];

        if (to >= entities.last_page) {
            to = entities.last_page;
            from = entities.last_page - offset * 2 >= 1 ? entities.last_page - offset * 2 : 1;
        }

        for (let page = from; page <= to; page++) {
            pagesArray.push(page);
        }
        return pagesArray;
    }

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setEntities(prevState => ({ ...prevState, current_page: 1 }));
            setSearchKey(e.target.value);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        name === "name" ?
            setModalCategory(prevState => ({ ...prevState, [name]: value })) :
            setModalMergeCategory(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEdit = (id) => {
        const category = entities.data.find((obj) => {
            return obj.id == id;
        });
        setModalCategory({ ...category });
        setIsModal(true);
        setError("");
    }

    const handleDelete = (id) => {
        const category = entities.data.find((obj) => {
            return obj.id == id;
        });
        setModalCategory({ ...category });
        setIsDeleteModal(true);
        setError("");
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (modalCategory.id === 0) {
            const { name } = modalCategory;
            dispatch(createCategory({ name, ...modalCategory }));
        } else {
            const { id, name } = modalCategory;
            dispatch(updateCategory({ id, name, ...modalCategory }));
        }
        setModalCategory(INIT_MODAL_CATEGORY);
    };

    const handleChangeOption = (event, item) => {
        event.preventDefault();
        const { value } = event.target;
        setModalCategory(prevState => ({ ...prevState, [item]: value }))
    }

    const handleMergeSubmit = (event) => {
        event.preventDefault();

        if (modalMergeCategory.id === 0) {
            const { deletedName, mergedName } = modalMergeCategory;
            dispatch(mergeCategory({ deletedName, mergedName }));
        } else {
            const { id, deletedName, mergedName } = modalMergeCategory;
            dispatch(mergeCategory({ id, deletedName, mergedName }));
        }
        setModalMergeCategory(INIT_MODAL_MERGE_CATEGORY);
    };

    const handleSubmitDelete = (event) => {
        event.preventDefault();
        const { id } = modalCategory;
        dispatch(deleteCategory(id));
        setModalCategory(INIT_MODAL_CATEGORY);
    };

    return (
        <>
            <div className='rna-wrapper'>
                <NotificationAlert ref={alertEl} />
            </div>
            <MainHeader name="Category List" parentName="Category" />
            <Container className="mt--6 category-list-container" fluid>
                <Card style={{ minHeight: "700px" }}>
                    <CardBody>
                        <Row>
                            <Col md={2} xl={2}>
                                <Button
                                    name="createBtn"
                                    className="btn-createcategory"
                                    color="primary"
                                    onClick={(e) => {
                                        setIsModal(true);
                                        setError("");
                                    }}
                                >
                                    {`Create Category`}
                                </Button>
                            </Col>
                            <Modal
                                isOpen={isModal}
                                toggle={() => {
                                    setIsModal(!isModal);
                                    setModalCategory(INIT_MODAL_CATEGORY);
                                }}
                            >
                                <Form
                                    role="form"
                                    method="POST"
                                    onSubmit={(e) => handleSubmit(e)}
                                >
                                    <ModalHeader color="primary">{`Category Edit`}</ModalHeader>
                                    <ModalBody>
                                        {error && (
                                            <UncontrolledAlert color="warning">
                                                <span className="alert-text ml-1">
                                                    <strong
                                                        dangerouslySetInnerHTML={{
                                                            __html: error,
                                                        }}
                                                    ></strong>
                                                </span>
                                            </UncontrolledAlert>
                                        )}
                                        <FormGroup>
                                            <label>{`Name`}</label>
                                            <Input
                                                name="name"
                                                required
                                                value={modalCategory.name}
                                                placeholder="e.g. Category Name"
                                                type="text"
                                                maxLength={40}
                                                onChange={handleChange}
                                                minLength="3"
                                            />
                                        </FormGroup>
                                        {columns.filter(item => item !== 'id' && item !== 'name').map((item, index) => (
                                            <FormGroup key={`select-${index}`}>
                                                <label htmlFor={item}>{item.charAt(0).toUpperCase() + item.slice(1).split('_').join(' ')}</label>
                                                <Input
                                                    type="select"
                                                    value={Object.keys(modalCategory).includes(item) &&
                                                        modalCategory[item] ? modalCategory[item] : 'none'
                                                    }
                                                    onChange={(e) => handleChangeOption(e, item)}
                                                >
                                                    {Object.keys(optionItems).includes(item) &&
                                                        <>
                                                            <option value="none">{`Please Select...`}</option>
                                                            {optionItems[item].map((el, idx) => (
                                                                <option
                                                                    key={`${item}-${idx}`}
                                                                    value={el}
                                                                >
                                                                    {el}
                                                                </option>
                                                            ))}
                                                        </>
                                                    }
                                                    {!Object.keys(optionItems).includes(item) &&
                                                        <option value="none" disabled>{"No Records Found."}</option>
                                                    }
                                                </Input>
                                            </FormGroup>
                                        ))}
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color="secondary"
                                            onClick={(e) => {
                                                setIsModal(false);
                                                setModalCategory(INIT_MODAL_CATEGORY);
                                            }}
                                        >
                                            {`Cancel`}
                                        </Button>
                                        <Button color="primary" type="submit">
                                            {`Save Changes`}
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            </Modal>
                            <Col md={2} xl={2}>
                                <Button
                                    name="createBtn"
                                    className="btn-createcategory"
                                    color="primary"
                                    onClick={(e) => {
                                        setIsMergeModal(true);
                                        setError("");
                                    }}
                                >
                                    {`Merge Category`}
                                </Button>
                            </Col>
                            <Modal
                                isOpen={isMergeModal}
                                toggle={() => {
                                    setIsMergeModal(!isMergeModal);
                                    setModalMergeCategory(INIT_MODAL_MERGE_CATEGORY);
                                }}
                            >
                                <Form
                                    name="mergeCategory"
                                    role="form"
                                    method="POST"
                                    onSubmit={handleMergeSubmit}
                                >
                                    <ModalHeader color="primary">{`Category Merge`}</ModalHeader>
                                    <ModalBody>
                                        {error && (
                                            <UncontrolledAlert color="warning">
                                                <span className="alert-text ml-1">
                                                    <strong
                                                        dangerouslySetInnerHTML={{
                                                            __html: error,
                                                        }}
                                                    ></strong>
                                                </span>
                                            </UncontrolledAlert>
                                        )}
                                        <FormGroup>
                                            <label htmlFor="tshirtsFormControlInput">{`Deleted Category Name`}</label>
                                            <Input
                                                name="deletedName"
                                                required
                                                value={modalMergeCategory.deletedName}
                                                placeholder="e.g. Category Name"
                                                type="text"
                                                maxLength={40}
                                                onChange={handleChange}
                                                minLength="3"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <label htmlFor="tshirtsFormControlInput">{`Merged Category Name`}</label>
                                            <Input
                                                name="mergedName"
                                                required
                                                value={modalMergeCategory.mergedName}
                                                placeholder="e.g. Category Name"
                                                type="text"
                                                maxLength={40}
                                                onChange={handleChange}
                                                minLength="3"
                                            />
                                        </FormGroup>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color="secondary"
                                            onClick={(e) => {
                                                setIsMergeModal(false);
                                                setModalMergeCategory(INIT_MODAL_MERGE_CATEGORY);
                                            }}
                                        >
                                            {`Cancel`}
                                        </Button>
                                        <Button color="primary" type="submit">
                                            {`Save Changes`}
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            </Modal>
                            <Modal
                                isOpen={isDeleteModal}
                                toggle={() => setIsDeleteModal(!isDeleteModal)}
                            >
                                <Form method="POST" onSubmit={handleSubmitDelete}>
                                    <ModalHeader>{`Confirm`}</ModalHeader>
                                    <ModalBody>
                                        {error && (
                                            <UncontrolledAlert color="warning">
                                                <span className="alert-text ml-1">
                                                    <strong
                                                        dangerouslySetInnerHTML={{
                                                            __html: error,
                                                        }}
                                                    ></strong>
                                                </span>
                                            </UncontrolledAlert>
                                        )}
                                        <FormGroup>
                                            <label>{`Do you really want to delete?`}</label>
                                        </FormGroup>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color="secondary"
                                            onClick={(e) => setIsDeleteModal(true)}
                                        >
                                            {`Cancel`}
                                        </Button>
                                        <Button color="primary" type="submit">
                                            {`Delete`}
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            </Modal>
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
                                                    onKeyDown={handleSearch}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Form>
                                </div>
                            </Col>
                            <Col md={12} xl={12}>
                                <div className="div-tbl-categorylist">
                                    <Table
                                        className="align-items-center"
                                        hover
                                        bordered
                                        responsive
                                    >
                                        <thead className="thead-light">
                                            <tr>
                                                {columns.map((item, idx) => (
                                                    <th
                                                        className={item === 'id' ? `text-center frozen` : `text-center`}
                                                        style={{
                                                            width: item === 'id' ? '12 %' : item === 'name' ? '10%' : 'inherit',
                                                            backgroundColor: '#f6f9fc',
                                                            paddingLeft: item === 'name' ? '2%' : 'inherit',
                                                            paddingRight: idx === columns.length - 1 ? '5%' : 'inherit',
                                                        }}
                                                        key={`table-header-${item}`}
                                                    >
                                                        {item === 'id' ? 'NO' : item.split('_').join(' ').toUpperCase()}
                                                    </th>
                                                ))}
                                                <th
                                                    className="text-center td-action"
                                                    style={{ width: '11.4rem' }}
                                                >
                                                    {'ACTION'}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {entities.data.length > 0 &&
                                                entities.data.map((data, index) => {
                                                    let current_number = (page - 1) * 20 + index + 1;

                                                    return (
                                                        <tr key={data.id} className="text-center">
                                                            {Object.keys(data).map((key, idx) => {
                                                                return (
                                                                    <td
                                                                        key={`${current_number}-${key}`}
                                                                        className={key === 'id' ? "frozen" : ""}
                                                                        style={{
                                                                            width: idx === Object.keys(data).length - 1 ?
                                                                                '14%' : key === 'id' ? '7%' :
                                                                                    key === 'name' ? '10%' : 'inherit',
                                                                            paddingLeft: key === 'name' ? '2%' : 'inherit',
                                                                            paddingRight: idx === Object.keys(data).length - 1 ? '5%' : 'inherit',
                                                                        }}
                                                                    >
                                                                        {key === 'id' ? current_number : data[key]}
                                                                    </td>
                                                                )
                                                            })}
                                                            <td
                                                                className="td-action"
                                                                style={{
                                                                    width: '11.4rem',
                                                                    paddingTop: '0.3rem',
                                                                    paddingBottom: '0.3rem'
                                                                }}
                                                            >
                                                                <Row>
                                                                    <Col>
                                                                        <Button
                                                                            className="btn-tbl-categorylist-edit"
                                                                            size="sm"
                                                                            color="primary"
                                                                            data-dz-remove
                                                                            onClick={(e) => handleEdit(data.id)}
                                                                        >
                                                                            <span className="btn-inner--icon mr-1">
                                                                                <i className="fas fa-edit" />
                                                                            </span>
                                                                            <span className="btn-inner--text">{`EDIT`}</span>
                                                                        </Button>
                                                                        <Button
                                                                            className="btn-tbl-categorylist-delete"
                                                                            size="sm"
                                                                            color="warning"
                                                                            data-dz-remove
                                                                            onClick={(e) => handleDelete(data.id)}
                                                                        >
                                                                            <span className="btn-inner--icon mr-2">
                                                                                <i className="fas fa-trash" />
                                                                            </span>
                                                                            <span className="btn-inner--text">{`DELETE`}</span>
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            {!entities.data.length &&
                                                <tr>
                                                    <td
                                                        colSpan={columns.length + 1}
                                                        className="text-center td-noredords"
                                                    >
                                                        {"No Records Found."}
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
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
                                        disabled: 1 == entities.current_page,
                                    })}
                                >
                                    <PaginationLink
                                        onClick={() => setPage(entities.page - 1)}
                                    >
                                        <i className="fas fa-angle-left" />
                                        <span className="sr-only">{"Previous"}</span>
                                    </PaginationLink>
                                </PaginationItem>
                                {pagesNumbers().map((page) =>
                                    (
                                        <PaginationItem
                                            className={classnames({
                                                active: page === entities.page,
                                            })}
                                            key={"pagination-" + page}
                                        >
                                            <PaginationLink onClick={() => setPage(page)}>
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                <PaginationItem
                                    className={classnames({
                                        disabled:
                                            entities.last_page === entities.current_page
                                    })}
                                >
                                    <PaginationLink
                                        onClick={() => setPage(entities.page + 1)}
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

export default CategoryList;
