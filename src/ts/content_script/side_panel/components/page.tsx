import React from 'react';
import { observer } from 'mobx-react';

import { p_side_panel } from 'content_script/internal';

export const Page = observer((props: p_side_panel.Page) => {
    const { name, val } = props;

    return (
        <div
            className={x.cls(['side_panel_item', name])}
            title={ext.msg(`${name}_indicator_title`)}
        >
            {val}
        </div>
    );
});
