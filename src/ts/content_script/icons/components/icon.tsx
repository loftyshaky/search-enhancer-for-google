import React, {
    useEffect,
    useRef,
} from 'react';
import { observer } from 'mobx-react';

import { svg } from 'shared/svg';

import {
    u_icons,
    p_icons,
} from 'content_script/internal';

export const Icon = observer((props: p_icons.Icon) => {
    const icon_was_already_set_ref = useRef<boolean>(false);

    useEffect(() => {
        const {
            type,
            i,
            hostname,
            limit,
        } = props;

        if (!icon_was_already_set_ref.current && limit >= i) {
            icon_was_already_set_ref.current = true;

            (u_icons.Main as any).i()[`generate_${type}`]({ hostname });
        }
    });

    const {
        type,
        hostname,
    } = props;

    const src: string = (u_icons.Main.i() as any)[type][hostname];

    return data.settings[`show_${type}`]
        ? (
            <span
                className={x.cls([
                    'icon_w',
                    type,
                ])}
                style={{ display: 'flex' }}
            >
                {
                    n(src) && src !== 'placeholder'
                        ? (
                            <img
                                className={x.cls([
                                    'icon',
                                    type,
                                ])}
                                alt=''
                                src={src}
                            />
                        )
                        : <svg.Yard />
                }
            </span>

        )
        : <></>;
});
