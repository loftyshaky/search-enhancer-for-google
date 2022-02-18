import { s_keep_alive, s_tab_index } from '@loftyshaky/shared';
import { s_suffix } from 'shared/internal';
import {
    d_img_action_bar,
    s_roots,
    d_side_panel,
    s_actions,
    s_infinite_scroll,
    s_location,
    s_text_dir,
} from 'content_script/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        if (s_location.Main.i().is_content_script_execution_page) {
            s_keep_alive.Tabs.i().add_on_connect_listener();
            x.insert_invisible_chars_in_title();
            s_tab_index.Main.i().bind_set_input_type_f({
                parent: document.body,
                app_id: s_suffix.app_id,
            });

            d_img_action_bar.Btns.i().init_btns();
            d_img_action_bar.Btns.i().init_component();
            s_roots.Main.i().init_component();
            await s_actions.Main.i().run_initial_actions();
            s_text_dir.Main.i().get();
            s_infinite_scroll.FooterEls.i().append_to_footer();

            x.bind(self, 'scroll', d_side_panel.Page.i().set_current);
            x.bind(
                document,
                'mouseup',
                d_side_panel.Scroll.i().stop_remember_scrolling_position_0_35_seconds_timeout,
            );

            if (s_location.Main.i().is_imgs_page) {
                // "get_img_viewer_w" function called from "change" function causes infinite loop in "All" pages when clicking on cards: https://www.google.com/search?q=animals+list
                x.bind(document, 'mousemove', d_img_action_bar.Visibility.i().change);
                x.bind(document, 'scroll', d_img_action_bar.Position.i().set_bottom_all);
            }
        }
    }, 'ges_1082');
