import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_icons, s_location, p_icons } from 'content_script/internal';

export const Icons: React.FunctionComponent<p_icons.Icons> = observer((props) => {
    const { i, on_render } = props;

    useEffect(() => {
        on_render();
    }, [on_render]);

    return (
        <div className={x.cls(['icons', s_location.Location.current_location])}>
            <c_icons.Icon type='server_locations' i={i} />
            <c_icons.Icon type='favicons' i={i} />
        </div>
    );
});
