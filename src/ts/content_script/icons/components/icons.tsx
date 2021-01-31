import React from 'react';

import {
    c_icons,
    p_icons,
} from 'content_script/internal';

export const Icons = (props: p_icons.Icons) => {
    const { hostname } = props;

    return (
        <div
            className='icons'
            style={{ display: 'flex' }}
        >
            <c_icons.Icon
                type='favicons'
                hostname={hostname}
            />
        </div>
    );
};
