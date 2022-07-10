import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { d_infinite_scroll, p_infinite_scroll } from 'content_script/internal';

export const LoadEndMsg: React.FunctionComponent<p_infinite_scroll.LoadEndMsg> = observer(
    (props) => {
        const { on_render } = props;

        useEffect(() => {
            on_render();
        }, [on_render]);

        return (
            <div
                className={x.cls([
                    'content',
                    'load_end_msg',
                    d_infinite_scroll.LoadEndMsg.i().type,
                ])}
                style={{
                    display: d_infinite_scroll.LoadEndMsg.i().visibility_cls,
                    marginInlineStart: d_infinite_scroll.Separator.i().offset_left,
                }}
            >
                {ext.msg(`load_end_msg_${d_infinite_scroll.LoadEndMsg.i().type}_text`)}
            </div>
        );
    },
);
