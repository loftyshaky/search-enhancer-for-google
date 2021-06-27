import React from 'react';
import { observer } from 'mobx-react';

import { d_infinite_scroll } from 'content_script/internal';

export const LoadEndMsg: React.FunctionComponent = observer(() => (
    <div
        className={x.cls([
            'content',
            'load_end_msg',
            d_infinite_scroll.LoadEndMsg.i().type,
            d_infinite_scroll.LoadEndMsg.i().visibility_cls,
        ])}
        style={{ marginInlineStart: d_infinite_scroll.Separator.i().offset_left }}
    >
        {ext.msg(`load_end_msg_${d_infinite_scroll.LoadEndMsg.i().type}_text`)}
    </div>
));
