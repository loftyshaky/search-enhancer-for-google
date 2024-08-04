import debounce from 'lodash/debounce';

import { d_settings as d_settings_loftyshaky_shared } from '@loftyshaky/shared/shared';
import { d_settings, s_css_vars } from 'shared_clean/internal';
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

import { InitAll } from 'shared/init_all';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public run_initial_actions = (): Promise<void> =>
        err_async(async () => {
            await d_settings_loftyshaky_shared.Main.i().set_from_storage();
            await show_unable_to_access_settings_error({ is_fullscreen: false });
            s_css_vars.Main.i().set();
            s_el_parser.Main.i().get_els();
            s_el_parser.Main.i().get_next_page_href();

            if (
                !n(s_el_parser.Main.i().next_page_href) &&
                s_infinite_scroll.MoreResults.i().check_if_last_page_or_loading()
            ) {
                d_infinite_scroll.LoadEndMsg.i().change_visibility({ is_visible: true });
            }

            await InitAll.i().init();

            if (s_location.Main.i().is_search_results) {
                s_infinite_scroll.Spinner.i().set_color();
            }
        }, 'seg_1018');

    public run_reload_actions = (): Promise<void> =>
        err_async(async () => {
            if (d_settings.Main.i().allow_rerun_actions) {
                await d_settings_loftyshaky_shared.Main.i().set_from_storage();
                s_css_vars.Main.i().set();
                s_el_parser.Main.i().get_els();

                if (s_location.Main.i().is_search_results) {
                    s_infinite_scroll.Spinner.i().set_color();
                    s_keywords.Main.i().color_keywords();
                }

                if (s_location.Main.i().is_icons_search_results) {
                    s_roots.Main.i().apply_root_parent_cls_to_title_els();
                }

                d_infinite_scroll.Separator.i().set_offset_left();

                if (s_location.Main.i().is_icons_search_results) {
                    s_roots.Main.i().init({ name: 'icons' });
                }
                if (s_location.Main.i().is_all_page || s_location.Main.i().is_news_page) {
                    s_icons.Main.i().show_or_hide_native_favicons();
                }

                if (s_location.Main.i().is_all_page) {
                    d_side_panel.Page.i().set_total();
                }
            } else {
                d_settings.Main.i().allow_rerun_actions = true;
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
            if (s_location.Main.i().is_imgs_page) {
                await d_settings_loftyshaky_shared.Main.i().set_from_storage();
                s_el_parser.Main.i().get_img_viewer();
                s_el_parser.Main.i().get_preview_img_viewers();
                s_roots.Main.i().init({ name: 'img_action_bar' });
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
