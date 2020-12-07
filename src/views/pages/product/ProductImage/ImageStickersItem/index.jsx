import React, { useState, useEffect } from 'react';

import {
    Card,
    CardBody,
    Row,
    Col,
    Label,
    Input
} from 'reactstrap';

import { baseName } from '../../../../../helper/util';


function ImageStickersItem(props) {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (props.imageUrl && Object.keys(props.imageUrl).includes('artwork')) {
            let url = props.source.colorList[0].url.replace('[$artwork]', baseName(props.imageUrl['artwork']));
            setPreview(url);
        }
    }, [props.imageUrl])

    return (
        <Card>
            <CardBody className="custom-product-image-card image-process-panel pb-4">
                <Row>
                    <Col md={4} className="p-0">
                        <Row style={{ height: '2.5rem' }}>
                            <Col md={12}>
                                <h4 className="mb-4">{props.source.title}</h4>
                            </Col>
                        </Row>
                        <Row className="mb-6">
                            <Col md={12}>
                                <img
                                    className={preview ? "image-prview-stickers mb-2" : "image-prview mb-2"}
                                    src={props.imageUrl && Object.keys(props.imageUrl).includes('artwork') && props.imageUrl.artwork ?
                                        props.imageUrl.artwork : null}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
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
                        </Row>
                    </Col>
                    <Col className="col-md-6 offset-1" style={{ justifyContent: 'center' }}>
                        <img
                            className="image-process mb-3"
                            src={preview}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card >
    );
}

export default ImageStickersItem;