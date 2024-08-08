import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { d_infinite_scroll, s_location, p_infinite_scroll } from 'content_script/internal';

export const Separator: React.FunctionComponent<p_infinite_scroll.Separator> = observer((props) => {
    const { i, on_render } = props;

    useEffect(() => {
        on_render();
    }, [on_render]);

    return (
        <div
            className={x.cls([
                'separator',
                d_infinite_scroll.Separator.none_cls,
                s_location.Location.current_location,
            ])}
            style={{ marginInlineStart: d_infinite_scroll.Separator.offset_left }}
        >
            {`${ext.msg('page_text')} ${i}`}
        </div>
    );
});
