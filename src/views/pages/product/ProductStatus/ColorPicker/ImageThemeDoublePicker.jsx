import React from 'react';
import { Row, Col } from 'reactstrap';
import APP_CONST from '../../../../../helper/constant';

function ImageThemeDoublePicker(props) {
    return (
        <Row>
            <Col md={12}>
                <p>{`Choose your master color`}</p>
            </Col>
            {Array(2).fill(null).map((value, index) => (
                <Col md={6} className="p-0" key={`${props.variant}-${index}`}>
                    {Array(2).fill(null).map((val, idx) => (
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
                                    {props.colors.map(color => {
                                        if (color.theme === APP_CONST.THEME[index]
                                            && (color.gender === '' || color.gender === APP_CONST.GENDER_LIST[idx].key)) {
                                            let customStyle = Object.keys(props.masterColor).includes(APP_CONST.GENDER_LIST[idx].key) &&
                                                props.masterColor[APP_CONST.GENDER_LIST[idx].key].key === color.key ?
                                                "color-picker-clicked" : "";

                                            return (
                                                <div
                                                    key={`${color.key}-${idx}`}
                                                    name={color.theme === 'D' ? 'dark' : 'light'}
                                                    className={`custom-color-picker-item-one ${customStyle} mr-1`}
                                                    data-name={color.key}
                                                    data-gender={color.gender}
                                                    style={{ backgroundColor: APP_CONST.COLOR_LIST[color.key] }}
                                                    onClick={() => props.onMasterColor(color)}
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
    );
}

export default ImageThemeDoublePicker;