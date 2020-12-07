import React from 'react';

import {
    Card,
    CardBody,
    Row,
    Col,
    Button,
    Label,
    Input
} from 'reactstrap';


function ImageSingleItem(props) {
    return (
        <Card>
            <CardBody className="custom-procut-image-card image-process-panel pb-3">
                <Row>
                    <Col md={5} className="p-0">
                        <div style={{ height: '92%' }}>
                            <h4 className="mb-4">{"Mugs"}</h4>
                            <div className="image-prview mb-4" />
                            <Button
                                type='button'
                                color='primary'
                                className="custom-upload-button mb-3"
                                size="sm"
                            >
                                {"Upload"}
                            </Button>
                        </div>
                        <div style={{ display: 'flex', alignItems: "center" }} className="ml-3">
                            <Label className="custom-toggle">
                                <Input type="checkbox" defaultChecked={true} />
                                <span className="custom-toggle-slider rounded-circle" />
                            </Label>
                            <small className="ml-2">{"For Light"}</small>
                            <img
                                src={require(`assets/img/theme/color-wheel.png`)}
                                style={{ width: '12%', height: '12%' }} className="ml-2"
                            />
                        </div>
                    </Col>
                    <Col md={7} className="p-0">
                        <img
                            className="image-process mb-4"
                            src="https://res.cloudinary.com/umbrellaink/image/fetch/l_mugs:radial,e_displace,y_-6/l_mugs:mug-shape,g_center,fl_cutter/e_multiply,u_mugs:Mug-OR,x_100,y_-37,w_1000/l_mugs:mug-screen,e_screen,x_-100,y_37/https:/res.cloudinary.com/umbrellaink/image/upload/w_0.85,h_0.87/c_crop,c_fit,w_374/w_1.0,h_1.1,c_lpad/artwork/artwork-light.jpg"
                        />
                        <Row>
                            <Col
                                md={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <div className="custom-color-picker">
                                    <div
                                        className="custom-color-picker-item-two mr-1"
                                        style={{ backgroundColor: 'pink' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-two mr-1"
                                        style={{ backgroundColor: 'red' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-two mr-1"
                                        style={{ backgroundColor: 'orange' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-two mr-1"
                                        style={{ backgroundColor: 'grey' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-two mr-1"
                                        style={{ backgroundColor: 'blue' }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default ImageSingleItem;