import React from 'react';
import { observer } from 'mobx-react';

import {
    u_infinite_scroll,
    p_infinite_scroll,
} from 'content_script/internal';

export const Separator = observer((props: p_infinite_scroll.Separator) => {
    const { i } = props;

    return (
        <div
            className={x.cls([
                'separator',
                u_infinite_scroll.Separator.i().none_cls,
            ])}
            style={{ marginLeft: u_infinite_scroll.Separator.i().offset_left }}
        >
            {`${ext.msg('page_text')} ${i}`}
        </div>
    );
});
