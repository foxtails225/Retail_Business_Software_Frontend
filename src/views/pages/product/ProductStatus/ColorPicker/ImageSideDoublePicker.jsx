import React from 'react';
import { Row, Col } from 'reactstrap';
import APP_CONST from '../../../../../helper/constant';

function ImageSideDoublePicker(props) {
    return (
        <Row>
            <Col md={12}>
                <p>{`Choose your master color`}</p>
            </Col>
            <Col
                md={6}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <div className="custom-color-picker">
                    {props.colors.map(color => {
                        let customStyle = Object.keys(props.masterColor).includes('key') &&
                            props.masterColor.key === color.key ? "color-picker-clicked" : "";

                        return (
                            <div
                                key={color.key}
                                data-name={color.key}
                                className={`custom-color-picker-item-two ${customStyle} mr-1`}
                                style={{ backgroundColor: APP_CONST.COLOR_LIST[color.key] }}
                                onClick={() => props.onMasterColor(color)}
                            />
                        );
                    })}
                </div>
            </Col>
        </Row>
    );
}

export default ImageSideDoublePicker;