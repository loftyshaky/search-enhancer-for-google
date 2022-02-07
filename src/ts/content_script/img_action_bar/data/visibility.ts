import { MouseEvent } from 'react';
import { makeObservable, observable, computed, action } from 'mobx';

import { s_el_parser } from 'content_script/internal';

export class Visibility {
    private static i0: Visibility;

    public static i(): Visibility {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable<Visibility, 'is_visible'>(this, {
            is_visible: observable,
            visibility_cls: computed,
            change: action,
        });
    }

    private is_visible: boolean = false;

    public change = (e: MouseEvent): void =>
        err(() => {
            const img_viewer_w: HTMLElement | undefined = s_el_parser.Main.i().get_img_viewer_w();

            if (n(img_viewer_w)) {
                const scroll_left: number = document.documentElement.scrollLeft;
                const scroll_top: number = document.documentElement.scrollTop;
                const rect = img_viewer_w.getBoundingClientRect();

                const hovering_over_img: boolean =
                    e.pageX - scroll_left >= rect.left &&
                    e.pageY - scroll_top >= rect.top &&
                    e.pageX - scroll_left <= rect.left + rect.width &&
                    e.pageY - scroll_top <= rect.top + rect.height;

                if (hovering_over_img) {
                    this.is_visible = true;
                } else {
                    this.is_visible = false;
                }
            }
        }, 'ges_1058');

    public get visibility_cls() {
        return data.settings.always_show_img_action_bar || this.is_visible ? '' : 'hidden';
    }
}
