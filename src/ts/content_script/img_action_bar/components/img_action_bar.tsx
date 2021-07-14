import React, { useRef } from 'react';
import { observer } from 'mobx-react';

import { c_img_action_bar, o_img_action_bar, d_img_action_bar } from 'content_script/internal';

export const ImgActionBar: React.FunctionComponent = observer(() => {
    const img_action_bar_ref = useRef<HTMLDivElement>(null);

    return (
        <div
            className={x.cls(['img_action_bar', d_img_action_bar.Visibility.i().visibility_cls])}
            ref={img_action_bar_ref}
        >
            {Object.values(d_img_action_bar.Btns.i().btns as o_img_action_bar.Btn[]).map(
                (btn: o_img_action_bar.Btn, i: number): JSX.Element => (
                    <c_img_action_bar.Btn key={i} btn={btn} />
                ),
            )}
        </div>
    );
});
