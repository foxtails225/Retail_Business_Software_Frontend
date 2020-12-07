import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import NotificationAlert from 'react-notification-alert';

import {
    Container,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Table,
    Button,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
} from 'reactstrap';

import http from "../../../../helper/http";
import MainHeader from '../../../components/headers/MainHeader';
import APP_CONST from '../../../../helper/constant';
import { updateEtsySetting } from '../../../../store/actions/setting';


const columns = [
    { id: 'id', label: 'No', width: '5%' },
    { id: 'url', label: 'URL', width: '70%' },
    { id: 'type', label: 'Type', width: '10%' },
    { id: 'color', label: 'Colour', width: '5%' },
    { id: 'action', label: 'Action', width: '10%' },
];

function EtsySetting() {
    const [source, setSource] = useState({});
    const [selected, setSelected] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [urlValue, setUrlValue] = useState('');
    const [isModal, setIsModal] = useState(false);
    const alertEl = useRef(null);
    const dispatch = useDispatch();

    const message = useSelector(
        state => { return state['setting']['message'] },
        shallowEqual
    );

    const responseErrors = useSelector(
        state => { return state['setting']['errors'] },
        shallowEqual
    );

    useEffect(() => {
        let fetchUrl = `${APP_CONST.API_URL}/setting/etsy/list`;
        http
            .get(fetchUrl)
            .then((response) => {
                setSource(response.data.data);
                setSelected(selected === '' ? Object.keys(response.data.data)[0] : selected);
            })
            .catch((e) => {
                setSource({});
            });
    }, [message, responseErrors]);
    
    useEffect(() => {
        if (message !== '') {
            showNotification(message);
        } else if (responseErrors !== '') {
            showNotification(responseErrors);
        }
    }, [message, responseErrors])

    useEffect(() => {
        if (selected !== '' && selectedItem !== '')
            setUrlValue(source[selected].find(item => item.id === selectedItem).url);
    }, [selectedItem])

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
            <MainHeader name='Etsy Setting' parentName='Setting' />
            <Container className='mt--6 etsy-setting-container' fluid>
                <Modal
                    isOpen={isModal}
                    toggle={() => { setIsModal(!isModal); setSelectedItem(''); }}
                >
                    <Form
                        method="POST"
                        role="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(updateEtsySetting({ id: selectedItem, url: urlValue }));
                            setSelectedItem('');
                            setIsModal(false);
                        }}>
                        <ModalHeader>{`Update URL`}</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Input
                                    name="name"
                                    value={urlValue}
                                    placeholder="e.g. Tshirt Name"
                                    type="text"
                                    onChange={(e) => setUrlValue(e.target.value)}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => { setIsModal(false); setSelectedItem('') }}>
                                {`Cancel`}
                            </Button>
                            <Button color="primary" type="submit">
                                {`Save`}
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
                <Card
                    style={{ minHeight: '700px' }}
                    className="p-3"
                >
                    <div className='rna-wrapper'>
                        <NotificationAlert ref={alertEl} />
                    </div>
                    <CardHeader>
                        <h1>{`Etsy Setting`}</h1>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={12}>
                                <UncontrolledDropdown>
                                    <DropdownToggle color='primary' style={{ minWidth: '10rem' }}>
                                        {selected !== '' ? selected.split('_').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ') : 'Please Select ...'}
                                    </DropdownToggle>
                                    <DropdownMenu className='dropdown-menu-arrow'>
                                        {Object.keys(source).length === 0 &&
                                            <DropdownItem>
                                                {"No Options Found"}
                                            </DropdownItem>
                                        }
                                        {Object.keys(source).length > 0 && Object.keys(source).filter(item => source[item].length > 0)
                                            .map(item =>
                                                <DropdownItem key={item} onClick={() => setSelected(item)}>
                                                    {item.split('_').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')}
                                                </DropdownItem>
                                            )
                                        }
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Col>
                            <Col md={12} xl={12} className="mt-4">
                                <div className='div-tbl-etsy-setting'>
                                    <Table
                                        className='align-items-center'
                                        hover
                                        bordered
                                        responsive
                                    >
                                        <thead>
                                            <tr>
                                                {columns.map(item => (
                                                    <th
                                                        key={item.id}
                                                        className="text-center"
                                                    >
                                                        {item.label}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(source).length === 0 &&
                                                <tr>
                                                    <td
                                                        className="text-center"
                                                        colSpan={columns.length}
                                                    >
                                                        {"No Records Found"}
                                                    </td>
                                                </tr>
                                            }
                                            {Object.keys(source).length > 0 && source[selected] &&
                                                source[selected].map((item, idx) => (
                                                    <tr
                                                        key={`${item.master}_${item.id}`}
                                                        style={{ backgroundColor: item['type'] === '2' ? '#e6f2ff' : 'inherit' }}
                                                    >
                                                        {columns.map(el => {
                                                            let value;
                                                            let style = { width: el.width };

                                                            switch (el.id) {
                                                                case 'id':
                                                                    value = idx + 1;
                                                                    break;
                                                                case 'type':
                                                                    value = item[el.id] === '1' ? 'Product Image' : 'Manual Image';
                                                                    break;
                                                                case 'action':
                                                                    value = <Row>
                                                                        <Col md={12} xl={12}>
                                                                            <Button
                                                                                className="btn-tbl-tshirtvariant-edit"
                                                                                size="sm"
                                                                                color="danger"
                                                                                data-dz-remove
                                                                                onClick={() => { setIsModal(!isModal); setSelectedItem(item.id) }}
                                                                            >
                                                                                <span className="btn-inner--icon mr-1">
                                                                                    <i className="fas fa-edit" />
                                                                                </span>
                                                                                <span className="btn-inner--text">
                                                                                    {`EDIT`}
                                                                                </span>
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>;
                                                                    break;
                                                                case 'url':
                                                                    value = <span>{item[el.id]}</span>;
                                                                    style = { width: el.width, whiteSpace: 'normal', maxWidth: '30rem' }
                                                                    break;
                                                                case 'color':
                                                                    value = <span>{item[el.id]}</span>;
                                                                    break;
                                                                default:
                                                                    break;
                                                            }

                                                            return (
                                                                <td
                                                                    key={`${item.master}_${item.id}_${el.id}`}
                                                                    className="text-center"
                                                                    style={style}
                                                                >
                                                                    {value}
                                                                </td>
                                                            )
                                                        })}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
}

export default EtsySetting;