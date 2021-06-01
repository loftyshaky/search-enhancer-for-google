import {
    makeObservable,
    observable,
    action,
} from 'mobx';

import { Viewport } from '@loftyshaky/shared';
import {
    s_el_parser,
    s_text_dir,
} from 'content_script/internal';

export class Position {
    private static i0: Position;

    public static i(): Position {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                bottom: observable,
                right: observable,
                set_margin: action,
            },
        );
    }

    public bottom: string = '';
    public right: string = '';

    public observe_img_margin_change = (): void => err(() => {
        const img_in_img_viewer: HTMLImageElement | undefined = (
            s_el_parser.Main.i().get_img_in_img_viewer()
        );

        if (n(img_in_img_viewer)) {
            const resize_observer: any = new ResizeObserver(this.set_margin);

            resize_observer.observe(img_in_img_viewer);
        }
    },
    1004);

    public set_margin = (): void => err(() => {
        const { img_viewer } = s_el_parser.Main.i();
        const img_in_img_viewer: HTMLImageElement | undefined = (
            s_el_parser.Main.i().get_img_in_img_viewer()
        );

        if (
            n(img_in_img_viewer)
            && n(img_viewer)
        ) {
            const margin_bottom: number = x.get_float_css_val(
                img_in_img_viewer,
                'margin-bottom',
            );
            const margin_right: number = x.get_float_css_val(
                img_in_img_viewer,
                'margin-right',
            );

            this.bottom = `${margin_bottom}px`;
            this.right = `${
                s_text_dir.Main.i().dir === 'ltr'
                    ? margin_right + img_viewer.offsetLeft
                    : -(margin_right + img_viewer.offsetLeft)
            }px`;
        }
    },
    1107);
}
