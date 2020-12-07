import React, { useState, useEffect } from 'react';

import {
    Card,
    CardBody,
    Row,
    Col,
    Button,
    Input,
    Label
} from 'reactstrap';

import APP_CONST from '../../../../../helper/constant';
import { baseName } from '../../../../../helper/util';

const INIT_IMAGE_URL = {
    light: null,
    dark: null,
}

function ImageDoubleItem(props) {
    const [preview, setPreview] = useState(INIT_IMAGE_URL);
    const preFile = `${props.skuNumber}-${props.variant}-artwork`;

    useEffect(() => {
        if (Object.keys(props.themeUrl).length > 0) {
            props.source.colorList.map(el => {
                if (props.source.type === 2 && el.gender === 'M') {
                    let url = el.url
                    if (el.key === 'WH') {
                        if (props.imageUrl && Object.keys(props.imageUrl).includes('light') && props.imageUrl['light']) {
                            setPreview(prevState => ({
                                ...prevState,
                                light: url.replace("[$artwork]", baseName(props.imageUrl['light']))
                            }));
                        } else if (Object.keys(props.themeUrl).includes('light') && props.themeUrl['light']) {
                            setPreview(prevState => ({
                                ...prevState,
                                light: url.replace("[$artwork]", baseName(props.themeUrl['light']))
                            }));
                        }
                    } else if (el.key === 'BK') {
                        if (props.imageUrl && Object.keys(props.imageUrl).includes('dark') && props.imageUrl['dark']) {
                            setPreview(prevState => ({
                                ...prevState,
                                dark: url.replace("[$artwork]", baseName(props.imageUrl['dark']))
                            }));
                        } else if (Object.keys(props.themeUrl).includes('dark') && props.themeUrl['dark']) {
                            setPreview(prevState => ({
                                ...prevState,
                                dark: url.replace("[$artwork]", baseName(props.themeUrl['dark']))
                            }));
                        }
                    }
                }
            });
        }
    }, [props.themeUrl, props.imageUrl])

    const handlePreview = (event, url) => {
        const name = event.target.getAttribute('name');
        const key = event.target.getAttribute('data-name');
        const gender = event.target.getAttribute('data-gender');

        if (url) {
            let artworkFile = props.imageUrl && Object.keys(props.imageUrl).includes(name) && props.imageUrl[name] ?
                baseName(props.imageUrl[name]) : Object.keys(props.themeUrl).includes(name) && props.themeUrl[name] ?
                    baseName(props.themeUrl[name]) : null;
            url = artworkFile ? url.replace("[$artwork]", artworkFile) : null;
            setPreview(prevState => ({ ...prevState, [name]: url }));
            props.onSetMasters({ key, gender, url });
        }
    }

    return (
        <Card>
            <CardBody className="custom-product-image-card image-process-panel pb-1">
                <Row>
                    <Col md={4}>
                        <Row>
                            {Object.keys(INIT_IMAGE_URL).map(item => (
                                <Col md={6} className="p-0" key={item}>
                                    <Row style={{ height: '2.5rem' }}>
                                        {item === 'light' &&
                                            <Col md={12}>
                                                <h4 className="mb-4">{props.source.title}</h4>
                                            </Col>
                                        }
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <img
                                                className="image-prview mb-2"
                                                src={
                                                    (props.imageUrl && Object.keys(props.imageUrl).includes(item) && props.imageUrl[item]) ?
                                                        props.imageUrl[item] : null
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Button
                                                id={`${preFile}-${item}`}
                                                name={item}
                                                type='button'
                                                color='primary'
                                                className="custom-upload-button mb-1"
                                                size="sm"
                                                style={{ width: '97%', fontSize: '0.65rem' }}
                                                onClick={(e) => props.onUploadFile(e, props.variant)}
                                            >
                                                {`Upload ${item.charAt(0).toUpperCase() + item.slice(1)}`}
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Button
                                                id={`${preFile}-${item}`}
                                                name={item}
                                                type='button'
                                                color='primary'
                                                className="custom-upload-button"
                                                size="sm"
                                                style={{ width: '97%', fontSize: '0.65rem' }}
                                                onClick={(e) => props.onRemoveFile(e, props.variant)}
                                            >
                                                {`Remove ${item.charAt(0).toUpperCase() + item.slice(1)}`}
                                            </Button>
                                        </Col>
                                    </Row>

                                </Col>
                            ))}
                        </Row>
                        <Row>
                            <Col md={12} className="mt-3">
                                <div style={{ justifyContent: 'left', alignItems: 'center', display: 'flex' }}>
                                    <Label className="custom-toggle">
                                        <Input
                                            type="checkbox"
                                            checked={!props.skipItems.includes(props.variant)}
                                            onChange={(e) => props.onSkipItems(props.variant, !e.target.checked)}
                                        />
                                        <span className="custom-toggle-slider rounded-circle" />
                                    </Label>
                                    <small className="ml-2">{"Upload"}</small>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    {Array(props.source.type).fill(null).map((value, index) => (
                        <Col md={4} className="p-0" key={`${props.variant}-${index}`}>
                            <img
                                className="image-process mb-2"
                                src={APP_CONST.THEME[index] === 'D' ? preview.dark : preview.light}
                            />
                            {Array(props.source.gender).fill(null).map((val, idx) => (
                                <Row key={`${props.variant}-${index}-${idx}`}>
                                    <Col
                                        md={4} style={{ textAlign: 'end' }}
                                        className="pr-0"
                                    >
                                        <h5 className="custom-color-picker-title m-0">
                                            {APP_CONST.GENDER_LIST[idx].name}
                                        </h5>
                                    </Col>
                                    <Col
                                        md={8}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                    >
                                        <div className="custom-color-picker">
                                            {props.source.colorList.map(color => {
                                                if (color.theme === APP_CONST.THEME[index]
                                                    && (color.gender === '' || color.gender === APP_CONST.GENDER_LIST[idx].key)) {
                                                    let customStyle = props.masterUrl &&
                                                        Object.keys(props.masterUrl).includes(APP_CONST.GENDER_LIST[idx].key) &&
                                                        props.masterUrl[APP_CONST.GENDER_LIST[idx].key].key === color.key ?
                                                        "color-picker-clicked" : "";

                                                    return (
                                                        <div
                                                            key={`${color.key}-${idx}`}
                                                            name={color.theme === 'D' ? 'dark' : 'light'}
                                                            className={`custom-color-picker-item-one ${customStyle} mr-1`}
                                                            data-name={color.key}
                                                            data-gender={color.gender}
                                                            style={{ backgroundColor: APP_CONST.COLOR_LIST[color.key] }}
                                                            onClick={(e) => handlePreview(e, color.url)}
                                                        />
                                                    )
                                                }
                                            })}
                                        </div>
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                    ))}
                </Row>
            </CardBody>
        </Card>
    );
}

export default ImageDoubleItem;