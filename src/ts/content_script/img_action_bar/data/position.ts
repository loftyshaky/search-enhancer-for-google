import debounce from 'lodash/debounce';
import { action, makeObservable, observable } from 'mobx';

import { s_el_parser, s_img_action_bar, i_img_action_bar } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            bottom: observable,
            set_bottom: action,
        });
    }

    public bottom: { [index: string]: number } = {};

    public set_bottom = ({ img_viewer_i }: { img_viewer_i: i_img_action_bar.ImgViewerI }): void =>
        err(() => {
            const img_action_bar_el =
                s_img_action_bar.ImgActionBar.img_action_bar_els[img_viewer_i];

            if (n(img_action_bar_el)) {
                if (img_viewer_i === 'main_img_viewer') {
                    const el_exists: boolean = n(s_el_parser.ElParser.img_viewer);

                    if (el_exists) {
                        this.bottom[img_viewer_i] =
                            s_el_parser.ElParser.img_viewer!.offsetHeight -
                            img_action_bar_el.offsetHeight;
                    }
                } else {
                    const el_exists: boolean = n(
                        s_el_parser.ElParser.preview_img_viewer_ws[img_viewer_i],
                    );

                    if (el_exists) {
                        const bottom: number =
                            s_el_parser.ElParser.preview_img_viewer_ws[img_viewer_i].offsetHeight -
                            img_action_bar_el.offsetHeight;
                        this.bottom[img_viewer_i] = bottom < 0 ? 77 : bottom;
                    }
                }
            }
        }, 'seg_1193');

    public set_bottom_all = debounce(
        (): void =>
            err(() => {
                s_el_parser.ElParser.img_data.forEach((not_used: any, i: number): void =>
                    err(() => {
                        this.set_bottom({ img_viewer_i: i });
                    }, 'seg_1203'),
                );
            }, 'seg_1202'),
        500,
    );
}

export const Position = Class.get_instance();
