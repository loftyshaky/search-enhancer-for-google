import { observer } from 'mobx-react-lite';
import React from 'react';

import type { p_side_panel } from 'content_script/internal';

export const Page: React.FunctionComponent<p_side_panel.Page> = observer((props) => {
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
