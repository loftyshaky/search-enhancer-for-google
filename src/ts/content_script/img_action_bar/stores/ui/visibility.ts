import {
    makeObservable,
    observable,
    action,
    computed,
} from 'mobx';

import { s_el_parser } from 'content_script/internal';

export class Visibility {
    private static i0: Visibility;

    public static i(): Visibility {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                is_visible: observable,
                visibility_cls: computed,
                change: action,
            },
        );
    }

    public is_visible: boolean = false;

    public change = (e: any): void => err(() => {
        const img_in_img_viewer: HTMLImageElement | undefined = (
            s_el_parser.Main.i().get_img_in_img_viewer()
        );

        if (n(img_in_img_viewer)) {
            const scroll_left: number = document.documentElement.scrollLeft;
            const scroll_top: number = document.documentElement.scrollTop;
            const rect: any = img_in_img_viewer.getBoundingClientRect();
            const hovering_over_img: boolean = (
                (e.pageX - scroll_left) >= rect.left
                && (e.pageY - scroll_top) >= rect.top
                && (e.pageX - scroll_left) <= (rect.left + rect.width)
                && (e.pageY - scroll_top) <= (rect.top + rect.height)
            );

            if (hovering_over_img) {
                this.is_visible = true;
            } else {
                this.is_visible = false;
            }
        }
    },
    1108);

    public get visibility_cls() {
        return data.settings.always_show_img_action_bar
               || this.is_visible
            ? ''
            : 'hidden';
    }
}
