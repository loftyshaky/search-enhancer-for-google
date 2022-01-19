import React from 'react';
import { observer } from 'mobx-react';

import { c_icons, s_location, p_icons } from 'content_script/internal';

export const Icons: React.FunctionComponent<p_icons.Icons> = observer((props) => {
    const { i } = props;

    return (
        <div className={x.cls(['icons', s_location.Classes.i().news_cls])}>
            <c_icons.Icon type='server_locations' i={i} />
            <c_icons.Icon type='favicons' i={i} />
        </div>
    );
});
