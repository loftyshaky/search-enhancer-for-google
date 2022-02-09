import { makeObservable, observable, action } from 'mobx';

import { i_img_action_bar } from 'content_script/internal';

export class Visibility {
    private static i0: Visibility;

    public static i(): Visibility {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable<Visibility, 'is_visible'>(this, {
            is_visible: observable,
            change: action,
        });
    }

    public is_visible: { [index: string]: any } = {};
    private previous_target: HTMLElement | undefined = undefined;

    public change = (e: MouseEvent): void =>
        err(() => {
            const set_is_visible_val = ({
                img_viewer,
            }: {
                img_viewer: HTMLElement | undefined;
            }): void =>
                err(() => {
                    if (n(img_viewer)) {
                        const scroll_left: number = document.documentElement.scrollLeft;
                        const scroll_top: number = document.documentElement.scrollTop;
                        const rect = img_viewer.getBoundingClientRect();

                        const hovering_over_img: boolean =
                            e.pageX - scroll_left >= rect.left &&
                            e.pageY - scroll_top >= rect.top &&
                            e.pageX - scroll_left <= rect.left + rect.width &&
                            e.pageY - scroll_top <= rect.top + rect.height;

                        if (n(img_viewer.dataset.img_viewer_i)) {
                            const { img_viewer_i } = img_viewer.dataset;

                            if (hovering_over_img) {
                                this.is_visible[img_viewer_i] = true;
                            } else {
                                this.is_visible[img_viewer_i] = false;
                            }
                        }
                    }
                }, 'ges_1195');

            const previous_img_viewer: HTMLElement | undefined = x.closest(
                this.previous_target,
                '[data-img_viewer_i]',
            );

            const current_img_viewer: HTMLElement | undefined = x.closest(
                e.target as any,
                '[data-img_viewer_i]',
            );

            set_is_visible_val({ img_viewer: previous_img_viewer });
            set_is_visible_val({ img_viewer: current_img_viewer });

            if (n(current_img_viewer)) {
                this.previous_target = e.target as any;
            }
        }, 'ges_1058');

    public visibility_cls = ({
        img_viewer_i,
    }: {
        img_viewer_i: i_img_action_bar.ImgViewerI;
    }): string =>
        err(
            () =>
                (img_viewer_i === 'main' &&
                    data.settings.show_img_viewer_img_action_bar &&
                    ((data.settings.show_img_viewer_img_action_bar_only_on_hover &&
                        this.is_visible[img_viewer_i]) ||
                        !data.settings.show_img_viewer_img_action_bar_only_on_hover)) ||
                (img_viewer_i !== 'main' &&
                    data.settings.show_preview_img_viewer_img_action_bar &&
                    ((data.settings.show_preview_img_viewer_img_action_bar_only_on_hover &&
                        this.is_visible[img_viewer_i]) ||
                        !data.settings.show_preview_img_viewer_img_action_bar_only_on_hover))
                    ? ''
                    : 'hidden',
            'ges_1194',
        );
}
