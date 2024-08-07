import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import {
    c_img_action_bar,
    o_img_action_bar,
    d_img_action_bar,
    p_img_action_bar,
} from 'content_script/internal';

export const Body: React.FunctionComponent<p_img_action_bar.Body> = observer((props) => {
    const { img_viewer_i, on_render } = props;

    const img_action_bar_ref = useRef<HTMLDivElement>(null);
    const is_visible: boolean = d_img_action_bar.Visibility.is_visible[img_viewer_i];
    const { settings } = data;

    useEffect(() => {
        if (n(on_render)) {
            on_render();
        }
    }, [on_render]);

    useEffect(() => {
        /*
        d_img_action_bar.Size.set_scale({
            img_viewer_i,
            img_action_bar_ref: img_action_bar_ref.current,
        });
        */
        d_img_action_bar.Position.set_bottom({
            img_viewer_i,
        });
    }, [img_viewer_i, is_visible, settings]);

    return (
        <div
            className={x.cls([
                'img_action_bar',
                img_viewer_i.toString(),
                d_img_action_bar.Visibility.visibility_cls({ img_viewer_i }),
            ])}
            ref={img_action_bar_ref}
            style={{
                bottom: x.px(d_img_action_bar.Position.bottom[img_viewer_i]),
                transform: d_img_action_bar.Size.scale[img_viewer_i],
            }}
        >
            {Object.values(d_img_action_bar.Btns.btns as o_img_action_bar.Btn[]).map(
                (btn: o_img_action_bar.Btn, i: number): JSX.Element => (
                    <c_img_action_bar.Btn key={i} btn={btn} img_viewer_i={img_viewer_i} />
                ),
            )}
        </div>
    );
});
