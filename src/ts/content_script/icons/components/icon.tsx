import React, {
    useEffect,
    useRef,
} from 'react';
import { observer } from 'mobx-react';

import {
    u_icons,
    p_icons,
} from 'content_script/internal';

export const Icon = observer((props: p_icons.Icon) => {
    const icon_was_already_set_ref = useRef<boolean>(false);
    useEffect(() => {
        const {
            type,
            hostname,
        } = props;

        if (!icon_was_already_set_ref.current) {
            icon_was_already_set_ref.current = true;

            (u_icons.Main as any).i()[`generate_${type}`]({ hostname });
        }
    });

    const {
        type,
        hostname,
    } = props;

    return data.settings.show_favicons
        ? (
            <img
                className={x.cls([
                    'icon',
                    type,
                ])}
                alt=''
                src={u_icons.Main.i().favicons[hostname]}
            />
        )
        : <></>;
});
