import React from 'react';
import { observer } from 'mobx-react';

import { svg } from 'shared/internal';

import { d_icons, p_icons } from 'content_script/internal';

export const Icon: React.FunctionComponent<p_icons.Icon> = observer((props) => {
    const { type, i } = props;

    const url: string = d_icons.Icons.get_url({
        i,
        type,
    });
    const src: string = d_icons.Icons[type][url];
    const show_icon: boolean = d_icons.Icons.get_show_icon_bool({
        type,
        url,
    });

    // eslint-disable-next-line no-unused-expressions
    d_icons.Icons.favicons[url];
    // eslint-disable-next-line no-unused-expressions
    d_icons.Icons.server_locations[url];

    return d_icons.Icons.show_icon_w({ type }) ? (
        <span className={x.cls(['icon_w', type])}>
            {d_icons.Icons.is_any_placeholder({ src }) ? undefined : (
                <img
                    className={x.cls([
                        'icon',
                        type,
                        d_icons.Icons.icon_visibility_cls({ show_icon }),
                    ])}
                    alt=''
                    title={d_icons.Icons.server_data({
                        type,
                        url,
                    })}
                    src={src}
                />
            )}
            <span className='svgs_w'>
                {d_icons.Icons.show_placeholder({
                    pre: true,
                    type,
                    url,
                }) ? (
                    <svg.Refresh />
                ) : undefined}
                {d_icons.Icons.show_placeholder({
                    pre: false,
                    type,
                    url,
                }) ? (
                    <svg.Yard />
                ) : undefined}
            </span>
        </span>
    ) : null;
});
