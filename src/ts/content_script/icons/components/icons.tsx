import React from 'react';
import { observer } from 'mobx-react';

import { c_icons, p_icons } from 'content_script/internal';

export const Icons: React.FunctionComponent<p_icons.Icons> = observer((props) => {
    const { i } = props;

    return (
        <div className='icons'>
            <c_icons.Icon type='server_locations' i={i} />
            <c_icons.Icon type='favicons' i={i} />
        </div>
    );
});
