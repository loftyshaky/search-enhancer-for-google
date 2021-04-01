import {
    makeObservable,
    observable,
    action,
} from 'mobx';

import {
    s_el_parser,
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
                margin_bottom: observable,
                margin_right: observable,
                set_margin: action,
            },
        );
    }

    public margin_bottom: string = '';
    public margin_right: string = '';

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

            this.margin_bottom = `${margin_bottom}px`;
            this.margin_right = `${margin_right + img_viewer.offsetLeft}px`;
        }
    },
    1107);
}
