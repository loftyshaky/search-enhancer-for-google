import React from 'react';
import { observer } from 'mobx-react';

import { c_infinite_scroll, d_infinite_scroll } from 'content_script/internal';

export const Spinner: React.FunctionComponent = observer(() => (
    <div id='spinner' className={d_infinite_scroll.Spinner.i().visibility_cls}>
        {Array(8)
            .fill(undefined)
            .map((item, i) => (
                <c_infinite_scroll.SpinnerItem key={i} i={i} />
            ))}
    </div>
));
