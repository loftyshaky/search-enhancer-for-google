import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_infinite_scroll, d_infinite_scroll, p_infinite_scroll } from 'content_script/internal';

export const Spinner: React.FunctionComponent<p_infinite_scroll.Spinner> = observer((props) => {
    const { on_render } = props;

    useEffect(() => {
        on_render();
    }, [on_render]);

    return (
        <div id='spinner' className={d_infinite_scroll.Spinner.visibility_cls}>
            {Array(8)
                .fill(undefined)
                .map((item, i) => (
                    <c_infinite_scroll.SpinnerItem key={i} i={i} />
                ))}
        </div>
    );
});
