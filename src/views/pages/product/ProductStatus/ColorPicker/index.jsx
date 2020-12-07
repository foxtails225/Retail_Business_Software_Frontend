import React from 'react';

import ImageSideDoublePicker from './ImageSideDoublePicker';
import ImageThemeDoublePicker from './ImageThemeDoublePicker';

function ColorPicker(props) {
    return (
        <div className="product-color-picker-modal">
            {props.source.type === 2 &&
                <ImageThemeDoublePicker
                    colors={props.source.colorList}
                    masterColor={props.masterColor}
                    onMasterColor={(value) => props.onMasterColor(value)}
                />
            }
            {props.source.type === 3 &&
                <ImageSideDoublePicker
                    colors={props.source.colorList}
                    masterColor={props.masterColor}
                    onMasterColor={(value) => props.onMasterColor(value)}
                />
            }
        </div>
    );
}

export default ColorPicker;