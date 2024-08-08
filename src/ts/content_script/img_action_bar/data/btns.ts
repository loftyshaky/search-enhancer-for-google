import mapValues from 'lodash/mapValues';

import { t, s_utils } from '@loftyshaky/shared/shared';
import { svg, SvgType } from 'shared/internal';
import { o_img_action_bar, s_img_action_bar } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public component: t.AnyRecord = {};

    public init_component = (): void =>
        err(() => {
            this.component = mapValues(
                this.btns,
                (value: o_img_action_bar.Btn) => svg[value.svg_name as keyof SvgType],
            );
        }, 'seg_1056');

    public btns: o_img_action_bar.Btn[] | Record<string, o_img_action_bar.Btn> = [];

    public init_btns = (): void =>
        err(() => {
            this.btns = [
                new o_img_action_bar.Btn({
                    name: 'view_img',
                    svg_name: 'Visibility',
                    event_callback: s_img_action_bar.Action.run,
                }),
                new o_img_action_bar.Btn({
                    name: 'search_by_img',
                    svg_name: 'Search',
                    event_callback: s_img_action_bar.Action.run,
                }),
                new o_img_action_bar.Btn({
                    name: 'download_img',
                    svg_name: 'Download',
                    event_callback: s_img_action_bar.Action.run,
                }),
                new o_img_action_bar.Btn({
                    name: 'save_img_as',
                    svg_name: 'Archive',
                    event_callback: s_img_action_bar.Action.run,
                }),
                new o_img_action_bar.Btn({
                    name: 'copy_img',
                    svg_name: 'Collections',
                    event_callback: s_img_action_bar.Action.run,
                }),
                new o_img_action_bar.Btn({
                    name: 'copy_img_url',
                    svg_name: 'ContentCopy',
                    event_callback: s_img_action_bar.Action.run,
                }),
            ];

            this.btns = s_utils.Utils.to_object({
                arr: this.btns as o_img_action_bar.Btn[],
            });
        }, 'seg_1057');
}

export const Btns = Class.get_instance();
