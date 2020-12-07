import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import NotificationAlert from 'react-notification-alert';

import {
    Card,
    CardBody,
    Row,
    Col,
    CardImg,
    Button
} from 'reactstrap';

import { uploadProduct } from '../../../store/actions/product';


function ProductUpload(props) {
    const [checkedItems, setCheckedItems] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const alertEl = useRef(null);

    const message = useSelector(
        state => { return state['product']['message'] },
        shallowEqual
    );

    const responseErrors = useSelector(
        state => { return state['product']['errors'] },
        shallowEqual
    );

    const product = useSelector(
        state => { return state['product']['payload'] },
        shallowEqual
    );

    useEffect(() => {
        if (isSubmit) {
            let checkedList = Object.keys(checkedItems).filter(item => checkedItems[item]);
            
            dispatch(uploadProduct({
                id: product.id,
                list: checkedList,
                data: props.source,
                artworks: props.artworks,
                masterUrl: props.masterUrl,
                skipItems: props.skipItems
            }));
        }
    }, [isSubmit]);

    useEffect(() => {
        if (message !== '') {
            if (message && message.includes('marketplaces')) {
                props.onSubmit(false);
            }
            showNotification(message);
        } else if (responseErrors !== '') {
            props.onSubmit(false);
            showNotification(responseErrors);
        }
    }, [message, responseErrors]);

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

    const handleChecked = (event) => {
        const { id } = event.currentTarget;
        const checked = Object.keys(checkedItems).includes(id) && checkedItems[id] ? true : false
        setCheckedItems(prevState => ({ ...prevState, [id]: !checked }));
    }

    const handleSubmit = () => {
        setIsSubmit(true);
        props.onSubmit(true);
    }
    
    return (
        <Card style={{ minHeight: '500px' }}>
            <div className='rna-wrapper'>
                <NotificationAlert ref={alertEl} />
            </div>
            <CardBody className="pl-6 pr-6">
                <Row>
                    <Col md={8}>
                        <h4 className='display-4 ml-3 mb-4'>
                            {"Product Upload"}
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Card
                            id="shopify"
                            className={
                                `upload-platform-card p-3 
                                        ${Object.keys(checkedItems).includes('shopify') && checkedItems['shopify'] ? 'checked' : ''}`
                            }
                            onClick={handleChecked}
                        >
                            <CardImg
                                src={require(`assets/img/brand/shopify.png`)}
                                className="upload-card-image"
                            />
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card
                            id="ebay"
                            className={
                                `upload-platform-card p-3 
                                        ${Object.keys(checkedItems).includes('ebay') && checkedItems['ebay'] ? 'checked' : ''}`
                            }
                            onClick={handleChecked}
                        >
                            <CardImg
                                src={require(`assets/img/brand/ebay.gif`)}
                                className="upload-card-image"
                            />
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card
                            id="etsy"
                            className={
                                `upload-platform-card p-3 
                                        ${Object.keys(checkedItems).includes('etsy') && checkedItems['etsy'] ? 'checked' : ''}`
                            }
                            onClick={handleChecked}
                        >
                            <CardImg
                                src={require(`assets/img/brand/etsy.png`)}
                                className="upload-card-image"
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <Button
                            color='info'
                            style={{ width: '100%' }}
                            onClick={handleSubmit}
                        >
                            {"Upload"}
                        </Button>
                    </Col>
                    <Col md={2}>
                        <Button
                            color='info'
                            style={{ width: '100%' }}
                            onClick={() => history.push('/product-list')}
                        >
                            {"Skip"}
                        </Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default ProductUpload;