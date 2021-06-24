import React from 'react';
import { observer } from 'mobx-react';

import { p_infinite_scroll } from 'content_script/internal';

export const SpinnerItem: React.FunctionComponent<p_infinite_scroll.SpinnerItem> = observer(
    (props) => {
        const { i } = props;
        const name: string = 'spinner';

        return <div id={`${name}_${i}`} className={name} />;
    },
);
