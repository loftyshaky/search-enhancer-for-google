import React, {
    useEffect,
    useRef,
} from 'react';
import { observer } from 'mobx-react';
import {
    s_el_parser,
    o_img_action_bar,
    d_img_action_bar,
    u_img_action_bar,
    c_img_action_bar,
} from 'content_script/internal';

export const ImgActionBar = observer(() => {
    const img_action_bar_ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const img_in_img_viewer: HTMLImageElement | undefined = (
            s_el_parser.Main.i().get_img_in_img_viewer()
        );

        if (
            n(img_in_img_viewer)
            && n(img_action_bar_ref.current)
        ) {
            img_in_img_viewer.addEventListener(
                'mouseenter',
                (e: any): void => {
                    u_img_action_bar.Visibility.i().set(
                        { is_visible: true },
                        e,
                    );
                },
            );
            img_in_img_viewer.addEventListener(
                'mouseleave',
                (e: any): void => {
                    u_img_action_bar.Visibility.i().set(
                        { is_visible: false },
                        e,
                    );
                },
            );
            img_action_bar_ref.current.addEventListener(
                'mouseleave',
                (e: any): void => {
                    u_img_action_bar.Visibility.i().set(
                        { is_visible: false },
                        e,
                    );
                },
            );
        }
    },
    []);

    return (
        <div
            className={x.cls([
                'img_action_bar',
                u_img_action_bar.Visibility.i().visibility_cls,
            ])}
            style={{
                marginBottom: u_img_action_bar.Position.i().margin_bottom,
                marginRight: u_img_action_bar.Position.i().margin_right,
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
