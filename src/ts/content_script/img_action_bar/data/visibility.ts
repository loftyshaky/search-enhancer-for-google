import { makeObservable, observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';

import { d_img_action_bar, i_img_action_bar } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable<Class, 'is_visible'>(this, {
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
                }, 'seg_1195');

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
        }, 'seg_1058');

    public img_viever_type = ({
        img_viewer_i,
    }: {
        img_viewer_i: i_img_action_bar.ImgViewerI;
    }): string =>
        err(
            () => (img_viewer_i === 'main_img_viewer' ? 'img_viewer' : 'preview_img_viewer'),
            'seg_1200',
        );

    public visibility_cls = computedFn(function (
        this: Class,
        {
            img_viewer_i,
        }: {
            img_viewer_i: i_img_action_bar.ImgViewerI;
        },
    ): string {
        return (img_viewer_i === 'main_img_viewer' &&
            data.settings.prefs.img_viewer_img_action_bar_is_visible &&
            n(d_img_action_bar.Position.bottom[img_viewer_i]) &&
            ((data.settings.prefs.img_viewer_img_action_bar_is_visible_only_on_hover &&
                this.is_visible[img_viewer_i]) ||
                !data.settings.prefs.img_viewer_img_action_bar_is_visible_only_on_hover)) ||
            (img_viewer_i !== 'main_img_viewer' &&
                data.settings.prefs.preview_img_viewer_img_action_bar_is_visible &&
                n(d_img_action_bar.Position.bottom[img_viewer_i]) &&
                ((data.settings.prefs.preview_img_viewer_img_action_bar_is_visible_only_on_hover &&
                    this.is_visible[img_viewer_i]) ||
                    !data.settings.prefs
                        .preview_img_viewer_img_action_bar_is_visible_only_on_hover))
            ? ''
            : 'visibility_hidden';
    });
}

export const Visibility = Class.get_instance();
