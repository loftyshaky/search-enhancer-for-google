import debounce from 'lodash/debounce';

import { d_data as d_data_loftyshaky_shared } from '@loftyshaky/shared/shared';
import { d_data, s_css_vars } from 'shared_clean/internal';
import {
    d_infinite_scroll,
    s_el_parser,
    s_icons,
    s_infinite_scroll,
    s_keywords,
    s_location,
    s_roots,
    d_side_panel,
} from 'content_script/internal';

import { InitAll } from 'shared/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public run_initial_actions = (): Promise<void> =>
        err_async(async () => {
            await d_data_loftyshaky_shared.Settings.set_from_storage();
            await show_unable_to_access_settings_error({ is_fullscreen: false });
            s_css_vars.CssVars.set();
            s_el_parser.ElParser.get_els();
            s_el_parser.ElParser.get_next_page_href();

            if (
                !n(s_el_parser.ElParser.next_page_href) &&
                s_infinite_scroll.MoreResults.check_if_last_page_or_loading()
            ) {
                d_infinite_scroll.LoadEndMsg.change_visibility({ is_visible: true });
            }

            await InitAll.init();

            if (s_location.Location.is_search_results) {
                s_infinite_scroll.Spinner.set_color();
            }
        }, 'seg_1018');

    public run_reload_actions = (): Promise<void> =>
        err_async(async () => {
            if (d_data.Manipulation.allow_load_settings) {
                await d_data_loftyshaky_shared.Settings.set_from_storage();
                s_css_vars.CssVars.set();
                s_el_parser.ElParser.get_els();

                if (s_location.Location.is_search_results) {
                    s_infinite_scroll.Spinner.set_color();
                    s_keywords.Keywords.color_keywords();
                }

                if (s_location.Location.is_icons_search_results) {
                    s_roots.Roots.apply_root_parent_cls_to_title_els();
                }

                d_infinite_scroll.Separator.set_offset_left();

                if (s_location.Location.is_icons_search_results) {
                    s_roots.Roots.init({ name: 'icons' });
                }
                if (s_location.Location.is_all_page || s_location.Location.is_news_page) {
                    s_icons.icons.show_or_hide_native_favicons();
                }

                if (s_location.Location.is_all_page) {
                    d_side_panel.Page.set_total();
                }
            } else {
                d_data.Manipulation.allow_load_settings = true;
            }
        }, 'seg_1019');

    private run_reload_actions_debounce = debounce(
        (): void =>
            err(() => {
                this.run_reload_actions();
            }, 'seg_1020'),
        200,
    );

    public run_reload_actions_2 = (): Promise<void> =>
        err_async(async () => {
            if (s_location.Location.is_imgs_page) {
                await d_data_loftyshaky_shared.Settings.set_from_storage();
                s_el_parser.ElParser.get_img_viewer();
                s_el_parser.ElParser.get_preview_img_viewers();
                s_roots.Roots.init({ name: 'img_action_bar' });
            }

            this.run_reload_actions_debounce();
        }, 'seg_1021');

    public run_reload_actions_2_debounce = debounce(
        (): void =>
            err(() => {
                this.run_reload_actions_2();
            }, 'seg_1197'),
        200,
    );
}

export const Actions = Class.get_instance();
