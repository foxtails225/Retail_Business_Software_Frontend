import React, { useState, useEffect, useRef } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import classnames from "classnames";
import NotificationAlert from 'react-notification-alert';

import {
    Card,
    CardBody,
    CardFooter,
    Container,
    Collapse,
    Button,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Badge,
} from 'reactstrap';

import MainHeader from '../../../components/headers/MainHeader';
import ColorPicker from './ColorPicker';
import http from "../../../../helper/http";
import APP_CONST from "../../../../helper/constant";
import { toTimeZone } from "../../../../helper/util";
import { reUploadProduct } from "../../../../store/actions/product";


const STATUS = {
    0: "New",
    1: "Process",
    2: "Failure",
    3: "Success"
};

const COMPLETED_STATUS = {
    0: 'Information',
    1: 'Cloudinary',
    2: 'Completed'
};

const INIT_ENTITIES = {
    data: [],
    page: 1,
    last_page: 1,
    per_page: 20,
    total: 1,
};

const INIT_UPLOAD_ITEM = {
    id: 0,
    master: '',
    masterColor: {},
};

const COLUMNS = [
    { id: 'id', name: 'no', width: '5%' },
    { id: 'product_title', name: 'title', width: '20%' },
    { id: 'product_no', name: 'sku', width: '10%' },
    { id: 'created_at', name: 'start time', width: '10%' },
    { id: 'updated_at', name: 'end time', width: '10%' },
    { id: 'completed', name: 'process', width: '10%' },
    { id: 'product_status', name: 'status', width: '10%' },
];

function ProductStatus() {
    const [page, setPage] = useState(1);
    const [entities, setEntities] = useState(INIT_ENTITIES);
    const [source, setSource] = useState({})
    const [searchKey, setSearchKey] = useState("");
    const [badge, setBadge] = useState([]);
    const [uploadItem, setUploadItem] = useState(INIT_UPLOAD_ITEM);
    const [isModal, setIsModal] = useState(false);
    const [isOpen, setIsOpen] = useState({});
    const [isOpenError, setIsOpenError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [pagination, setPagination] = useState({ sortedColumn: 'updated_at', order: 'desc' })
    const dispatch = useDispatch();
    const alertEl = useRef(null);
    const offset = 5;

    const message = useSelector(
        state => { return state['product']['message'] },
        shallowEqual
    );

    const responseErrors = useSelector(
        state => { return state['product']['errors'] },
        shallowEqual
    );

    useEffect(() => {
        let fetchUrl = `${APP_CONST.API_URL}/product/image/list`;
        http
            .get(fetchUrl)
            .then((response) => {
                setSource(response.data.data.imageList);
            })
            .catch((e) => {
                setSource({});
            });
    }, [])

    useEffect(() => {
        if (entities.data.length > 0) {
            const interval = setInterval(() => {
                fetchEntities();
                setBadge([]);
            }, 30000);
            return () => clearInterval(interval);
        } else {
            fetchEntities()
        }
    }, [entities]);

    useEffect(() => {
        fetchEntities();
    }, [page, pagination])

    useEffect(() => {
        if (message !== '') {
            showNotification(message);
        } else if (responseErrors !== '') {
            showNotification(responseErrors);
        }
    }, [message, responseErrors]);

    useEffect(() => {
        let disabled = false;

        switch (uploadItem.master) {
            case 'tshirts':
                disabled = Object.keys(uploadItem.masterColor).length === 2
                break;
            case 'stickers':
                disabled = true;
                break;
            case 'mugs':
                disabled = Object.keys(uploadItem.masterColor).includes('key');
                break;
            default:
                break;
        }
        setIsDisabled(!disabled);
    }, [uploadItem])

    const fetchEntities = () => {
        let fetchUrl = `${APP_CONST.API_URL}/product/status/?&page=${page}&column=${pagination.sortedColumn}&order=${pagination.order}&per_page=${entities.per_page}&search_key=${searchKey}`;
        http
            .get(fetchUrl)
            .then((response) => {
                setEntities(response.data.data);
            })
            .catch((e) => {
                setEntities(INIT_ENTITIES);
            });
    };

    const handleError = (event, status, error) => {
        if (status === 2 && event.target.getAttribute('name') !== 'reupload') {
            setIsOpenError(!isOpenError);
            setErrorMessage(error);
        }
    }

    const handleBadge = (id, master) => {
        setIsModal(!isModal);
        setUploadItem(prevStats => ({ ...prevStats, id, master }));
        setBadge(prevState => [...prevState, id]);
    }

    const handleMasterColor = (value) => {
        switch (uploadItem.master) {
            case 'tshirts':
                let gender = value.gender;
                setUploadItem(prevState => ({
                    ...prevState,
                    masterColor: {
                        ...prevState['masterColor'],
                        [gender]: value,
                    }
                }));
                break;
            case 'mugs':
                setUploadItem(prevState => ({
                    ...prevState,
                    masterColor: value
                }));
                break;
            default:
                break;
        }
    }

    const handleReupload = () => {
        setIsModal(!isModal);
        dispatch(reUploadProduct(uploadItem));
        setUploadItem(INIT_UPLOAD_ITEM);
    }

    const handleReuploadCancel = () => {
        setIsModal(!isModal);
        setUploadItem(INIT_UPLOAD_ITEM);
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

    const sortByColumn = (column) => {
        column === pagination.sortedColumn ?
            pagination.order === 'desc' ?
                setPagination(prevState => ({ ...prevState, order: 'asc' })) :
                setPagination(prevState => ({ ...prevState, order: 'desc' })) :
            setPagination({ sortedColumn: column, order: 'asc' });
        setPage(1);
        fetchEntities();
    };

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

    return (
        <>
            <div className='rna-wrapper'>
                <NotificationAlert ref={alertEl} />
            </div>
            <MainHeader name='Product Status' parentName='Product' />
            <Container className='mt--6 product-status-container' fluid>
                <Card style={{ minHeight: '700px' }}>
                    <Modal
                        isOpen={isOpenError}
                        toggle={() => setIsOpenError(!isOpenError)}
                    >
                        <ModalHeader>{`Error Log`}</ModalHeader>
                        <ModalBody>
                            {errorMessage.split(",").join(", ")}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                type="button"
                                onClick={() => setIsOpenError(!isOpenError)}
                            >
                                {`Confirm`}
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <Modal
                        isOpen={isModal}
                        toggle={handleReuploadCancel}
                    >
                        <ModalHeader>{`Re-Uploading Process`}</ModalHeader>
                        <ModalBody>
                            {Object.keys(source)
                                .filter(item => item === uploadItem.master)
                                .map(item => (
                                    <React.Fragment key={item}>
                                        <ColorPicker
                                            source={source[item]}
                                            masterColor={uploadItem.masterColor}
                                            onMasterColor={handleMasterColor}
                                        />
                                    </React.Fragment>
                                ))}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                type="button"
                                disabled={isDisabled}
                                onClick={handleReupload}
                            >
                                {`Confirm`}
                            </Button>
                            <Button
                                color="secondary"
                                type="button"
                                onClick={handleReuploadCancel}
                            >
                                {`Cancel`}
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <CardBody>
                        <div className="collapse-table">
                            <Table
                                hover
                                bordered
                                responsive
                                className='align-items-center text-center'
                            >
                                <thead className='thead-light'>
                                    <tr>
                                        {COLUMNS.map(item => (
                                            <th
                                                key={item.name}
                                                scope='col'
                                                className='text-center'
                                                style={{ width: item.width }}
                                                onClick={
                                                    item.id === "product_no" ||
                                                        item.id === "product_status" ||
                                                        item.id === "created_at" ||
                                                        item.id === "completed" ||
                                                        item.id === "updated_at" ?
                                                        () => sortByColumn(item.id) : undefined
                                                }
                                            >
                                                {item.name}
                                                {item.id === pagination.sortedColumn ?
                                                    pagination.order === 'asc' ?
                                                        <i className='fa fa-sort-alpha-down' /> : <i className='fa fa-sort-alpha-up' />
                                                    : null}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {entities.data.map((item, idx) => {
                                        let total = { status: 'New', color: '#fff' };
                                        let bgColor = '';

                                        switch (item.product_status) {
                                            case 1:
                                                total.status = 'Process'
                                                total.color = '#66ccff';
                                                break;
                                            case 2:
                                                total.status = 'Failure'
                                                total.color = '#ff6666';
                                                break;
                                            case 3:
                                                total.status = 'Success'
                                                total.color = '#5bd75b';
                                                break;
                                            default:
                                                break;
                                        }

                                        switch (item.completed) {
                                            case 0:
                                                bgColor = '#66ccff';
                                                break;
                                            case 1:
                                                bgColor = '#ff6666';
                                                break;
                                            case 2:
                                                bgColor = '#5bd75b';
                                                break;
                                            default:
                                                break;
                                        }

                                        return (
                                            <React.Fragment key={item.id}>
                                                <tr
                                                    onClick={() => setIsOpen(prevState => ({
                                                        ...prevState,
                                                        [item.id]: Object.keys(isOpen).includes(item.id.toString()) ?
                                                            !isOpen[item.id] : true
                                                    }))}
                                                    style={{
                                                        backgroundColor: Object.keys(isOpen).includes(item.id.toString()) && isOpen[item.id] ?
                                                            '#66ccff' : '#FFF'
                                                    }}
                                                >
                                                    <td>{idx + 1}</td>
                                                    <td>{item.product_title}</td>
                                                    <td>{item.product_no}</td>
                                                    <td>{toTimeZone(item.created_at)}</td>
                                                    <td>{toTimeZone(item.updated_at)}</td>
                                                    <td
                                                        style={{
                                                            backgroundColor: bgColor,
                                                            color: '#FFF'
                                                        }}
                                                    >
                                                        {COMPLETED_STATUS[item.completed]}
                                                    </td>
                                                    <td
                                                        style={{
                                                            backgroundColor: total.color,
                                                            color: total.status === 'New' ? "#000" : "#fff"
                                                        }}
                                                    >
                                                        {total.status}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="7" style={{ padding: 0 }}>
                                                        <Collapse
                                                            role="tabpanel"
                                                            isOpen={Object.keys(isOpen).includes(item.id.toString()) ? isOpen[item.id] : false}
                                                        >
                                                            <Table
                                                                hover
                                                                bordered
                                                                responsive
                                                                className='align-items-center text-center'
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>{`Product Master SKU`}</th>
                                                                        <th>{`Shopify`}</th>
                                                                        <th>{`Etsy`}</th>
                                                                        <th>{`eBay`}</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item.masters.map(master => (
                                                                        <tr key={master.id}>
                                                                            <td>{master.sku_no}</td>
                                                                            {item.status.filter(el => el.master_id === master.id).map(el => {
                                                                                let cellStyle = '';

                                                                                switch (el.status) {
                                                                                    case 0:
                                                                                        cellStyle = {
                                                                                            backgroundColor: '#fff',
                                                                                            position: 'relative'
                                                                                        }
                                                                                        break;
                                                                                    case 1:
                                                                                        cellStyle = {
                                                                                            backgroundColor: '#66ccff',
                                                                                            color: '#fff',
                                                                                            position: 'relative'
                                                                                        }
                                                                                        break;
                                                                                    case 2:
                                                                                        cellStyle = {
                                                                                            backgroundColor: '#ff6666',
                                                                                            color: '#fff',
                                                                                            position: 'relative'
                                                                                        }
                                                                                        break;
                                                                                    case 3:
                                                                                        cellStyle = {
                                                                                            backgroundColor: '#5bd75b',
                                                                                            color: '#fff',
                                                                                            position: 'relative'
                                                                                        }
                                                                                        break;
                                                                                    default:
                                                                                        break;
                                                                                }

                                                                                return (
                                                                                    <React.Fragment key={el.id}>
                                                                                        <td
                                                                                            id={el.id}
                                                                                            style={cellStyle}
                                                                                            onClick={(e) => handleError(e, el.status, el.error_log)}
                                                                                        >
                                                                                            <span>{STATUS[el.status]}</span>
                                                                                            {el.status === 2 && el.reupload === 0 &&
                                                                                                !badge.includes(el.id) && uploadItem.id !== el.id ?
                                                                                                <>
                                                                                                    <Badge
                                                                                                        id={`badge-${el.id}`}
                                                                                                        name="reupload"
                                                                                                        color="secondary"
                                                                                                        className="ml-2"
                                                                                                        style={{
                                                                                                            zIndex: 1000,
                                                                                                            position: 'absolute',
                                                                                                            right: '2'
                                                                                                        }}
                                                                                                        onClick={() => handleBadge(el.id, el.master_type)}
                                                                                                    >
                                                                                                        {`ReUpload`}
                                                                                                    </Badge>
                                                                                                </> : ''}
                                                                                        </td>
                                                                                    </React.Fragment>
                                                                                );
                                                                            })}
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        </Collapse>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        );
                                    })}
                                    {!entities.data.length &&
                                        <tr>
                                            <td
                                                colSpan={COLUMNS.length + 1}
                                                className="text-center td-noredords"
                                            >
                                                {"No Records Found."}
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </CardBody>
                    <CardFooter className="py-4">
                        <nav aria-label="...">
                            <Pagination
                                className="pagination justify-content-end mb-0"
                                listClassName="justify-content-end mb-0"
                            >
                                <PaginationItem
                                    className={classnames({
                                        disabled: 1 == entities.page,
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
                                            entities.last_page === entities.page
                                    })}
                                >
                                    <PaginationLink
                                        onClick={() => setPage(entities.page + 1)}
                                    >
                                        <i className="fas fa-angle-right" />
                                        <span className="sr-only">{`Next`}</span>
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

export default ProductStatus;