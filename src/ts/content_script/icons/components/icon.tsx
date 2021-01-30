import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import {
    u_icons,
    p_icons,
} from 'content_script/internal';

export const Icon = observer((props: p_icons.Icon) => {
    useEffect(() => {
        const {
            type,
            hostname,
        } = props;

        (u_icons.Main as any).i()[`generate_${type}`]({ hostname });
    });

    const {
        type,
        hostname,
    } = props;

    return (
        <img
            className={x.cls([
                'icon',
                type,
            ])}
            alt=''
            src={u_icons.Main.i().favicons[hostname]}
        />
    );
});
