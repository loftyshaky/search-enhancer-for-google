import React, { useRef } from 'react';
import { observer } from 'mobx-react';
import {
    o_img_action_bar,
    d_img_action_bar,
    u_img_action_bar,
    c_img_action_bar,
} from 'content_script/internal';

export const ImgActionBar = observer(() => {
    const img_action_bar_ref = useRef<HTMLDivElement>(null);

    return (
        <div
            className={x.cls([
                'img_action_bar',
                u_img_action_bar.Visibility.i().visibility_cls,
            ])}
            style={{
                bottom: u_img_action_bar.Position.i().bottom,
                right: u_img_action_bar.Position.i().right,
            }}
            ref={img_action_bar_ref}
        >
            {
                Object.values(d_img_action_bar.Btns.i().btns as o_img_action_bar.Btn[]).map((
                    btn: o_img_action_bar.Btn,
                    i: number,
                ): JSX.Element => (
                    <c_img_action_bar.Btn
                        key={i}
                        btn={btn}
                    />
                ))
            }
        </div>
    );
});
