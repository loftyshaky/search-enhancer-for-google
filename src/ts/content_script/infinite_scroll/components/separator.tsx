import React from 'react';
import { observer } from 'mobx-react';

import { u_infinite_scroll, p_infinite_scroll } from 'content_script/internal';

export const Separator: React.FunctionComponent<p_infinite_scroll.Separator> = observer((props) => {
    const { i } = props;

    return (
        <div
            className={x.cls([
                'separator',
                u_infinite_scroll.Separator.i().none_cls,
                u_infinite_scroll.Separator.i().video_cls,
                u_infinite_scroll.Separator.i().books_cls,
                u_infinite_scroll.Separator.i().news_cls,
                u_infinite_scroll.Separator.i().shopping_cls,
            ])}
            style={{ marginInlineStart: u_infinite_scroll.Separator.i().offset_left }}
        >
            {`${ext.msg('page_text')} ${i}`}
        </div>
    );
});
