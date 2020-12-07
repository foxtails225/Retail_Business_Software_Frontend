import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import classnames from "classnames";
import NotificationAlert from "react-notification-alert";
import {
    Table,
    Button,
    Row,
    Col,
    Card,
    CardBody,
    Container,
} from "reactstrap";

import MainHeader from "../../components/headers/MainHeader";

import {
    updateDescriptionVariant, getDescriptionVariant
} from "../../../store/actions/variant";


const columns = [
    { id: 'description', name: 'Description' },
    { id: 'shopify_description', name: 'Shopify' },
    { id: 'etsy_description', name: 'Etsy' },
    { id: 'ebay_description', name: 'eBay' },
    { id: 'amazon_description', name: 'Amazon' },
    { id: 'shopify_seo', name: 'Shopify SEO' },
    { id: 'etsy_seo', name: 'Etsy SEO' },
    { id: 'ebay_seo', name: 'eBay SEO' },
    { id: 'amazon_seo', name: 'Amazon SEO' },
];

function DescriptionVariant() {
    const [source, setSource] = useState([]);
    const [isEdit, setIsEdit] = useState({});
    const dispatch = useDispatch();
    const alertEl = useRef(null);

    const message = useSelector(
        state => { return state['variant']['message'] },
        shallowEqual
    );

    const responseErrors = useSelector(
        state => { return state['variant']['errors'] },
        shallowEqual
    );

    const description = useSelector(
        state => { return state['variant']['description'] },
        shallowEqual
    );

    useEffect(() => {
        dispatch(getDescriptionVariant());
    }, []);

    useEffect(() => {
        if (description && description.length > 0)
            setSource(description);
    }, [description]);

    useEffect(() => {
        if (message !== '') {
            showNotification(message);
        } else if (responseErrors !== '') {
            showNotification(responseErrors);
        }
    }, [message, responseErrors]);

    const handleEdit = (e, type, el) => {
        setIsEdit(prevState => ({ ...prevState, [type]: { ...prevState[type], [el]: isEdit[type] && isEdit[type][el] ? false : true } }));

        if (isEdit[type] && isEdit[type][el]) {
            dispatch(updateDescriptionVariant({
                master: type,
                subType: el,
                description: source.filter(el => el.master === type)[0][el]
            }));
        }
    }

    const capitalize = (str) => {
        if (str == 'cushionCovers') {
            str = 'cushion Covers';
        } else if (str == 'toteBags') {
            str = 'tote bags';
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const emitChange = (e, type, el) => {
        source.map(item => {
            if (item.master === type) {
                item[el] = e.target.innerText;
            }
        });
    }

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
            <div className="rna-wrapper">
                <NotificationAlert ref={alertEl} />
            </div>
            <MainHeader name="Variant Description" parentName="Variant" />
            <Container className="mt--6 description-variant-container" fluid>
                <Card style={{ minHeight: "700px" }}>
                    <CardBody>
                        <Row>
                            <Col md={12}>
                                <p className="font-weight-bold" style={{ fontSize: '0.9rem' }}>
                                    <i
                                        className="fas fa-exclamation-triangle"
                                        style={{ color: "#cece14", fontSize: '1rem' }}
                                    ></i>
                                    <span className="ml-2">{`Shortcodes: [$product_title]; [stickers_width]; [stickers_height]`}</span>
                                </p>
                            </Col>
                        </Row>
                        {source.map(item => (
                            <Row key={item.id}>
                                <Col md={12} xl={12}>
                                    <div className="div-tbl-description-variant">
                                        <div className="div-tbl-title-imgVar">
                                            <Row>
                                                <Col style={{ tableLayout: 'fixed', width: "300px" }}>
                                                    <h2>{capitalize(item.master)}</h2>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="tbl-wrapper">
                                            <Table className="align-items-center" bordered responsive>
                                                <thead className="thead-light">
                                                    <tr>
                                                        {columns.map((column, idx) => (
                                                            <th
                                                                scope="col"
                                                                className="text-center"
                                                                key={column.id}
                                                            >
                                                                {column.name}
                                                                <Button
                                                                    size="sm"
                                                                    color="primary"
                                                                    onClick={e => handleEdit(e, item.master, column.id)}
                                                                    style={{ padding: '0.1rem 0.2rem' }}
                                                                    className="ml-3"
                                                                >
                                                                    <i className={
                                                                        classnames({
                                                                            'fas fa-pen': !isEdit[item.master] || !isEdit[item.master][column.id],
                                                                            'fas fa-save': isEdit[item.master] && isEdit[item.master][column.id]
                                                                        })
                                                                    } />
                                                                </Button>
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        {Object.keys(item).filter(el => el !== 'id' && el !== 'master').map(el => (
                                                            <td
                                                                key={el}
                                                                contentEditable={isEdit[item.master] && isEdit[item.master][el] ? true : false}
                                                                onInput={e => emitChange(e, item.master, el)}
                                                                onBlur={e => emitChange(e, item.master, el)}
                                                                suppressContentEditableWarning={true}
                                                                style={isEdit[item.master] && isEdit[item.master][el] ?
                                                                    { border: '2px solid', whiteSpace: 'pre-line', verticalAlign: 'top', textAlign: 'left' } :
                                                                    { border: '1px', textAlign: 'center' }
                                                                }
                                                            >
                                                                {item[el]}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </Col>
                            </Row>)
                        )}
                    </CardBody>
                </Card>
            </Container>
        </>
    );
}

export default DescriptionVariant;
