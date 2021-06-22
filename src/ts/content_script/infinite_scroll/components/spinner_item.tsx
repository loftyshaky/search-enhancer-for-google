import React from 'react';

import { p_infinite_scroll } from 'content_script/internal';

export const SpinnerItem = (props: p_infinite_scroll.SpinnerItem) => {
    const { i } = props;
    const name: string = 'spinner';

    return <div id={`${name}_${i}`} className={name} />;
};
