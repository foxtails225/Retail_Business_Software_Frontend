import React, { useState, useEffect } from 'react';

import {
    Card,
    CardBody,
    Row,
    Col,
    Button,
    Label,
    Input
} from 'reactstrap';

import APP_CONST from '../../../../../helper/constant';
import { baseSideName, baseName } from '../../../../../helper/util';


const INIT_IMAGE_URL = {
    front: null,
    back: null,
}

function ImageSideDoubleItem(props) {
    const [preview, setPreview] = useState(INIT_IMAGE_URL);
    const [isLight, setIsLight] = useState(true);
    const [artwork, setArtwork] = useState('');
    const preFile = `${props.skuNumber}-${props.variant}-artwork`;

    useEffect(() => {
        if (Object.keys(props.themeUrl).length > 0) {
            if (Object.keys(props.themeUrl).includes('light') && props.themeUrl['light'] && isLight) {
                setArtwork(baseName(props.themeUrl['light']));
            } else if (Object.keys(props.themeUrl).includes('dark') && props.themeUrl['dark'] && !isLight) {
                setArtwork(baseName(props.themeUrl['dark']));
            }
        }
    }, [props.themeUrl, isLight]);

    useEffect(() => {
        if (artwork !== '')
            props.source.colorList.filter(el => el.key === 'WH').map(el => {
                let frontUrl = el.front_url;
                let backUrl = el.back_url;

                Object.keys(INIT_IMAGE_URL).map(item => {
                    if (!props.imageUrl || !Object.keys(props.imageUrl).includes(item) || !props.imageUrl[item]) {
                        let theme = item === 'front' ? frontUrl : backUrl;
                        let url = preview[item] ? preview[item].replace(baseSideName(preview[item]), artwork) : (theme ? theme.replace("[$artwork]", artwork) : '');
                        setPreview(prevState => ({ ...prevState, [item]: url }));
                    } else if (props.imageUrl && Object.keys(props.imageUrl).includes(item) && props.imageUrl[item]) {
                        let art = baseName(props.imageUrl[item]);
                        let url = preview[item] ? preview[item].replace(baseSideName(preview[item]), art) : '';
                        setPreview(prevState => ({ ...prevState, [item]: url }));
                    }
                });
            });
    }, [props.imageUrl, artwork])

    useEffect(() => {
        props.onChecked(isLight)
    }, [isLight])

    const handlePreview = (event, frontUrl, backUrl) => {
        const key = event.target.getAttribute('data-name');
        let masterUrls = {};

        if (frontUrl && backUrl) {
            Object.keys(preview).map(item => {
                let url = item.includes('front') ? frontUrl : backUrl;
                let themeName = isLight ? 'light' : 'dark';
                let artworkFile = props.imageUrl && Object.keys(props.imageUrl).includes(item) && props.imageUrl[item] ?
                    baseName(props.imageUrl[item]) : Object.keys(props.themeUrl).includes(themeName) && props.themeUrl[themeName] ?
                        baseName(props.themeUrl[themeName]) : null

                url = artworkFile ? url.replace('[$artwork]', artworkFile) : null;
                setPreview(prevState => ({ ...prevState, [item]: url }));
                masterUrls[item] = url;
            });
            props.onSetMasters({ key, url: masterUrls });
        }
    }

    return (
        <Card>
            <CardBody className="custom-product-image-card image-process-panel pb-1">
                <Row>
                    {Object.keys(INIT_IMAGE_URL).map((item, idx) => (
                        <Col md={2} className="p-0" key={item}>
                            <Row style={{ height: '2.5rem' }}>
                                {item === 'front' &&
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
                    {Array(2).fill(null).map((value, index) => (
                        <Col md={4} className="p-0" key={`${props.variant}-${index}`}>
                            <img
                                className="image-process mb-2"
                                src={index === 0 ? preview.front : preview.back}
                            />
                        </Col>
                    ))}
                </Row>
                <Row className="mb-2 mt-2">
                    <Col md={3}>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                            <Label className="custom-toggle">
                                <Input type="checkbox" checked={isLight} onChange={() => setIsLight(!isLight)} />
                                <span className="custom-toggle-slider rounded-circle" />
                            </Label>
                            <small className="ml-2">{"For Light"}</small>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
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
                    <Col
                        md={6}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <div className="custom-color-picker">
                            {props.source.colorList.map(color => {
                                let customStyle = props.masterUrl && props.masterUrl.key === color.key ? "color-picker-clicked" : "";
                                return (
                                    <div
                                        key={color.key}
                                        data-name={color.key}
                                        className={`custom-color-picker-item-two ${customStyle} mr-1`}
                                        style={{ backgroundColor: APP_CONST.COLOR_LIST[color.key] }}
                                        onClick={(e) => handlePreview(e, color.front_url, color.back_url)}
                                    />
                                );
                            })}
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card >
    );
}

export default ImageSideDoubleItem;