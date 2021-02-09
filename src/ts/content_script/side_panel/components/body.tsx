import React from 'react';
import { observer } from 'mobx-react';

import {
    u_side_panel,
    c_side_panel,
} from 'content_script/internal';

export const Body = observer(() => (
    <div className={x.cls([
        'side_panel',
        'left',
    ])}
    >
        <c_side_panel.Page
            name='current'
            val={u_side_panel.Page.i().current}
        />
        <c_side_panel.Page
            name='total'
            val={u_side_panel.Page.i().total}
        />
    </div>
));
