import React from 'react';

import {
    c_icons,
    p_icons,
} from 'content_script/internal';

export const Icons = (props: p_icons.Icons) => {
    const {
        i,
        hostname,
        limit,
    } = props;

    return (
        <div className='icons'>
            <c_icons.Icon
                type='server_locations'
                i={i}
                hostname={hostname}
                limit={limit}
            />
            <c_icons.Icon
                type='favicons'
                i={i}
                hostname={hostname}
                limit={limit}
            />
        </div>
    );
};
