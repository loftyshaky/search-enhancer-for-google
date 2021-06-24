import _ from 'lodash';

import { s_utils } from '@loftyshaky/shared';
import { svg } from 'shared/svg';
import { o_img_action_bar, s_img_action_bar } from 'content_script/internal';

export class Btns {
    private static i0: Btns;

    public static i(): Btns {
        if (!this.i0) {
            this.i0 = new this();

            this.i0.btns = s_utils.Main.i().to_object({ arr: this.i0.btns });
        }

        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    public component: any;

    public init_component = (): void =>
        err(() => {
            this.component = _.mapValues(
                this.btns,
                (value: o_img_action_bar.Btn) => svg[value.svg_name],
            );
        }, 'ges_1136');

    public btns: any = [
        new o_img_action_bar.Btn({
            name: 'view_img',
            svg_name: 'Visibility',
            event_callback: s_img_action_bar.Action.i().run,
        }),
        new o_img_action_bar.Btn({
            name: 'search_by_img',
            svg_name: 'Search',
            event_callback: s_img_action_bar.Action.i().run,
        }),
        new o_img_action_bar.Btn({
            name: 'download_img',
            svg_name: 'Download',
            event_callback: s_img_action_bar.Action.i().run,
        }),
        new o_img_action_bar.Btn({
            name: 'save_img_as',
            svg_name: 'Archive',
            event_callback: s_img_action_bar.Action.i().run,
        }),
        new o_img_action_bar.Btn({
            name: 'copy_img',
            svg_name: 'Collections',
            event_callback: s_img_action_bar.Action.i().run,
        }),
        new o_img_action_bar.Btn({
            name: 'copy_img_url',
            svg_name: 'ContentCopy',
            event_callback: s_img_action_bar.Action.i().run,
        }),
    ];
}
