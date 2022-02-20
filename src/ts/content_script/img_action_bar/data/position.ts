import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';

import { s_el_parser, i_img_action_bar } from 'content_script/internal';

export class Position {
    private static i0: Position;

    public static i(): Position {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            bottom: observable,
            set_bottom: action,
        });
    }

    public bottom: { [index: string]: number } = {};

    public set_bottom = ({ img_viewer_i }: { img_viewer_i: i_img_action_bar.ImgViewerI }): number =>
        err(() => {
            if (img_viewer_i !== 'main') {
                const el_exists: boolean = n(
                    s_el_parser.Main.i().preview_img_viewer_ws[img_viewer_i],
                );

                if (el_exists) {
                    this.bottom[img_viewer_i] =
                        s_el_parser.Main.i().preview_img_viewer_ws[img_viewer_i].offsetHeight -
                        s_el_parser.Main.i().preview_img_viewers[img_viewer_i].offsetHeight;
                }
            }

            return 0;
        }, 'ges_1193');

    public set_bottom_all = _.debounce(
        (): void =>
            err(() => {
                s_el_parser.Main.i().img_data.forEach((not_used: any, i: number): void =>
                    err(() => {
                        this.set_bottom({ img_viewer_i: i });
                    }, 'ges_1203'),
                );
            }, 'ges_1202'),
        500,
    );
}