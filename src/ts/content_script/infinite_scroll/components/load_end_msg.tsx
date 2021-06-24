import React from 'react';
import { observer } from 'mobx-react';

import { u_infinite_scroll } from 'content_script/internal';

export const LoadEndMsg = observer(() => (
    <div
        className={x.cls([
            'content',
            'load_end_msg',
            u_infinite_scroll.LoadEndMsg.i().type,
            u_infinite_scroll.LoadEndMsg.i().visibility_cls,
        ])}
        style={{ marginInlineStart: u_infinite_scroll.Separator.i().offset_left }}
    >
        {ext.msg(`load_end_msg_${u_infinite_scroll.LoadEndMsg.i().type}_text`)}
    </div>
));
