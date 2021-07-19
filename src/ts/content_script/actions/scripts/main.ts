import _ from 'lodash';

import { d_settings, s_css_vars } from 'shared/internal';
import {
    d_infinite_scroll,
    s_el_parser,
    s_infinite_scroll,
    s_keywords,
    s_location,
    s_roots,
} from 'content_script/internal';

import { InitAll } from 'shared/init_all';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public run_initial_actions = (): Promise<void> =>
        err_async(async () => {
            await d_settings.Main.i().set_from_storage();
            s_css_vars.Main.i().set();
            s_el_parser.Main.i().get_els();
            s_el_parser.Main.i().get_next_page_href();

            if (!n(s_el_parser.Main.i().next_page_href)) {
                d_infinite_scroll.LoadEndMsg.i().change_visibility({ is_visible: true });
            }

            await InitAll.i().init();

            if (s_location.Main.i().is_search_results) {
                s_infinite_scroll.Spinner.i().set_color();
            }
        }, 'ges_1018');

    public run_reload_actions = (): Promise<void> =>
        err_async(async () => {
            if (d_settings.Main.i().allow_rerun_actions) {
                await d_settings.Main.i().set_from_storage();
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
            } else {
                d_settings.Main.i().allow_rerun_actions = true;
            }
        }, 'ges_1019');

    private run_reload_actions_debounce = _.debounce(
        (): void =>
            err(() => {
                this.run_reload_actions();
            }, 'ges_1020'),
        200,
    );

    public run_reload_actions_2 = (): void =>
        err(() => {
            if (s_location.Main.i().is_imgs_page) {
                s_el_parser.Main.i().get_img_viewer();
                s_roots.Main.i().init({ name: 'img_action_bar' });
            }

            this.run_reload_actions_debounce();
        }, 'ges_1021');
}
