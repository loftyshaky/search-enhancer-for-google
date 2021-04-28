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
        } = props;

        if (
            data.settings[`show_${type}`]
            && !icon_was_already_set_ref.current
        ) {
            icon_was_already_set_ref.current = true;

            const url: string = u_icons.Main.i().get_url({
                i,
                type,
            });

            (u_icons.Main as any).i()[`generate_${type}`]({ url });
        }
    });

    const {
        type,
        i,
    } = props;

    const url: string = u_icons.Main.i().get_url({
        i,
        type,
    });
    const src: string = u_icons.Main.i()[type][url];
    const show_icon: boolean = u_icons.Main.i().get_show_icon_bool({
        type,
        url,
    });

    // eslint-disable-next-line no-unused-expressions
    u_icons.Main.i().favicons_loaded[url]; u_icons.Main.i().server_locations_loaded[url];

    return u_icons.Main.i().show_icon_w({ type })
        ? (

            <span
                className={x.cls([
                    'icon_w',
                    type,
                ])}
            >
                {
                    src === 'placeholder'
                        ? undefined
                        : (
                            <img
                                className={x.cls([
                                    'icon',
                                    type,
                                    u_icons.Main.i().icon_visibility_cls({ show_icon }),
                                ])}
                                alt=''
                                title={u_icons.Main.i().server_data({
                                    type,
                                    url,
                                })}
                                src={src}
                                onLoad={(): void => {
                                    u_icons.Main.i().set_favicons_loaded_to_true({
                                        type,
                                        url,
                                    });
                                }}
                            />
                        )

                }
                {
                    u_icons.Main.i().show_placeholder({
                        type,
                        show_icon,
                    })
                        ? <svg.Yard />
                        : undefined

                }
            </span>
        )
        : <></>;
});
