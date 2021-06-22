import { t } from '@loftyshaky/shared';

import { u_side_panel } from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    public simulate_side_panel_btn_click_on_enter = (
        {
            type,
            callback,
        }: {
            type?: string;
            callback?: t.CallbackVariadicVoid;
        },
        e: any,
    ): void =>
        err(() => {
            const e_2: any = { button: e.button };

            if (e.code === 'Enter') {
                if (type === 'scroll_to_top') {
                    if (e.ctrlKey) {
                        e_2.button = 2;
                    } else if (e.shiftKey || e.altKey) {
                        e_2.button = 1;
                    } else {
                        e_2.button = 0;
                    }

                    if (e.altKey) {
                        u_side_panel.Scroll.i().remember_scrolling_position_0_35_seconds(
                            { keyboard_call: true },
                            e_2,
                        );
                    } else {
                        u_side_panel.Scroll.i().scroll(e_2);
                    }
                } else if (n(callback)) {
                    callback();
                }
            }
        }, 'ges_1101');
}
